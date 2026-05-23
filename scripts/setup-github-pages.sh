#!/usr/bin/env bash
set -euo pipefail

DOMAIN="${DOMAIN:-www.aziendaagricolafarina.com}"
WORKFLOW_FILE="${WORKFLOW_FILE:-deploy.yml}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Error: '$1' is required but was not found in PATH." >&2
    exit 1
  fi
}

require_command git
require_command gh
require_command npm

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if ! gh auth status >/dev/null 2>&1; then
  echo "Error: GitHub CLI is not logged in. Run: gh auth login" >&2
  exit 1
fi

owner_repo="$(gh repo view --json nameWithOwner -q .nameWithOwner)"
current_branch="$(git branch --show-current)"

if [[ -z "$current_branch" ]]; then
  echo "Error: could not determine the current Git branch." >&2
  exit 1
fi

echo "Repository: $owner_repo"
echo "Branch: $current_branch"
echo "Domain: $DOMAIN"

if [[ ! -f public/CNAME ]]; then
  echo "Creating public/CNAME with $DOMAIN"
  printf '%s\n' "$DOMAIN" > public/CNAME
elif [[ "$(cat public/CNAME)" != "$DOMAIN" ]]; then
  echo "Updating public/CNAME to $DOMAIN"
  printf '%s\n' "$DOMAIN" > public/CNAME
fi

echo "Installing dependencies and building the production site..."
npm ci
npm run build

echo "Checking built output..."
test -f dist/CNAME
if find dist -name '*.html' -print0 | xargs -0 grep -n 'src/main.tsx'; then
  echo "Error: built HTML still references src/main.tsx. Refusing to deploy broken output." >&2
  exit 1
fi

if ! git diff --quiet -- .github/workflows/deploy.yml README.md public/CNAME scripts/setup-github-pages.sh 2>/dev/null; then
  echo "Committing deployment configuration changes..."
  git add .github/workflows/deploy.yml README.md public/CNAME scripts/setup-github-pages.sh
  git commit -m "Configure GitHub Pages deployment"
else
  echo "No deployment configuration changes to commit."
fi

echo "Pushing $current_branch to origin..."
git push origin "$current_branch"

echo "Configuring GitHub Pages for Actions deployment..."
if ! gh api --method PUT \
  -H "Accept: application/vnd.github+json" \
  "/repos/${owner_repo}/pages" \
  -f build_type=workflow \
  -f cname="$DOMAIN"; then
  echo "Could not update Pages through the API. If Pages has never been enabled, open:" >&2
  echo "  https://github.com/${owner_repo}/settings/pages" >&2
  echo "Set Source to 'GitHub Actions' once, then rerun this script." >&2
  exit 1
fi

echo "Triggering the deployment workflow..."
gh workflow run "$WORKFLOW_FILE" --repo "$owner_repo" --ref "$current_branch"

echo "Waiting briefly for the workflow run to appear..."
sleep 5

echo "Watching the latest workflow run. Press Ctrl+C to stop watching; the deployment will continue on GitHub."
gh run watch --repo "$owner_repo" --exit-status

echo "Done. Open: https://$DOMAIN/"

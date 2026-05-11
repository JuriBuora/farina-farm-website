<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
# Farina Farm Website

Production marketing website for [www.cucurbitacee.com](https://www.cucurbitacee.com), built with Vite, React, TypeScript, Tailwind, and deployed to GitHub Pages.

## What this project demonstrates

- Multi-page static React site for a real local business
- Product, gallery, contact, privacy, and cookie-policy pages
- Static SEO metadata and JSON-LD structured data
- Image optimization pipeline that generates WebP and AVIF variants
- Keyless Google Maps embed
- Contact form validation, anti-spam timing checks, honeypot field, and cooldown
- Consent-gated Google Analytics support through `VITE_GA_MEASUREMENT_ID`
- GitHub Actions deployment to GitHub Pages
- Unit tests around contact validation and image metadata
=======
# Società Agricola Farina 2.0 website

This project is built with Vite and deployed to GitHub Pages.
>>>>>>> theirs
=======
# Società Agricola Farina 2.0 website

This project is built with Vite and deployed to GitHub Pages.
>>>>>>> theirs
=======
# Società Agricola Farina 2.0 website

This project is built with Vite and deployed to GitHub Pages.
>>>>>>> theirs
=======
# Società Agricola Farina 2.0 website

This project is built with Vite and deployed to GitHub Pages.
>>>>>>> theirs

## Local development

```bash
npm ci
npm run dev
```

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
Useful checks:

```bash
npm run lint
npm run test
npm run build
npm audit
```

## Deployment

Deploys run through `.github/workflows/deploy.yml` on pushes to `main`. GitHub Pages publishes the `dist/` artifact produced by the workflow.

To enable Google Analytics in production, create a GitHub Actions repository variable named
`VITE_GA_MEASUREMENT_ID` with the GA4 web stream measurement ID, for example `G-XXXXXXXXXX`.
Analytics is loaded only after the visitor accepts analytics cookies.

## Domain and SEO notes

- Primary production domain: `https://www.cucurbitacee.com`
- Custom domain file: `public/CNAME`
- Site URL constant: `src/lib/site.ts`
- Sitemap routes: `scripts/site-pages.mjs`
- Sitemap generator: `scripts/generate-sitemap.mjs`

If the production domain changes, update:

1. `public/CNAME`
2. `src/lib/site.ts`
3. `public/robots.txt`

## Media and external embeds

Original images live in `src/assets/`. Modern image variants are generated into `src/assets/generated/` by `scripts/generate-modern-images.mjs` before development, test, and build commands.

The Facebook embed loads only after user interaction. The contact page uses FormSubmit, so the destination inbox must approve the first live submission before normal delivery starts.
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
## Production build

```bash
npm run build
```

## Deployment setup (fixes the white page / MIME error)

If the browser shows:

- `Failed to load module script ... MIME type of "application/octet-stream"`

that means GitHub Pages is serving source files (like `/src/main.tsx`) instead of the
compiled Vite output.

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
This repository now deploys the compiled `dist/` folder to a dedicated `gh-pages`
branch using GitHub Actions at:
=======
This repository deploys the compiled `dist/` folder through the GitHub Pages Actions
artifact flow at:
>>>>>>> theirs
=======
This repository deploys the compiled `dist/` folder through the GitHub Pages Actions
artifact flow at:
>>>>>>> theirs
=======
This repository deploys the compiled `dist/` folder through the GitHub Pages Actions
artifact flow at:
>>>>>>> theirs

- `.github/workflows/deploy.yml`

### One-time GitHub configuration

1. Open **GitHub repository → Settings → Pages**.
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
2. Under **Build and deployment**, set **Source = Deploy from a branch**.
3. Select branch **`gh-pages`** and folder **`/ (root)`**.
4. In **Custom domain**, set: `www.cucurbitacee.com`.
5. Enable **Enforce HTTPS** when available.
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
2. Under **Build and deployment**, set **Source = GitHub Actions**.
3. In **Custom domain**, set: `www.cucurbitacee.com`.
4. Enable **Enforce HTTPS** when available.
5. Push to `main` (or manually run the workflow) and wait for the latest Actions run to finish.

You do **not** need to select a `gh-pages` branch for this setup. The workflow uploads
`dist/` directly as the GitHub Pages artifact.

<<<<<<< ours
=======
### One-command setup script

If you want the repo to do the GitHub Pages setup for you, run:

```bash
./scripts/setup-github-pages.sh
```

The script checks your GitHub CLI login, builds the Vite site, verifies that the built
HTML does not reference `/src/main.tsx`, commits deployment config changes if needed,
pushes the current branch, configures GitHub Pages for Actions deployment, triggers
`deploy.yml`, and watches the workflow run.

>>>>>>> theirs
### GitHub CLI setup (alternative to clicking in GitHub)

If you are already logged in with `gh auth status`, you can configure Pages from your
terminal instead of using the GitHub settings screen. Run these from the repository
folder after replacing `OWNER/REPO` with the repository shown by `gh repo view --json nameWithOwner -q .nameWithOwner`:

```bash
gh api --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/OWNER/REPO/pages \
  -f build_type=workflow \
  -f cname=www.cucurbitacee.com

gh workflow run deploy.yml --repo OWNER/REPO
```

Then watch the deployment finish:

```bash
gh run watch --repo OWNER/REPO
```

If the first command says the Pages site does not exist yet, open **Settings → Pages**
once, choose **Source = GitHub Actions**, save it, and then rerun the commands above.
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

### DNS configuration (Namecheap)

- `A @` → `185.199.108.153`
- `A @` → `185.199.109.153`
- `A @` → `185.199.110.153`
- `A @` → `185.199.111.153`
- `CNAME www` → `<github-username>.github.io`

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
The custom domain is committed in `public/CNAME`, and each deploy also sets
`www.cucurbitacee.com` on the published `gh-pages` output.
>>>>>>> theirs
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
The custom domain is committed in `public/CNAME`, so each deploy keeps
`www.cucurbitacee.com` in the published output.

## Google Search Console: "Pagina con reindirizzamento"

Google Search Console may report these URL variants as **Pagina con reindirizzamento**:

- `http://cucurbitacee.com/`
- `https://cucurbitacee.com/`
- `http://www.cucurbitacee.com/`

That is expected when the preferred canonical address is:

- `https://www.cucurbitacee.com/`

Those redirected variants should not be indexed separately. The sitemap, robots file,
static HTML canonicals, and app default site URL all point to the `https://www` version.
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

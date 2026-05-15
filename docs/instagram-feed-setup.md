# Instagram Feed Setup

The gallery can show the latest Instagram posts from `@soc.agr.farina_2.0` without exposing a Meta access token in the browser.

## How It Works

1. GitHub Actions runs the site build on every push and once per hour.
2. During the build, `scripts/fetch-instagram-feed.mjs` calls the Meta Graph API using GitHub Secrets.
3. The script copies recent post thumbnails into `public/instagram/` and writes `public/instagram-feed.json`.
4. The Galleria page reads that local JSON file and links each item back to Instagram.

## Required GitHub Secrets

Add these in GitHub under `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`.

`INSTAGRAM_ACCOUNT_ID`

The Instagram Professional account ID connected to the company page.

`INSTAGRAM_ACCESS_TOKEN`

A long-lived Meta access token with permission to read that Instagram Professional account's media.

## Account-Side Requirements

The Instagram account must be a Professional account and must be connected to a Facebook Page / Meta Business setup that can grant API access.

Useful Meta documentation:

- Facebook Login for Business: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/business-login-for-instagram
- Instagram Platform: https://developers.facebook.com/docs/instagram-platform/

## Refresh Timing

The workflow runs hourly at minute 17. After the company publishes a new Instagram post, it should usually appear on the website after the next scheduled workflow and GitHub Pages deployment complete.

You can also trigger it manually from GitHub Actions by running `Deploy Vite site to GitHub Pages`.

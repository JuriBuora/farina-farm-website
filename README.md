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

## Local development

```bash
npm ci
npm run dev
```

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

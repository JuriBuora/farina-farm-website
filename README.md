# Farina Farm Website

Production marketing website for **Farina Farm** at [www.aziendaagricolafarina.com](https://www.aziendaagricolafarina.com).

This repository contains a fast, static, mobile-friendly website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is designed for a real agricultural business that wants to present seasonal produce, pumpkins and cucurbits, firewood services, image galleries, contact information, and privacy-compliant analytics.

---

## Overview

Farina Farm Website is a multi-page frontend application focused on performance, local business visibility, and simple static deployment.

The site includes dedicated pages for products, firewood, contact information, business background, galleries, and legal policies. It also includes SEO metadata, structured data, responsive image generation, consent-aware analytics, form validation, and automated deployment through GitHub Pages.

---

## Live Website

**Production:** [https://www.aziendaagricolafarina.com](https://www.aziendaagricolafarina.com)

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Forms | React Hook Form |
| Validation | Zod |
| SEO | React Helmet Async |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Testing | Vitest + Testing Library |
| Image Processing | Sharp |
| Deployment | GitHub Pages + GitHub Actions |

---

## Main Features

### Static Marketing Website

- Multi-page React website
- Static deployment-friendly architecture
- Route-level code splitting with lazy-loaded pages
- Mobile-first responsive layouts
- Clear presentation for a local agricultural business

### Business Pages

The website includes pages for:

- Homepage
- Products
- Gallery
- Contact
- About the business
- Firewood information
- Firewood ordering
- Privacy policy
- Cookie policy
- 404 fallback page

### SEO Support

The project includes SEO-focused implementation details such as:

- Page-specific metadata
- Open Graph-friendly structure
- JSON-LD structured data
- Sitemap generation script
- Custom domain configuration through `CNAME`

### Image Optimization

A custom image optimization pipeline generates modern image formats using Sharp.

Supported generated formats include:

- WebP
- AVIF
- Optimized responsive image assets

This helps improve:

- Page load speed
- Lighthouse scores
- Mobile performance
- SEO discoverability
- Bandwidth usage

### Contact Form Protection

The contact flow includes multiple client-side safeguards:

- Zod validation
- Honeypot field
- Anti-spam timing checks
- Cooldown protection
- React Hook Form integration

### Analytics and Privacy

Google Analytics support is consent-gated and controlled by an environment variable.

Analytics are only enabled when configured with:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

This keeps the project safer for privacy-conscious deployment and GDPR-oriented usage.

### Automated Deployment

The repository includes a GitHub Actions workflow for deploying to GitHub Pages.

The workflow:

1. Installs dependencies
2. Builds the Vite app
3. Confirms the `CNAME` file exists in the build output
4. Checks that compiled assets are used instead of source entrypoints
5. Uploads the `dist` folder to GitHub Pages
6. Publishes the website

### Stable QR landing address

Printed QR materials use the permanent public address:

```txt
https://www.aziendaagricolafarina.com/qr
```

The site is hosted as a static GitHub Pages artifact, which cannot emit a configurable HTTP 302/307 from this repository. The static fallback at `/qr` and `/qr/` therefore loads `public/qr/redirect.js`, which immediately replaces the browser location with the fixed UTM-tagged homepage destination. It intentionally ignores all incoming query parameters, so it cannot be used as an open redirect.

To change the campaign destination in the future, edit the single `QR_DESTINATION` value in `scripts/qr-redirect.mjs`, test it, and deploy normally. The deployment build regenerates the static landing files. Do not change the printed `/qr` address.

---

## Project Structure

```txt
farina-farm-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── scripts/
│   ├── generate-modern-images.mjs
│   └── generate-sitemap.mjs
├── src/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── ChiSiamo.tsx
│   │   ├── Contatti.tsx
│   │   ├── CookiePolicy.tsx
│   │   ├── Galleria.tsx
│   │   ├── Index.tsx
│   │   ├── Legna.tsx
│   │   ├── NotFound.tsx
│   │   ├── OrdinaLegna.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   └── Prodotti.tsx
│   ├── test/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── CNAME
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/prodotti/` | Products |
| `/contatti/` | Contact |
| `/galleria/` | Gallery |
| `/chi-siamo/` | About |
| `/legna/` | Firewood information |
| `/ordina-legna-da-ardere/` | Firewood order page |
| `/privacy-policy/` | Privacy policy |
| `/cookie-policy/` | Cookie policy |
| `*` | Not found page |

---

## Getting Started

### Prerequisites

Use Node.js 20 or newer. The GitHub Actions deployment workflow is configured with Node.js 20.

Check your local versions:

```bash
node --version
npm --version
```

### Install Dependencies

```bash
npm ci
```

### Start Local Development

```bash
npm run dev
```

Vite will start the local development server and print the local URL in the terminal.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Creates the production build |
| `npm run check:seo` | Verifies sitemap, canonical URLs, and robots directives |
| `npm run build:dev` | Builds using Vite development mode |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |
| `npm run typecheck` | Runs TypeScript checks |
| `npm run test` | Runs the Vitest test suite once |
| `npm run test:watch` | Runs Vitest in watch mode |
| `npm run sync:sitemap` | Generates or updates sitemap data |
| `npm run sync:images` | Generates optimized modern image assets |

---

## Build Process

Create a production build:

```bash
npm run build
```

The production output is generated in:

```txt
dist/
```

Before building, the project automatically runs:

```bash
npm run sync:sitemap
npm run sync:images
```

This ensures sitemap and image assets are up to date before deployment.

---

## Preview Production Build

After running a production build, preview it locally with:

```bash
npm run preview
```

---

## Testing

Run all tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

The project uses Vitest and Testing Library for frontend test coverage.

---

## Type Checking

Run TypeScript validation:

```bash
npm run typecheck
```

This checks both the app TypeScript configuration and the Node/script TypeScript configuration.

---

## Linting

Run ESLint:

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file only when local environment configuration is needed.

Example:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Do not commit private secrets or production-only credentials to the repository.

---

## Deployment

This project is configured for GitHub Pages deployment.

Deployment is handled by:

```txt
.github/workflows/deploy.yml
```

The workflow runs on pushes to:

- `main`
- `master`
- `work`

It can also be triggered manually through GitHub Actions using `workflow_dispatch`.

### Deployment Requirements

Make sure:

1. GitHub Pages is enabled for the repository.
2. The Pages source is configured for GitHub Actions.
3. The custom domain is correctly configured.
4. The `CNAME` file contains the production domain.
5. DNS records point to GitHub Pages.

---

## Custom Domain

The project includes a `CNAME` file for the custom domain.

Expected production domain:

```txt
www.aziendaagricolafarina.com
```

The deployment workflow verifies that the `CNAME` file is present in the final `dist` output.

---

## Performance Notes

This project is designed to keep the production site fast by using:

- Vite production builds
- Route-level code splitting
- Static hosting
- Optimized image formats
- Minimal runtime dependencies
- Tailwind-generated CSS
- Lazy-loaded route components

---

## Accessibility Notes

The UI should continue to prioritize:

- Semantic HTML
- Clear page hierarchy
- Keyboard-friendly navigation
- Readable typography
- Good contrast
- Mobile-friendly spacing
- Descriptive alt text for images

---

## Development Guidelines

When modifying the project:

1. Keep pages focused and easy to scan.
2. Reuse existing components before creating new ones.
3. Keep business content clear, local, and customer-friendly.
4. Run linting and type checks before pushing.
5. Run the build before deployment changes.
6. Optimize new images through the existing image pipeline.
7. Keep privacy and analytics behavior consent-aware.

Recommended validation before committing:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

---

## Future Improvements

Possible future enhancements include:

- Italian/English multilingual support
- CMS integration for seasonal updates
- Admin panel for products and galleries
- Serverless contact form backend
- Product filtering and search
- Seasonal landing pages
- Structured product inventory
- Newsletter signup
- Performance monitoring
- Automated image alt text auditing

---

## Troubleshooting

### Development server does not start

Try reinstalling dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Build fails after adding images

Regenerate image assets:

```bash
npm run sync:images
npm run build
```

### GitHub Pages deploy fails

Check:

- GitHub Pages is set to GitHub Actions
- `CNAME` exists
- `npm run build` works locally
- The repository has Pages permissions enabled
- The deploy workflow has permission to write Pages artifacts

---

## License

This repository is intended for Farina Farm business operations unless another license is explicitly added.

---

## Maintainers

Maintained for Farina Farm / aziendaagricolafarina.com.

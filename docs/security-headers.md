# Security Headers

The production site currently deploys to GitHub Pages. GitHub Pages does not support custom HTTP response headers from this repository, so these headers need to be configured at a CDN/proxy layer such as Cloudflare, or by moving to hosting that supports per-route headers.

Start with these low-risk headers:

```txt
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cross-Origin-Opener-Policy: same-origin-allow-popups
```

Add HSTS only after confirming every production and subdomain route is permanently HTTPS:

```txt
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Use Content Security Policy carefully because this site can load Google Analytics after cookie consent, Google Maps links/embeds, and social links. A report-only rollout is safer before enforcing:

```txt
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com; base-uri 'self'; form-action 'self'
```

After testing in report-only mode, convert to `Content-Security-Policy` and tighten any directives that are not needed in production.

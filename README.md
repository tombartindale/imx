# ACM IMX Steering Committee website

Static Astro site for `https://imx.acm.org/sc/`. The full specification is in [imx-sc-website-spec.md](imx-sc-website-spec.md); brand decisions are in [brand/BRAND.md](brand/BRAND.md).

## Develop

```sh
nvm use            # Node 22 (see .nvmrc; Astro needs 22.23.4 or later)
npm ci
npm run dev        # http://localhost:4321/sc/
npm run build      # outputs dist/
npm run check:links
```

Staging build: `BASE_PATH=/sc-test PUBLIC_ENV=staging npm run build`. It adds `noindex` everywhere, a disallow-all `robots.txt` and an `X-Robots-Tag` header.

## Updating content

| Change | Where |
|---|---|
| Committee membership | `src/data/committee.json` (and update `asOf`) |
| Honorary committee | `src/data/honorary-committee.json` |
| Contact address or key URLs | `src/data/site.json` |
| Special issues archive | `src/data/special-issues.json` |
| Page text | the relevant file in `src/pages/` |
| Replace a PDF | `public/files/` (keep the same filename) |
| Redirects, 404, server rules | `htaccess()` in `astro.config.mjs` (the `.htaccess` is generated at build time) |
| Colours and fonts | `src/styles/global.css` (CSS variables only) |

Commit to `main` and GitHub Actions builds and deploys over FTPS. The `staging` branch deploys to `/sc-test/`. See section 7 of the spec for the one-time cPanel and GitHub setup.

## Notes

- Fonts are self-hosted from `src/assets/fonts/` (Roboto Slab, Apache 2.0; Source Sans 3, SIL OFL). Astro bundles them so they work under both `/sc/` and `/sc-test/`.
- Crawlers only read `robots.txt` at the domain root. The `/sc/robots.txt` here is informational; to advertise the sitemap, add `Sitemap: https://imx.acm.org/sc/sitemap-index.xml` to `https://imx.acm.org/robots.txt`.
- `content-source/` holds copies of the old WordPress pages, kept for reference while reviewing the rewrite. It is git-ignored because it contains personal email addresses.
- No UI framework is used. If one is ever needed, it must be Vue (spec 5.1).

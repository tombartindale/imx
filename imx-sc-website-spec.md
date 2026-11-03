# ACM IMX Steering Committee Website: Build Specification

Target: replace the WordPress site at `https://imx.acm.org/sc/` with a static Astro site, built by GitHub Actions and deployed to a cPanel directory.

This document is the single source of truth for the rebuild. Where it says "copy from live site", fetch the text from the current page at the URL given before it is replaced.

---

## 1. Goals and principles

1. **Static, non-recent content only.** No page may name or describe a specific conference edition, "upcoming" or "current" events, or time-sensitive claims. Use evergreen wording; any date must carry its year.
2. **Do not duplicate the ACM Digital Library.** The conference series list and the Best Papers/awards list are removed, because they are represented in the ACM DL. Link to the DL instead.
3. **The latest conference is reached by one button** linking to `https://imx.acm.org` (always points at the current edition). The site never hard-codes an edition.
4. **No server-side dependencies.** Output is plain HTML/CSS (minimal or no JS) that runs on any Apache host. No WordPress, PHP, database or SSI.
5. **Easy to update.** Content lives in Markdown and small data files, edited via GitHub, deployed automatically.
6. **Short, clean URLs.** Slugs are shortened (see 2.2). Old WordPress slugs are not preserved and have no redirects; the only redirects are for the two removed pages that now live in the ACM DL (section 4).

---

## 2. Site structure

### 2.1 Persistent top bar (every page, above the header, not a page)

Slim strip, rendered once in the shared layout:

- Left: `imx-sc@imx.acm.org` (mailto link) and a "SIGCHI conferences" link (`https://sigchi.org/conferences/`). The old SIGCHI community page for IMX/TVX (`/communities/tvx`) no longer exists; SIGCHI now only lists IMX on its conferences page, which links back to `https://imx.acm.org`.
- Right: button **"Go to the latest IMX"** → `https://imx.acm.org`.
- Mobile: compact (email + button only; SIGCHI link moves to the footer). Not sticky.
- This is the only place contact details are shown. There is no Contact page. Individual people's email addresses are not published anywhere on the site.

### 2.2 Main menu

1. Home `/sc/`
2. About IMX `/sc/about/`
3. Host IMX `/sc/host/`
4. Steering Committee `/sc/committee/`
   - Join the SC `/sc/join/`
   - Student Assistant `/sc/student-assistant/`
   - Honorary Committee `/sc/honorary/`

All slugs are flat (one level) and short. The three submenu pages are shown under Steering Committee in the menu only; their URLs are not nested.

| Old WordPress slug | New slug |
|---|---|
| `/sc/call-for-hosts/` | `/sc/host/` |
| `/sc/committee/open-call-for-new-members-acm-imx-steering-committee/` | `/sc/join/` |
| `/sc/committee/open-call-student-assistant-to-the-acm-imx-steering-committee/` | `/sc/student-assistant/` |
| `/sc/committee/honorary-committee/` | `/sc/honorary/` |
| `/sc/special-issues/` | `/sc/archive/` |
| `/sc/conference-series/`, `/sc/best-papers/` | removed (see section 4) |

### 2.3 Footer

- Archive: Special Issues (`/sc/archive/`)
- ACM Digital Library: IMX proceedings and awards (`https://dl.acm.org/conference/imx/proceedings`; **confirm this is the preferred canonical DL link**)
- Accessibility statement, Privacy statement
- Copyright line with the year generated at build time
- Optional (decide later): SIGCHI conferences link on mobile. Social links (Twitter/X, Facebook) are **omitted** unless confirmed as still active and wanted.

### 2.4 Other pages

- 404 page (friendly, links to Home and the menu).
- `/sc/accessibility/` and `/sc/privacy/` (short: no cookies, no tracking, no analytics unless added later).

---

## 3. Page content

Content below is the starting copy. Keep it evergreen. Anything marked **COPY** must be taken from the live site.

### 3.1 Home

- Title: "ACM IMX Steering Committee"
- Lead paragraph:
  > ACM IMX is the leading international conference for presentation and discussion of research into interactive media experiences. The conference brings together international researchers and practitioners from a wide range of disciplines, ranging from human-computer interaction, multimedia engineering and design to media studies, media psychology and sociology.
- Short paragraph: this site is the home of the IMX Steering Committee, which provides long-term oversight of the conference.
- Three cards linking to: Host IMX, Join the Steering Committee, and ACM DL (proceedings and awards).
- A prominent copy of the "Go to the latest IMX" button.
- **Remove:** "IMX 2026 will be in Ireland in June", the old `tvx.acm.org/sc/` links, the Facebook/Twitter calls to action.

### 3.2 About IMX

Evergreen sections:

1. **What IMX is.** The leading international forum for the presentation and discussion of research in all areas related to the architecture, design, implementation, application and evaluation of interactive and immersive user experiences, both online and broadcast.
2. **History.** IMX is the evolution of the EuroITV conference on interactive TV and of ACM TVX. Its incorporation under the ACM banner, sponsored by ACM SIGCHI in cooperation with ACM SIGMM and ACM SIGWEB, extended its international reach and significance.
3. **Further reading.** Link to the write-up of the evolution of IMX within the context of SIGCHI conferences: `https://dl.acm.org/doi/10.1145/3568732`.
4. **Proceedings and awards.** One sentence plus link: proceedings of all editions, including paper awards, are in the ACM Digital Library (`https://dl.acm.org/conference/imx/proceedings`).
5. **Archive.** One sentence linking to the Special Issues archive.
6. Note: the term "online video and TV interaction" in the old Call for Hosts is outdated. Use "interactive media experiences" consistently.

### 3.3 Host IMX (`/sc/host/`)

Merge and rewrite the live Call for Hosts page. Required content:

- **Intro:** The Steering Committee welcomes proposals to host future editions of IMX. Applications are accepted on an ongoing basis. Send proposals to the Steering Committee via the address in the top bar.
- **Strategy (evergreen):** IMX is committed to growth and diversity. Bids should say how they will inject fresh thinking, diverse participation and new ideas into the IMX community, for example through collaboration with colleagues in under-represented regions, topics of interest to those communities, curated tracks or workshops, or hosting in a new region with remote participation options. **Confirm with the SC whether the Latin America emphasis in the old text should be retained, generalised, or dropped.**
- **Timing:** Conferences are typically held in June.
- **What makes a strong bid:** plans to engage local universities and the technology/media industry in the host region, and plans to help IMX improve diverse thinking.
- **Evaluation criteria:** location, venue, dates, a good start on the organising committee (and affiliations), diversity, and budget. Include plans for remote or hybrid participation and for managing disruption to registration/attendance.
- **Bidding guidelines:** link to a **self-hosted PDF** at `/sc/files/imx-bidding-guidelines.pdf`. The current guidelines are on Dropbox (`TVX_bidding_process_guidelines.pdf`); download it, check it is current, and rename it. **COPY.**
- **Decision-making:** decisions are made by the Steering Committee; applicants are encouraged to get in touch early with questions.
- **Remove:** all pandemic wording ("Prior to recent events", "recent global events"), the host-city photo gallery, the named past hosts list, and personal email addresses. Optionally keep one evergreen line: "IMX has been held across Europe, North America, Asia and South America."

### 3.4 Steering Committee (`/sc/committee/`)

- Intro: the Steering Committee provides long-term strategic oversight of IMX. Former members form the Honorary Committee (link).
- Members list, rendered from `src/data/committee.json` with an "As of {year}" note:

| Name | Affiliation | Role |
|---|---|---|
| Santosh Basapur | Institute of Design, IIT, USA | SC President |
| Debora Christina Muchaluat Saade | Universidade Federal Fluminense (UFF), Brazil | Vice President |
| Asreen Rostami | RISE, Sweden | Vice President for Conferences |
| Tom Bartindale | Northumbria University, UK | |
| Pablo Cesar | CWI, The Netherlands | |
| Teresa Chambel | University of Lisbon, Portugal | |
| Jesús Gutiérrez | GTI-UPM, Universidad Politécnica de Madrid, Spain | |

Changes from the old site: Santosh Basapur is now President (previously Vice President for Conferences); Asreen Rostami is now Vice President for Conferences; Debora Christina Muchaluat Saade is now Vice President; Tom Bartindale is no longer SC President and holds no office; Jesús Gutiérrez has been added as a member; Frank Bentley and Vinoba Vinayagamoorthy are no longer on the committee, and the Executive Vice President role is not carried over unless the SC confirms it still exists. List office-holders first (President, then the Vice Presidents), then the remaining members alphabetically by surname.

- Rules and Procedures: link to a **self-hosted PDF** `/sc/files/imx-sc-rules-and-procedures.pdf`. The live site offers a Word document; convert to PDF (or ask the SC for the latest). Describe it as establishing the SC's aims, membership, roles and responsibilities, meetings, and internal communication and decision procedures. **COPY.**

### 3.5 Join the SC (`/sc/join/`)

Carry across the live page, lightly edited. Final copy:

- **Title:** Join the Steering Committee
- The Steering Committee (SC) of the ACM International Conference on Interactive Media Experiences (IMX) welcomes expressions of interest from researchers and practitioners who would like to help shape the future direction of the conference.
- **About IMX:** as in Home lead paragraph; sponsored by ACM SIGCHI, in cooperation with SIGMM and SIGWEB; roots in EuroITV and ACM TVX.
- **Role of the SC:** guiding the overall direction and vision of the conference; supporting and mentoring General Chairs and organising committees; reviewing and approving proposals to host future editions; maintaining conference policies, procedures and quality standards; promoting the conference and growing the community internationally; liaising with ACM and its Special Interest Groups.
- **Who should apply:** people with an active connection to the IMX community and a commitment to its growth. Particularly interested in: experience publishing at or organising IMX (or predecessors TVX, EuroITV); expertise in core research areas; willingness to contribute time to meetings and tasks; perspectives that broaden diversity of the committee (geography, discipline, career stage, background). Prior senior organising experience is valued but not essential.
- **What to include (one page max):** name, affiliation and role; involvement with the IMX community; what you would bring and why you are interested; relevant conference-organisation, community-building or service experience. Send via the address in the top bar.
- **Timeline:** applications are accepted at any time; new members are normally announced at the IMX event each year.
- **Questions:** contact the SC President via the top-bar address.
- Inclusion statement: IMX is committed to building an inclusive and welcoming community; expressions of interest are encouraged from individuals of all backgrounds.

### 3.6 Student Assistant (`/sc/student-assistant/`)

**COPY from live site** (`https://imx.acm.org/sc/committee/open-call-student-assistant-to-the-acm-imx-steering-committee/`). It was not reviewed when this spec was written. Remove any dates/deadlines or time-sensitive wording, replace personal emails with the top-bar contact, and keep the structure parallel to Join the SC.

### 3.7 Honorary Committee (`/sc/honorary/`)

**COPY from live site** (`https://imx.acm.org/sc/committee/honorary-committee/`). It was not reviewed when this spec was written. Render the names from `src/data/honorary-committee.json`, and check that the page carries nothing time-sensitive.

### 3.8 Archive: Special Issues (`/sc/archive/`)

- Not in the main menu; reachable from the footer and from About IMX.
- Heading: "Archive: Special Issues". Intro note: "This page is an archive of journal special issues and edited books associated with IMX and its predecessor conferences (2007–2015). It is no longer being added to."
- Render from `src/data/special-issues.json` (see section 6). Keep indexable (no `noindex`) unless the SC decides otherwise.

---

## 4. Removed content and redirects

Removed: Conference Series page, Best Papers page, host-city gallery, "IMX 2026 in Ireland" notice, pandemic language, social plugin, WooCommerce/Storefront footer, duplicated menus.

Add to `public/.htaccess`:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Removed pages -> ACM Digital Library (confirm final DL URL)
RewriteRule ^sc/conference-series/?$ https://dl.acm.org/conference/imx/proceedings [R=301,L]
RewriteRule ^sc/best-papers/?$       https://dl.acm.org/conference/imx/proceedings [R=301,L]

# Old WordPress slugs are intentionally NOT redirected (they now return the 404 page).

ErrorDocument 404 /sc/404.html
```

Note: if `.htaccess` is deployed into `public_html/sc/` rather than `public_html/`, remove the `sc/` prefix from the rules (Apache matches relative to the directory). Test both before going live.

---

## 5. Technical specification

### 5.1 Stack

- **Astro** (latest stable), static output. Default to plain `.astro` components with no UI framework and no client-side JS (a mobile menu toggle may use a small inline script or a CSS-only approach).
- **If a UI framework is needed, use Vue, never React.** This applies to any interactive component that cannot reasonably be done with plain `.astro`, CSS or a small script. Do not install or import `react`, `react-dom`, `@astrojs/react`, Preact or any other framework.
  - Add Vue with `npx astro add vue` (the `@astrojs/vue` integration) only when a component actually needs it, and write components as Vue 3 single-file components (`.vue`) using `<script setup>` and the Composition API.
  - Keep Vue islands small and hydrate them only where required (for example `client:visible` or `client:idle`); pages and layouts stay as `.astro` files. The site must still work for the core content with JavaScript disabled.
  - Any dependency a component pulls in must be Vue-compatible and must not add third-party network requests (see 5.4).
  - If no component needs a framework, `@astrojs/vue` is not installed at all.
- Content in Markdown/MDX plus JSON data files. TypeScript optional.
- Node 22 LTS in CI.

### 5.2 `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://imx.acm.org',
  // '/sc' for live; staging builds set BASE_PATH=/sc-test in the workflow
  base: process.env.BASE_PATH || '/sc',
  trailingSlash: 'always',
  output: 'static',
});
```

### 5.3 Suggested repository layout

```
.
├── .github/workflows/deploy.yml
├── astro.config.mjs
├── package.json
├── brand/                          # brand pack (source files) and BRAND.md summary
├── public/
│   ├── .htaccess
│   ├── robots.txt
│   ├── favicon.*
│   ├── files/                      # self-hosted PDFs
│   │   ├── imx-bidding-guidelines.pdf
│   │   └── imx-sc-rules-and-procedures.pdf
│   ├── fonts/                      # self-hosted WOFF2 fonts from the brand pack
│   └── images/                     # logos and site images from the brand pack
└── src/
    ├── layouts/BaseLayout.astro    # top bar, header, menu, footer, <head>
    ├── components/
    │   ├── TopBar.astro
    │   ├── MainNav.astro
    │   └── Footer.astro
    ├── data/
    │   ├── site.json               # contact email, latest-IMX URL, DL URL, SIGCHI URL
    │   ├── committee.json
    │   ├── honorary-committee.json
    │   └── special-issues.json
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro
    │   ├── host.astro
    │   ├── committee.astro
    │   ├── join.astro
    │   ├── student-assistant.astro
    │   ├── honorary.astro
    │   ├── archive.astro
    │   ├── accessibility.astro
    │   ├── privacy.astro
    │   └── 404.astro
    └── styles/global.css
```

All reusable URLs and the contact address are read from `src/data/site.json` so each is changed in one place:

```json
{
  "contactEmail": "imx-sc@imx.acm.org",
  "latestImxUrl": "https://imx.acm.org",
  "acmDlUrl": "https://dl.acm.org/conference/imx/proceedings",
  "sigchiUrl": "https://sigchi.org/conferences/"
}
```

### 5.4 Design and quality requirements

- Responsive, mobile-first; no horizontal scroll; readable measure (~70 characters).
- Accessible: semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus states, WCAG AA contrast, alt text on all images, logical heading order, tables with proper headers.
- Visual design follows the brand pack (section 5.5). Until the pack is in the repo, the existing logos on the live site (`https://imx.acm.org/sc/wp-content/uploads/2020/07/`) can be used as placeholders:
  - `Logo_IMX_L2.jpg` (1000×521): **flat logo**, circles mark plus gradient "imx" wordmark. Default header logo.
  - `Logo_IMX_L1.jpg` (2500×729): flat logo with the "ACM International Conference on Interactive Media Experiences" lockup. Possible wide header or footer use.
  - `Logo_IMX_L0.jpg` (4000×2250): **3D logo** on a pink-to-blue gradient background. Hero or Open Graph image only, not the header.
  - All three are JPEGs on white or a coloured background (no transparency). Request SVG/PNG versions for the brand pack.
- Each page has a unique `<title>`, meta description, canonical URL and Open Graph basics.
- Generate `sitemap.xml` (use `@astrojs/sitemap`) and a `robots.txt` that references it.
- No third-party requests (fonts, analytics, widgets) so the privacy statement can say "no cookies or tracking". Self-host any fonts.
- External links open normally (no forced new tabs); all external links use `https` where available.
- The email address is a plain `mailto:` link. If spam becomes a problem, obfuscate it via build-time script.

### 5.5 Brand and visual design

The IMX brand pack is the authority for how the site looks. **Where the brand pack and this spec conflict on logos, colours, typography or visual styling, the brand pack wins.** Where they conflict on accessibility, privacy or technical constraints, this spec wins.

**Using the pack**
1. The original pack is stored in `brand/` and not edited. Files the site uses are copied or exported into `public/images/` (logos, images) and `public/fonts/` (fonts).
2. Read `brand/BRAND.md` first. It summarises the essentials: hex colours and their roles, font names and weights, logo variants and where each file lives, clear-space and minimum-size rules, and tone of voice. If it is missing or incomplete, read the pack directly and write the summary before building templates.
3. Define the brand once as CSS custom properties in `src/styles/global.css` (for example `--color-primary`, `--color-text`, `--color-bg`, `--font-body`, `--font-heading`) and use only those variables in components. Changing the brand then means editing one file.

**Logos**
- Prefer SVG, with PNG fallbacks. Use the light or dark variant as appropriate to the background.
- Respect the pack's clear-space and minimum-size rules. Do not recolour, stretch or add effects to the logo.
- Provide a favicon set and an Open Graph image (about 1200×630) from the pack's logo or mark.
- Every logo image has meaningful alt text ("ACM IMX"); the header logo links to the site home page.

**Fonts**
- Self-host as WOFF2 in `public/fonts/` and load with `@font-face` and `font-display: swap`. No Google Fonts, Adobe Fonts or other third-party font requests (see 5.4).
- Check the licence permits web embedding and self-hosting. If it does not, use the nearest system or open-licensed substitute and record the substitution in `BRAND.md`.
- Define a full fallback stack for every font family.

**Colour and accessibility**
- Text and interactive elements must meet WCAG AA contrast (4.5:1 for body text, 3:1 for large text and UI components) against their backgrounds.
- If a brand colour fails as a text colour, use it for decoration only (backgrounds, borders, large headings that pass at 3:1) and derive a darker or lighter shade for text and links. Record the derived values in `BRAND.md` and `global.css`.
- Links must be distinguishable by more than colour alone (for example underline), and focus states must be clearly visible.
- Provide a dark-mode variant only if the brand pack defines one; otherwise light only.

**Repo and licensing**
- If the GitHub repository is public, everything committed is public. Before committing, confirm that the logos, fonts and any guidelines PDF in `brand/` may be published. Anything internal-only or restricted stays out of the repo (list such files in `.gitignore`) and is referenced from `BRAND.md` instead.

### 5.6 Acceptance checklist

- [ ] Top bar with contact, SIGCHI link and "Go to the latest IMX" button appears on every page including the 404 page.
- [ ] No page mentions a specific conference edition as upcoming or current.
- [ ] No Conference Series or Best Papers page exists; both URLs redirect to the ACM DL.
- [ ] Special Issues is reachable from the footer and About IMX, but not from the main menu, and is labelled as an archive.
- [ ] All links return 200/301 (run a link checker in CI or manually before launch).
- [ ] No personal email addresses; only the role address.
- [ ] PDFs are self-hosted in `/sc/files/`.
- [ ] Lighthouse accessibility score ≥ 95 on every page.
- [ ] Logos, colours and fonts match the brand pack; all brand values come from CSS variables in `global.css`.
- [ ] Fonts are self-hosted with no third-party font requests, and licences allow it.
- [ ] Brand colours used for text pass WCAG AA contrast; any derived shades are recorded in `BRAND.md`.
- [ ] Nothing in `brand/` that is restricted or internal-only is committed to a public repository.
- [ ] Builds cleanly with `npm ci && npm run build`.
- [ ] No React, Preact or other non-Vue UI framework appears in `package.json` or in imports; if a framework is used, it is Vue only.

---

## 6. Data files

### 6.1 `src/data/special-issues.json`

Seed with this list (newest first). Links are the live-site URLs upgraded to `https` with old `CFID`/`CFTOKEN` session tokens removed. **Verify each link resolves; fall back to a DOI or publisher page, or drop the link and keep the citation text, if it is dead.**

```json
[
  { "venue": "Personal and Ubiquitous Computing", "title": "Interactive Experiences for Television and Online Video", "date": "August 2015", "url": "https://link.springer.com/article/10.1007/s00779-015-0858-8" },
  { "venue": "Multimedia Tools and Applications", "title": "Advances in tools, techniques and practices for multimedia QoE", "date": "August 2014", "url": "https://link.springer.com/article/10.1007/s11042-014-2203-z" },
  { "venue": "Behaviour & Information Technology", "title": "Thinking beyond the Box: Designing Interactive TV across Different Devices", "date": "July 2014", "url": "https://www.tandfonline.com/toc/tbit20/33/8" },
  { "venue": "Multimedia Systems Journal", "title": "Social Recommendation and Delivery Systems for Video and TV Content", "date": "October 2013", "url": "https://link.springer.com/article/10.1007/s00530-013-0345-x" },
  { "venue": "Telematics and Informatics", "title": "Television in a digital era – Usage and policy issues", "date": "November 2011", "url": "https://www.sciencedirect.com/science/journal/07365853/28/4" },
  { "venue": "Multimedia Systems Journal", "title": "Networked Television", "date": "February 2011", "url": "https://link.springer.com/journal/530/17/1/page/1" },
  { "venue": "Entertainment Computing", "title": "User experiences in the new TV landscape", "date": "2011", "url": "https://www.sciencedirect.com/science/journal/18759521/2/3" },
  { "venue": "ACM Computers in Entertainment", "title": "TV and video entertainment environments", "date": "September 2009", "url": "https://dl.acm.org/citation.cfm?id=1594943" },
  { "venue": "Multimedia Systems Journal", "title": "Personal Interactive (TV) Environments", "date": "July 2009", "url": "https://link.springer.com/journal/530/15/3/page/1" },
  { "venue": "IGI Global (book)", "title": "Social Interactive Television: Immersive Shared Experiences and Perspectives", "date": "May 2009", "url": "https://www.igi-global.com/book/social-interactive-television/916" },
  { "venue": "ACM Transactions on Multimedia Computing, Communications, and Applications", "title": "Human-Centered Television", "date": "October 2008", "url": "https://dl.acm.org/citation.cfm?id=1412196" },
  { "venue": "Multimedia Systems Journal", "title": "Multimedia Systems, Languages, and Infrastructures for Interactive Television", "date": "July 2008", "url": "https://link.springer.com/journal/530/14/2/" },
  { "venue": "International Journal of Human-Computer Interaction", "title": "Enhancing the Shared Experience with Interactive TV", "date": "February 2008", "url": "https://www.tandfonline.com/toc/hihc20/24/2" },
  { "venue": "Multimedia Tools and Applications", "title": "Personalized and Mobile Digital TV Applications", "date": "January 2008", "url": "https://link.springer.com/journal/11042/36/1/page/1" },
  { "venue": "ACM Computers in Entertainment", "title": "Social Television and User Interaction", "date": "January 2008", "url": "https://dl.acm.org/citation.cfm?doid=1350843.1350847" },
  { "venue": "Journal of Virtual Reality and Broadcasting", "title": "Methods and Applications in Interactive Broadcasting", "date": "July 2007", "url": "https://www.jvrb.org/past-issues/4.2007/1093" },
  { "venue": "IGI Global (book)", "title": "Interactive Digital Television: Technologies and Applications", "date": "May 2007", "url": "https://www.igi-global.com/book/interactive-digital-television/640" },
  { "venue": "ACM Computers in Entertainment", "title": "Interactive TV", "date": "April/June 2007", "url": "https://dl.acm.org/citation.cfm?id=1279540" }
]
```

### 6.2 `src/data/committee.json`

Structure: `{ "asOf": 2026, "members": [{ "name": "", "affiliation": "", "role": "" }] }`, seeded from the table in section 3.4. Update `asOf` whenever the list is reviewed.

### 6.3 `src/data/honorary-committee.json`

Structure: `[{ "name": "", "affiliation": "" }]`, seeded by copying the live Honorary Committee page.

---

## 7. Build, deploy and hosting

### 7.1 Hosting target

- cPanel shared hosting. The site is served from a subfolder: `public_html/sc/`, giving `https://imx.acm.org/sc/`.
- **Back up the existing WordPress site first** (full files and a database export) before the first live deploy, and keep it for rollback.

### 7.2 Deployment: GitHub Actions pushes the built site over FTPS (decided: Option A)

SSH/rsync and cPanel Git pull are **not** used.

**One-time cPanel setup**

1. Create **two FTP accounts** (cPanel → FTP Accounts), each with its home directory scoped to a single folder so a leaked credential cannot touch anything else:
   - staging: `public_html/sc-test`
   - live: `public_html/sc`
2. Note the FTP hostname and port shown under "Configure FTP Client" (normally port 21, explicit FTPS). Use the hostname that matches the host's TLS certificate. If the deploy fails with a certificate or hostname error, either use the cert-matching hostname or set `security: loose` in the action (acceptable for this low-risk site, but prefer a matching hostname).
3. Make sure `public_html/sc-test` exists and is reachable at a staging URL (for example `https://imx.acm.org/sc-test/`). Add a `noindex` meta tag or `Header set X-Robots-Tag "noindex"` to the staging copy only (see 7.2.3).

**GitHub setup**

1. Create two GitHub **Environments** (Settings → Environments): `staging` and `production`.
2. In each environment, add two **variables** (`FTP_SERVER`, `FTP_USERNAME`) and one **secret** (`FTP_PASSWORD`), with different values per environment. The workflow reads `vars.FTP_SERVER`, `vars.FTP_USERNAME` and `secrets.FTP_PASSWORD`.
3. On `production`, enable **required reviewers** (optional but recommended) and restrict it to the `main` branch.
4. Protect `main` (pull request required).

**Workflow: `.github/workflows/deploy.yml`**

```yaml
name: Deploy
on:
  push:
    branches: [main, staging]
  workflow_dispatch:

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    # main -> production (live), staging branch -> staging
    environment: ${{ github.ref_name == 'main' && 'production' || 'staging' }}
    concurrency:
      group: deploy-${{ github.ref_name }}
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: ${{ github.ref_name == 'main' && '/sc' || '/sc-test' }}
          PUBLIC_ENV: ${{ github.ref_name == 'main' && 'production' || 'staging' }}
      - name: Check internal links
        run: npx --yes linkinator ./dist --recurse --skip "^https?://"
      - uses: SamKirkland/FTP-Deploy-Action@v4.3.5
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          local-dir: ./dist/
          server-dir: /
          # security: loose   # only if the TLS certificate hostname cannot be matched
```

Notes:
- `server-dir: /` is relative to each FTP account's home, so the same workflow targets `sc-test` or `sc` depending on the environment's credentials.
- The action keeps a state file (`.ftp-deploy-sync-state.json`) in the target folder, uploads only changed files, and deletes files removed from the repo.
- Do **not** enable `dangerous-clean-slate`.
- Pin the action to a version (as above) and review upgrades rather than using `@latest`.

**7.2.3 Hide the state file and keep staging out of search**

Add to `public/.htaccess`:

```apache
# Never serve the FTP deploy state file
<Files ".ftp-deploy-sync-state.json">
  Require all denied
</Files>
```

For staging only, the build should emit `<meta name="robots" content="noindex">` and a `robots.txt` that disallows all. Drive this from the `PUBLIC_ENV` variable set in the workflow build step, and have the base layout read it (`import.meta.env.PUBLIC_ENV`). Absolute internal links in templates must be built from `import.meta.env.BASE_URL` so staging works under `/sc-test/`.

**First live deploy (WordPress cut-over)**

1. Take a full **backup of the WordPress site** (files and database export) and store it off the server.
2. Deploy to **staging** and check: every page, redirects, PDFs, mobile layout, link checker, accessibility.
3. In cPanel File Manager, **clear the old WordPress files from `public_html/sc`** (wp-admin, wp-content, wp-includes, wp-config.php, index.php, and so on). The Action only adds and removes files it knows about, so leftover WordPress files would otherwise stay public. Keep the downloaded backup.
4. Merge to `main`; the production job deploys the site, including the new `.htaccess` (which replaces WordPress's).
5. Verify the live site and redirects. Remove the WordPress database later, once you are sure you do not need the rollback.

### 7.3 Safeguards

- `main` is the live site: require pull request review, and optionally required reviewers on the `production` environment.
- Credentials live only in GitHub environment secrets, never in the repo.
- FTP accounts are scoped to their own folder only.
- Rollback: `git revert` on `main` triggers a redeploy of the previous version (and a full redeploy of the WordPress backup is the last resort).
- External links are checked separately (for example with `lychee`) before launch, since the old Special Issues links may be dead.

### 7.4 How to update content after launch

| Change | Where |
|---|---|
| Committee membership | `src/data/committee.json` (and `asOf`) |
| Honorary committee | `src/data/honorary-committee.json` |
| Contact address or key URLs | `src/data/site.json` |
| Page text | the relevant file in `src/pages/` |
| Replace a PDF | `public/files/` (same filename) |
| New or changed redirect | `public/.htaccess` |

Edit directly in GitHub's web editor or locally in VS Code, then commit to `main`. The Action builds and deploys in about a minute. Optionally add Decap CMS or Pages CMS later if non-technical members need a form-based editor.

---

## 8. Open items to confirm before launch

1. The canonical **ACM DL link** for IMX proceedings and awards.
2. Whether the **Latin America / diversity emphasis** on Host IMX is retained, generalised or removed.
3. Whether to keep any **social links** (Twitter/X, Facebook) in the footer.
4. Whether `https://sigchi.org/conferences/` is the right SIGCHI link (alternative: the SIGCHI home page `https://sigchi.org/`), or whether to drop the SIGCHI link from the top bar and mention SIGCHI only in the About text.
5. Latest versions of the **bidding guidelines** and **Rules and Procedures**, supplied as PDFs.
6. Content of the **Student Assistant** and **Honorary Committee** pages (copy and de-date).
7. Confirmed **committee list** and role titles at launch, including whether the Executive Vice President role still exists or has been replaced, and whether Frank Bentley and Vinoba Vinayagamoorthy should be added to the Honorary Committee (the old site says former members form it).
8. The **FTP hostname, port and TLS certificate** details from cPanel, and whether a staging URL (`/sc-test/`) is reachable.
9. Whether to keep the Special Issues archive **indexable by search engines**.
10. The **brand pack** contents and licences: logo formats and variants, whether fonts may be self-hosted, whether a dark-mode variant exists, and whether the repo will be public or private.

import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// '/sc' for live; staging builds set BASE_PATH=/sc-test in the workflow
const base = process.env.BASE_PATH || '/sc';
const isStaging = process.env.PUBLIC_ENV === 'staging';
const dlUrl = 'https://dl.acm.org/conference/imx/proceedings';

// .htaccess is generated at build time so the 404 path and staging
// headers match the base path. It is deployed into public_html/sc/ (or
// sc-test/), so rewrite patterns are relative to that folder.
function htaccess() {
  return {
    name: 'imx-htaccess',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const lines = [
          '# Generated at build time by astro.config.mjs. Do not edit in dist/.',
          '',
          '# Serve the static index.html first, even if a stray index.php exists',
          'DirectoryIndex index.html',
          '',
          'RewriteEngine On',
          '',
          '# Force HTTPS',
          'RewriteCond %{HTTPS} !=on',
          'RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]',
          '',
          '# Old Conference Series page -> Past conferences; removed Best Papers page -> ACM Digital Library',
          `RewriteRule ^conference-series/?$ ${base}/history/ [R=301,L]`,
          `RewriteRule ^best-papers/?$ ${dlUrl} [R=301,L]`,
          '',
          '# Old WordPress slugs are intentionally NOT redirected (they return the 404 page).',
          `ErrorDocument 404 ${base}/404.html`,
          '',
          '# Never serve the FTP deploy state file',
          '<Files ".ftp-deploy-sync-state.json">',
          '  Require all denied',
          '</Files>',
          '',
        ];
        if (isStaging) {
          lines.push(
            '# Staging only: keep out of search engines',
            '<IfModule mod_headers.c>',
            '  Header set X-Robots-Tag "noindex, nofollow"',
            '</IfModule>',
            '',
          );
        }
        await writeFile(new URL('.htaccess', dir), lines.join('\n'));
        console.log(`[imx-htaccess] wrote ${fileURLToPath(new URL('.htaccess', dir))}`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://imx.acm.org',
  base,
  trailingSlash: 'always',
  output: 'static',
  // Keep source whitespace so text wrapped next to inline links keeps its spaces.
  compressHTML: false,
  build: { format: 'directory' },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
    htaccess(),
  ],
});

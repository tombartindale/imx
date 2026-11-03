import type { APIRoute } from 'astro';

// Note: crawlers only read robots.txt at the domain root (imx.acm.org/robots.txt).
// This copy at /sc/robots.txt documents intent; see README for the root file.
export const GET: APIRoute = ({ site }) => {
  const isStaging = import.meta.env.PUBLIC_ENV === 'staging';
  const body = isStaging
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/?$/, '/')}sitemap-index.xml`, site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

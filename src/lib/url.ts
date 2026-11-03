// Build an internal URL under the configured base path ('/sc/' live, '/sc-test/' staging).
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export function url(path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return base + clean;
}

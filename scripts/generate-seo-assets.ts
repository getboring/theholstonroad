import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
	STATIC_SITEMAP_ENTRIES,
	SITE_URL,
	getCanonicalUrl,
} from '../src/lib/seo'

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const publicDir = join(rootDir, 'public')

// These files are generated on every build from src/lib/seo.ts. Edit the central SEO config, not
// the files in public/, if the canonical domain or static crawlable routes change.
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_SITEMAP_ENTRIES.map(
	(entry) => `  <url>
    <loc>${getCanonicalUrl(entry.path)}</loc>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`

const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${getCanonicalUrl('/sitemap.xml')}
`

await mkdir(publicDir, { recursive: true })
await writeFile(join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')
await writeFile(join(publicDir, 'robots.txt'), robotsTxt, 'utf8')

console.log(`Generated SEO assets for ${SITE_URL}`)

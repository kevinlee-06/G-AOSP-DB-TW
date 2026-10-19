import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const appsDirectory = join(root, 'apps')
const outputDirectory = join(root, 'dist')
const outputPath = join(outputDirectory, 'sitemap.xml')
const robotsPath = join(outputDirectory, 'robots.txt')
const siteUrl = (process.env.VITE_SITE_URL || 'https://graphene-db.pages.dev').replace(/\/$/, '')

const appFiles = (await readdir(appsDirectory))
  .filter((file) => file.endsWith('.json'))
  .sort()

const urls = [
  `${siteUrl}/`,
  `${siteUrl}/about`,
  ...appFiles.map((file) => `${siteUrl}/apps/${file.slice(0, -'.json'.length)}`),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`

await mkdir(outputDirectory, { recursive: true })
await writeFile(outputPath, sitemap)
await writeFile(robotsPath, `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`)

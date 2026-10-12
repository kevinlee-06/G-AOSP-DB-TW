import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { glob } from 'node:fs/promises'

const appsDirectory = new URL('../apps/', import.meta.url)
const iconsDirectory = new URL('../public/icons/', import.meta.url)

const extensions = {
  'image/avif': 'avif',
  'image/gif': 'gif',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/svg+xml': 'svg',
  'image/webp': 'webp',
}

function getMetaContent(html, property) {
  const escapedProperty = property.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = html.match(
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escapedProperty}["'][^>]+content=["']([^"']+)["']`,
      'i',
    ),
  )

  return match?.[1]?.replace(/&amp;/g, '&').replace(/&#x2F;/g, '/') ?? null
}

function getImageExtension(response) {
  const contentType = response.headers.get('content-type')?.split(';')[0].trim()
  return extensions[contentType] ?? null
}

async function fetchIcon(packageName) {
  const playUrl = `https://play.google.com/store/apps/details?id=${encodeURIComponent(packageName)}&hl=zh_TW`
  const pageResponse = await fetch(playUrl, {
    headers: {
      'user-agent': 'G-AOSP-DB-TW icon fetcher',
    },
  })

  if (!pageResponse.ok) {
    throw new Error(`Google Play page returned ${pageResponse.status}`)
  }

  const html = await pageResponse.text()
  const imageUrl = getMetaContent(html, 'og:image') ?? getMetaContent(html, 'image')

  if (!imageUrl) {
    throw new Error('No app image metadata found')
  }

  const imageResponse = await fetch(imageUrl)
  if (!imageResponse.ok) {
    throw new Error(`App image returned ${imageResponse.status}`)
  }

  const extension = getImageExtension(imageResponse)
  if (!extension) {
    throw new Error('App image has an unsupported content type')
  }

  const image = Buffer.from(await imageResponse.arrayBuffer())
  await writeFile(new URL(`${packageName}.${extension}`, iconsDirectory), image)
  return extension
}

await mkdir(iconsDirectory, { recursive: true })

for await (const entry of glob('*.json', { cwd: appsDirectory })) {
  if (basename(entry) === 'README.json') continue

  const file = await readFile(new URL(entry, appsDirectory), 'utf8')
  const app = JSON.parse(file)

  try {
    const extension = await fetchIcon(app.packageName)
    console.log(`Fetched icon for ${app.packageName} (.${extension})`)
  } catch (error) {
    console.warn(`Could not fetch icon for ${app.packageName}: ${error.message}`)
  }
}

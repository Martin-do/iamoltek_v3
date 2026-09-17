/**
 * Runs after `vite build` (see package.json). For every page in src/seo/pageMeta.js it:
 *   1. renders a 1200x630 share-preview image into dist/og/
 *   2. writes a copy of index.html with that page's <title>, description, Open Graph,
 *      Twitter and JSON-LD tags (dist/about.html, dist/initiative/impact/....html)
 *   3. writes dist/robots.txt and dist/sitemap.xml
 *
 * Link-preview crawlers (WhatsApp, Facebook, LinkedIn, X) don't run JavaScript, so they
 * only see these pre-rendered tags. public/.htaccess maps /about -> /about.html.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const W = 1200
const H = 630

const escapeHtml = value => String(value)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Imported images come back from Vite's SSR loader as root-relative URLs (/src/assets/x.jpg)
const sourceFile = url => path.join(root, decodeURIComponent(url.split('?')[0]))

async function renderOg(og, outFile) {
  const src = sourceFile(og.src)
  let image

  if (og.template === 'photo') {
    image = sharp(src).resize(W, H, { fit: 'cover', position: sharp.strategy.attention })
  } else if (og.template === 'logo') {
    // Sample the logo's own corner so the extended background is seamless
    const { data } = await sharp(src).extract({ left: 4, top: 4, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true })
    const background = { r: data[0], g: data[1], b: data[2] }
    const logo = await sharp(src).resize(H, H, { fit: 'contain', background }).toBuffer()
    image = sharp({ create: { width: W, height: H, channels: 3, background } })
      .composite([{ input: logo, left: Math.round((W - H) / 2), top: 0 }])
  } else {
    // portrait: dark card, site logo on the left, photo on the right with a soft edge
    const bg = { r: 13, g: 11, b: 10 }
    const photo = await sharp(src).resize({ height: H }).toBuffer({ resolveWithObject: true })
    const photoLeft = W - photo.info.width
    const fade = Buffer.from(
      `<svg width="220" height="${H}"><defs><linearGradient id="g"><stop offset="0" stop-color="rgb(13,11,10)" stop-opacity="1"/><stop offset="1" stop-color="rgb(13,11,10)" stop-opacity="0"/></linearGradient></defs><rect width="220" height="${H}" fill="url(#g)"/></svg>`
    )
    const logoWidth = Math.min(360, photoLeft - 160)
    const trimmedLogo = await sharp(path.join(root, 'src/assets/logo-white.png')).trim().toBuffer()
    const logo = await sharp(trimmedLogo).resize({ width: logoWidth }).toBuffer({ resolveWithObject: true })
    const logoLeft = Math.round((photoLeft - logo.info.width) / 2)
    const logoTop = Math.round((H - logo.info.height) / 2) - 14
    const rule = Buffer.from(`<svg width="90" height="2"><rect width="90" height="2" fill="#C4973F"/></svg>`)
    const ruleLeft = Math.round((photoLeft - 90) / 2)
    image = sharp({ create: { width: W, height: H, channels: 3, background: bg } }).composite([
      { input: photo.data, left: photoLeft, top: 0 },
      { input: fade, left: photoLeft, top: 0 },
      { input: logo.data, left: logoLeft, top: logoTop },
      { input: rule, left: ruleLeft, top: logoTop + logo.info.height + 28 },
    ])
  }

  await image.jpeg({ quality: 82, mozjpeg: true }).toFile(outFile)
}

function headTags(page, { SITE_URL, SITE_NAME, ogImagePath }) {
  const url = `${SITE_URL}${page.path === '/' ? '/' : page.path}`
  const image = `${SITE_URL}${ogImagePath(page.path)}`
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${page.type || 'website'}" />`,
    `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_NG" />`,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${W}" />`,
    `<meta property="og:image:height" content="${H}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(page.og.alt || page.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]
  if (page.jsonLd) {
    const data = JSON.stringify({ '@context': 'https://schema.org', ...page.jsonLd }).replace(/</g, '\\u003c')
    tags.push(`<script type="application/ld+json">${data}</script>`)
  }
  return tags.map(tag => `    ${tag}`).join('\n')
}

const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})

try {
  const seo = await vite.ssrLoadModule('/src/seo/pageMeta.js')
  const pages = seo.getAllPages()
  const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
  const marker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/
  if (!marker.test(template)) throw new Error('index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers')

  const seen = new Set()
  await fs.mkdir(path.join(dist, 'og'), { recursive: true })

  for (const page of pages) {
    if (seen.has(page.path)) throw new Error(`Duplicate page path in pageMeta.js: ${page.path}`)
    seen.add(page.path)
    for (const field of ['title', 'description']) {
      if (!page[field]) throw new Error(`${page.path} is missing a ${field}`)
    }

    await renderOg(page.og, path.join(dist, seo.ogImagePath(page.path)))

    const html = template.replace(marker, `<!-- seo:start -->\n${headTags(page, seo)}\n    <!-- seo:end -->`)
    const outFile = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, `${page.path.slice(1)}.html`)
    await fs.mkdir(path.dirname(outFile), { recursive: true })
    await fs.writeFile(outFile, html)
  }

  const today = new Date().toISOString().slice(0, 10)
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(page => `  <url><loc>${seo.SITE_URL}${page.path === '/' ? '/' : page.path}</loc><lastmod>${today}</lastmod></url>`),
    '</urlset>',
    '',
  ].join('\n')
  await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)
  await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${seo.SITE_URL}/sitemap.xml\n`)

  console.log(`SEO: pre-rendered ${pages.length} pages, preview images, sitemap.xml and robots.txt`)
} finally {
  await vite.close()
}

/**
 * Checks everything in content/posts before a build, so a typo is caught on
 * your machine (or in the GitHub check) instead of on the live site.
 *
 *   npm run validate      run by hand
 *   npm run build         runs automatically first
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = path.join(root, 'content', 'posts')
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp']
const errors = []
const warnings = []
const seen = new Map()

function fail(folder, message) { errors.push(`${folder}: ${message}`) }

const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date())
const counts = { live: 0, scheduled: [], draft: 0 }

const folders = fs.existsSync(postsDir)
  ? fs.readdirSync(postsDir, { withFileTypes: true }).filter(e => e.isDirectory() && !e.name.startsWith('_'))
  : []

for (const entry of folders) {
  const folder = entry.name
  const dir = path.join(postsDir, folder)

  const number = Number(folder.match(/^post-(\d+)$/)?.[1])
  if (!number) { fail(folder, 'folder must be named post-NN (for example post-21)'); continue }
  if (seen.has(number)) fail(folder, `same number as ${seen.get(number)}`)
  seen.set(number, folder)

  const files = fs.readdirSync(dir)
  const images = files.filter(f => /^image\./i.test(f) && IMAGE_EXT.includes(path.extname(f).toLowerCase()))
  if (!files.includes('post.md')) { fail(folder, 'missing post.md'); continue }
  if (images.length === 0) fail(folder, 'missing image (add image.jpg, image.png or image.webp)')
  if (images.length > 1) fail(folder, `more than one image file (${images.join(', ')}); keep only one`)
  else if (images.length === 1) {
    const mb = fs.statSync(path.join(dir, images[0])).size / 1024 / 1024
    if (mb > 12) warnings.push(`${folder}: ${images[0]} is ${mb.toFixed(1)} MB. It is resized automatically, but a smaller original builds faster`)
  }

  const raw = fs.readFileSync(path.join(dir, 'post.md'), 'utf8').replace(/\r\n/g, '\n')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) { fail(folder, 'post.md must start with a --- settings block (see content/README.md)'); continue }

  const meta = {}
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':')
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim()
  }

  const known = ['series', 'publishAt', 'draft']
  for (const key of Object.keys(meta)) if (!known.includes(key)) fail(folder, `unknown setting "${key}" (allowed: ${known.join(', ')})`)
  if (!meta.series) fail(folder, 'series is required, e.g. series: Forward & Unstoppable')
  if (meta.draft && !['true', 'false'].includes(meta.draft)) fail(folder, 'draft must be true or false')
  if (meta.publishAt) {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(meta.publishAt) && !Number.isNaN(Date.parse(meta.publishAt))
    if (!valid) fail(folder, `publishAt must be a real date written YYYY-MM-DD (got "${meta.publishAt}")`)
  }
  if (match[2].split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).length === 0) fail(folder, 'the post has no text below the settings block')
  if (/\u2014/.test(match[2])) warnings.push(`${folder}: contains an em dash (\u2014); the site style avoids them`)

  if (meta.draft === 'true') counts.draft++
  else if (meta.publishAt && meta.publishAt > today) counts.scheduled.push(`${folder} on ${meta.publishAt}`)
  else counts.live++
}

if (warnings.length) console.warn('\nContent warnings:\n' + warnings.map(w => '  - ' + w).join('\n'))

if (errors.length) {
  console.error('\nContent check failed:\n' + errors.map(e => '  x ' + e).join('\n') + '\n')
  process.exit(1)
}

console.log(
  `Content OK: ${folders.length} posts (${counts.live} live` +
  (counts.scheduled.length ? `, ${counts.scheduled.length} scheduled: ${counts.scheduled.join('; ')}` : '') +
  (counts.draft ? `, ${counts.draft} draft` : '') + ')'
)

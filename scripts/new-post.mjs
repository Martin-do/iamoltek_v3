/**
 * Creates the next post folder so you only have to fill in the text.
 *
 *   npm run new-post -- "Forward & Unstoppable"
 *   npm run new-post -- "Forward & Unstoppable" 2026-10-02 "C:\path\to\poster.jpg"
 *
 * Arguments: series name, optional publish date (YYYY-MM-DD), optional image to copy in.
 * The post starts as a draft; delete the "draft: true" line when it is ready.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const postsDir = path.join(root, 'content', 'posts')
const [series, publishAt, imagePath] = process.argv.slice(2)

if (!series) {
  console.error('Usage: npm run new-post -- "Series name" [YYYY-MM-DD] [path/to/image.jpg]')
  process.exit(1)
}
if (publishAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishAt)) {
  console.error(`The date must look like 2026-10-02 (got "${publishAt}")`)
  process.exit(1)
}

fs.mkdirSync(postsDir, { recursive: true })
const numbers = fs.readdirSync(postsDir).map(n => Number(n.match(/^post-(\d+)$/)?.[1])).filter(Boolean)
const next = (numbers.length ? Math.max(...numbers) : 0) + 1
const dir = path.join(postsDir, `post-${String(next).padStart(2, '0')}`)
fs.mkdirSync(dir)

const front = ['---', `series: ${series}`]
if (publishAt) front.push(`publishAt: ${publishAt}`)
front.push('draft: true', '---', '')
fs.writeFileSync(
  path.join(dir, 'post.md'),
  front.join('\n') +
  '\nFirst paragraph.\n\nSecond paragraph.\n\n\u201cThe quote goes in its own paragraph.\u201d\n\n#Hashtags #GoAtTheEnd\n'
)

if (imagePath) {
  const ext = path.extname(imagePath).toLowerCase()
  fs.copyFileSync(imagePath, path.join(dir, `image${ext}`))
}

const rel = path.relative(root, dir)
console.log(`Created ${rel}`)
console.log(`  1. Write the text in ${path.join(rel, 'post.md')}`)
if (!imagePath) console.log(`  2. Put the poster in ${rel} named image.jpg (or .png / .webp)`)
console.log('  Then remove the "draft: true" line to publish it (or keep publishAt to schedule it).')

/**
 * Daily reflection posts, loaded from content/posts/<post-NN>/.
 *
 *   content/posts/post-18/post.md     text + a few settings (see content/README.md)
 *   content/posts/post-18/image.jpg   the poster (optimised automatically)
 *
 * Adding a post never means editing code: drop in a folder and it appears.
 * A post is shown when it is not a draft and its publishAt date (Lagos time)
 * has arrived, so a week of posts can be queued and each goes live on its day
 * without a rebuild or a server.
 */
const sources = import.meta.glob('/content/posts/*/post.md', { query: '?raw', import: 'default', eager: true })
const images = import.meta.glob('/content/posts/*/image.{jpg,jpeg,png,webp}', { query: '?optimised', import: 'default', eager: true })

/** "Yyyy-mm-dd" for the current day in Nigeria, whatever the visitor's own timezone is. */
export function todayInLagos(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(now)
}

function parse(sourcePath, raw) {
  const folder = sourcePath.split('/').slice(-2, -1)[0]
  const number = Number(folder.match(/(\d+)$/)?.[1])
  const match = raw.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return null

  const meta = {}
  for (const line of match[1].split('\n')) {
    const at = line.indexOf(':')
    if (at > 0) meta[line.slice(0, at).trim()] = line.slice(at + 1).trim()
  }
  const paragraphs = match[2].split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
  const image = Object.entries(images).find(([p]) => p.startsWith(sourcePath.replace('post.md', 'image.')))?.[1]

  return {
    id: `initiative_post_${String(number).padStart(2, '0')}`,
    number,
    series: meta.series || '',
    publishAt: meta.publishAt || null,
    draft: meta.draft === 'true',
    image,
    alt: `${meta.series || 'Initiative'}, post ${number}`,
    text: [(meta.series || '').toUpperCase(), ...paragraphs].filter(Boolean),
  }
}

const allPosts = Object.entries(sources)
  .map(([path, raw]) => parse(path, raw))
  .filter(post => post && post.image)
  .sort((a, b) => b.number - a.number)

/** Newest first: everything that is not a draft and whose date has arrived. */
export function getPublishedPosts(now = new Date()) {
  const today = todayInLagos(now)
  return allPosts.filter(post => !post.draft && (!post.publishAt || post.publishAt <= today))
}

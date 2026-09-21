/**
 * Vite plugin: import an image with the `?optimised` query and get back a
 * web-sized WebP instead of the original file.
 *
 *   import url from './poster.jpg?optimised'
 *   import.meta.glob('/content/posts/[star]/image.jpg', { query: '?optimised', ... })
 *
 * The 4 MB originals you drop into content/ stay untouched on disk. Each is
 * resized (max 1080px wide, never enlarged) and written once to a cache in
 * node_modules/.cache, then Vite handles that WebP like any other asset
 * (fingerprinted filename in the build, served on the fly in dev).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import sharp from 'sharp'

export default function optimiseImages({ width = 1080, quality = 80 } = {}) {
  let cacheDir

  return {
    name: 'optimise-images',
    enforce: 'pre',

    configResolved(config) {
      cacheDir = path.join(config.root, 'node_modules', '.cache', 'optimised-images')
    },

    async load(id) {
      const [file, query = ''] = id.split('?')
      if (!query.split('&').includes('optimised')) return null

      const stat = await fs.stat(file)
      const key = crypto
        .createHash('sha1')
        .update(`${file}|${stat.mtimeMs}|${stat.size}|${width}|${quality}`)
        .digest('hex')
        .slice(0, 12)
      const out = path.join(cacheDir, `${path.basename(file, path.extname(file))}-${key}.webp`)

      try {
        await fs.access(out)
      } catch {
        await fs.mkdir(cacheDir, { recursive: true })
        await sharp(file)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality })
          .toFile(out)
      }

      this.addWatchFile(file)
      const specifier = out.split(path.sep).join('/')
      return 'import url from ' + JSON.stringify(specifier) + '; export default url'
    },
  }
}

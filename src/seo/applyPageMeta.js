import { SITE_URL, ogImagePath, getPageMeta } from './pageMeta'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Keeps the document head in step with client-side navigation. */
export default function applyPageMeta(pathname) {
  const meta = getPageMeta(pathname)
  const url = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`
  const image = `${SITE_URL}${ogImagePath(meta.path)}`

  document.title = meta.title
  setMeta('name', 'description', meta.description)
  setMeta('property', 'og:title', meta.title)
  setMeta('property', 'og:description', meta.description)
  setMeta('property', 'og:url', url)
  setMeta('property', 'og:image', image)
  setMeta('name', 'twitter:title', meta.title)
  setMeta('name', 'twitter:description', meta.description)
  setMeta('name', 'twitter:image', image)

  const canonical = document.head.querySelector('link[rel="canonical"]')
  if (canonical) canonical.setAttribute('href', url)
}

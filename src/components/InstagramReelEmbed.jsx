import { useEffect, useRef } from 'react'
import styles from './InstagramReelEmbed.module.css'

const SCRIPT_ID = 'instagram-embed-script'

function loadEmbedScript() {
  if (document.getElementById(SCRIPT_ID)) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = 'https://www.instagram.com/embed.js'
    script.onload = () => resolve()
    script.onerror = reject
    document.body.appendChild(script)
  })
}

function processEmbeds() {
  window.instgrm?.Embeds?.process()
}

export default function InstagramReelEmbed({ permalink, title }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        await loadEmbedScript()
        if (!cancelled) {
          processEmbeds()
          window.setTimeout(processEmbeds, 400)
          window.setTimeout(processEmbeds, 1200)
        }
      } catch {
        /* embed.js unavailable */
      }
    }

    init()
    return () => { cancelled = true }
  }, [permalink])

  const embedUrl = `${permalink.replace(/\/$/, '')}/?utm_source=ig_embed&utm_campaign=loading`

  return (
    <div ref={wrapRef} className={styles.wrap}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        title={title}
      >
        <a href={permalink} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
    </div>
  )
}

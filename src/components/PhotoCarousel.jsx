import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './PhotoCarousel.module.css'

const pad = n => String(n).padStart(2, '0')
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'prev' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
)

/**
 * A swipeable photo gallery. Each photo has its own space with the caption
 * underneath (never over the picture), the next photo peeks in to show there
 * is more, and tapping a photo opens it full screen without cropping.
 */
export default function PhotoCarousel({ items, label = 'Photographs' }) {
  const trackRef = useRef(null)
  const frame = useRef(0)
  const lastViewed = useRef(0)
  const [active, setActive] = useState(0)
  const [viewer, setViewer] = useState(null) // index of the photo open full screen, or null
  const total = items.length

  // Keep the counter in step with whichever slide is at the left edge
  const onScroll = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      let best = 0
      let bestGap = Infinity
      Array.from(track.children).forEach((slide, i) => {
        const gap = Math.abs(slide.offsetLeft - track.scrollLeft)
        if (gap < bestGap) { best = i; bestGap = gap }
      })
      setActive(best)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const goTo = useCallback(i => {
    const track = trackRef.current
    const slide = track?.children[Math.max(0, Math.min(total - 1, i))]
    if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [total])

  const openViewer = i => { lastViewed.current = i; setViewer(i) }

  // The gallery follows the full-screen viewer, so closing it lands on the photo last seen
  const followViewer = useCallback(i => { lastViewed.current = i; goTo(i) }, [goTo])
  const closeViewer = useCallback(() => {
    setViewer(null)
    trackRef.current?.children[lastViewed.current]?.querySelector('button')?.focus({ preventScroll: true })
  }, [])

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className={styles.track} ref={trackRef} onScroll={onScroll}>
        {items.map((item, i) => (
          <figure className={styles.slide} key={item.src} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${total}`}>
            <button type="button" className={styles.shot} onClick={() => openViewer(i)} aria-label={`Open photo ${i + 1} full screen`}>
              <img src={item.src} alt={item.alt || item.caption} loading={i < 2 ? 'eager' : 'lazy'} style={{ objectPosition: item.position || 'center' }} />
              <span className={styles.expand} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
              </span>
            </button>
            <figcaption className={styles.caption}>{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.bar}>
        <span className={styles.count} aria-live="polite">{pad(active + 1)} <i>/</i> {pad(total)}</span>
        <div className={styles.buttons}>
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous photo"><Arrow dir="prev" /></button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Next photo"><Arrow dir="next" /></button>
        </div>
      </div>

      {viewer !== null && (
        <Viewer items={items} index={viewer} setIndex={setViewer} onClose={closeViewer} onMove={followViewer} />
      )}
    </div>
  )
}

function Viewer({ items, index, setIndex, onClose, onMove }) {
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const total = items.length
  const item = items[index]

  const step = useCallback(d => {
    const next = Math.max(0, Math.min(total - 1, index + d))
    if (next === index) return
    setIndex(next)
    onMove(next)
  }, [index, setIndex, total, onMove])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'ArrowRight') step(1)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, step])

  return createPortal(
    <div
      className={styles.viewer}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}`}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      onTouchStart={e => { touchX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1)
      }}
    >
      <button type="button" className={styles.close} onClick={onClose} ref={closeRef} aria-label="Close full screen view">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
      <div className={styles.stage} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
        <img src={item.src} alt={item.alt || item.caption} />
      </div>
      <p className={styles.viewerCaption}>{item.caption}</p>
      <div className={styles.viewerBar}>
        <button type="button" onClick={() => step(-1)} disabled={index === 0} aria-label="Previous photo"><Arrow dir="prev" /></button>
        <span>{pad(index + 1)} <i>/</i> {pad(total)}</span>
        <button type="button" onClick={() => step(1)} disabled={index === total - 1} aria-label="Next photo"><Arrow dir="next" /></button>
      </div>
    </div>,
    document.body
  )
}

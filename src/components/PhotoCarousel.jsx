import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './PhotoCarousel.module.css'

const DWELL = 4500 // each photo rests this long before the gallery glides on

const pad = n => String(n).padStart(2, '0')
const reducedMotion = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) // slow in, slow out

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'prev' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
)

/**
 * A photo gallery. Each photo has its own space with the caption underneath,
 * the next photo peeks in, and tapping a photo opens it full screen.
 *
 * It glides on to the next photo by itself, slowly, and stops whenever someone
 * touches it, hovers it, focuses it with the keyboard, opens a photo, scrolls
 * the page away from it, or presses the pause button. It never moves for people
 * who have asked their device to reduce motion.
 */
export default function PhotoCarousel({ items, label = 'Photographs' }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const scrollFrame = useRef(0)
  const glideFrame = useRef(0)
  const gliding = useRef(false)
  const pressing = useRef(false)
  const hovering = useRef(false)
  const focused = useRef(false)
  const inView = useRef(false)
  const lastMove = useRef(0)
  const activeRef = useRef(0)
  const lastViewed = useRef(0)
  const pushed = useRef(false)
  const viewerOpenRef = useRef(false)
  const [active, setActive] = useState(0)
  const [viewer, setViewer] = useState(null) // index of the photo open full screen, or null
  const [userPaused, setUserPaused] = useState(false)
  const total = items.length
  const viewerOpen = viewer !== null
  const canGlide = total > 1 && !reducedMotion()
  viewerOpenRef.current = viewerOpen

  const stopGlide = useCallback(() => {
    cancelAnimationFrame(glideFrame.current)
    if (gliding.current) {
      gliding.current = false
      if (trackRef.current) trackRef.current.style.scrollSnapType = ''
    }
  }, [])

  // Keep the counter in step with whichever slide is at the left edge
  const onScroll = useCallback(() => {
    if (!gliding.current) lastMove.current = performance.now() // a swipe counts as activity
    cancelAnimationFrame(scrollFrame.current)
    scrollFrame.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track) return
      let best = 0
      let bestGap = Infinity
      Array.from(track.children).forEach((slide, i) => {
        const gap = Math.abs(slide.offsetLeft - track.scrollLeft)
        if (gap < bestGap) { best = i; bestGap = gap }
      })
      activeRef.current = best
      setActive(best)
    })
  }, [])

  // Manual move (arrows, or the full-screen viewer): the browser's own smooth scroll
  const goTo = useCallback(i => {
    stopGlide()
    const track = trackRef.current
    const slide = track?.children[Math.max(0, Math.min(total - 1, i))]
    if (slide) track.scrollTo({ left: slide.offsetLeft, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [total, stopGlide])

  // Automatic move: a slow, eased glide. Snapping is off only while it runs.
  const glideTo = useCallback(i => {
    const track = trackRef.current
    const slide = track?.children[i]
    if (!slide) return
    const from = track.scrollLeft
    const to = slide.offsetLeft
    const slidesAway = Math.abs(to - from) / (slide.offsetWidth || 1)
    const duration = Math.min(2800, 1400 + 380 * Math.max(0, slidesAway - 1))
    const start = performance.now()
    gliding.current = true
    track.style.scrollSnapType = 'none'
    const step = now => {
      if (!gliding.current) return
      const p = Math.min(1, (now - start) / duration)
      track.scrollLeft = from + (to - from) * ease(p)
      if (p < 1) {
        glideFrame.current = requestAnimationFrame(step)
      } else {
        gliding.current = false
        track.style.scrollSnapType = ''
        lastMove.current = performance.now()
      }
    }
    glideFrame.current = requestAnimationFrame(step)
  }, [])

  // The auto-glide clock
  useEffect(() => {
    if (!canGlide || userPaused) return undefined
    lastMove.current = performance.now()
    const id = setInterval(() => {
      if (document.hidden || !inView.current || gliding.current || viewerOpenRef.current) return
      if (pressing.current || hovering.current || focused.current) return
      if (performance.now() - lastMove.current < DWELL) return
      glideTo((activeRef.current + 1) % total)
    }, 400)
    return () => clearInterval(id)
  }, [canGlide, userPaused, total, glideTo])

  // Only glide while the gallery is actually on screen
  useEffect(() => {
    const el = rootRef.current
    if (!el || typeof IntersectionObserver === 'undefined') { inView.current = true; return undefined }
    const io = new IntersectionObserver(([entry]) => {
      inView.current = entry.isIntersecting
      if (entry.isIntersecting) lastMove.current = performance.now()
    }, { threshold: 0.55 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => () => {
    cancelAnimationFrame(scrollFrame.current)
    cancelAnimationFrame(glideFrame.current)
  }, [])

  const touchStart = () => { pressing.current = true; stopGlide(); lastMove.current = performance.now() }
  const touchEnd = () => { pressing.current = false; lastMove.current = performance.now() }

  const togglePlay = () => {
    if (!userPaused) stopGlide()
    lastMove.current = performance.now()
    setUserPaused(!userPaused)
  }

  // ── Full screen viewer, tied to the browser's Back button ──
  const focusLastViewed = useCallback(() => {
    trackRef.current?.children[lastViewed.current]?.querySelector('button')?.focus({ preventScroll: true })
  }, [])

  const openViewer = i => {
    lastViewed.current = i
    window.history.pushState({ ...window.history.state, photoViewer: true }, '')
    pushed.current = true
    setViewer(i)
  }

  const closeViewer = useCallback(() => {
    if (pushed.current) {
      pushed.current = false
      window.history.back() // removes the entry the viewer added
    }
    setViewer(null)
    lastMove.current = performance.now()
    focusLastViewed()
  }, [focusLastViewed])

  // The phone's Back button (or back swipe) closes the viewer instead of leaving the page
  useEffect(() => {
    if (!viewerOpen) return undefined
    const onPop = () => {
      if (!pushed.current) return
      pushed.current = false
      setViewer(null)
      lastMove.current = performance.now()
      focusLastViewed()
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [viewerOpen, focusLastViewed])

  // The gallery follows the viewer, so closing it lands on the photo last seen
  const followViewer = useCallback(i => { lastViewed.current = i; goTo(i) }, [goTo])

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onPointerDown={touchStart}
      onPointerUp={touchEnd}
      onPointerCancel={touchEnd}
      onPointerEnter={e => { if (e.pointerType === 'mouse') { hovering.current = true; stopGlide() } }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') { hovering.current = false; lastMove.current = performance.now() } }}
      onWheel={() => { stopGlide(); lastMove.current = performance.now() }}
      onFocus={e => { if (e.target.matches?.(':focus-visible')) { focused.current = true; stopGlide() } }}
      onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) { focused.current = false; lastMove.current = performance.now() } }}
    >
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
        <span className={styles.count} aria-live={canGlide && !userPaused ? 'off' : 'polite'}>{pad(active + 1)} <i>/</i> {pad(total)}</span>
        <div className={styles.buttons}>
          {canGlide && (
            <button type="button" onClick={togglePlay} aria-label={userPaused ? 'Resume automatic sliding' : 'Pause automatic sliding'} className={styles.playToggle}>
              {userPaused ? (
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              )}
            </button>
          )}
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous photo"><Arrow dir="prev" /></button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Next photo"><Arrow dir="next" /></button>
        </div>
      </div>

      {viewerOpen && (
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

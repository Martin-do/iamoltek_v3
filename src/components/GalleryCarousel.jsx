import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './GalleryCarousel.module.css'

const AUTOPLAY_DELAY = 4500 // ms between auto-advances
const SWIPE_THRESHOLD = 48

export default function GalleryCarousel({ photos }) {
  const [active,   setActive]   = useState(0)
  const [sliding,  setSliding]  = useState(false)
  const [paused,   setPaused]   = useState(false)
  const timerRef = useRef(null)
  const touchStartRef = useRef(null)

  const goTo = useCallback((idx, fromUser = false) => {
    if (sliding) return
    const next = (idx + photos.length) % photos.length
    if (next === active) return
    setSliding(true)
    // brief fade-out, then swap image, then fade-in
    setTimeout(() => {
      setActive(next)
      setSliding(false)
    }, 280)
    // if user manually navigated, pause auto-play for 8s then resume
    if (fromUser) {
      setPaused(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setPaused(false), 8000)
    }
  }, [sliding, active, photos.length])

  const prev = () => goTo(active - 1, true)
  const next = () => goTo(active + 1, true)

  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event) => {
    const startX = touchStartRef.current
    const endX = event.changedTouches[0]?.clientX
    touchStartRef.current = null
    if (startX == null || endX == null) return

    const delta = endX - startX
    if (Math.abs(delta) < SWIPE_THRESHOLD) return
    if (delta > 0) prev()
    else next()
  }

  // Auto-slideshow
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => goTo(active + 1), AUTOPLAY_DELAY)
    return () => clearInterval(id)
  }, [active, paused, goTo])

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── MAIN IMAGE ── */}
      <div className={styles.mainWrap}>
        <img
          key={active}
          src={photos[active].img}
          alt={photos[active].cap}
          className={`${styles.mainImg} ${sliding ? styles.sliding : ''}`}
          style={{ objectPosition: photos[active].pos || 'center top' }}
        />

        {/* Arrows */}
        <button className={`${styles.arrow} ${styles.arrowL}`} onClick={prev} aria-label="Previous">&#8592;</button>
        <button className={`${styles.arrow} ${styles.arrowR}`} onClick={next} aria-label="Next">&#8594;</button>

        {/* Caption */}
        <div className={styles.caption} aria-live="polite">
          <span className={styles.captionCount}>{active + 1}&thinsp;/&thinsp;{photos.length}</span>
          <span className={styles.captionText}>{photos[active].cap}</span>
        </div>

        {/* Autoplay progress bar */}
        {!paused && (
          <div key={`${active}-bar`} className={styles.progressBar} />
        )}
      </div>

      {/* ── DOTS ── */}
      <div className={styles.dots}>
        {photos.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
            onClick={() => goTo(i, true)}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div className={styles.thumbStrip}>
        {photos.map((p, i) => (
          <div
            key={i}
            className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
            onClick={() => goTo(i, true)}
          >
            <img
              src={p.img}
              alt={p.cap}
              className={styles.thumbImg}
              style={{ objectPosition: p.pos || 'center top' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

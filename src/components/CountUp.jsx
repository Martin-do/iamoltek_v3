import { useEffect, useRef, useState } from 'react'

/**
 * A number that counts up from 0 the first time it is on screen.
 *   <CountUp value="11+" />   ->  0+ ... 11+
 * Non-numeric values (such as an infinity sign) are shown as they are, and
 * so is everything for people who prefer reduced motion.
 */
export default function CountUp({ value, duration = 1600 }) {
  const text = String(value)
  const target = parseInt(text.replace(/\D/g, ''), 10)
  const suffix = text.replace(/[0-9]/g, '')
  const numeric = !Number.isNaN(target)

  const ref = useRef(null)
  const [shown, setShown] = useState(numeric ? `0${suffix}` : text)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!numeric || reduce || !('IntersectionObserver' in window)) {
      setShown(text)
      return
    }

    let frame
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        setShown(`${Math.round(target * eased)}${suffix}`)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        run()
      }
    }, { threshold: 0.6 })
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [text, target, suffix, numeric, duration])

  return <span ref={ref}>{shown}</span>
}

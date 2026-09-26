import { useEffect } from 'react'

const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-stagger'

/**
 * Watches every element that carries a reveal class (see src/motion.css) and
 * adds "visible" the first time it scrolls into view.
 *
 * `deps` lets a caller rescan when the page changes (App.jsx passes the path).
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(SELECTOR)
    if (!els.length) return

    // Very old browsers: just show everything
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      // Fire a little before the element is fully on screen, which feels
      // more responsive on a phone than waiting for a third of it to show
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )

    els.forEach(el => {
      if (!el.classList.contains('visible')) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

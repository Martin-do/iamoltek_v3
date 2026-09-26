import { useEffect, useRef, useState } from 'react'

/**
 * An <img> that fades in once it has loaded instead of popping in, which
 * looks much calmer on a slow phone connection. Give the parent a
 * background and it shows through as a placeholder while the picture loads.
 *
 * The class "img-loaded" appears when ready, so a stylesheet can animate
 * opacity: `.thing img { opacity: 0; transition: opacity .6s }`
 * `.thing img.img-loaded { opacity: 1 }`
 */
export default function FadeImage({ className = '', alt = '', ...props }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  // Pictures already in the browser cache have finished loading before React
  // attaches onLoad, so check for that too
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true)
  }, [])

  return (
    <img
      ref={ref}
      alt={alt}
      {...props}
      className={`${className} ${loaded ? 'img-loaded' : ''}`.trim()}
      onLoad={() => setLoaded(true)}
    />
  )
}

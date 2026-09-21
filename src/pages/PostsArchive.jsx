import { useEffect, useMemo, useState } from 'react'
import Footer from '../components/Footer'
import FeaturedPost from '../components/FeaturedPost'
import { getPublishedPosts } from '../content/posts'
import styles from './PostsArchive.module.css'

export default function PostsArchive() {
  const posts = useMemo(() => getPublishedPosts(), [])
  const [openIndex, setOpenIndex] = useState(null)

  // A link like /initiative/posts#post-17 opens that post straight away, on arrival
  // and also when only the #hash changes on the page you are already on
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#post-(\d+)$/)
      if (!match) return
      const index = posts.findIndex(post => post.number === Number(match[1]))
      if (index >= 0) setOpenIndex(index)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [posts])

  const open = index => {
    setOpenIndex(index)
    window.history.replaceState(null, '', `#post-${posts[index].number}`)
  }
  const close = () => {
    setOpenIndex(null)
    window.history.replaceState(null, '', window.location.pathname)
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>The Oyewale Areoye Initiative</div>
          <h1>Daily <em>Reflections</em></h1>
          <p>{posts.length} reflections on purpose, resilience, service and community, newest first. Tap any one to read it.</p>
        </div>
      </section>

      <section className={styles.archive}>
        <div className={styles.inner}>
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <button
                key={post.id}
                id={`post-${post.number}`}
                type="button"
                className={styles.card}
                onClick={() => open(index)}
                aria-label={`Read post ${post.number}: ${post.series}`}
              >
                <span className={styles.frame}>
                  <img src={post.image} alt={post.alt} loading="lazy" />
                </span>
                <span className={styles.meta}>
                  <b>{String(post.number).padStart(2, '0')}</b>{post.series}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <FeaturedPost posts={posts} controlledIndex={openIndex} onClose={close} />
      <Footer variant="initiative" />
    </main>
  )
}

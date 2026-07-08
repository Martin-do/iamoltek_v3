import { isBirthdayPeriod } from '../utils/birthdayUtils'
import InstagramReelEmbed from './InstagramReelEmbed'
import styles from './BirthdaySpotlight.module.css'

export default function BirthdaySpotlight() {
  if (!isBirthdayPeriod()) return null

  const igPosts = [
    {
      permalink: 'https://www.instagram.com/p/Dag-L2Toub4/',
      title: 'Celebrating Oyewale Areoye - Main Post 1'
    },
    {
      permalink: 'https://www.instagram.com/p/Dag-fl3MZ4b/',
      title: 'Celebrating Oyewale Areoye - Main Post 2'
    }
  ]

  return (
    <section className={styles.spotlight}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className="section-label">A Birthday to Remember</div>
          <h2 className="section-title on-dark">
            🎂 Celebrating <em>Oyewale Areoye</em>
          </h2>
          <div className="gold-rule center" />
          <p className={styles.subtitle}>
            Born to lead, built to give. Today, we honour a man whose life is a testament to what purpose looks like in motion. From the boardroom to the community, from the palace to the people — Happy Birthday, Oyewale Areoye.
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {igPosts.map((post, idx) => (
              <div key={idx} className={styles.card}>
                <InstagramReelEmbed permalink={post.permalink} title={post.title} />
              </div>
            ))}
          </div>
          <div className={styles.hint}>
            <span>← Swipe / Scroll to view posts →</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { isBirthdayPeriod } from '../utils/birthdayUtils'
import styles from './BirthdayBanner.module.css'

export default function BirthdayBanner({ variant = 'default' }) {
  if (!isBirthdayPeriod()) return null

  if (variant === 'initiative') {
    return (
      <div className={`${styles.banner} ${styles.initiative}`}>
        <div className={styles.content}>
          <span className={styles.icon}>🎁</span>
          <span className={styles.text}>
            In honour of his birthday, Oyewale Areoye renews his commitment to community.
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.banner} ${styles.default}`}>
      <div className={styles.content}>
        <span className={styles.shimmerText}>
          🎂 Today we celebrate Oyewale Areoye — Happy Birthday! 🎂
        </span>
      </div>
    </div>
  )
}

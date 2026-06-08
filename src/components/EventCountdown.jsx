import React from 'react'
import { Link } from 'react-router-dom'
import styles from './EventCountdown.module.css'

export default function EventCountdown({
  eventName = "Back to School Project",
  description = "The Oyewale Areoye Initiative is organising a Back to School project — equipping students across various communities with essential educational materials for a brighter future.",
  contactLink = "/initiative#donate",
  contactText = "Support the Project"
}) {
  return (
    <section id="event" className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <div className={styles.eventInfo}>
          <div className={styles.label}>Current Project</div>
          <div className={styles.outreachTag}>📚 Education & Welfare</div>
          <h2 className={styles.title}>{eventName}</h2>

          <p className={styles.description}>{description}</p>

          <div className={styles.ctas}>
            <a href={contactLink} className="btn-gold">{contactText}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

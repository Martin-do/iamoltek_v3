import React from 'react'
import { Link } from 'react-router-dom'
import styles from './EventCountdown.module.css'

export default function EventCountdown({
  eventName = "Back to School Project",
  description = "Education is the foundation of every thriving community. The Oyewale Areoye Initiative is producing and distributing customized notebooks and essential stationery to students in local communities. The project has started and preparations are continuing. Join us in equipping the next generation with the tools they need to write their own bright futures.",
  contactLink = "/initiative#donate",
  contactText = "Support the Project"
}) {
  return (
    <section id="event" className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <div className={styles.eventInfo}>
          <div className={styles.label}>In Progress</div>
          <div className={styles.outreachTag}>📚 Education & Youth Welfare</div>
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

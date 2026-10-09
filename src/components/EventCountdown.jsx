import React from 'react'
import { Link } from 'react-router-dom'
import styles from './EventCountdown.module.css'

export default function EventCountdown({
  eventName = "Back to School Project",
  description = "At the start of the 2026/2027 academic session, the Initiative gave notebooks, pens and basic stationery to pupils, and notebooks, pens and chalk to teachers. The project reached 550 pupils and 50 teachers across five schools and the Gegelose community.",
  reportLink = "/initiative/impact/back-to-school-2026/project-report",
  reportText = "Read the Report",
  contactLink = "/initiative#donate",
  contactText = "Support Our Work"
}) {
  return (
    <section id="event" className={styles.container}>
      <div className={styles.overlay}></div>
      <div className={styles.inner}>
        <div className={`${styles.eventInfo} reveal-stagger`}>
          <div className={styles.label}>Completed</div>
          <div className={styles.outreachTag}>📚 Education & Youth Welfare</div>
          <h2 className={styles.title}>{eventName}</h2>

          <p className={styles.description}>{description}</p>

          <div className={styles.ctas}>
            <Link to={reportLink} className="btn-gold">{reportText}</Link>
            <a href={contactLink} className="btn-ghost">{contactText}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

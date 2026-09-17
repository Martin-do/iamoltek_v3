import React from 'react'
import styles from './AnnouncementStrip.module.css'

export default function AnnouncementStrip({ 
  tag = "Upcoming Activity", 
  text, 
  shortText,
  linkText = "See Details", 
  linkHref = "/initiative#event" 
}) {
  return (
    <div className={styles.strip}>
      <div className={styles.content}>
        <span className={styles.pulse} aria-hidden="true" />
        {tag && <span className={styles.tag}>{tag}</span>}
        <span className={`${styles.text} ${shortText ? styles.textLong : ''}`}>{text}</span>
        {shortText && <span className={`${styles.text} ${styles.textShort}`}>{shortText}</span>}
        {linkText && linkHref && (
          <a href={linkHref} className={styles.link}>
            {linkText} →
          </a>
        )}
      </div>
    </div>
  )
}

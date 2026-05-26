import React from 'react'
import styles from './AnnouncementStrip.module.css'

export default function AnnouncementStrip({ 
  tag = "Upcoming Event", 
  text = "Join us for our next major Initiative event — details below!", 
  linkText = "Learn More", 
  linkHref = "#event" 
}) {
  return (
    <div className={styles.strip}>
      <div className={styles.content}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <span className={styles.text}>{text}</span>
        {linkText && linkHref && (
          <a href={linkHref} className={styles.link}>
            {linkText}
          </a>
        )}
      </div>
    </div>
  )
}

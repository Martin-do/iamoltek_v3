import React, { useState, useEffect } from 'react'
import styles from './EventCountdown.module.css'

export default function EventCountdown({
  eventName = "Upcoming Initiative Event",
  eventDateStr = "2026-08-15T10:00:00", // Default to somewhere in the future
  location = "Lagos, Nigeria (Venue TBD)",
  description = "Join us as we gather to discuss, plan, and execute the next phase of our community development and youth empowerment programmes.",
  registrationLink = "#contact"
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date(eventDateStr).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }

    // Run once immediately
    updateTimer()
    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [eventDateStr])

  // Format numbers to always be 2 digits
  const formatTime = (time) => time < 10 ? `0${time}` : time

  return (
    <section id="event" className={styles.container}>
      <div className={styles.inner}>
        
        <div className={styles.eventInfo}>
          <div className={styles.label}>Next Major Event</div>
          <h2 className={styles.title}>{eventName}</h2>
          
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span>📅</span> 
              <span>{new Date(eventDateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className={styles.detailItem}>
              <span>⏰</span> 
              <span>{new Date(eventDateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className={styles.detailItem}>
              <span>📍</span> 
              <span>{location}</span>
            </div>
          </div>
          
          <p className={styles.description}>{description}</p>
          
          <a href={registrationLink} className="btn-gold">Register / Learn More</a>
        </div>

        <div className={styles.countdownWrapper}>
          <h3 className={styles.countdownTitle}>Countdown to Event</h3>
          <div className={styles.grid}>
            <div className={styles.box}>
              <span className={styles.number}>{formatTime(timeLeft.days)}</span>
              <span className={styles.unit}>Days</span>
            </div>
            <div className={styles.box}>
              <span className={styles.number}>{formatTime(timeLeft.hours)}</span>
              <span className={styles.unit}>Hours</span>
            </div>
            <div className={styles.box}>
              <span className={styles.number}>{formatTime(timeLeft.minutes)}</span>
              <span className={styles.unit}>Mins</span>
            </div>
            <div className={styles.box}>
              <span className={styles.number}>{formatTime(timeLeft.seconds)}</span>
              <span className={styles.unit}>Secs</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

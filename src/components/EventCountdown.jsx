import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './EventCountdown.module.css'

export default function EventCountdown({
  eventName = "Community Outreach Drive",
  eventDateStr = "2026-08-15T10:00:00",
  location = "Okeluse Kingdom, Ondo State",
  description = "The Oyewale Areoye Initiative is organising a community outreach — sharing food and essential supplies with families in need. A moment of giving. A step toward a better community.",
  contactLink = "/initiative#donate",
  contactText = "Support the Outreach"
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
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
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }

    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [eventDateStr])

  const pad = (n) => n < 10 ? `0${n}` : String(n)

  const units = [
    { value: timeLeft.days,    label: 'Days' },
    { value: timeLeft.hours,   label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ]

  return (
    <section id="event" className={styles.container}>
      <div className={styles.inner}>

        {/* ── LEFT: Event details ── */}
        <div className={styles.eventInfo}>
          <div className={styles.label}>Upcoming Activity</div>
          <div className={styles.outreachTag}>🤝 Community Outreach &amp; Welfare</div>
          <h2 className={styles.title}>{eventName}</h2>

          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📅</span>
              <span>{new Date(eventDateStr).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailIcon}>📍</span>
              <span>{location}</span>
            </div>
          </div>

          <p className={styles.description}>{description}</p>

          <div className={styles.ctas}>
            <Link to={contactLink} className="btn-gold">{contactText}</Link>
            <Link to="/initiative" className="btn-ghost">About the Initiative</Link>
          </div>
        </div>

        {/* ── RIGHT: Countdown ── */}
        <div className={styles.countdownWrapper}>
          <p className={styles.countdownTitle}>Counting down to the outreach</p>
          <div className={styles.grid}>
            {units.map(({ value, label }) => (
              <div key={label} className={styles.box}>
                <span className={styles.number}>{pad(value)}</span>
                <span className={styles.unit}>{label}</span>
              </div>
            ))}
          </div>
          <p className={styles.eventNote}>
            No registration required — come and be a part of it.
          </p>
        </div>

      </div>
    </section>
  )
}

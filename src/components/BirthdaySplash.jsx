import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isBirthdayPeriod } from '../utils/birthdayUtils'
import heroPortrait from '../assets/hero-portrait.png'
import portraitAgbada from '../assets/portrait-agbada.jpg'
import styles from './BirthdaySplash.module.css'

export default function BirthdaySplash() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(100)

  // Determine variant based on route
  const isInitiativePage = location.pathname === '/initiative'
  const portraitImg = isInitiativePage ? portraitAgbada : heroPortrait

  const titleText = "Happy Birthday"
  const subtitleText = "OYEWALE AREOYE"
  const messageText = isInitiativePage
    ? "In honour of his birthday, Oyewale Areoye renews his commitment to community. The greatest gift you can give him today is a contribution to the cause he has devoted himself to."
    : "A man of vision, service, and uncommon grace — today we pause to celebrate you. Happy Birthday, Oyewale Areoye."

  useEffect(() => {
    // Only show if it's the birthday period, and it hasn't been shown in this session yet
    if (!isBirthdayPeriod()) {
      return
    }

    const hasSeen = sessionStorage.getItem('bday_splash_seen')
    if (!hasSeen) {
      setIsOpen(true)
      // Mark as seen immediately so it doesn't trigger again
      sessionStorage.setItem('bday_splash_seen', 'true')
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    // 6-second timer for closing and progress bar
    const duration = 6000
    const intervalTime = 50
    const step = (intervalTime / duration) * 100

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressTimer)
          setIsOpen(false)
          return 0
        }
        return prev - step
      })
    }, intervalTime)

    // Escape key listener to close
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(progressTimer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!isBirthdayPeriod()) return null

  const handleOpen = () => {
    setProgress(100)
    setIsOpen(true)
  }

  // Generate simple array for CSS confetti particles
  const confettiArray = Array.from({ length: 25 })

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        className={styles.floatingTrigger}
        onClick={handleOpen}
        aria-label="Celebrate Birthday"
        title="Celebrate Birthday"
      >
        <span className={styles.triggerEmoji}>🎂</span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          {/* CSS Confetti */}
          <div className={styles.confettiContainer}>
            {confettiArray.map((_, i) => (
              <div key={i} className={styles.confetti} style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                backgroundColor: i % 3 === 0 ? 'var(--gold)' : i % 3 === 1 ? 'var(--gold-pale)' : 'var(--cream)'
              }} />
            ))}
          </div>

          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close splash screen">
              &times;
            </button>

            <div className={styles.content}>
              <div className={styles.avatarWrap}>
                <img src={portraitImg} alt="Oyewale Areoye" className={styles.avatar} />
                <div className={styles.glowRing} />
              </div>

              <h2 className={styles.title}>{titleText}</h2>
              <div className={styles.subtitle}>{subtitleText}</div>
              <div className={styles.goldLine} />

              <p className={styles.message}>{messageText}</p>
            </div>

            {/* 6-second progress bar */}
            <div className={styles.progressBarWrap}>
              <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

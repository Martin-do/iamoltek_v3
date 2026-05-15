import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.png'
import initiativeLogo from '../assets/initiative-logo.jpg'
import styles from './Footer.module.css'

export default function Footer({ variant = 'main' }) {
  const isInitiative = variant === 'initiative'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            {isInitiative
              ? <img src={initiativeLogo} alt="The Initiative" style={{ height: 50, objectFit: 'contain', marginBottom: '0.8rem' }} />
              : <img src={logoWhite} alt="Oltek" className={styles.logoImg} style={{ marginBottom: '0.8rem' }} />
            }
            <p className={styles.tagline}>
              {isInitiative
                ? 'The Oyewale Areoye Initiative — Empowering People. Transforming Communities. CAC Registered, Abuja.'
                : 'The official digital home of Oyewale Areoye — professional, philanthropist, and Atobase of Okeluse Kingdom.'}
            </p>
          </div>

          <div>
            <div className={styles.colTitle}>Navigate</div>
            <ul className={styles.links}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/initiative">The Initiative</Link></li>
              <li><Link to="/atobase">Atobase</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>The Initiative</div>
            <ul className={styles.links}>
              <li><a href="#">Mission & Vision</a></li>
              <li><a href="#">Programmes</a></li>
              <li><a href="#">Impact</a></li>
              <li><a href="#">Donate</a></li>
              <li><a href="#">Partner With Us</a></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Professional</div>
            <ul className={styles.links}>
              <li><a href="#" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="#">Speaking</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Media Kit</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Oyewale Areoye. All rights reserved.</p>
          <div className={styles.handle}>@iamoltek</div>
        </div>
      </div>
    </footer>
  )
}

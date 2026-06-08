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
              <li><Link to="/initiative#mission">Mission & Vision</Link></li>
              <li><Link to="/initiative#programmes">Programmes</Link></li>
              <li><Link to="/initiative#impact">Impact</Link></li>
              <li><Link to="/initiative#donate">Donate</Link></li>
              <li><Link to="/contact">Partner With Us</Link></li>
            </ul>
          </div>

          <div>
            <div className={styles.colTitle}>Professional</div>
            <ul className={styles.links}>
              <li><a href="https://www.linkedin.com/in/oyewale-areoye-69419053/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://instagram.com/iamoltek" target="_blank" rel="noreferrer">Personal Instagram</a></li>
              <li><a href="https://instagram.com/theoyewaleareoyeinitiative" target="_blank" rel="noreferrer">The Initiative</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Oyewale Areoye. All rights reserved.</p>
          <a href="https://instagram.com/iamoltek" target="_blank" rel="noopener noreferrer" className={styles.handleLink}>
            <div className={styles.handle}>@iamoltek</div>
          </a>
        </div>
      </div>
    </footer>
  )
}


import { Link } from 'react-router-dom'
import logoWhite from '../assets/logo-white.png'
import initiativeLogo from '../assets/initiative-logo.jpg'
import styles from './Footer.module.css'

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const socials = [
  { href: 'https://instagram.com/iamoltek', label: 'Personal Instagram (@iamoltek)', icon: <InstagramIcon /> },
  { href: 'https://www.linkedin.com/in/oyewale-areoye-69419053/', label: 'LinkedIn', icon: <LinkedInIcon /> },
  { href: 'https://instagram.com/theoyewaleareoyeinitiative', label: 'The Initiative on Instagram', icon: <img src={initiativeLogo} alt="" /> },
]

export default function Footer({ variant = 'main' }) {
  const isInitiative = variant === 'initiative'

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            {isInitiative
              ? <img src={initiativeLogo} alt="The Oyewale Areoye Initiative" className={styles.initiativeLogo} />
              : <img src={logoWhite} alt="Oltek" className={styles.logoImg} />
            }
            <p className={styles.tagline}>
              {isInitiative
                ? 'The Oyewale Areoye Initiative. Empowering People. Transforming Communities. Registered with the Corporate Affairs Commission, Abuja.'
                : 'Oyewale Areoye is a facility management and real estate executive, founder of The Oyewale Areoye Initiative, and Atobase of Okeluse Kingdom.'}
            </p>
            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={styles.socialLink}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Site">
            <div className={styles.colTitle}>Navigate</div>
            <ul className={styles.links}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/initiative">The Initiative</Link></li>
              <li><Link to="/atobase">Atobase</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <nav aria-label="The Initiative">
            <div className={styles.colTitle}>The Initiative</div>
            <ul className={styles.links}>
              <li><Link to="/initiative#mission">Mission & Vision</Link></li>
              <li><Link to="/initiative/impact">Impact Reports</Link></li>
              <li><Link to="/initiative#event">Upcoming Project</Link></li>
              <li><Link to="/initiative#donate">Donate</Link></li>
              <li><Link to="/contact">Partner With Us</Link></li>
            </ul>
          </nav>

          <div className={styles.professional}>
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
            <span className={styles.handle}>@iamoltek</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

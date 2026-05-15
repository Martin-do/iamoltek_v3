import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import logoWhite from '../assets/logo-white.png'
import styles from './Nav.module.css'

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const navigate    = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => { setMenuOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/',           label: 'Home',          end: true  },
    { to: '/about',      label: 'About',         end: false },
    { to: '/initiative', label: 'The Initiative', end: false },
    { to: '/atobase',    label: 'Atobase',       end: false },
  ]

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* LOGO — mix-blend-mode:screen removes black bg naturally */}
        <div className={styles.logoWrap} onClick={() => navigate('/')}>
          <img src={logoWhite} alt="Oltek" className={styles.logoImg} />
        </div>

        {/* DESKTOP */}
        <ul className={styles.desktopLinks}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end}
                className={({ isActive }) => isActive ? styles.active : ''}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/contact" className={styles.cta}>Connect</NavLink>
          </li>
        </ul>

        {/* BURGER */}
        <button
          className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.bl} />
          <span className={styles.bl} />
          <span className={styles.bl} />
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
        onClick={() => setMenuOpen(false)} />

      {/* MOBILE SLIDE MENU */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileLogoWrap}>
          <img src={logoWhite} alt="Oltek" className={styles.mobileLogoImg} />
        </div>
        <ul className={styles.mobileLinks}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end}
                className={({ isActive }) => isActive ? styles.mlActive : styles.ml}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li><NavLink to="/contact" className={styles.mlCta}>Connect</NavLink></li>
        </ul>
        <p className={styles.mobileHandle}>@iamoltek · Oyewale Areoye</p>
      </div>
    </>
  )
}

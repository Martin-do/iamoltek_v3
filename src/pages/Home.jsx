import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import BirthdayBanner from '../components/BirthdayBanner'
import BirthdaySpotlight from '../components/BirthdaySpotlight'
import { isBirthdayPeriod } from '../utils/birthdayUtils'
import heroPortrait   from '../assets/hero-portrait.png'
import initiativeLogo from '../assets/initiative-logo.jpg'
import atobaseHero    from '../assets/portrait-golden-throne.jpg'
import proActivity    from '../assets/activity-networking.jpg'
import quoteBg        from '../assets/about-window.jpg'
import styles from './Home.module.css'

/* ── COUNT-UP ── */
function useCountUp(target, duration = 1800, started = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    if (target === '∞') { setCount('∞'); return }
    const numeric = parseInt(target.replace(/\D/g, ''), 10)
    const suffix  = target.replace(/[0-9]/g, '')
    const steps = 60; let frame = 0
    const timer = setInterval(() => {
      frame++
      setCount(Math.min(Math.round((numeric / steps) * frame), numeric) + suffix)
      if (frame >= steps) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [started, target, duration])
  return count || (target === '∞' ? '∞' : '0')
}

function StatItem({ num, label }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const display = useCountUp(num, 1600, started)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.statNum}>{display}</div>
      <div className={styles.statLbl}>{label}</div>
    </div>
  )
}

const statsData = [
  { num: '11+', label: 'Years Industry Leadership' },
  { num: '6',   label: 'Professional Certifications' },
  { num: '280', label: 'Food Packs Distributed · 2026' },
  { num: '3',   label: 'States Reached · 2026' },
]

const pillars = [
  { num: '01', img: proActivity,    imgPos: 'center 38%', variant: 'pro',        title: 'Real Estate & Facility Management', cat: 'Circle Point Group · Petik Limited', desc: 'Eleven years across facility management and real estate, leading strategy, operations and investment growth as co-founder of Circle Point Group and Executive Director at Petik Limited.', link: '/about',      linkText: 'Read Profile' },
  { num: '02', img: initiativeLogo, variant: 'initiative', title: 'The Oyewale Areoye Initiative', cat: 'NGO · CAC Registered',              desc: 'A CAC-registered initiative working in education, youth empowerment and community welfare. In July 2026 it delivered 280 food packs to households across Lagos, Oyo and Osun States.', link: '/initiative', linkText: 'Visit the Initiative' },
  { num: '03', img: atobaseHero,    imgPos: 'center 14%', variant: 'atobase',    title: 'Atobase of Okeluse',            cat: 'Royal Honour · Ondo State',         desc: 'Conferred the chieftaincy title of Atobase of Okeluse Kingdom, Ose LGA, Ondo State, by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II, at the 2024 investiture ceremony.', link: '/atobase',    linkText: 'About the Title' },
]

export default function Home() {
  const navigate = useNavigate()
  useScrollReveal()

  const isBirthday = isBirthdayPeriod()

  return (
    <main className={styles.main} style={isBirthday ? { paddingTop: 'var(--nav-height)' } : {}}>
      <BirthdayBanner />

      {/* ══════════════════════════════════════════════════════
          HERO
          Desktop: two columns — text left | portrait right
          Mobile: portrait as full-bleed background, text bottom
          ══════════════════════════════════════════════════════ */}
      <section className={styles.hero}>

        {/* ── Text column — FIRST in DOM (natural left on desktop) ── */}
        <div className={styles.heroLeft}>
          {/* Centred inner so text doesn't hug the very edge */}
          <div className={styles.heroLeftInner}>
            <div className={`${styles.eyebrow} fade-up`}>Lagos · Nigeria</div>
            <h1 className={`${styles.heroName} fade-up-d1`}>
              <em>Oyewale</em>
              <strong>Areoye</strong>
            </h1>
            <div className={`${styles.heroRoles} fade-up-d1`} aria-hidden="true">
              <span>Facility Management</span>
              <span>Real Estate</span>
              <span>Strategic Leadership</span>
            </div>
            <p className={`${styles.heroDesc} fade-up-d1`}>
              Eleven years in facility management and real estate. Co-founder of Circle Point
              Group, Executive Director at Petik Limited, founder of The Oyewale Areoye
              Initiative, and Atobase of Okeluse Kingdom.
            </p>
            <div className={`${styles.heroBadges} fade-up-d2`}>
              {[
                'Co-Founder, Circle Point Group',
                'Executive Director, Petik Limited',
                'Founder, The Oyewale Areoye Initiative',
                'Atobase of Okeluse Kingdom, Ondo State',
                'Honorary Doctoral Fellow, ILMMD UK',
              ].map(b => <div key={b} className={styles.badge}>{b}</div>)}
            </div>
            <div className={`${styles.heroCtas} fade-up-d3`}>
              <button className="btn-gold" onClick={() => navigate('/about')}>Explore Profile</button>
              <button className="btn-ghost" onClick={() => navigate('/initiative')}>The Initiative →</button>
            </div>
          </div>
        </div>

        {/* ── Portrait column — SECOND in DOM (natural right on desktop) ── */}
        <div className={styles.heroRight}>
          {/* Mobile: portrait covers full hero, gradient fades into text */}
          <div className={styles.portraitWrap}>
            <img
              src={heroPortrait}
              alt="Oyewale Areoye"
              className={styles.portrait}
            />
            <div className={styles.portraitOverlay} />
          </div>
        </div>

      </section>

      {/* ══════════ STATS ══════════ */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {statsData.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>

      {/* ══════════ PROJECT TEASER ══════════ */}
      <div className={styles.outreachTeaser}>
        <div className={styles.outreachTeaserInner}>
          <div className={styles.outreachTeaserLeft}>
            <div className={styles.outreachTeaserDot}>Upcoming Initiative Project</div>
            <h2 className={styles.outreachTeaserTitle}>
              Back to School Project: <em>Equipping the Next Generation</em>
            </h2>
            <p className={styles.outreachTeaserSub}>
              The Oyewale Areoye Initiative will be producing and distributing customized notebooks and essential stationery to students across local communities.
            </p>
          </div>
          <Link to="/initiative#event" className={styles.outreachTeaserCta}>
            See Details →
          </Link>
        </div>
      </div>

      <BirthdaySpotlight />

      {/* ══════════ THE THREE PAGES (pillars + featured, merged) ══════════ */}
      <section className={styles.pillars}>
        <div className={styles.pillarsInner}>
          <div className={`${styles.pillarsHd} reveal`}>
            <div className="section-label">Explore</div>
            <h2 className="section-title">Profession. Service. <em>Heritage.</em></h2>
            <div className="gold-rule center" />
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <Link
                key={p.num}
                to={p.link}
                className={`${styles.pcard} ${styles[`pcard_${p.variant}`]} reveal reveal-d${i + 1}`}
              >
                <div className={styles.pcardMedia}>
                  <img src={p.img} alt="" className={styles.pcardImg} loading="lazy" style={p.imgPos ? { objectPosition: p.imgPos } : undefined} />
                </div>
                <div className={styles.pcardBody}>
                  <div className={styles.pcardCat}>{p.cat}</div>
                  <h3 className={styles.pcardTitle}>{p.title}</h3>
                  <p className={styles.pcardDesc}>{p.desc}</p>
                  <span className={styles.pcardLink}>{p.linkText}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ QUOTE ══════════ */}
      <section className={styles.quote} style={{ backgroundImage: `url(${quoteBg})` }}>
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteInner}>
          <div className={`${styles.quoteLeft} reveal`}>
            <div className="section-label">Philosophy</div>
            <p className={styles.quoteLeftText}>The principle that drives everything</p>
          </div>
          <div className={`${styles.quoteRight} reveal reveal-d1`}>
            <blockquote className={styles.quoteText}>
              “Excellence is not a destination. It is a continuous pursuit: in boardrooms,
              in communities, in the quiet moments when no one is watching but the work
              still gets done.”
            </blockquote>
            <p className={styles.quoteAttr}>Oyewale Areoye · @iamoltek</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

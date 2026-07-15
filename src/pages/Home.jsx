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
  { num: '1',   label: 'Royal Title Bestowed' },
  { num: '∞',   label: 'Communities Impacted' },
]

const pillars = [
  { num: '01', icon: '🏗', variant: 'pro',        title: 'Professional Excellence',       desc: "Over a decade of strategic leadership across real estate and facility management. Driving operational excellence and investment strategy in Nigeria's most complex developments.", link: '/about',      linkText: 'Read Profile' },
  { num: '02', icon: '🌱', variant: 'initiative', title: 'The Oyewale Areoye Initiative', desc: "A CAC-registered NGO creating lasting change through education, community development, and youth empowerment across Nigeria's underserved communities. Empowering People. Transforming Communities.", link: '/initiative', linkText: 'Visit Initiative' },
  { num: '03', icon: '👑', variant: 'atobase',    title: 'Atobase of Okeluse',            desc: 'Honoured with the distinguished chieftaincy title of Atobase of Okeluse Kingdom by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II — recognition of exceptional service, character, and contribution.', link: '/atobase',    linkText: 'Discover' },
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
            <div className={`${styles.eyebrow} fade-up`}>The Official Platform</div>
            <h1 className={`${styles.heroName} fade-up-d1`}>
              <em>Oyewale</em>
              <strong>Areoye</strong>
            </h1>
            <p className={`${styles.heroDesc} fade-up-d1`}>
              Real estate strategist. Facility management leader. Philanthropist.
              Royal title holder of Okeluse Kingdom. A multidimensional Nigerian voice
              driving excellence, impact, and heritage.
            </p>
            <div className={`${styles.heroBadges} fade-up-d2`}>
              {[
                'Co-Founder — Circle Point Group',
                'Executive Director — Petik Limited',
                'Founder, The Oyewale Areoye Initiative',
                'Atobase of Okeluse Kingdom, Ondo State',
                'Honorary Doctoral Fellow — ILMMD UK',
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
              Back to School Project — <em>Equipping the Next Generation</em>
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

      {/* ══════════ PILLARS ══════════ */}
      <section className={styles.pillars}>
        <div className={styles.pillarsInner}>
          <div className={`${styles.pillarsHd} reveal`}>
            <div className="section-label">Who He Is</div>
            <h2 className="section-title">Three Dimensions of <em>Purpose</em></h2>
            <div className="gold-rule center" />
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <div
                key={p.num}
                className={`${styles.pcard} ${styles[`pcard_${p.variant}`]} reveal reveal-d${i + 1}`}
                onClick={() => navigate(p.link)}
              >
                <div className={styles.pcardN}>{p.num}</div>
                <div className={styles.pcardIcon}>{p.icon}</div>
                <h3 className={styles.pcardTitle}>{p.title}</h3>
                <p className={styles.pcardDesc}>{p.desc}</p>
                <span className={styles.pcardLink}>{p.linkText}</span>
              </div>
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
              "Excellence is not a destination. It is a continuous pursuit — in boardrooms,
              in communities, in the quiet moments when no one is watching but the work
              still gets done."
            </blockquote>
            <p className={styles.quoteAttr}>— Oyewale Areoye · @iamoltek</p>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED ══════════ */}
      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <div className="reveal">
            <div className="section-label">Two Worlds, One Mission</div>
            <h2 className="section-title">Explore His <em>Dedicated Pages</em></h2>
            <div className="gold-rule" />
          </div>
          <div className={styles.featuredGrid}>
            <div className={`${styles.featCard} ${styles.featCardInit} reveal reveal-d1`}
              onClick={() => navigate('/initiative')}>
              <div className={styles.featCardBg} style={{ background: 'linear-gradient(135deg,#3D0E0E,#7A1F1F)' }}>
                <img src={initiativeLogo} alt="" className={styles.featCardBgImg} />
              </div>
              <div className={styles.featCardOverlay} />
              <div className={styles.featCardBody}>
                <div className={styles.featCat}>NGO · Charitable Venture · CAC Registered</div>
                <h3 className={styles.featTitle}>The Oyewale Areoye Initiative</h3>
                <p className={styles.featDesc}>Empowering People. Transforming Communities. A registered NGO driving education, youth empowerment, and community development across Nigeria.</p>
                <span className={`${styles.featCta} ${styles.featCtaInit}`}>Visit the Initiative Page</span>
              </div>
            </div>

            <div className={`${styles.featCard} ${styles.featCardAto} reveal reveal-d2`}
              onClick={() => navigate('/atobase')}>
              <div className={styles.featCardBg}>
                <img src={atobaseHero} alt="Atobase" className={styles.featCardBgImg}
                  style={{ objectPosition: 'top center', opacity: 1 }} />
              </div>
              <div className={styles.featCardOverlay} />
              <div className={styles.featCardBody}>
                <div className={styles.featCat}>Royal Honour · Okeluse Kingdom · Ondo State</div>
                <h3 className={styles.featTitle}>Atobase of Okeluse Kingdom</h3>
                <p className={styles.featDesc}>Bestowed by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II — a chieftaincy title recognising outstanding service and community contribution.</p>
                <span className={`${styles.featCta} ${styles.featCtaAto}`}>Discover the Atobase Page</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

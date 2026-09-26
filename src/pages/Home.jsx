import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/Footer'
import FactStrip from '../components/FactStrip'
import CountUp from '../components/CountUp'
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

function StatItem({ num, label }) {
  return (
    <div className={styles.stat}>
      <div className={styles.statNum}><CountUp value={num} /></div>
      <div className={styles.statLbl}>{label}</div>
    </div>
  )
}

const statsData = [
  { num: '11+', label: 'Years in Industry' },
  { num: '6',   label: 'Certifications' },
  { num: '3',   label: 'States with Relief Outreach' },
]

const roles = [
  { icon: 'building',   label: 'Co-Founder',               detail: 'Circle Point Group' },
  { icon: 'briefcase',  label: 'Executive Director',       detail: 'Petik Limited' },
  { icon: 'initiative', label: 'Founder',                  detail: 'The Oyewale Areoye Initiative' },
  { icon: 'crown',      label: 'Atobase',                  detail: 'Okeluse Kingdom' },
  { icon: 'award',      label: 'Honorary Doctoral Fellow', detail: 'ILMMD UK' },
]

const pillars = [
  { num: '01', img: proActivity,    imgPos: 'center 38%', variant: 'pro',        title: 'Real Estate & Facility Management', cat: 'Circle Point Group · Petik Limited', desc: 'Eleven years across facility management and real estate, leading strategy, operations and investment growth as co-founder of Circle Point Group and Executive Director at Petik Limited.', link: '/about',      linkText: 'Read Profile' },
  { num: '02', img: initiativeLogo, variant: 'initiative', title: 'The Oyewale Areoye Initiative', cat: 'NGO · CAC Registered',              desc: 'A CAC-registered initiative working in education, youth empowerment and community welfare. In 2026 it has carried out relief outreaches in Lagos, Oyo and Osun States and started its Back to School project.', link: '/initiative', linkText: 'Visit the Initiative' },
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
            <p className={`${styles.heroLead} fade-up-d1`}>
              Facility management and real estate executive. Founder of The Oyewale Areoye Initiative.
            </p>
            <a href="#roles" className={`${styles.exploreLink} fade-up-d2`}>Explore <span aria-hidden="true">↓</span></a>
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

      {/* ══════════ ROLES (phones only; larger screens list these in the hero) ══════════ */}
      <FactStrip id="roles" title="Roles &amp; titles" items={roles} />

      {/* ══════════ STATS ══════════ */}
      <div className={styles.statsBar}>
        <div className={styles.statsTitle}>At a glance</div>
        <div className={`${styles.statsInner} reveal-stagger`}>
          {statsData.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>

      {/* ══════════ PROJECT TEASER ══════════ */}
      <div className={styles.outreachTeaser}>
        <div className={`${styles.outreachTeaserInner} reveal`}>
          <div className={styles.outreachTeaserLeft}>
            <div className={styles.outreachTeaserDot}>Initiative Project · In Progress</div>
            <h2 className={styles.outreachTeaserTitle}>
              Back to School Project: <em>Equipping the Next Generation</em>
            </h2>
            <p className={styles.outreachTeaserSub}>
              The Oyewale Areoye Initiative is producing customized notebooks and essential stationery for students in local communities. The project has started and preparations are continuing.
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
                <div className={`${styles.pcardMedia} reveal reveal-media`}>
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

import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import heroPortrait  from '../assets/hero-portrait.png'
import proHeadshot1  from '../assets/pro-headshot-1.jpg'
import proHeadshot2  from '../assets/pro-headshot-2.jpg'
import aboutWalking  from '../assets/about-walking-v2.jpg'
import networking    from '../assets/activity-networking.jpg'
import arrival       from '../assets/about-arrival.jpg'
import cpEvent1      from '../assets/circlepoint-1.jpg'
import cpEvent2      from '../assets/circlepoint-2.jpg'
import styles from './About.module.css'

const expertise = [
  { title: 'Strategic Leadership',    desc: 'C-suite strategy & operations' },
  { title: 'Real Estate Development', desc: 'Commercial & residential projects' },
  { title: 'Facility Management',     desc: 'Asset optimisation & HSE' },
  { title: 'Financial Analysis',      desc: 'Budgeting, forecasting & risk' },
  { title: 'Sustainability',          desc: 'Green building & ESG' },
  { title: 'Vendor Management',       desc: 'Contracts & procurement' },
]

const timeline = [
  {
    year: '2024 – Present',
    role: 'Executive Director, Strategy & Growth',
    org: 'Circle Point · Lagos',
    orgLink: 'https://circlepoint.com.ng/',
    cofounder: true,
    desc: 'Co-founding and leading strategy, investment growth, and high-value property development and facility solutions across Nigeria.',
  },
  {
    year: '2024 – Present',
    role: 'Executive Strategist & Co-Founder',
    org: 'Petik Limited · Lagos',
    orgLink: 'https://petiklimited.com/',
    cofounder: true,
    desc: 'Co-founding and driving strategic direction across real estate, construction, project management, renewable energy, and oil & gas services.',
  },
  {
    year: '2020 – 2024',
    role: 'Managing Director & Head of Facilities',
    org: 'Banksome Global Facility Management · Lagos',
    desc: 'Exceptional leadership in asset optimization, contract negotiation, and compliance across multiple high-value portfolios.',
  },
  {
    year: '2013 – 2020',
    role: 'Senior Facility & Real Estate Manager',
    org: 'Multiple Institutions · Nigeria',
    desc: 'Built deep expertise across large-scale commercial and residential developments throughout Nigeria.',
  },
]

const certifications = [
  { code: 'CICPFM',                    name: 'Certified Facility Management Professional' },
  { code: 'CBAP',                      name: 'Certified Business Analyst Professional' },
  { code: 'IOPM',                      name: 'Accredited Project Manager' },
  { code: 'Honorary Doctoral Fellow',  name: 'Institute of Leadership, Management & Manpower Development — UK' },
]

const memberships = ['IFMA', 'IWFM', 'IIBA', 'IOPM', 'ILMMD UK']

const moments = [
  { img: arrival,    cap: 'In the Field · Professional Circuit' },
  { img: networking, cap: 'Networking & Leadership Engagement' },
  { img: cpEvent1,   cap: 'Circle Point · Property Sector' },
  { img: cpEvent2,   cap: 'Industry Connections · Lagos' },
]

export default function About() {
  useScrollReveal()

  return (
    <main>
      {/* ── HERO BANNER ── */}
      <section
        className={styles.heroBanner}
        style={{ backgroundImage: `url(${aboutWalking})` }}
      >
        <div className={styles.heroBannerOverlay} />
        <div className={styles.heroBannerContent}>
          <div className="reveal">
            <div className="section-label" style={{ color: 'var(--gold)' }}>
              The Person Behind the Platform
            </div>
            <h1 className={styles.heroTitle}>
              A Leader. A <em>Builder.</em><br />A Legacy in Motion.
            </h1>
          </div>
          <p className={`${styles.heroBio} reveal reveal-d1`}>
            Oyewale Areoye — known as @iamoltek — is one of Nigeria's foremost voices in
            strategic real estate and facility management, a committed philanthropist, and a
            distinguished royal title holder. With over eleven years of expertise, international
            certifications, and an unwavering commitment to excellence and community, he
            represents a new generation of African leadership.
          </p>
        </div>
        <div className={styles.heroWatermark}>OLTEK</div>
      </section>

      {/* ── BODY ── */}
      <section className={styles.body}>
        <div className={styles.bodyInner}>
          {/* SIDEBAR */}
          <div className="reveal">
            <div className={styles.photoStack}>
              <img src={proHeadshot1} alt="Oyewale Areoye" className={styles.photoMain} />
              <img src={proHeadshot2} alt="Oyewale Areoye" className={styles.photoSecondary} />
            </div>
            <div className={styles.certs}>
              <div className="section-label" style={{ marginTop: '1.8rem' }}>Certifications</div>
              {certifications.map(c => (
                <div key={c.code} className={styles.cert}>
                  <strong>{c.code}</strong>
                  <span>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div>
            <div className={`${styles.section} reveal`}>
              <h2 className={styles.sectionTitle}>Professional Overview</h2>
              <p className={styles.text}>
                Oyewale Areoye is a distinguished Facility Management and Real Estate professional
                with over 11 years of expertise in strategic leadership, operations, and financial
                management. His experience spans asset optimization, cost control, contract
                negotiation, and regulatory compliance — positioning him as a recognised leader
                in Nigeria's property sector.
              </p>
              <p className={styles.text}>
                Currently serving as Co-Founder and Executive Director of Strategy &amp; Growth at{' '}
                <a href="https://circlepoint.com.ng/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Circle Point</a>,
                and Co-Founder of{' '}
                <a href="https://petiklimited.com/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Petik Limited</a>,
                Oyewale leads property development strategy, investment growth, and multi-sector ventures spanning real estate,
                construction, renewable energy, and oil &amp; gas across Nigeria.
              </p>
              <div className={styles.expGrid}>
                {expertise.map((e, i) => (
                  <div key={e.title} className={`${styles.expItem} reveal reveal-d${(i % 2) + 1}`}>
                    <div className={styles.expTitle}>{e.title}</div>
                    <div className={styles.expDesc}>{e.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive portrait mid-break */}
            <div className={`${styles.midPortrait} reveal`}>
              <img
                src={heroPortrait}
                alt="Oyewale Areoye — Executive Portrait"
                className={styles.midPortraitImg}
              />
              <div className={styles.midPortraitCaption}>Executive Portrait · @iamoltek</div>
            </div>

            <div className={`${styles.section} reveal`}>
              <h2 className={styles.sectionTitle}>Career Timeline</h2>
              <div className={styles.timeline}>
                {timeline.map((t, i) => (
                  <div key={`${t.year}-${t.org}`} className={`${styles.titem} reveal reveal-d${(i % 3) + 1}`}>
                    <div className={styles.tYear}>{t.year}</div>
                    <div className={styles.tRoleRow}>
                      <div className={styles.tRole}>{t.role}</div>
                      {t.cofounder && <span className={styles.tCofounderTag}>Co-Founder</span>}
                    </div>
                    <div className={styles.tOrg}>
                      {t.orgLink
                        ? <a href={t.orgLink} target="_blank" rel="noopener noreferrer" className={styles.tOrgLink}>{t.org}</a>
                        : t.org
                      }
                    </div>
                    <div className={styles.tDesc}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.section} reveal`}>
              <h2 className={styles.sectionTitle}>Professional Memberships</h2>
              <div className={styles.memberships}>
                {memberships.map(m => <div key={m} className={styles.mtag}>{m}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFESSIONAL MOMENTS ── */}
      <section className={styles.moments}>
        <div className={styles.momentsInner}>
          <div className={`${styles.momentsHeader} reveal`}>
            <div className="section-label">In the Field</div>
            <h2 className="section-title on-dark">Professional <em>Moments</em></h2>
            <div className="gold-rule" />
          </div>
          <div className={styles.momentsGrid}>
            {moments.map((m, i) => (
              <div key={i} className={`${styles.momentCard} reveal reveal-d${i + 1}`}>
                <img src={m.img} alt={m.cap} className={styles.momentImg} />
                <div className={styles.momentCap}>{m.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

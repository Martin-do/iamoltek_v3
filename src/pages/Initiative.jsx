import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import CountUp from '../components/CountUp'
import FadeImage from '../components/FadeImage'
import useScrollReveal from '../hooks/useScrollReveal'
import AnnouncementStrip from '../components/AnnouncementStrip'
import EventCountdown from '../components/EventCountdown'
import FeaturedPost from '../components/FeaturedPost'
import BirthdayBanner from '../components/BirthdayBanner'
import InstagramReelEmbed from '../components/InstagramReelEmbed'
import { isBirthdayPeriod } from '../utils/birthdayUtils'
import { campaigns as reports } from '../data/reportsData'
import { getPublishedPosts } from '../content/posts'
import initiativeLogo from '../assets/initiative-logo.jpg'
import initiativeImpact from '../assets/initiative-impact.jpg'
import styles from './Initiative.module.css'

const ACCOUNT_NUMBER = '6550000619'

function CopyAccountButton() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ACCOUNT_NUMBER)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      /* clipboard unavailable — number stays selectable */
    }
  }
  return (
    <button type="button" className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ''}`} onClick={copy} aria-live="polite">
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}

const pillars = [
  { icon: '📚', title: 'Education', desc: 'Helping students stay in school with materials, fees and practical support, starting with the Back to School project.' },
  { icon: '🍲', title: 'Food & Relief', desc: 'Food packs and essential materials for households, elderly people and care institutions facing hardship.' },
  { icon: '🤝', title: 'Youth Empowerment', desc: 'Skills, mentorship and encouragement for young people deciding what to do with their lives.' },
  { icon: '🌾', title: 'Community Welfare', desc: 'Working with community leaders and local partners on the everyday needs they identify themselves.' },
]

const programmes = [
  { tag: 'Education', title: 'The Oltek Scholarship Fund', desc: 'Annual scholarship awarding educational grants to exceptional young students from low-income backgrounds. Applications open each January.' },
  { tag: 'Youth', title: 'Skill Up Nigeria', desc: 'Vocational and digital skills training for unemployed youth aged 18–30. Courses in real estate, construction, digital marketing, and coding.' },
  { tag: 'Community', title: 'Restore Okeluse Project', desc: 'A special development initiative in Okeluse Kingdom supporting infrastructure, clean water, and community health outreach.' },
  { tag: 'Welfare', title: 'Care Basket Outreach', desc: 'Quarterly welfare drives providing food, essentials, and support to elderly and vulnerable individuals across target communities.' },
]

export default function Initiative() {
  useScrollReveal()
  const posts = useMemo(() => getPublishedPosts(), [])

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <BirthdayBanner variant="initiative" />
      <FeaturedPost posts={posts} />

      <AnnouncementStrip
        tag="In Progress"
        text="The Back to School Project is under way: customized notebooks and essential stationery for students."
        shortText="Back to School Project"
        linkText="See Details"
        linkHref="#event"
      />

      {/* ══════════════════════════════════════
          HERO — heroInner centres content
      ══════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>

          <div className={`${styles.heroLeft} fade-up`}>
            <div className={styles.eyebrow}>A Call to Service</div>
            <h1 className={styles.title}>
              The Oyewale<br />Areoye <em>Initiative</em>
            </h1>
            <p className={styles.tagline}>Empowering People. Transforming Communities.</p>
            <div className={styles.cac}>✔ Registered with CAC, Abuja · Part 'F', CAMA 2020</div>
            <p className={styles.desc}>
              A Nigerian charity registered with the Corporate Affairs Commission, working in
              education, youth empowerment, food relief and community welfare.
            </p>
            <div className={styles.ctas}>
              <a href="#donate" className="btn-burg">Donate Now</a>
              <Link to="/contact" className="btn-ghost">Become a Partner</Link>
            </div>
          </div>

          <div className={`${styles.heroRight} fade-up-d2`}>
            <img
              src={initiativeLogo}
              alt="The Oyewale Areoye Initiative"
              className={styles.heroLogo}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MISSION
      ══════════════════════════════════════ */}
      <section id="mission" className={`${styles.mission} ${styles.anchorOffset}`}>
        <div className={styles.missionInner}>
          <div className="reveal">
            <div className="section-label">Our Mission</div>
            <blockquote className={styles.missionQ}>
              "To bridge the gap between privilege and potential by investing in people,
              ideas, and communities that are often overlooked but never without promise."
            </blockquote>
          </div>
          <div className={`${styles.missionBody} reveal reveal-d1`}>
            <div className="section-label">About the Initiative</div>
            <p>
              The Oyewale Areoye Initiative was founded by Oyewale Areoye to widen access to
              education, opportunity and basic support in the communities he comes from and
              works in.
            </p>
            <p>
              We work with community leaders, government agencies and private partners on
              education, youth development, welfare and food relief, and we publish a report
              for every intervention we carry out.
            </p>
            <p>
              Change is built one community, one family and one person at a time.
            </p>
            <div style={{ marginTop: '1.8rem' }}>
              <Link to="/about" className="btn-burg">Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PILLARS
      ══════════════════════════════════════ */}
      <section id="pillars" className={`${styles.pillarsSection} ${styles.anchorOffset}`}>
        <div className={styles.pillarsInner}>
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label">Our Focus Areas</div>
            <h2 className="section-title">Four Pillars of <em>Change</em></h2>
            <div className="gold-rule center" />
          </div>
          <div className={styles.pillarsGrid}>
            {pillars.map((p, i) => (
              <div key={p.title} className={`${styles.pillar} reveal reveal-d${i + 1}`}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EVENT COUNTDOWN
      ══════════════════════════════════════ */}
      <EventCountdown />

      {/* ══════════════════════════════════════
          IMPACT NUMBERS
      ══════════════════════════════════════ */}
      <div className={styles.impactBand}>
        <div className={styles.impactBandInner}>
          {[
            ['3', 'States with Relief Outreach'],
            ['4', 'Intervention Areas'],
            ['1', 'Project Under Way'],
          ].map(([n, l]) => (
            <div key={l} className={styles.istat}>
              <div className={styles.istatNum}><CountUp value={n} /></div>
              <div className={styles.istatLbl}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          IMPACT SECTION
      ══════════════════════════════════════ */}
      <section id="impact" className={`${styles.impactSection} ${styles.anchorOffset}`}>
        <div className={styles.impactInner}>
          <img
            src={initiativeImpact}
            alt="Initiative Impact"
            className={`${styles.impactImg} reveal reveal-media`}
          />
          <div className="reveal reveal-d1">
            <div className="section-label">Real Impact</div>
            <h2 className="section-title">
              Together, We Can Build<br /><em>A Better Tomorrow</em>
            </h2>
            <div className="gold-rule" />
            <p className={styles.impactRight}>
              Your donation helps us equip young people with skills, education, and
              opportunities to build a better future and transform communities across Nigeria.
            </p>
            <div className={styles.donateInline}>
              <a href="#donate" className="btn-burg">Donate Now · Acc: {ACCOUNT_NUMBER}</a>
              <p className={styles.donateSmall}>
                Bank: Opay · Acc Name: THE OYEWALE AREOYE INITIATIVE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FIELD REPORTS
      ══════════════════════════════════════ */}
      <section id="programmes" className={`${styles.programsSection} ${styles.anchorOffset}`}>
        <div className={styles.programsInner}>
          <div className="reveal">
            <div className="section-label">Community Work</div>
            <h2 className="section-title">Impact in <em>Action</em></h2>
            <div className="gold-rule" />
          </div>
          <p className={styles.reportsIntro}>Read the stories behind our completed interventions and follow the projects now being prepared for our communities.</p>
          <div className={styles.programsGrid}>
            {reports.slice(0, 3).map((p, i) => (
              <div key={p.title} className={`${styles.prog} reveal reveal-d${(i % 2) + 1}`}>
                <div className={styles.progTag}>{p.tag}</div>
                <h3 className={styles.progTitle}>{p.title}</h3>
                <p className={styles.progDesc}>{p.summary}</p>
                <Link to={`/initiative/impact/${p.slug}`} className={styles.reportLink}>Read {p.status !== 'completed' ? 'Project' : 'Impact Story'} →</Link>
              </div>
            ))}
          </div>
          <div className={styles.reportsCta}><Link to="/initiative/impact" className="btn-burg">Explore Our Impact</Link></div>
        </div>
      </section>

      {/* 🎂 BIRTHDAY — single post embed above the feed */}
      {isBirthdayPeriod() && (
        <section className={styles.birthdayPostSection}>
          <div className="section-inner">
            <div className="section-label">🎂 Birthday Edition</div>
            <h2 className="section-title">In Honour of His <em>Birthday</em></h2>
            <div className="gold-rule" />
            <div className={styles.birthdayPostWrap}>
              <InstagramReelEmbed
                permalink="https://www.instagram.com/p/DahNoyfCKnr/"
                title="Birthday post: The Oyewale Areoye Initiative"
              />
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          DAILY REFLECTIONS (latest posts, from content/posts)
      ══════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className={styles.reflections}>
          <div className={styles.reflectionsInner}>
            <div className="reveal">
              <div className="section-label">Daily Reflections</div>
              <h2 className="section-title">Latest from the <em>Initiative</em></h2>
              <div className="gold-rule" />
            </div>
            <div className={`${styles.reflectionsGrid} reveal-stagger`}>
              {posts.slice(0, 4).map(post => (
                <Link key={post.id} to={`/initiative/posts#post-${post.number}`} className={styles.reflection}>
                  <FadeImage src={post.image} alt={post.alt} loading="lazy" />
                </Link>
              ))}
            </div>
            <div className={styles.reflectionsCta}>
              <Link to="/initiative/posts" className="btn-burg">All {posts.length} reflections</Link>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          DONATE BAND
      ══════════════════════════════════════ */}
      <div id="donate" className={`${styles.donateBand} ${styles.anchorOffset}`}>
        <div className={styles.donateBandInner}>
          <div className="reveal">
            <h2 className={styles.donateBandTitle}>
              Your support can change a life.<br />Join the movement today.
            </h2>
            <p className={styles.donateBandSub}>
              Whether you donate, volunteer, or partner, there is a meaningful role for
              everyone who believes in community and human potential.
            </p>
          </div>
          <div className={`${styles.donateBandRight} reveal reveal-d1`}>
            <div className={styles.bankBox}>
              <span className={styles.bankLabel}>Bank · Opay</span>
              <strong>THE OYEWALE AREOYE INITIATIVE</strong>
              <span className={styles.bankLabel}>Account Number</span>
              <div className={styles.bankNumRow}>
                <strong className={styles.bankNum}>{ACCOUNT_NUMBER}</strong>
                <CopyAccountButton />
              </div>
            </div>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📧</span>
                <a href="mailto:areoyeoyewale@outlook.com" className={styles.contactLink}>
                  areoyeoyewale@outlook.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <a href="tel:+2348182937320" className={styles.contactLink}>
                  +234 818 293 7320
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>
                  <svg className={styles.instagramIcon} viewBox="0 0 24 24" width="13" height="13">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" fill="currentColor" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </span>
                <a
                  href="https://instagram.com/theoyewaleareoyeinitiative"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.contactLink}
                >
                  @theoyewaleareoyeinitiative
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="initiative" />
    </main>
  )
}

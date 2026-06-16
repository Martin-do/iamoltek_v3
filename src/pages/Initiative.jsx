import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import AnnouncementStrip from '../components/AnnouncementStrip'
import EventCountdown from '../components/EventCountdown'
import InstagramFeed from '../components/InstagramFeed'
import FeaturedPost from '../components/FeaturedPost'
import initiativeLogo   from '../assets/initiative-logo.jpg'
import initiativeImpact from '../assets/initiative-impact.jpg'
import featuredPostImg  from '../assets/featured-post-01.jpeg'
import newPostImg       from '../assets/theoyewaleareoyeinitiative_01.jpg'
import post03Img        from '../assets/theoyewaleareoyeinitiative_02.jpeg'
import styles from './Initiative.module.css'

const featuredPostsData = [
  {
    id: 'initiative_post_03',
    image: post03Img,
    text: [
      "RISE & BELIEVE",
      "True empowerment does not begin when someone recognizes your worth. It begins when you recognize it yourself.",
      "The greatest transformations occur when individuals discover the courage, confidence, and determination already within them. No circumstance, setback, or limitation can extinguish the fire of a person who believes in their potential.",
      "Do not wait for permission to grow.",
      "Do not wait for others to validate your dreams.",
      "The power to rise has always been within you.",
      "“Empowerment is not a gift someone hands you. It is a fire you discover within yourself.”",
      "#RiseAndBelieve #EmpowermentForAll #TheOyewaleAreoyeInitiative #EmpoweringPeople #TransformingCommunities #PersonalGrowth #LeadershipDevelopment #SelfBelief #InspirationDaily #PurposeDrivenLife"
    ]
  },
  {
    id: 'initiative_post_02',
    image: newPostImg,
    text: [
      "RISE & BELIEVE",
      "You are capable of far more than your current circumstances may suggest.",
      "Every great achievement begins with the decision to believe that growth is possible. The journey to becoming your best self starts when you refuse to be defined by fear, doubt, setbacks, or limitations.",
      "Do not shrink your dreams to fit your present reality. Expand your mindset to match your potential.",
      "Today, choose growth.\nChoose courage.\nChoose to rise.",
      "“You were not built to stay small. Rise into every version of yourself the world has been waiting for.”",
      "#RiseAndBelieve #EmpowermentForAll #TheOyewaleAreoyeInitiative #PersonalGrowth #LeadershipDevelopment #BelieveInYourself #PurposeDriven #CommunityImpact #InspirationDaily #TransformingCommunities"
    ]
  },
  {
    id: 'initiative_post_01',
    image: featuredPostImg,
    text: [
      "EMPOWERING PEOPLE. TRANSFORMING COMMUNITIES.",
      "Meaningful change begins when people are equipped with the knowledge, opportunities, and support they need to thrive.",
      "At The Oyewale Areoye Initiative, we are committed to fostering leadership, promoting education, encouraging service, and creating opportunities that inspire individuals to reach their full potential and contribute positively to society.",
      "Through ideas, advocacy, community engagement, and impactful initiatives, we seek to build stronger individuals and more resilient communities.",
      "Together, we can create lasting change.",
      "Ideas. Leadership. Service. Impact.",
      "#TheOyewaleAreoyeInitiative #EmpoweringPeople #TransformingCommunities #Leadership #Education #CommunityDevelopment #SocialImpact #YouthEmpowerment #PositiveChange #BuildingTheFuture #ImpactDriven #TogetherWeCan #InspiringLeadership #CreatingImpact"
    ]
  }
]

const pillars = [
  { icon: '📚', title: 'Education & Scholarships', desc: 'Funding access to quality education for bright but financially constrained young Nigerians — from primary school to university scholarships.' },
  { icon: '🌾', title: 'Community Development',    desc: 'Infrastructure, sanitation, and local economic development projects that uplift communities and restore dignity to everyday life.' },
  { icon: '🤝', title: 'Youth Empowerment',         desc: 'Skills acquisition, entrepreneurship training, and mentorship programmes designed to prepare young Nigerians to lead and thrive.' },
  { icon: '🏠', title: 'Housing & Welfare',          desc: 'Advocating for affordable, safe housing and social welfare support for the most vulnerable in our communities.' },
]

const programmes = [
  { tag: 'Education', title: 'The Oltek Scholarship Fund', desc: 'Annual scholarship awarding educational grants to exceptional young students from low-income backgrounds. Applications open each January.' },
  { tag: 'Youth',     title: 'Skill Up Nigeria',           desc: 'Vocational and digital skills training for unemployed youth aged 18–30. Courses in real estate, construction, digital marketing, and coding.' },
  { tag: 'Community', title: 'Restore Okeluse Project',    desc: 'A special development initiative in Okeluse Kingdom supporting infrastructure, clean water, and community health outreach.' },
  { tag: 'Welfare',   title: 'Care Basket Outreach',       desc: 'Quarterly welfare drives providing food, essentials, and support to elderly and vulnerable individuals across target communities.' },
]

export default function Initiative() {
  useScrollReveal()

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      <FeaturedPost posts={featuredPostsData} />

      <AnnouncementStrip 
        tag="Upcoming Project" 
        text="The Oyewale Areoye Initiative will be launching the Back to School Project — equipping students with essential materials." 
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
            <div className={styles.cac}>✔ Registered with CAC, Abuja — Part 'F', CAMA 2020</div>
            <p className={styles.desc}>
              A Nigerian charitable venture committed to creating lasting, measurable change
              through education, empowerment, and investment in people across Nigeria's most
              underserved communities.
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
              The Oyewale Areoye Initiative is the philanthropic expression of a man who has
              seen the transformative power of opportunity — and is committed to extending that
              power to others.
            </p>
            <p>
              Through structured programmes in education, youth development, housing advocacy,
              and community welfare, we work with local communities, government agencies, and
              private partners to build dignified, self-sustaining lives.
            </p>
            <p>
              Change is not handed down — it is built up, one community, one family,
              one individual at a time.
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
            ['500+', 'Lives Directly Impacted'],
            ['12',   'Scholarships Awarded'],
            ['5',    'Community Projects'],
            ['3',    'Partner Organisations'],
          ].map(([n, l]) => (
            <div key={l} className={styles.istat}>
              <div className={styles.istatNum}>{n}</div>
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
            className={`${styles.impactImg} reveal`}
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
              <a href="#donate" className="btn-burg">Donate Now — Acc: 6550000619</a>
              <p className={styles.donateSmall}>
                Bank: Opay · Acc Name: THE OYEWALE AREOYE INITIATIVE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROGRAMMES
      ══════════════════════════════════════ */}
      <section id="programmes" className={`${styles.programsSection} ${styles.anchorOffset}`}>
        <div className={styles.programsInner}>
          <div className="reveal">
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Active <em>Programmes</em></h2>
            <div className="gold-rule" />
          </div>
          <div className={styles.programsGrid}>
            {programmes.map((p, i) => (
              <div key={p.title} className={`${styles.prog} reveal reveal-d${(i % 2) + 1}`}>
                <div className={styles.progTag}>{p.tag}</div>
                <h3 className={styles.progTitle}>{p.title}</h3>
                <p className={styles.progDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INSTAGRAM FEED
      ══════════════════════════════════════ */}
      <InstagramFeed handle="@theoyewaleareoyeinitiative" />

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
              Whether you donate, volunteer, or partner — there is a meaningful role for
              everyone who believes in community and human potential.
            </p>
          </div>
          <div className={`${styles.donateBandRight} reveal reveal-d1`}>
            <div className={styles.bankBox}>
              <span className={styles.bankLabel}>Bank · Opay</span>
              <strong>THE OYEWALE AREOYE INITIATIVE</strong>
              <span className={styles.bankLabel}>Account Number</span>
              <strong className={styles.bankNum}>6550000619</strong>
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
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
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

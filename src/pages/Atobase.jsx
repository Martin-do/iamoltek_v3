import { useState } from 'react'
import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import InstagramReelEmbed from '../components/InstagramReelEmbed'
import GalleryCarousel from '../components/GalleryCarousel'

import heroImg         from '../assets/portrait-golden-throne.jpg'
import pThroneFull     from '../assets/atobase-regalia.jpeg'
import pThroneStaff    from '../assets/portrait-throne-staff.jpg'
import pCrownClose     from '../assets/portrait-crown-closeup.jpg'
import pRedCarpet      from '../assets/portrait-red-carpet.jpg'
import pGoldenThrone   from '../assets/portrait-golden-throne.jpg'
import pRaisingStaff   from '../assets/portrait-raising-staff.jpg'
import pAgbada         from '../assets/portrait-agbada.jpg'
import pSmiling        from '../assets/portrait-smiling.jpg'
import pBowing         from '../assets/portrait-bowing.jpg'
import c1 from '../assets/ceremony-1.jpg'
import c2 from '../assets/ceremony-2.jpg'
import c3 from '../assets/ceremony-3.jpg'
import c4 from '../assets/ceremony-4.jpg'
import c5 from '../assets/ceremony-5.jpg'
import c6 from '../assets/ceremony-6.jpg'
import c7  from '../assets/atobase4.jpg'
import c8  from '../assets/atobase5.jpg'
import c9  from '../assets/atobase6.jpg'
import c10 from '../assets/atobase7.jpg'
import c11 from '../assets/atobase8.jpg'
import c12 from '../assets/atobase10.jpg'
import c13 from '../assets/atobase11.jpg'

import styles from './Atobase.module.css'

const responsibilities = [
  'Serving as a cultural ambassador for Okeluse Kingdom and its heritage',
  'Supporting community development within and beyond the kingdom',
  'Upholding the dignity and values of the Okeluse royal house',
  'Bridging traditional governance with modern development thinking',
  "Advocating for the kingdom's interests at regional and national levels",
]

const kingdomCards = [
  { icon: '📍', title: 'Location',           desc: 'Ose Local Government Area, Ondo State, Nigeria — a historic Yoruba community with deep cultural roots.' },
  { icon: '👑', title: 'The Monarch',        desc: 'HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II — Ojima Arujale of Okeluse Kingdom. One of the youngest and most celebrated traditional rulers in Yorubaland.' },
  { icon: '🏛', title: 'Heritage & Culture', desc: 'Centuries of Yoruba history — unique traditions, festivals, and an unbroken royal lineage from father to son.' },
  { icon: '🌱', title: 'Development Vision', desc: "Under HRM Akinghare II's reign, Okeluse has prioritised infrastructure, youth education, and investment to uplift its people." },
  { icon: '🤝', title: 'Community Spirit',   desc: 'Known for warmth, unity, and pride — Okeluse people carry a strong sense of identity and mutual support wherever they go.' },
  { icon: '🌍', title: 'Global Diaspora',    desc: "Okeluse sons and daughters have made their mark across Nigeria and internationally, carrying the kingdom's values of excellence." },
]

/* pos = object-position for the main carousel image */
const portraitPhotos = [
  { img: pThroneFull,   cap: 'Full Regalia · The Atobase Title',            pos: 'center top' },
  { img: pThroneStaff,  cap: 'Portrait with Golden Throne · Klala Photography', pos: 'center top' },
  { img: pCrownClose,   cap: 'The ATOBASE Crown · Close Portrait',          pos: 'center top' },
  { img: pRedCarpet,    cap: 'Standing on the Atobase Carpet',               pos: 'center top' },
  { img: pGoldenThrone, cap: 'Beside the Royal Throne',                      pos: 'center 15%' },
  { img: pRaisingStaff, cap: 'Raising the Staff of Office',                  pos: 'center top' },
  { img: pAgbada,       cap: 'In White Agbada · Traditional Attire',         pos: 'center top' },
  { img: pSmiling,      cap: 'A Moment of Joy · Atobase Carpet',             pos: 'center top' },
  { img: pBowing,       cap: 'In Reverence · The Ceremony',                  pos: 'center top' },
  { img: c7,  cap: 'Royal Ceremony · Atobase Investiture 2024',           pos: 'center top' },
  { img: c8,  cap: 'The Investiture Procession · Okeluse Kingdom',        pos: 'center top' },
  { img: c9,  cap: 'Celebrating the New Title · Okeluse Kingdom',         pos: 'center top' },
  { img: c10, cap: 'A Historic Occasion · Atobase of Okeluse',            pos: 'center top' },
  { img: c11, cap: 'Moments of the Investiture · 2024',                   pos: 'center top' },
  { img: c12, cap: 'Community Celebration · Okeluse Kingdom',             pos: 'center top' },
  { img: c13, cap: 'The Atobase Receives His Title · 2024',               pos: 'center top' },
]

const ceremonyPhotos = [
  { img: c1,  cap: 'Receiving the Royal Instruments · The Investiture',   pos: 'center 40%' },
  { img: c2,  cap: 'With Okeluse Kingdom Royalty · Ceremony Day',         pos: 'center top' },
  { img: c3,  cap: 'A Royal Exchange · The Investiture Ceremony',         pos: 'center top' },
  { img: c4,  cap: 'Alongside HRM Oba Oloyede Adeyeoba · Okeluse Kingdom',pos: 'center top' },
  { img: c5,  cap: 'Standing with the Monarch · Ceremony Proceedings',    pos: 'center top' },
  { img: c6,  cap: 'Royal Gathering · Atobase Investiture 2024',          pos: 'center top' },
]

const REEL_ID = 'DO_19YViJGm'
const REEL_URL = `https://www.instagram.com/reel/${REEL_ID}/`
export default function Atobase() {
  const [activeTab, setActiveTab] = useState('portraits')
  useScrollReveal()

  return (
    <main className={styles.main}>

      {/* ══════════════ HERO ══════════════ */}
      <section className={styles.hero}>
        {/* LEFT: full-bleed dark bg, centred inner */}
        <div className={styles.heroLeft}>
          <div className={styles.heroLeftInner}>
            <div className={`${styles.eyebrow} fade-up`}>A Royal Honour</div>
            <div className={`${styles.kingdomTag} fade-up-d1`}>
              👑 Okeluse Kingdom · Ose LGA · Ondo State
            </div>
            <h1 className={`${styles.title} fade-up-d1`}>
              <em>Atobase</em>
              <strong>of Okeluse</strong>
              Kingdom
            </h1>
            <p className={`${styles.subtitle} fade-up-d2`}>
              Conferred upon Oyewale Areoye by His Royal Majesty, Oba Oloyede Adeyeoba
              Adekoya, Akinghare II — the Ojima Arujale of Okeluse Kingdom
            </p>
            <div className={`${styles.conferred} fade-up-d2`}>
              <div className={styles.conferredIcon}>🏛</div>
              <div className={styles.conferredText}>
                <strong>Bestowed by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II</strong>
                Ojima Arujale of Okeluse Kingdom, Ose LGA, Ondo State, Nigeria
              </div>
            </div>
            <div className={`${styles.date} fade-up-d3`}>
              Investiture Ceremony · Okeluse Kingdom · 2024
            </div>
          </div>
        </div>

        {/* RIGHT: portrait */}
        <div className={styles.heroRight}>
          <img
            src={heroImg}
            alt="Oyewale Areoye — Atobase of Okeluse Kingdom"
            className={styles.heroImg}
          />
          <div className={styles.heroRightOverlay} />
        </div>
      </section>

      {/* ══════════════ MEANING ══════════════ */}
      <section className={styles.meaningSection}>
        <div className={styles.meaningInner}>
          <div className="reveal">
            <div className="section-label">The Significance</div>
            <blockquote className={styles.meaningQ}>
              A chieftaincy title is not merely an honour — it is a covenant between a man
              and his community. A promise to serve, to protect, and to build.
            </blockquote>
            <div style={{ marginTop: '2.3rem' }}>
              <div className="section-label">The Title in Context</div>
              <p className={styles.contextText}>
                In Yoruba tradition, chieftaincy titles carry profound weight. The Atobase
                title is granted only to individuals who have demonstrated exemplary service,
                character, integrity, and meaningful contribution to the kingdom — whether
                by birth or by deed.
              </p>
            </div>
          </div>
          <div className="reveal reveal-d1">
            <div className="section-label">What It Means</div>
            <h2 className={styles.meaningTitle}>A Title Earned Through Service</h2>
            <p className={styles.meaningText}>
              The conferment of the Atobase title upon Oyewale Areoye stands as a remarkable
              testament to his character, contributions, and deep connection to the values of
              the Okeluse people.
            </p>
            <p className={styles.meaningText}>
              This title carries the responsibility of continued service, advocacy for the
              kingdom's interests, and the upholding of Yoruba cultural heritage.
            </p>
            <div className={styles.resps}>
              {responsibilities.map((r, i) => (
                <div key={r} className={`${styles.resp} reveal reveal-d${Math.min(i + 1, 4)}`}>
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ KINGDOM ══════════════ */}
      <section className={styles.kingdomSection}>
        <div className={styles.kingdomInner}>
          <div className="reveal">
            <div className="section-label" style={{ color: 'var(--gold)' }}>The Kingdom</div>
            <h2 className="section-title on-dark">About <em>Okeluse Kingdom</em></h2>
            <div className="gold-rule" />
            <p className={styles.kingdomIntro}>
              Okeluse Kingdom is an ancient and historically rich Yoruba community in Ose LGA,
              Ondo State. Governed by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II — one of
              the youngest monarchs in Yorubaland — the kingdom holds a proud heritage of
              bravery, culture, and resilience.
            </p>
          </div>
          <div className={styles.kingdomGrid}>
            {kingdomCards.map((k, i) => (
              <div key={k.title} className={`${styles.kcard} reveal reveal-d${(i % 3) + 1}`}>
                <div className={styles.kcardIcon}>{k.icon}</div>
                <h3 className={styles.kcardTitle}>{k.title}</h3>
                <p className={styles.kcardDesc}>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          INSTAGRAM REEL
          Desktop + mobile iframe; iOS/Android often defer playback to Instagram's
          embed UI — the poster link + buttons below preserve a reliable fallback.
      ══════════════════════════════════════════════ */}
      <section className={styles.reelSection}>
        <div className={styles.reelInner}>

          {/* LEFT: context */}
          <div className={`${styles.reelLeft} reveal`}>
            <div className="section-label">As Seen on Instagram</div>
            <h2 className={styles.reelTitle}>
              The Royal <em>Investiture</em><br />Goes Viral
            </h2>
            <div className="gold-rule" />
            <p className={styles.reelDesc}>
              The official Instagram page of the Arujale of Okeluse Kingdom shared the
              investiture moment — drawing thousands of reactions and comments from
              well-wishers across Nigeria and beyond. Watch, like, and share from right here.
            </p>
            <div className={styles.reelMeta}>
              <div className={styles.reelMetaItem}>
                <span>👑</span>
                <span>@officialarujale_of_okeluse</span>
              </div>
              <div className={styles.reelMetaItem}>
                <span>🎬</span>
                <span>Official Investiture Reel · 2024</span>
              </div>
            </div>
            <a
              href={REEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reelLink}
            >
              Open full post on Instagram →
            </a>
          </div>

          {/* RIGHT: embed */}
          <div className={`${styles.reelRight} reveal reveal-d1`}>
            <div className={styles.reelFrame}>
              <InstagramReelEmbed
                permalink={REEL_URL}
                title="Atobase of Okeluse Kingdom — Official Instagram Reel"
              />
            </div>
            <p className={styles.reelNote}>
              Tap the video to play. &nbsp;
              <a
                href={REEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.reelNoteLink}
              >
                Open on Instagram →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ GALLERY ══════════════ */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryInner}>
          <div className={styles.galleryHeader}>
            <div className="reveal">
              <div className="section-label">The Occasion</div>
              <h2 className="section-title">Investiture <em>Gallery</em></h2>
              <div className="gold-rule" />
              <p className={styles.gallerySub}>
                Photography: Klala Photography · Okeluse Kingdom · 2024
              </p>
            </div>
            <div className={`${styles.tabs} reveal reveal-d1`}>
              <button
                className={`${styles.tab} ${activeTab === 'portraits' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('portraits')}
              >
                Portrait Session
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'ceremony' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('ceremony')}
              >
                The Ceremony Day
              </button>
            </div>
          </div>

          {/* Desktop carousel */}
          <div className={styles.carouselWrap}>
            <GalleryCarousel
              key={activeTab}
              photos={activeTab === 'portraits' ? portraitPhotos : ceremonyPhotos}
            />
          </div>

          {/* Mobile flat grid */}
          <div className={styles.mobileGrid}>
            {(activeTab === 'portraits' ? portraitPhotos : ceremonyPhotos).map((p, i) => (
              <div key={i} className={styles.mGridItem}>
                <img
                  src={p.img}
                  alt={p.cap}
                  className={styles.mGridImg}
                  style={{ objectPosition: p.pos || 'center top' }}
                />
                <p className={styles.mGridCap}>{p.cap}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

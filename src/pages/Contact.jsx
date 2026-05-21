import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import styles from './Contact.module.css'

const contactItems = [
  { icon: '📍', label: 'Location', value: 'Lagos, Nigeria' },
  { icon: '✉', label: 'Email', value: 'areoyeoyewale@outlook.com', href: 'mailto:areoyeoyewale@outlook.com' },
  { icon: '📞', label: 'Phone', value: '+234 818 293 7320', href: 'tel:+2348182937320' },
  { icon: '🌐', label: 'Website', value: 'iamoltek.com', href: 'https://iamoltek.com' },
  {
    icon: '📸',
    label: 'Instagram — The Initiative',
    value: '@theyewaleinitiative',
    href: 'https://instagram.com/theoyewaleinitiative',
  },
]

const enquiryTypes = [
  'Professional Collaboration',
  'The Initiative / Partnership',
  'Speaking Engagement',
  'Media & Press',
  'Atobase / Kingdom Affairs',
  'General Enquiry',
]

export default function Contact() {
  useScrollReveal()

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroWatermark}>CONNECT</div>
        <div className={styles.heroContent}>
          <div className="section-label" style={{ color: 'var(--gold)' }}>Get in Touch</div>
          <h1 className={`${styles.heroTitle} fade-up`}>
            Let's Start a <em>Meaningful</em> Conversation
          </h1>
          <p className={styles.heroSub}>
            Whether it's professional collaboration, the Initiative, speaking engagements,
            or media enquiries — reach out. Every great partnership begins with a simple conversation.
          </p>
        </div>
      </section>

      <div className={styles.body}>
        <div className={`${styles.info} reveal`}>
          <h2 className={styles.infoTitle}>Contact Details</h2>
          {contactItems.map(c => (
            <div key={c.label} className={styles.ciItem}>
              <div className={styles.ciIcon}>{c.icon}</div>
              <div>
                <div className={styles.ciLabel}>{c.label}</div>
                {c.href ? (
                  <a
                    href={c.href}
                    className={styles.ciLink}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {c.value}
                  </a>
                ) : (
                  <div className={styles.ciValue}>{c.value}</div>
                )}
              </div>
            </div>
          ))}
          <div className={styles.socials}>
            <div className={styles.socTitle}>Follow on Social Media</div>
            <div className={styles.socRow}>
              {['📸', '💼', '𝕏', '𝐟'].map((icon, i) => (
                <a key={i} className={styles.socLink} href="#" aria-label={`Social ${i}`}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`${styles.formArea} reveal reveal-d1`}>
          <div className="section-label">Send a Message</div>
          <h3 className={styles.formTitle}>We'd love to hear from you</h3>
          <div className={styles.formRow}>
            <div className={styles.fg}>
              <label className={styles.flbl}>First Name</label>
              <input className={styles.finput} type="text" placeholder="First name" />
            </div>
            <div className={styles.fg}>
              <label className={styles.flbl}>Last Name</label>
              <input className={styles.finput} type="text" placeholder="Last name" />
            </div>
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Email Address</label>
            <input className={styles.finput} type="email" placeholder="your@email.com" />
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Enquiry Type</label>
            <select className={styles.fselect}>
              {enquiryTypes.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Your Message</label>
            <textarea className={styles.ftextarea} placeholder="Tell us how we can work together..." />
          </div>
          <button className="btn-gold" style={{ width: '100%', textAlign: 'center' }}>
            Send Message
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}

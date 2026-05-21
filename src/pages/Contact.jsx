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
    label: 'Instagram — Personal',
    value: '@iamoltek',
    href: 'https://instagram.com/iamoltek',
  },
  {
    icon: '📸',
    label: 'Instagram — The Initiative',
    value: '@theyewaleinitiative',
    href: 'https://instagram.com/theyewaleinitiative',
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

  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const firstName = fd.get('firstName')
    const lastName = fd.get('lastName')
    const email = fd.get('email')
    const enquiryType = fd.get('enquiryType')
    const message = fd.get('message')

    const subject = encodeURIComponent(`[Website Enquiry] - ${enquiryType}`)
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Enquiry Type: ${enquiryType}\n\n` +
      `Message:\n${message}`
    )
    
    window.location.href = `mailto:areoyeoyewale@outlook.com?subject=${subject}&body=${body}`
  }

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
              <a className={styles.socLink} href="https://instagram.com/iamoltek" target="_blank" rel="noopener noreferrer" aria-label="Personal Instagram">
                📸
              </a>
              <a className={styles.socLink} href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                💼
              </a>
              <a className={styles.socLink} href="https://instagram.com/theyewaleinitiative" target="_blank" rel="noopener noreferrer" aria-label="Initiative Instagram">
                🎗️
              </a>
              <a className={styles.socLink} href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                𝐟
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={`${styles.formArea} reveal reveal-d1`}>
          <div className="section-label">Send a Message</div>
          <h3 className={styles.formTitle}>We'd love to hear from you</h3>
          <div className={styles.formRow}>
            <div className={styles.fg}>
              <label className={styles.flbl}>First Name</label>
              <input className={styles.finput} name="firstName" type="text" placeholder="First name" required />
            </div>
            <div className={styles.fg}>
              <label className={styles.flbl}>Last Name</label>
              <input className={styles.finput} name="lastName" type="text" placeholder="Last name" required />
            </div>
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Email Address</label>
            <input className={styles.finput} name="email" type="email" placeholder="your@email.com" required />
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Enquiry Type</label>
            <select className={styles.fselect} name="enquiryType">
              {enquiryTypes.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className={styles.fg}>
            <label className={styles.flbl}>Your Message</label>
            <textarea className={styles.ftextarea} name="message" placeholder="Tell us how we can work together..." required />
          </div>
          <button type="submit" className="btn-gold" style={{ width: '100%', textAlign: 'center' }}>
            Send Message
          </button>
        </form>
      </div>

      <Footer />
    </main>
  )
}

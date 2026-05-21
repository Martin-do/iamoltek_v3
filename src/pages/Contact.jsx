import Footer from '../components/Footer'
import useScrollReveal from '../hooks/useScrollReveal'
import initiativeLogo from '../assets/initiative-logo.jpg'
import styles from './Contact.module.css'

const CustomInitiativeInstagramIcon = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '2px', display: 'flex', alignItems: 'center', justify: 'center' }}>
    <img 
      src={initiativeLogo} 
      alt="Initiative" 
      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }} 
    />
    <div style={{
      position: 'absolute',
      bottom: '-3px',
      right: '-3px',
      width: '16px',
      height: '16px',
      background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--cream)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
    }}>
      <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    </div>
  </div>
)

const MapPinIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
)

const MailIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.5 19.5 0 0 1 3.07-8.67A2 2 0 0 1 7.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const GlobeIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

const InstagramIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const LinkedInIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
)

const contactItems = [
  { icon: <MapPinIcon color="var(--gold-pale)" />, label: 'Location', value: 'Lagos, Nigeria' },
  { icon: <MailIcon color="var(--gold-pale)" />, label: 'Email', value: 'areoyeoyewale@outlook.com', href: 'mailto:areoyeoyewale@outlook.com' },
  { icon: <PhoneIcon color="var(--gold-pale)" />, label: 'Phone', value: '+234 818 293 7320', href: 'tel:+2348182937320' },
  { icon: <GlobeIcon color="var(--gold-pale)" />, label: 'Website', value: 'iamoltek.com', href: 'https://iamoltek.com' },
  {
    icon: <InstagramIcon color="var(--gold-pale)" />,
    label: 'Instagram — Personal',
    value: '@iamoltek',
    href: 'https://instagram.com/iamoltek',
  },
  {
    icon: <CustomInitiativeInstagramIcon />,
    label: 'Instagram — The Initiative',
    value: '@theoyewaleinitiative',
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
                <InstagramIcon color="currentColor" />
              </a>
              <a className={styles.socLink} href="https://www.linkedin.com/in/oyewale-areoye-69419053/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon color="currentColor" />
              </a>
              <a className={styles.socLink} href="https://instagram.com/theoyewaleinitiative" target="_blank" rel="noopener noreferrer" aria-label="Initiative Instagram" style={{ padding: 0 }}>
                <CustomInitiativeInstagramIcon />
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

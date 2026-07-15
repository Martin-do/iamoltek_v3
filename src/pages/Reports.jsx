import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { reports } from '../data/reportsData'
import styles from './Reports.module.css'

function ImpactCard({ report }) {
  const primaryMetric = report.metrics?.[0]

  return (
    <article className={styles.card}>
      <div className={styles.cardImageWrap}>
        <img src={report.cover} alt="" loading="lazy" className={styles.cardImage} style={{ objectPosition: report.coverPosition }} />
        <span className={styles.cardTag}>{report.programme || report.tag}</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardMeta}>{report.locationShort || report.location} · {report.date}</p>
        <h3>{report.headline || report.title}</h3>
        <p>{report.summary}</p>
        <div className={styles.cardFooter}>
          {primaryMetric && <span><strong>{primaryMetric[0]}</strong> {primaryMetric[1]}</span>}
          <Link to={`/initiative/impact/${report.slug}`}>Read impact story →</Link>
        </div>
      </div>
    </article>
  )
}

export default function Reports() {
  const completed = reports
    .filter(report => report.status === 'completed')
    .sort((a, b) => new Date(b.dateISO) - new Date(a.dateISO))
  const upcoming = reports.filter(report => report.status === 'upcoming')
  const [featured, ...older] = completed

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>Our work in the field</div>
          <h1>Impact in <em>Action.</em></h1>
          <p>Stories of compassion translated into measurable action—across communities, families and lives.</p>
        </div>
      </section>

      <section className={styles.archive}>
        <div className={styles.inner}>
          <header className={styles.sectionHeader}>
            <div><div className={styles.eyebrow}>Latest intervention</div><h2>From the <em>field</em></h2></div>
            <span>2026 Impact Journal</span>
          </header>

          {featured && (
            <article className={styles.featured}>
              <div className={styles.featureImageWrap}>
                <img src={featured.cover} alt="" fetchPriority="high" className={styles.featureImage} style={{ objectPosition: featured.coverPosition }} />
              </div>
              <div className={styles.featureCopy}>
                <span className={styles.tag}>{featured.programme || featured.tag}</span>
                <h2>{featured.headline || featured.title}</h2>
                <p className={styles.meta}>{featured.locationShort || featured.location} · {featured.date}</p>
                <p className={styles.summary}>{featured.summary}</p>
                <div className={styles.impactLine}>
                  {featured.metrics?.[0] && <span><strong>{featured.metrics[0][0]}</strong>{featured.metrics[0][1]}</span>}
                  <Link to={`/initiative/impact/${featured.slug}`}>Read impact story →</Link>
                </div>
              </div>
            </article>
          )}

          {older.length > 0 && <div className={styles.grid}>{older.map(report => <ImpactCard key={report.slug} report={report} />)}</div>}

          {upcoming.length > 0 && (
            <section className={styles.upcoming}>
              <div><div className={styles.eyebrow}>What comes next</div><h2>Upcoming <em>work</em></h2></div>
              {upcoming.map(report => <Link key={report.slug} to={`/initiative/impact/${report.slug}`} className={styles.upcomingLink}><span>{report.title}</span><span>{report.locationShort || report.location} →</span></Link>)}
            </section>
          )}
        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

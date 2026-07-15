import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import InstagramReelEmbed from '../components/InstagramReelEmbed'
import { getReport } from '../data/reportsData'
import styles from './ReportDetail.module.css'

function MediaItem({ item, featured }) {
  if (item.type === 'video') {
    return (
      <figure className={`${styles.mediaItem} ${featured ? styles.mediaFeatured : ''}`}>
        <video controls preload="metadata" poster={item.poster} aria-label={item.caption}>
          <source src={item.src} type={item.mimeType || 'video/mp4'} />
        </video>
        <figcaption>{item.caption}</figcaption>
      </figure>
    )
  }

  return (
    <figure className={`${styles.mediaItem} ${featured ? styles.mediaFeatured : ''}`}>
      <img src={item.src} alt={item.alt || item.caption} style={{ objectPosition: item.position || 'center' }} />
      <figcaption>{item.caption}</figcaption>
    </figure>
  )
}

export default function ReportDetail() {
  const { slug } = useParams()
  const report = getReport(slug)

  if (!report) {
    return <main className={styles.notFound}><h1>Impact story not found</h1><Link to="/initiative/impact" className="btn-burg">Back to Impact</Link></main>
  }

  const distributionMax = Math.max(...(report.distribution?.flatMap(area => area.communities.map(([, packs]) => packs)) || [1]))
  const media = report.media || []

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link to="/initiative/impact" className={styles.back}>← Impact Journal</Link>
          <div className={styles.eyebrow}>{report.programme || report.tag} · {report.locationShort || report.location}</div>
          <h1>{report.headline || report.title}</h1>
          <p>{report.date} · {report.location}</p>
        </div>
        <div className={styles.heroImageWrap}>
          <img src={report.cover} alt="" fetchPriority="high" className={styles.heroImage} style={{ objectPosition: report.coverPosition }} />
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.inner}>
          {report.metrics?.length > 0 && <div className={styles.metrics}>{report.metrics.slice(0, 3).map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}

          <div className={styles.narrative}>
            <div><div className={styles.eyebrow}>Why it mattered</div><h2>{report.contextTitle || 'Compassion translated into action'}</h2></div>
            <div className={styles.prose}><p className={styles.intro}>{report.intro}</p>{report.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>

          {report.reliefItems?.length > 0 && <section className={styles.materials}><div className={styles.eyebrow}>What was provided</div><h2>Essential relief <em>materials</em></h2><ul>{report.reliefItems.map(item => <li key={item}>{item}</li>)}</ul></section>}

          {report.distribution?.length > 0 && (
            <section className={styles.distribution}>
              <div className={styles.eyebrow}>Distribution footprint</div>
              <h2>Where support <em>reached</em></h2>
              <div className={styles.areaSummary}>{report.distribution.map(area => <span key={area.area}><strong>{area.total}</strong>{area.area}</span>)}</div>
              <div className={styles.bars} aria-label="Distribution by community">
                {report.distribution.flatMap(area => area.communities.map(([community, packs]) => (
                  <div className={styles.barRow} key={`${area.area}-${community}`}>
                    <span>{community}</span><div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${(packs / distributionMax) * 100}%` }} /></div><strong>{packs}</strong>
                  </div>
                )))}
              </div>
            </section>
          )}

          {media.length > 0 && <section className={styles.mediaSection}><div className={styles.eyebrow}>From the field</div><h2>Photos & <em>video</em></h2><div className={styles.mediaGrid}>{media.map((item, index) => <MediaItem key={`${item.type}-${item.src}`} item={item} featured={index === 0} />)}</div></section>}

          {report.reportDocument && (
            <section className={styles.documentSection}>
              <a href={report.reportDocument} target="_blank" rel="noreferrer" className={styles.documentPreview}><img src={report.reportDocument} loading="lazy" alt={`${report.title} original field report`} /></a>
              <div><div className={styles.eyebrow}>Original field report</div><h2>Documenting the <em>intervention</em></h2><p>The designed field report is preserved as supporting documentation, while this page presents the complete story in an accessible format.</p><a href={report.reportDocument} target="_blank" rel="noreferrer" className="btn-burg">View Full Report</a></div>
            </section>
          )}

          {report.instagramPosts?.length > 0 && <section className={styles.instagram}><div className={styles.eyebrow}>From Instagram</div><div className={styles.embeds}>{report.instagramPosts.map(url => <InstagramReelEmbed key={url} permalink={url} title={`${report.title} on Instagram`} />)}</div></section>}

          <aside className={styles.cta}><div><span>Continue the impact</span><h2>Help us reach the next community.</h2></div><Link to="/initiative#donate" className="btn-gold">Support an Intervention</Link></aside>
        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import InstagramReelEmbed from '../components/InstagramReelEmbed'
import { getCampaignLocation } from '../data/reportsData'
import styles from './ReportDetail.module.css'

function MediaItem({ item, featured }) {
  if (item.type === 'video') return <figure className={`${styles.mediaItem} ${featured ? styles.mediaFeatured : ''}`}><video controls preload="metadata" poster={item.poster} aria-label={item.caption}><source src={item.src} type={item.mimeType || 'video/mp4'} /></video><figcaption>{item.caption}</figcaption></figure>
  return <figure className={`${styles.mediaItem} ${featured ? styles.mediaFeatured : ''}`}><img src={item.src} loading="lazy" alt={item.alt || item.caption} style={{ objectPosition: item.position || 'center' }} /><figcaption>{item.caption}</figcaption></figure>
}

export default function ReportDetail() {
  const { campaignSlug, locationSlug } = useParams()
  const { campaign, location: report } = getCampaignLocation(campaignSlug, locationSlug)

  if (!campaign || !report) return <main className={styles.notFound}><h1>Location report not found</h1><Link to="/initiative/impact" className="btn-burg">Back to Impact</Link></main>

  const distributionMax = Math.max(...(report.distribution?.flatMap(area => area.communities.map(([, packs]) => packs)) || [1]))
  const media = report.media || []
  const hasHeroImage = media.length > 0
  const locationIndex = campaign.locations.findIndex(item => item.slug === report.slug)
  const previous = campaign.locations[locationIndex - 1]
  const next = campaign.locations[locationIndex + 1]

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${!hasHeroImage ? styles.heroNoImage : ''}`}>
          <div className={styles.heroCopy}>
            <Link to={`/initiative/impact/${campaign.slug}`} className={styles.back}>← {campaign.title}</Link>
            <div className={styles.eyebrow}>{report.programme} · {report.state}</div>
            <h1>{report.headline}</h1>
            <p>{report.date} · {report.location}</p>
          </div>
          {hasHeroImage && <div className={styles.heroImageWrap}><img src={report.cover} alt="" fetchPriority="high" className={styles.heroImage} style={{ objectPosition: report.coverPosition }} /></div>}
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.inner}>
          <div className={styles.metrics}>{report.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>

          <nav className={styles.reportNav} aria-label="On this report">
            <span>On this report</span>
            <div>
              <a href="#summary">Summary</a>
              {media.length > 0 && <a href="#field-photos">Field photos</a>}
              <a href="#delivery">Delivery</a>
              <a href="#outcomes">Outcomes</a>
            </div>
          </nav>

          <section className={styles.narrative} id="summary">
            <div><div className={styles.eyebrow}>Executive summary</div><h2>{report.contextTitle}</h2>{report.beneficiary && <div className={styles.beneficiary}><span>Beneficiary institution</span><strong>{report.beneficiary}</strong></div>}</div>
            <div className={styles.prose}>{report.executiveSummary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          {media.length > 0 && <section className={styles.mediaSection} id="field-photos"><div className={styles.mediaHeading}><div><div className={styles.eyebrow}>From the field</div><h2>The outreach in <em>pictures</em></h2></div><p>Selected moments from the intervention. Beneficiary identities have been protected in the published photographs.</p></div><div className={styles.mediaGrid}>{media.map((item, index) => <MediaItem key={`${item.type}-${item.src}`} item={item} featured={index === 0} />)}</div></section>}

          <section className={styles.twoColumnLists} id="delivery">
            <div><div className={styles.eyebrow}>Objectives</div><h2>What we set out to <em>achieve</em></h2><ul>{report.objectives.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><div className={styles.eyebrow}>Activities</div><h2>What took <em>place</em></h2><ul>{report.activities.map(item => <li key={item}>{item}</li>)}</ul></div>
          </section>

          {report.reliefItems?.length > 0 && <section className={styles.materials}><div className={styles.eyebrow}>Relief items donated</div><h2>Practical support for <em>daily needs</em></h2><ul>{report.reliefItems.map(item => <li key={item}>{item}</li>)}</ul></section>}

          {report.distribution?.length > 0 && <section className={styles.distribution}><div className={styles.eyebrow}>Distribution footprint</div><h2>Where support <em>reached</em></h2><div className={styles.areaSummary}>{report.distribution.map(area => <span key={area.area}><strong>{area.total}</strong>{area.area}</span>)}</div><div className={styles.bars} aria-label="Distribution by community">{report.distribution.flatMap(area => area.communities.map(([community, packs]) => <div className={styles.barRow} key={`${area.area}-${community}`}><span>{community}</span><div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${(packs / distributionMax) * 100}%` }} /></div><strong>{packs}</strong></div>))}</div></section>}

          <section className={styles.outcomeGrid} id="outcomes">
            <div><div className={styles.eyebrow}>Impact</div><h2>Support that strengthens <em>care</em></h2><p>{report.impact}</p></div>
            <div><div className={styles.eyebrow}>Acknowledgement</div><h2>Made possible <em>together</em></h2><p>{report.acknowledgement}</p></div>
          </section>

          <section className={styles.conclusion}><blockquote>{report.conclusion}</blockquote><span>Empowering People. Transforming Communities.</span></section>

          {report.instagramPosts?.length > 0 && (
            <section className={styles.instagram} aria-labelledby="related-instagram">
              <div className={styles.instagramHeading}>
                <div className={styles.eyebrow}>Related post</div>
                <h2 id="related-instagram">See the outreach on <em>Instagram</em></h2>
              </div>
              <div className={styles.embeds}>{report.instagramPosts.map(url => <InstagramReelEmbed key={url} permalink={url} title={`${report.title} on Instagram`} />)}</div>
            </section>
          )}

          <nav className={styles.locationNav} aria-label="Other state reports">{previous ? <Link to={`/initiative/impact/${campaign.slug}/${previous.slug}`}><span>Previous report</span><strong>← {previous.title}</strong></Link> : <span />}{next ? <Link to={`/initiative/impact/${campaign.slug}/${next.slug}`}><span>Next report</span><strong>{next.title} →</strong></Link> : <span />}</nav>
          <aside className={styles.cta}><div><span>Continue the impact</span><h2>Help us reach the next community.</h2></div><Link to="/initiative#donate" className="btn-gold">Support an Intervention</Link></aside>
        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

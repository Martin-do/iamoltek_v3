import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import InstagramReelEmbed from '../components/InstagramReelEmbed'
import ChatExchange from '../components/ChatExchange'
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
  const hasHeroImage = media.length > 0 || Boolean(report.heroPortrait || report.heroFramed)
  const showGallery = media.length > 0 && !report.hideMediaGallery
  const locationIndex = campaign.locations.findIndex(item => item.slug === report.slug)
  const previous = campaign.locations[locationIndex - 1]
  const next = campaign.locations[locationIndex + 1]
  // A single-report project has no overview page: its back link goes to the Impact Journal
  const isProject = campaign.kind === 'project'

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} ${!hasHeroImage ? styles.heroNoImage : ''}`}>
          <div className={styles.heroCopy}>
            <Link to={isProject ? '/initiative/impact' : `/initiative/impact/${campaign.slug}`} className={styles.back}>← {isProject ? 'Impact Journal' : campaign.title}</Link>
            <div className={styles.eyebrow}>{report.state ? `${report.programme} · ${report.state}` : report.programme}</div>
            <h1>{report.headline}</h1>
            <p>{report.date} · {report.location}</p>
          </div>
          {hasHeroImage && (report.heroPortrait ? (
            <div className={styles.portraitWrap}>
              <img src={report.cover} alt="" fetchPriority="high" className={styles.portrait} />
              <div className={styles.portraitOverlay} />
            </div>
          ) : report.heroFramed ? (
            <div className={styles.heroFramedWrap}><img src={report.cover} alt="" fetchPriority="high" className={styles.heroFramedImg} /></div>
          ) : (
            <div className={styles.heroImageWrap}><img src={report.cover} alt="" fetchPriority="high" className={styles.heroImage} style={{ objectPosition: report.coverPosition }} /></div>
          ))}
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.inner}>
          <div className={`${styles.metrics} ${report.metrics.length < 3 ? styles.metricsCompact : ''} reveal-stagger`}>{report.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>

          <nav className={styles.reportNav} aria-label="On this report">
            <span>On this report</span>
            <div>
              <a href="#summary">Summary</a>
              {report.schools && <a href="#schools">Schools</a>}
              {showGallery && <a href="#field-photos">{isProject ? 'Photographs' : 'Field photos'}</a>}
              <a href="#delivery">Delivery</a>
              {report.testimonial && <a href="#words">Her words</a>}
              <a href="#outcomes">Outcomes</a>
            </div>
          </nav>

          <section className={`${styles.narrative} reveal`} id="summary">
            <div><div className={styles.eyebrow}>Executive summary</div><h2>{report.contextTitle}</h2>{report.beneficiary && <div className={styles.beneficiary}><span>{report.beneficiaryLabel || 'Beneficiary institution'}</span><strong>{report.beneficiary}</strong></div>}</div>
            <div className={styles.prose}>{report.executiveSummary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </section>

          {report.awardImage && (
            <section className={`${styles.awardSection} reveal`}>
              <figure>
                <img src={report.awardImage.src} alt={report.awardImage.alt} loading="lazy" />
                <figcaption>{report.awardImage.caption}</figcaption>
              </figure>
            </section>
          )}

          {report.schools && (
            <section className={`${styles.schools} reveal`} id="schools">
              <div className={styles.eyebrow}>Beneficiary schools</div>
              <h2>Where the support <em>reached</em></h2>
              <table className={styles.schoolTable}>
                <thead><tr><th scope="col">School</th><th scope="col">Pupils</th><th scope="col">Teachers</th></tr></thead>
                <tbody>
                  {report.schools.rows.map(row => (
                    <tr key={row.name}>
                      <th scope="row"><strong>{row.name}</strong><span>{row.place}</span></th>
                      <td>{row.pupils}</td>
                      <td>{row.teachers}</td>
                    </tr>
                  ))}
                  <tr className={styles.schoolSub}><th scope="row">{report.schools.subtotal.label}</th><td>{report.schools.subtotal.pupils}</td><td>{report.schools.subtotal.teachers}</td></tr>
                  <tr>
                    <th scope="row"><strong>{report.schools.extra.label}</strong><span>{report.schools.extra.place}</span></th>
                    <td>{report.schools.extra.pupils}</td>
                    <td>{report.schools.extra.teachers || '–'}</td>
                  </tr>
                  <tr className={styles.schoolTotal}><th scope="row">{report.schools.total.label}</th><td>{report.schools.total.pupils}</td><td>{report.schools.total.teachers}</td></tr>
                </tbody>
              </table>
              <p className={styles.schoolNote}>{report.schools.note}</p>
            </section>
          )}

          {showGallery && <section className={`${styles.mediaSection} reveal`} id="field-photos"><div className={styles.mediaHeading}><div><div className={styles.eyebrow}>{isProject ? 'Documentation' : 'From the field'}</div><h2>{report.mediaHeading || 'The outreach in'} <em>pictures</em></h2></div><p>{report.mediaIntro || 'Selected moments from the intervention. Beneficiary identities have been protected in the published photographs.'}</p></div><div className={`${styles.mediaGrid} reveal-stagger`}>{media.map((item, index) => <MediaItem key={`${item.type}-${item.src}`} item={item} featured={index === 0} />)}</div></section>}

          <section className={`${styles.twoColumnLists} reveal`} id="delivery">
            <div><div className={styles.eyebrow}>Objectives</div><h2>What we set out to <em>achieve</em></h2><ul>{report.objectives.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><div className={styles.eyebrow}>Activities</div><h2>What took <em>place</em></h2><ul>{report.activities.map(item => <li key={item}>{item}</li>)}</ul></div>
          </section>

          {report.materialGroups?.length > 0 && (
            <section className={`${styles.materialGroups} reveal`}>
              <div className={styles.eyebrow}>Materials provided</div>
              <h2>What each group <em>received</em></h2>
              <div className={styles.materialCols}>
                {report.materialGroups.map(group => (
                  <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>
                ))}
              </div>
            </section>
          )}

          {report.reliefItems?.length > 0 &&<section className={`${styles.materials} reveal`}><div className={styles.eyebrow}>Relief items donated</div><h2>Practical support for <em>daily needs</em></h2><ul>{report.reliefItems.map(item => <li key={item}>{item}</li>)}</ul></section>}

          {report.distribution?.length > 0 && <section className={`${styles.distribution} reveal`}><div className={styles.eyebrow}>Distribution footprint</div><h2>Where support <em>reached</em></h2><div className={styles.areaSummary}>{report.distribution.map(area => <span key={area.area}><strong>{area.total}</strong>{area.area}</span>)}</div><div className={styles.bars} aria-label="Distribution by community">{report.distribution.flatMap(area => area.communities.map(([community, packs]) => <div className={styles.barRow} key={`${area.area}-${community}`}><span>{community}</span><div className={styles.barTrack}><div className={styles.barFill} style={{ width: `${(packs / distributionMax) * 100}%` }} /></div><strong>{packs}</strong></div>))}</div></section>}

          {report.testimonial && (
            <section className={`${styles.testimonial} reveal`} id="words">
              <div className={styles.eyebrow}>In her own words</div>
              <h2>A message <em>back</em></h2>
              <ChatExchange {...report.testimonial} />
            </section>
          )}

          <section className={`${styles.outcomeGrid} reveal`} id="outcomes">
            <div><div className={styles.eyebrow}>Impact</div><h2>Support that strengthens <em>care</em></h2><p>{report.impact}</p></div>
            <div><div className={styles.eyebrow}>Acknowledgement</div><h2>Made possible <em>together</em></h2><p>{report.acknowledgement}</p></div>
          </section>

          <section className={`${styles.conclusion} reveal`}><blockquote>{report.conclusion}</blockquote><span>Empowering People. Transforming Communities.</span></section>

          {report.pdf && (
            <section className={`${styles.download} reveal`}>
              <div><span>The full report</span><p>{report.pdf.meta}</p></div>
              <a href={report.pdf.href} className="btn-burg" download>{report.pdf.label}</a>
            </section>
          )}

          {report.instagramPosts?.length > 0 && (
            <section className={styles.instagram} aria-labelledby="related-instagram">
              <div className={styles.instagramHeading}>
                <div className={styles.eyebrow}>Related post</div>
                <h2 id="related-instagram">See the outreach on <em>Instagram</em></h2>
              </div>
              <div className={styles.embeds}>{report.instagramPosts.map(url => <InstagramReelEmbed key={url} permalink={url} title={`${report.title} on Instagram`} />)}</div>
            </section>
          )}

          {(previous || next) && <nav className={styles.locationNav} aria-label="Other state reports">{previous ? <Link to={`/initiative/impact/${campaign.slug}/${previous.slug}`}><span>Previous report</span><strong>← {previous.title}</strong></Link> : <span />}{next ? <Link to={`/initiative/impact/${campaign.slug}/${next.slug}`}><span>Next report</span><strong>{next.title} →</strong></Link> : <span />}</nav>}
          <aside className={`${styles.cta} reveal`}><div><span>Continue the impact</span><h2>Help us reach the next community.</h2></div><Link to="/initiative#donate" className="btn-gold">Support an Intervention</Link></aside>
        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

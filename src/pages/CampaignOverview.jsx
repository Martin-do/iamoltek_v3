import { Link, useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import { getCampaign, getLocationGroups } from '../data/reportsData'
import styles from './CampaignOverview.module.css'

export default function CampaignOverview() {
  const { campaignSlug } = useParams()
  const campaign = getCampaign(campaignSlug)

  if (!campaign) return <main className={styles.notFound}><h1>Campaign not found</h1><Link to="/initiative/impact" className="btn-burg">Back to Impact</Link></main>

  const isIndividual = campaign.kind === 'individual'
  const locationGroups = isIndividual
    ? [{ state: null, locations: campaign.locations }]
    : getLocationGroups(campaign)
  const [taglineTop, taglineBottom] = campaign.overviewTagline || ['One mission.', 'Three states.']
  const storyNoun = campaign.locations.length === 1 ? 'story' : 'stories'

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <Link to="/initiative/impact" className={styles.back}>← Impact Journal</Link>
            <div className={styles.eyebrow}>{campaign.programme} · {campaign.date}</div>
            <h1>{campaign.headline}</h1>
            <p>{campaign.summary}</p>
          </div>
          {campaign.heroPortrait ? (
            <div className={styles.portraitWrap}>
              <img className={styles.portrait} src={campaign.cover} alt="" />
              <div className={styles.portraitOverlay} />
            </div>
          ) : campaign.heroFramed ? (
            <div className={styles.heroFramedWrap}><img className={styles.heroFramedImg} src={campaign.cover} alt="" /></div>
          ) : (
            <div className={styles.heroImageWrap}><img src={campaign.cover} alt="" style={{ objectPosition: campaign.coverPosition }} /></div>
          )}
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.inner}>
          {campaign.metrics.length > 0 && (
            <div className={`${styles.metrics} reveal-stagger`}>{campaign.metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          )}
          <div className={styles.intro}><div><div className={styles.eyebrow}>The campaign</div><h2>{taglineTop}<br /><em>{taglineBottom}</em></h2></div><p>{campaign.intro}</p></div>

          <header className={styles.locationHeader}>
            <div><div className={styles.eyebrow}>{isIndividual ? 'The stories' : 'State reports'}</div><h2>{isIndividual ? <>Meet the <em>people</em></> : <>Explore each <em>outreach</em></>}</h2></div>
            <span>{campaign.locations.length} {isIndividual ? storyNoun : `field report${campaign.locations.length === 1 ? '' : 's'}`}</span>
          </header>
          <div className={styles.stateGroups}>
            {locationGroups.map(group => (
              <section className={`${styles.stateGroup} reveal`} key={group.state || 'all'}>
                {group.state && <div className={styles.stateTitle}><span>{group.state}</span><small>{group.locations.length} report{group.locations.length === 1 ? '' : 's'}</small></div>}
                <div className={styles.locationGrid} style={!group.state ? { gridColumn: '1 / -1' } : undefined}>
                  {group.locations.map(location => (
                    <Link to={`/initiative/impact/${campaign.slug}/${location.slug}`} className={styles.locationCard} key={location.slug}>
                      {location.media?.length > 0 ? (
                        <div className={styles.locationImage}><img src={location.cover} alt="" loading="lazy" style={{ objectPosition: location.coverPosition }} />{!isIndividual && <span>{location.state}</span>}</div>
                      ) : (
                        <div className={styles.locationTextPanel}>
                          {!isIndividual && <span>{location.state}</span>}
                          <strong>{location.metrics[0][0]}</strong>
                          <p>{location.metrics[0][1]}</p>
                        </div>
                      )}
                      <div className={styles.locationBody}>
                        <p>{location.date} · {location.locationShort}</p>
                        <h3>{location.title}</h3>
                        {location.metrics?.length > 0 && <div className={styles.locationMetric}><strong>{location.metrics[0][0]}</strong><span>{location.metrics[0][1]}</span></div>}
                        <span className={styles.cardLink}>{location.ctaLabel || 'View Full State Report →'}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

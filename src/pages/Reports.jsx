import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { campaigns, getLocationGroups } from '../data/reportsData'
import styles from './Reports.module.css'

export default function Reports() {
  const completed = campaigns.filter(campaign => campaign.status === 'completed')
  const upcoming = campaigns.filter(campaign => campaign.status === 'upcoming')

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Our work in the field</div>
          <h1>Impact in <em>Action.</em></h1>
          <p>Explore coordinated programmes and the individual communities reached through each intervention.</p>
        </div>
      </section>

      <section className={styles.archive}>
        <div className={styles.inner}>
          <header className={styles.sectionHeader}>
            <div><div className={styles.eyebrow}>Impact campaigns</div><h2>Stories of <em>service</em></h2></div>
            <span>2026 Impact Journal</span>
          </header>

          <div className={styles.campaignGrid}>
            {completed.map(campaign => {
              const locationGroups = getLocationGroups(campaign)

              return (
                <article className={styles.campaignCard} key={campaign.slug}>
                  <div className={styles.imageWrap}>
                    <img src={campaign.cover} alt="" style={{ objectPosition: campaign.coverPosition }} />
                    <span className={styles.tag}>{campaign.programme}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <p className={styles.meta}>{campaign.location} · {campaign.date}</p>
                    <h2>{campaign.headline}</h2>
                    <p>{campaign.summary}</p>
                    <div className={styles.metrics}>{campaign.metrics.map(([value, label]) => <span key={label}><strong>{value}</strong>{label}</span>)}</div>
                    <div className={styles.reportAccess}>
                      <span>Open a full state report</span>
                      <div>
                        {locationGroups.map(group => (
                          <div className={styles.reportGroup} key={group.state}>
                            <small>{group.state}</small>
                            {group.locations.map(location => <Link key={location.slug} to={`/initiative/impact/${campaign.slug}/${location.slug}`}>{location.title}<b>→</b></Link>)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link to={`/initiative/impact/${campaign.slug}`} className={styles.storyLink}>View Campaign Overview</Link>
                  </div>
                </article>
              )
            })}
          </div>

          {upcoming.length > 0 && <section className={styles.upcoming}><div><div className={styles.eyebrow}>What comes next</div><h2>Upcoming <em>work</em></h2></div><div>{upcoming.map(campaign => <article key={campaign.slug}><span>{campaign.programme}</span><h3>{campaign.title}</h3><p>{campaign.summary}</p></article>)}</div></section>}
        </div>
      </section>
      <Footer variant="initiative" />
    </main>
  )
}

/**
 * Single source of truth for page titles, descriptions and share-preview images.
 *
 * Used in two places:
 *  - the browser (App.jsx) keeps <title>/meta tags in sync while navigating
 *  - scripts/build-seo.mjs writes a pre-rendered HTML file per page, generates the
 *    1200x630 preview images, robots.txt and sitemap.xml after `vite build`
 *
 * `og.src` is an imported image; `og.template` picks how the preview is composed:
 *   portrait — dark card, site logo left, photo right
 *   logo     — the Initiative logo on its own background
 *   photo    — the photo cropped to fill the card
 */
import heroPortrait from '../assets/hero-portrait.png'
import aboutWalking from '../assets/about-walking-v2.jpg'
import atobasePortrait from '../assets/portrait-golden-throne.jpg'
import initiativeLogo from '../assets/initiative-logo.jpg'
import { campaigns } from '../data/reportsData'

export const SITE_URL = 'https://iamoltek.com'
export const SITE_NAME = 'Oyewale Areoye'
const INITIATIVE = 'The Oyewale Areoye Initiative'

const SOCIAL = {
  linkedin: 'https://www.linkedin.com/in/oyewale-areoye-69419053/',
  instagram: 'https://instagram.com/iamoltek',
  initiativeInstagram: 'https://instagram.com/theoyewaleareoyeinitiative',
}

export function ogImagePath(path) {
  const slug = path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '--')
  return `/og/${slug}.jpg`
}

const person = {
  '@type': 'Person',
  name: 'Oyewale Areoye',
  alternateName: 'iamoltek',
  url: SITE_URL,
  jobTitle: 'Facility Management & Real Estate Executive',
  worksFor: [
    { '@type': 'Organization', name: 'Circle Point Group', url: 'https://circlepoint.com.ng/' },
    { '@type': 'Organization', name: 'Petik Limited', url: 'https://petiklimited.com/' },
  ],
  sameAs: [SOCIAL.linkedin, SOCIAL.instagram],
}

const initiativeOrg = {
  '@type': 'NGO',
  name: INITIATIVE,
  url: `${SITE_URL}/initiative`,
  slogan: 'Empowering People. Transforming Communities.',
  email: 'areoyeoyewale@outlook.com',
  telephone: '+2348182937320',
  founder: { '@type': 'Person', name: 'Oyewale Areoye', url: SITE_URL },
  sameAs: [SOCIAL.initiativeInstagram],
}

const staticPages = [
  {
    path: '/',
    title: 'Oyewale Areoye | Real Estate & Facility Management Executive',
    description: 'Official platform of Oyewale Areoye (@iamoltek): real estate and facility management executive, founder of The Oyewale Areoye Initiative, and Atobase of Okeluse Kingdom.',
    type: 'profile',
    og: { template: 'portrait', src: heroPortrait, alt: 'Oyewale Areoye' },
    jsonLd: { ...person, image: `${SITE_URL}${ogImagePath('/')}` },
  },
  {
    path: '/about',
    title: 'About Oyewale Areoye | Career, Certifications & Leadership',
    description: 'Over 11 years in facility management and real estate: co-founder of Circle Point Group, Executive Director at Petik Limited, and certified CIWFM, CBAP and IOPM professional.',
    type: 'profile',
    og: { template: 'portrait', src: aboutWalking, alt: 'Oyewale Areoye' },
  },
  {
    path: '/initiative',
    title: `${INITIATIVE} | Empowering People. Transforming Communities.`,
    description: 'A CAC-registered Nigerian charitable initiative investing in education, youth empowerment, food relief and community development. See our work and support a project.',
    og: { template: 'logo', src: initiativeLogo, alt: INITIATIVE },
    jsonLd: { ...initiativeOrg, logo: `${SITE_URL}${ogImagePath('/initiative')}` },
  },
  {
    path: '/initiative/impact',
    title: `Impact in Action: Field Reports | ${INITIATIVE}`,
    description: 'Stories and field reports from the relief outreaches and community projects delivered by The Oyewale Areoye Initiative across Lagos, Oyo and Osun States.',
    og: { template: 'photo', src: campaigns.find(c => c.status === 'completed')?.cover || initiativeLogo, alt: 'Beneficiaries of an Initiative outreach' },
  },
  {
    path: '/initiative/posts',
    title: `Daily Reflections | ${INITIATIVE}`,
    description: 'Every daily reflection published by The Oyewale Areoye Initiative, on purpose, resilience, service and community.',
    og: { template: 'logo', src: initiativeLogo, alt: INITIATIVE },
  },
  {
    path: '/atobase',
    title: 'Atobase of Okeluse Kingdom | Oyewale Areoye',
    description: 'The chieftaincy title of Atobase of Okeluse Kingdom, Ose LGA, Ondo State, conferred on Oyewale Areoye by HRM Oba Oloyede Adeyeoba Adekoya, Akinghare II.',
    og: { template: 'portrait', src: atobasePortrait, alt: 'Oyewale Areoye, Atobase of Okeluse Kingdom' },
  },
  {
    path: '/contact',
    title: 'Contact Oyewale Areoye | Partnerships, Speaking & Media',
    description: 'Get in touch with Oyewale Areoye for professional collaboration, partnerships with The Oyewale Areoye Initiative, speaking engagements and media enquiries.',
    og: { template: 'portrait', src: heroPortrait, alt: 'Oyewale Areoye' },
  },
]

function campaignPages() {
  return campaigns.flatMap(campaign => {
    const hasPhotos = campaign.status === 'completed'
    const campaignPage = {
      path: `/initiative/impact/${campaign.slug}`,
      title: `${campaign.title} | ${INITIATIVE}`,
      description: campaign.summary,
      type: 'article',
      og: hasPhotos
        ? { template: 'photo', src: campaign.cover, position: campaign.coverPosition, alt: campaign.coverAlt || campaign.headline }
        : { template: 'logo', src: initiativeLogo, alt: INITIATIVE },
    }

    const locationPages = (campaign.locations || []).map(location => {
      const path = `/initiative/impact/${campaign.slug}/${location.slug}`
      const withPhoto = location.media?.length > 0
      return {
        path,
        title: `${location.title}, ${location.date} | ${INITIATIVE}`,
        description: location.summary,
        type: 'article',
        og: withPhoto
          ? { template: 'photo', src: location.cover, position: location.coverPosition, alt: location.headline }
          : { template: 'logo', src: initiativeLogo, alt: INITIATIVE },
        jsonLd: {
          '@type': 'Article',
          headline: location.title,
          description: location.summary,
          datePublished: location.dateISO,
          image: `${SITE_URL}${ogImagePath(path)}`,
          author: { '@type': 'NGO', name: INITIATIVE, url: `${SITE_URL}/initiative` },
          publisher: { '@type': 'NGO', name: INITIATIVE, url: `${SITE_URL}/initiative` },
        },
      }
    })

    return [campaignPage, ...locationPages]
  })
}

export function getAllPages() {
  return [...staticPages, ...campaignPages()]
}

function normalise(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

/** Meta for a path, falling back to the home page for unknown routes. */
export function getPageMeta(pathname) {
  const path = normalise(pathname)
  const pages = getAllPages()
  return pages.find(page => page.path === path) || { ...pages[0], path, noIndex: true }
}

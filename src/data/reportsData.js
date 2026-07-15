import outreachOne from '../assets/theoyewaleareoyeinitiative_01.jpg'
import ketuReliefReport from '../assets/ketu-relief-intervention-report.png'
import oyoFoodRelief from '../assets/oyo-food-relief-2026.png'
import ketuReliefCover from '../assets/ketu-relief-cover.webp'
import oyoFoodReliefCover from '../assets/oyo-food-relief-cover.webp'

// Add future reports here. The archive, Initiative teaser, and individual
// report page all read from this one source of truth.
export const reports = [
  {
    slug: 'ketu-relief-2026',
    title: 'Relief Intervention at Ketu Special Children Centre',
    headline: 'Hope in Every Gesture',
    programme: 'Community Welfare',
    tag: 'Relief Intervention',
    status: 'completed',
    dateISO: '2026-07-02',
    date: '2 July 2026',
    locationShort: 'Ketu, Lagos State',
    location: 'Ketu Special Children Centre, Lagos State Ministry of Youth and Social Development',
    summary: 'Essential relief materials were donated to support children with special needs and their caregivers at the Ketu Special Children Centre in Lagos.',
    intro: 'Compassion in action. Hope in every gesture. This intervention supported children with special needs and the caregivers who provide for them every day.',
    body: [
      'On 2 July 2026, The Oyewale Areoye Initiative visited the Ketu Special Children Centre, Lagos State Ministry of Youth and Social Development, to donate essential relief materials.',
      'The intervention was designed to provide practical support to children with special needs and their caregivers. It was also a reminder that every child deserves care, every caregiver deserves support, and no one should be forgotten.',
      'We are grateful to the Centre’s management, caregivers, volunteers, partners and donors whose generosity made this intervention possible. Together, we are helping to build a more compassionate, inclusive and hope-filled society.'
    ],
    contextTitle: 'Care, dignity and inclusion',
    metrics: [['8', 'Relief material categories'], ['1', 'Special children centre'], ['Children & caregivers', 'People supported']],
    reliefItems: ['Disposable diapers', 'Tissue paper', 'Instant noodles', 'Oats & cereals', 'Toiletries', 'Detergents & cleaning supplies', 'Household consumables', 'Other essential relief materials'],
    cover: ketuReliefCover,
    coverPosition: '78% center',
    reportDocument: ketuReliefReport,
    media: [],
    instagramPosts: []
  },
  {
    slug: 'oyo-food-relief-2026',
    title: 'Oyo State Food Relief Intervention',
    headline: 'Hope in Every Pack',
    programme: 'Food Relief',
    tag: 'Food Relief',
    status: 'completed',
    dateISO: '2026-07-04',
    date: '4 July 2026',
    locationShort: 'Oyo State',
    location: 'Ibarapa Axis & Ido Local Government Area, Oyo State',
    summary: '200 food packs were distributed to vulnerable households across communities in the Ibarapa Axis and Ido Local Government Area.',
    intro: 'Compassion in action. Hope in every pack. This Food Relief Intervention delivered practical support—and a message that no one is forgotten—to vulnerable families in Oyo State.',
    body: [
      'On 4 July 2026, The Oyewale Areoye Initiative distributed 200 food packs across communities in the Ibarapa Axis and Ido Local Government Area, Oyo State.',
      'The intervention reached widows, elderly persons, low-income households, persons with disabilities and other vulnerable members of society. Each package contained essential food items carefully prepared for vulnerable households.',
      'We sincerely appreciate our volunteers, parish priests, community leaders, donors, partners and every supporter whose commitment made this intervention possible. Together, we are building stronger, more caring communities.'
    ],
    contextTitle: 'Dignity, health and hope',
    metrics: [['200', 'Food packs delivered'], ['2', 'Distribution areas'], ['8', 'Communities reached']],
    reliefItems: ['Essential food items for vulnerable households'],
    distribution: [
      { area: 'Ibarapa Axis', communities: [['Ayete', 12], ['Abeta', 16], ['Olorunda', 7], ['Penu', 9], ['Maya', 22], ['Lanlate', 34], ['Akeroro, Wakajaye, Abooma & Aduromasi', 60]], total: 160 },
      { area: 'Ido Local Government Area', communities: [['Elenushosho', 40]], total: 40 }
    ],
    cover: oyoFoodReliefCover,
    coverPosition: '82% center',
    reportDocument: oyoFoodRelief,
    media: [],
    instagramPosts: []
  },
  {
    slug: 'back-to-school-project',
    title: 'Back to School Project',
    headline: 'Equipping the Next Generation',
    programme: 'Education',
    tag: 'Education',
    status: 'upcoming',
    dateISO: '2026-09-01',
    date: 'Upcoming',
    location: 'Local communities',
    locationShort: 'Local communities',
    summary: 'An upcoming education project to equip students with customised notebooks and essential stationery for the school term.',
    intro: 'Education is the foundation of every thriving community. This project is being prepared to give students practical tools for the school year ahead.',
    body: [
      'The Initiative plans to produce and distribute customised notebooks and other essential stationery to students across local communities.',
      'Final dates, locations, partners and impact figures will be published here once the project is confirmed and completed.'
    ],
    metrics: [],
    cover: outreachOne,
    coverPosition: 'center',
    media: [],
    instagramPosts: []
  }
]

export const reportTypes = ['All', ...new Set(reports.map(report => report.tag))]

export function getReport(slug) {
  return reports.find(report => report.slug === slug)
}

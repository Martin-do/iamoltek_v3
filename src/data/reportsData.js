import ketuReliefCover from '../assets/ketu-relief-cover.webp'
import foodOutreachGroup from '../../posts/food_outreach0.jpeg'
import foodOutreachOsun from '../../posts/food_outreach3.jpeg'
import taiwoFlyer from '../assets/taiwo-graduation-support-flyer.webp'
import taiwoPortrait from '../assets/taiwo-portrait.webp'
import taiwoGraduationHero from '../assets/taiwo-graduation-hero.webp'
import individualSupportHero from '../assets/individual-support-hero.webp'
import oyoPhoto1 from '../assets/oyo-photo-1.webp'
import oyoPhoto2 from '../assets/oyo-photo-2.webp'
import oyoPhoto4 from '../assets/oyo-photo-4.webp'
import oyoPhoto5 from '../assets/oyo-photo-5.webp'
import backToSchool1 from '../assets/back-to-school-1.webp'
import backToSchool2 from '../assets/back-to-school-2.webp'
import backToSchool3 from '../assets/back-to-school-3.webp'
import backToSchool4 from '../assets/back-to-school-4.webp'
import backToSchool5 from '../assets/back-to-school-5.webp'
import backToSchool6 from '../assets/back-to-school-6.webp'
import backToSchool7 from '../assets/back-to-school-7.webp'

export const campaigns = [
  {
    slug: 'food-relief-2026',
    title: 'Food Relief Outreach 2026',
    headline: 'Compassion Across Communities',
    programme: 'Food Relief',
    status: 'completed',
    dateISO: '2026-07-08',
    date: '2-8 July 2026',
    location: 'Lagos, Oyo and Osun States',
    summary: 'A coordinated relief campaign supporting vulnerable children, caregivers and households across Lagos, Oyo and Osun States.',
    intro: 'Through practical acts of compassion, The Oyewale Areoye Initiative delivered essential relief materials and food support to people and institutions serving vulnerable members of society.',
    metrics: [['3', 'States reached'], ['4', 'Intervention areas'], ['280', 'Food packs distributed']],
    cover: foodOutreachGroup,
    coverPosition: 'center 42%',
    locations: [
      {
        slug: 'ketu-lagos',
        title: 'Ketu Special Children Centre',
        headline: 'Hope in Every Gesture',
        programme: 'Institutional Relief',
        state: 'Lagos State',
        dateISO: '2026-07-02',
        date: '2 July 2026',
        locationShort: 'Ketu, Lagos State',
        location: 'Ketu Special Children Centre, Lagos State Ministry of Youth and Social Development',
        summary: 'Essential relief materials were donated to support vulnerable children and the caregivers responsible for their daily welfare.',
        contextTitle: 'Care, dignity and social inclusion',
        metrics: [['1', 'Beneficiary institution'], ['8', 'Relief material categories'], ['Children & caregivers', 'People supported']],
        executiveSummary: [
          'On 2 July 2026, The Oyewale Areoye Initiative carried out a humanitarian relief intervention at the Ketu Special Children Centre, under the Lagos State Ministry of Youth and Social Development. The intervention formed part of the Initiative’s commitment to supporting vulnerable children and strengthening institutions dedicated to their care.',
          'Essential relief materials were donated to assist the Centre in meeting the daily needs of the children and supporting caregivers in providing quality care. Representatives of the Centre warmly received the team and expressed appreciation for the Initiative’s generosity and compassion.'
        ],
        objectives: [
          'Support vulnerable children through the provision of essential relief materials.',
          'Complement the efforts of the Lagos State Government in caring for children in institutional care.',
          'Promote compassion, dignity and social inclusion.',
          'Demonstrate the Initiative’s commitment to sustainable community impact.'
        ],
        beneficiary: 'Ketu Special Children Centre - Lagos State Ministry of Youth and Social Development',
        reliefItems: ['Disposable diapers', 'Tissue paper', 'Instant noodles', 'Oats and breakfast cereals', 'Toiletries', 'Detergents and cleaning supplies', 'Household consumables', 'Other essential relief materials'],
        activities: ['Courtesy visit to the Centre', 'Presentation of relief materials', 'Interaction with management and caregivers', 'Inspection of sections of the facility', 'Photographic documentation of the intervention'],
        impact: 'The intervention contributed to improving the availability of essential supplies required for the welfare of the children at the Centre. Beyond the material support, the visit encouraged caregivers by reaffirming that members of society remain committed to their work and to the wellbeing of the children entrusted to their care.',
        acknowledgement: 'The Oyewale Areoye Initiative sincerely appreciates the management, caregivers and staff of the Ketu Special Children Centre for their warm reception, dedication and unwavering commitment to the care of vulnerable children. Appreciation is also extended to all volunteers and supporters whose generosity made the intervention possible.',
        conclusion: 'The Lagos Relief Intervention reflects the enduring mission of The Oyewale Areoye Initiative to serve humanity through practical acts of compassion and community development. The Initiative remains committed to implementing impactful programmes that uplift vulnerable individuals and strengthen communities across Nigeria.',
        photoHighlights: ['Presentation of relief materials to the Centre', 'Interaction with management and caregivers', 'Visit to different sections of the facility', 'Group photographs with staff and volunteers', 'Documentation of the donated relief items'],
        cover: ketuReliefCover,
        coverPosition: '78% center',
        media: [],
        mediaNote: 'Correct Lagos field photos have not been added yet, so this report avoids using photos from another location.',
        instagramPosts: []
      },
      {
        slug: 'oyo-state',
        aliases: ['ibarapa-axis', 'ido-lga'],
        title: 'Oyo State Food Relief Intervention',
        headline: 'Hope in Every Pack',
        programme: 'Food Relief',
        state: 'Oyo State',
        dateISO: '2026-07-04',
        date: '4 July 2026',
        locationShort: 'Ibarapa Axis and Ido LGA',
        location: 'Ibarapa Axis and Ido Local Government Area, Oyo State',
        summary: 'A total of 200 food packs were distributed across Ibarapa Axis and Ido Local Government Area to support vulnerable households experiencing economic hardship.',
        contextTitle: 'Dignity, food security and community care',
        metrics: [['200', 'Food packs distributed'], ['2', 'Intervention areas'], ['8', 'Communities reached']],
        executiveSummary: [
          'On 4 July 2026, The Oyewale Areoye Initiative carried out a Food Relief Intervention across communities in the Ibarapa Axis and Ido Local Government Area of Oyo State. The intervention formed part of the Initiative’s humanitarian efforts to alleviate hunger and provide immediate support to vulnerable households experiencing economic hardship.',
          'Through this outreach, a total of 200 food packs were distributed across the two intervention areas. Beneficiaries included widows, elderly persons, low-income households, persons living with disabilities, and other vulnerable members of the communities.',
          'The exercise was successfully carried out with the invaluable support of volunteers, community leaders, and priests serving in the various mission areas.'
        ],
        objectives: [
          'Provide immediate food support to vulnerable households.',
          'Reduce the effects of food insecurity.',
          'Promote compassion and social responsibility.',
          'Improve the welfare of underserved communities.',
          'Strengthen community partnerships through humanitarian service.'
        ],
        reliefItems: ['Essential food items carefully packed for vulnerable households'],
        activities: [
          'Identification of vulnerable beneficiaries.',
          'Packaging and distribution of food relief materials.',
          'Community engagement with beneficiaries and local leaders.',
          'Monitoring and documentation of the intervention.',
          'Photographic documentation for transparency and accountability.'
        ],
        distribution: [
          { area: 'Ibarapa Axis', communities: [['Okolo', 12], ['Abeta', 16], ['Olorunda', 7], ['Peku', 9], ['Maya', 22], ['Lanlate', 34], ['Akeroro, Wakajaye, Abomo and Aduromasu', 60]], total: 160 },
          { area: 'Ido Local Government Area', communities: [['Elenushosho', 40]], total: 40 }
        ],
        impact: 'The intervention provided immediate relief to 200 vulnerable households across Oyo State. Families received essential food items to help ease the burden of rising living costs and food insecurity. The outreach also strengthened relationships with local communities and demonstrated the importance of collaborative humanitarian efforts.',
        acknowledgement: 'The Oyewale Areoye Initiative expresses profound gratitude to all volunteers who dedicated their time and resources to the successful execution of this intervention. Special appreciation goes to the parish priests and mission communities whose support and local coordination enabled the Initiative to reach remote and underserved communities within the Ibarapa Axis and Ido Local Government Area. The Initiative also sincerely thanks all donors, partners, and supporters whose generosity made this humanitarian outreach possible.',
        conclusion: 'The Oyo State Food Relief Intervention marks another significant milestone in The Oyewale Areoye Initiative’s mission of responding to the needs of vulnerable communities through practical acts of compassion. With 200 food packs distributed across Ibarapa Axis and Ido Local Government Area, the Initiative has once again demonstrated its commitment to promoting human dignity, alleviating hardship, and fostering stronger communities.',
        cover: oyoPhoto1,
        coverPosition: 'center 30%',
        media: [
          { type: 'image', src: oyoPhoto1, alt: 'Three beneficiaries in Oyo State holding food packs from the Initiative', caption: 'Food packs reaching beneficiaries in Oyo State.' },
          { type: 'image', src: oyoPhoto2, alt: 'Community members with their food packs during the Oyo outreach', caption: 'Community members received their packs close to home.' },
          { type: 'image', src: oyoPhoto4, alt: 'A beneficiary at home with her food pack', caption: 'Packs were also taken to beneficiaries at home.' },
          { type: 'image', src: oyoPhoto5, alt: 'A beneficiary holding her food pack', caption: 'Every household received a pack.' }
        ],
        instagramPosts: []
      },
      {
        slug: 'osun-state',
        title: 'Osun State Food Relief Intervention',
        headline: 'Compassion in Ikire',
        programme: 'Food Relief',
        state: 'Osun State',
        dateISO: '2026-07-08',
        date: '8 July 2026',
        locationShort: 'Ikire, Irewole LGA',
        location: 'Ikire, Irewole Local Government Area, Osun State',
        summary: '80 food packs were distributed across Owode, Agbora and Olowa communities in Ikire, Irewole Local Government Area.',
        contextTitle: 'Practical support for underserved families',
        metrics: [['80', 'Food packs distributed'], ['3', 'Communities reached'], ['1', 'Local government area']],
        executiveSummary: [
          'On 8 July 2026, The Oyewale Areoye Initiative carried out a Food Relief Intervention across selected communities in Ikire, Irewole Local Government Area of Osun State. The outreach was designed to provide immediate food assistance to vulnerable households affected by economic hardship and food insecurity.',
          'A total of 80 food packs were distributed across three communities, ensuring that deserving families received timely support. The intervention forms part of the Initiative’s broader commitment to improving the welfare of vulnerable communities through practical humanitarian action.'
        ],
        objectives: [
          'Provide food assistance to vulnerable households.',
          'Reduce the impact of food insecurity within the communities.',
          'Promote compassion and community solidarity.',
          'Improve the wellbeing of underserved families.'
        ],
        reliefItems: ['Essential food items carefully packed for vulnerable households'],
        activities: ['Identification of vulnerable beneficiaries.', 'Distribution of food relief packs.', 'Community engagement with beneficiaries.', 'Documentation of the outreach exercise.'],
        distribution: [
          { area: 'Irewole Local Government Area', communities: [['Owode, Ikire', 30], ['Agbora', 30], ['Olowa', 20]], total: 80 }
        ],
        impact: 'The intervention successfully reached 80 vulnerable households across the three communities. The food packs provided immediate relief to families facing economic challenges while reinforcing the values of compassion, hope, and community support. Beneficiaries expressed gratitude for the timely intervention and the Initiative’s commitment to serving those in need.',
        acknowledgement: 'The Oyewale Areoye Initiative appreciates the cooperation of community leaders, volunteers, donors, and all partners whose support made the outreach successful. Their generosity continues to make a meaningful difference in the lives of vulnerable families.',
        conclusion: 'The Food Relief Intervention in Owode, Agbora, and Olowa communities of Ikire, Irewole Local Government Area, demonstrates The Oyewale Areoye Initiative’s unwavering commitment to reaching vulnerable populations with practical support. The Initiative remains dedicated to empowering people and transforming communities through sustainable humanitarian interventions.',
        photoHighlights: ['Distribution of food relief packs in Owode, Ikire', 'Food relief support in Agbora community', 'Food relief support in Olowa community', 'Community engagement with beneficiaries', 'Documentation of the outreach exercise'],
        cover: foodOutreachOsun,
        coverPosition: 'center 30%',
        media: [
          { type: 'image', src: foodOutreachOsun, alt: 'Families in Ikire, Osun State holding food relief packs', caption: 'Families in Ikire receiving their food packs.' }
        ],
        instagramPosts: []
      }
    ]
  },
  {
    slug: 'support-programme',
    kind: 'individual',
    title: 'Support Programme',
    headline: 'One Life at a Time',
    programme: 'Individual Support',
    status: 'completed',
    dateISO: '2026-08-19',
    date: 'Since August 2026',
    location: 'Individual beneficiaries',
    summary: 'Direct, personal support for individuals at pivotal moments, funded through partners and supporters who join the Initiative in practical acts of care.',
    intro: 'Not every intervention reaches a whole community at once. The Support Programme is how The Oyewale Areoye Initiative and its partners support people directly, at the moments that matter most to them.',
    overviewTagline: ['One life.', 'A new beginning.'],
    metrics: [],
    cover: individualSupportHero,
    coverAlt: 'Illustrative scene of people walking together',
    coverPosition: 'center top',
    heroPortrait: true,
    locations: [
      {
        slug: 'taiwo-opeyemi-moyinoluwa-2026',
        title: 'Graduation Support for Taiwo Opeyemi Moyinoluwa',
        headline: 'Celebrating a New Chapter',
        programme: 'Graduation Support',
        state: 'Lagos State',
        dateISO: '2026-08-19',
        date: '19 August 2026',
        locationShort: 'Lagos State University',
        location: 'Lagos State University, Lagos State',
        summary: 'A ₦100,000 Graduation Support Award presented to Taiwo Opeyemi Moyinoluwa on her graduation with a degree in Biochemistry from Lagos State University.',
        contextTitle: 'A graduate’s determination, recognised',
        metrics: [['₦100,000', 'Award given']],
        executiveSummary: [
          'The Oyewale Areoye Initiative is committed to empowering people and transforming communities through education, human development and improved opportunities for individuals. As part of this commitment, the Initiative recently identified and recognised Taiwo Opeyemi Moyinoluwa, who graduated from Lagos State University with a degree in Biochemistry, for a special Graduation Support intervention.',
          'Her graduation marks a significant personal and academic milestone, and the determination behind it inspired the Initiative to extend a gesture of support at this important point of transition, from university into the next chapter of her life.',
          'On 19 August 2026, the Initiative presented her with a ₦100,000 Graduation Support Award, along with a commemorative dummy cheque prepared to mark the occasion. The gesture forms part of the Initiative’s broader Support Programme, through which individuals and partners take practical steps that make a real difference in people’s lives.'
        ],
        objectives: [
          'Celebrate and affirm her academic achievement.',
          'Provide practical financial support at the start of her post-university journey.',
          'Encourage her pursuit of further professional and personal development.',
          'Reinforce the importance of supporting young graduates.',
          'Inspire others to recognise and invest in human potential.'
        ],
        beneficiary: 'Taiwo Opeyemi Moyinoluwa',
        beneficiaryLabel: 'Beneficiary',
        heroPortrait: true,
        hideMediaGallery: true,
        ctaLabel: 'Read Her Story →',
        awardImage: { src: taiwoFlyer, alt: 'Graduation Support Award flyer for Taiwo Opeyemi Moyinoluwa', caption: 'The Graduation Support Award, presented to mark her achievement.' },
        activities: [
          'Recognition of her graduation and academic achievement.',
          'Presentation of a ₦100,000 Graduation Support Award.',
          'Preparation of a commemorative dummy cheque.',
          'Transfer of the award to her account.',
          'A personal exchange in which she shared her appreciation.'
        ],
        impact: 'The award gave Taiwo practical support and encouragement at the very start of her post-university journey, reinforcing that her achievement, and her future, matter to people beyond her immediate circle.',
        acknowledgement: 'This gesture forms part of the Initiative’s broader Support Programme, through which individuals and partners take practical steps to invest in people at pivotal moments in their lives. The Initiative is grateful to everyone whose support makes gestures like this possible.',
        conclusion: 'Her graduation is not the conclusion of her journey. It is the beginning of a new chapter filled with opportunities, responsibilities and possibilities. Through this intervention, the Initiative reaffirms its commitment to empowering people, supporting potential and transforming communities one life at a time.',
        cover: taiwoGraduationHero,
        coverPosition: 'center top',
        media: [
          { type: 'image', src: taiwoPortrait, alt: 'Taiwo Opeyemi Moyinoluwa on her graduation day', caption: 'Taiwo on her graduation day.' }
        ],
        testimonial: {
          withName: 'Taiwo',
          messages: [
            { from: 'us', time: '07:23', text: 'Congratulations again on your graduation! The Initiative would like to support you in a special and meaningful way as you begin this new chapter.' },
            { from: 'her', time: '10:56', text: 'Good morning ma' },
            { from: 'her', time: '10:57', text: 'Thank you ma for your warm greetings and for reaching out to me on behalf of the initiative. may God bless you abundantly.' },
            { from: 'us', time: '11:03', text: 'Once again, congratulations on your achievement. We are pleased to be able to support you as you begin this new chapter.' },
            { from: 'her', time: '11:14', text: 'Wow! I am deeply touched and grateful for your kind gesture. Thank you so much. May God bless you abundantly' },
            { from: 'us', time: '11:31', type: 'document', filename: 'Payment_Receipt.pdf', meta: '1 page · PDF' },
            { from: 'her', time: '11:34', text: 'Thank you very much, I can’t thank you enough. I am very grateful 🙏. May God replenish and continue to enlarge your coast. Amen' }
          ]
        },
        instagramPosts: []
      }
    ]
  },
  {
    slug: 'back-to-school-2026',
    kind: 'project',
    title: 'Back to School Project',
    headline: 'Equipping the Next Generation',
    programme: 'Education',
    status: 'completed',
    dateISO: '2026-10-07',
    date: '2026/2027 academic session',
    location: 'Five schools and the Gegelose community',
    summary: 'Notebooks, pens and basic stationery for pupils, and teaching materials for teachers, reached 550 pupils and 50 teachers across five schools and the Gegelose community.',
    intro: 'The 2026 Back-to-School Educational Support Project provided essential learning materials to pupils and basic teaching materials to teachers at the start of the 2026/2027 academic session.',
    metrics: [['550', 'Pupils reached'], ['50', 'Teachers reached'], ['5', 'Schools reached']],
    cover: backToSchool1,
    coverPosition: '70% center',
    locations: [
      {
        slug: 'project-report',
        title: 'Back to School Educational Support Project',
        headline: 'Equipping the Next Generation',
        programme: 'Education',
        dateISO: '2026-10-07',
        date: '2026/2027 academic session',
        locationShort: 'Five schools and the Gegelose community',
        location: 'Five beneficiary schools and the Gegelose community',
        summary: 'Notebooks, pens and basic stationery for pupils, and teaching materials for teachers, reached 550 pupils and 50 teachers across five schools and the Gegelose community.',
        contextTitle: 'Learning materials for a new school session',
        metrics: [['550', 'Pupils reached'], ['50', 'Teachers reached'], ['5', 'Schools reached']],
        executiveSummary: [
          'The Oyewale Areoye Initiative implemented the 2026 Back-to-School Educational Support Project to provide essential learning materials to pupils and basic teaching materials to teachers at the beginning of the 2026/2027 academic session.',
          'The project covered five beneficiary schools: St John Primary School, Fenwa; St Felix Nursery & Primary School, Lanlate; Blessed Tansi Nursery & Primary School, Ilaju; St William Nursery & Primary School, Oke Ado; and Abiola Jacobs Basic School, Oke Foko. Together they account for 500 pupils and 50 teachers. Approximately 50 further pupils were reached in the Gegelose environs, bringing the total to 550 pupils.',
          'Pupils received exercise notebooks, writing materials, pens, basic stationery and other learning materials. Teachers received notebooks, pens, chalk and other basic teaching materials.'
        ],
        objectives: [
          'Provide essential learning materials to pupils.',
          'Support teachers with basic classroom and teaching materials.',
          'Reduce material barriers to effective classroom participation.',
          'Promote school readiness for the 2026/2027 academic session.',
          'Extend educational support into surrounding communities.',
          'Document the intervention and its reach for accountability.'
        ],
        beneficiary: 'Five schools and the Gegelose community',
        beneficiaryLabel: 'Beneficiaries',
        activities: [
          'Direct engagement with the beneficiary schools and community beneficiaries.',
          'Preparation of educational-material packs for pupils.',
          'Distribution of the packs to pupils, and of basic materials to teachers.',
          'Outreach to approximately 50 additional pupils in the Gegelose environs.',
          'Photographic documentation of the project for accountability.'
        ],
        materialGroups: [
          { title: 'For pupils', items: ['Exercise notebooks', 'Writing materials', 'Pens', 'Basic stationery', 'Other learning materials'] },
          { title: 'For teachers', items: ['Teachers’ notebooks', 'Pens', 'Chalk', 'Other basic teaching materials'] }
        ],
        schools: {
          rows: [
            { name: 'St John Primary School', place: 'Fenwa', pupils: 110, teachers: 7 },
            { name: 'St Felix Nursery & Primary School', place: 'Lanlate', pupils: 50, teachers: 6 },
            { name: 'Blessed Tansi Nursery & Primary School', place: 'Ilaju', pupils: 40, teachers: 5 },
            { name: 'St William Nursery & Primary School', place: 'Oke Ado', pupils: 120, teachers: 20 },
            { name: 'Abiola Jacobs Basic School', place: 'Oke Foko', pupils: 180, teachers: 12 }
          ],
          subtotal: { label: 'School-based total', pupils: '500', teachers: '50' },
          extra: { label: 'Gegelose environs', place: 'Community outreach, approximate', pupils: '50', teachers: '' },
          total: { label: 'Total reach', pupils: '550', teachers: '50' },
          note: 'The school figures reconcile exactly: 110 + 50 + 40 + 120 + 180 = 500 pupils, and 7 + 6 + 5 + 20 + 12 = 50 teachers. The Gegelose figure is approximate and recorded separately from the five schools. The teacher figure counts only the five named schools and is not enlarged to include additional teachers without supporting details.'
        },
        impact: 'Some pupils needed notebooks and writing materials to take part fully in school activities, and teachers needed simple consumables for everyday classroom work. The materials reduced the immediate burden of finding them at the start of the session, and the Gegelose outreach extended the support beyond the five schools.',
        acknowledgement: 'Representatives and heads of the beneficiary schools expressed sincere appreciation for the support, recognising it as a practical contribution to pupils and teachers that met immediate educational needs. The Initiative thanks the schools, teachers, pupils, community members and supporters who helped carry the project through.',
        conclusion: 'The 2026 Back-to-School Educational Support Project is completed. The Initiative reached five named schools, supported 500 school-based pupils, extended support to approximately 50 additional pupils in the Gegelose environs, and reached 50 teachers across the five named schools.',
        cover: backToSchool1,
        coverPosition: '70% center',
        mediaHeading: 'The project in',
        gallery: 'carousel',
        mediaIntro: 'Selected photographs from the project. They are documentation of the distribution and are not assigned to particular schools.',
        media: [
          { type: 'image', src: backToSchool1, alt: 'Pupils holding up the notebooks and stationery packs they received', caption: 'Pupils lifting the notebooks and stationery they received.', position: '70% center' },
          { type: 'image', src: backToSchool2, alt: 'Pupils in school uniform with their notebook packs, alongside adults', caption: 'Pupils with their notebook and stationery packs.', position: 'center 35%' },
          { type: 'image', src: backToSchool3, alt: 'Young pupils holding up notebook packs outside a classroom', caption: 'Pupils showing the packs they received.' },
          { type: 'image', src: backToSchool4, alt: 'A crowd of pupils holding notebook packs', caption: 'A group of pupils with their packs.' },
          { type: 'image', src: backToSchool5, alt: 'A classroom with pupils at their desks', caption: 'Pupils at their desks in a classroom.' },
          { type: 'image', src: backToSchool6, alt: 'Notebook and stationery packs stacked before distribution', caption: 'Packs prepared before distribution.', position: 'center 55%' },
          { type: 'image', src: backToSchool7, alt: 'Stacked learning materials ready to be handed out', caption: 'Learning materials ready to be handed out.' }
        ],
        pdf: { href: '/downloads/Back-to-School-Project-Report-2026.pdf', label: 'Download the full report' },
        instagramPosts: []
      }
    ]
  }
]

export function getCampaign(slug) {
  return campaigns.find(campaign => campaign.slug === slug)
}

export function getLocationGroups(campaign) {
  if (!campaign?.locations?.length) return []

  return campaign.locations.reduce((groups, location) => {
    const existing = groups.find(group => group.state === location.state)
    if (existing) {
      existing.locations.push(location)
      return groups
    }
    return [...groups, { state: location.state, locations: [location] }]
  }, [])
}

export function getCampaignLocation(campaignSlug, locationSlug) {
  const campaign = getCampaign(campaignSlug)
  const location = campaign?.locations.find(item => item.slug === locationSlug || item.aliases?.includes(locationSlug))
  return { campaign, location }
}

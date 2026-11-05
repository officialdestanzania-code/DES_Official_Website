export type PartnerGroup = {
  slug: string
  title: string
  description: string
}

export type ContributionRecord = {
  id: string
  title: string
  description: string
  year: number
  status: 'completed' | 'ongoing' | 'paused' | 'coordination'
  quantity?: string
}

export type PartnerSource = {
  label: string
  url: string
}

export type PartnerGalleryItem = {
  src: string
  alt: string
  caption: string
}

export type ButimbaPartner = {
  slug: string
  name: string
  groupSlug: string
  category: string
  location: string
  summary: string
  role: string
  affiliation?: {
    name: string
    href?: string
    description: string
  }
  contributions: ContributionRecord[]
  statusNote?: string
  sources: PartnerSource[]
  gallery: PartnerGalleryItem[]
}

export const partnerGroups: PartnerGroup[] = [
  {
    slug: 'international-technology-partners',
    title: 'International Technology Partners',
    description: 'Organisations and coordinators connecting Butimba with educational technology and international project support.',
  },
  {
    slug: 'friends-of-butimba',
    title: 'Friends of Butimba Primary School',
    description: 'Friends and families who support the school and its learning environment.',
  },
  {
    slug: 'butimba-alumni-network',
    title: 'Butimba Alumni Network',
    description: 'Former pupils giving back to their school through practical contributions to learning, staff and pupil wellbeing.',
  },
]

export const butimbaPartners: ButimbaPartner[] = [
  {
    slug: 'labdoo',
    name: 'Labdoo',
    groupSlug: 'international-technology-partners',
    category: 'International education technology partner',
    location: 'International network',
    summary: 'Supporting digital inclusion by preparing and delivering reusable computers for education.',
    role: 'Labdoo is the technology partner credited with the fourteen laptops delivered to Butimba Primary School in July 2025.',
    contributions: [
      {
        id: 'labdoo-laptops-2025',
        title: 'Fourteen educational laptops',
        description: 'Fourteen Labdoo laptops were handed over to Butimba Primary School to support computer-based learning.',
        year: 2025,
        status: 'completed',
        quantity: '14 laptops',
      },
    ],
    sources: [
      { label: 'Butimba project page on Labdoo', url: 'https://platform.labdoo.org/edoovillage?e=227878' },
      { label: 'Labdoo announcement about Butimba', url: 'https://www.linkedin.com/posts/labdoo.org_labdoo-mwanza-tanzania-activity-7359819832474628097-I4Kg' },
    ],
    gallery: [],
  },
  {
    slug: 'mwanza-ev',
    name: 'Mwanza e.V.',
    groupSlug: 'international-technology-partners',
    category: 'Direct project partner',
    location: 'Würzburg, Germany',
    summary: 'A direct partner supporting the Butimba initiative and connecting the school with international project support.',
    role: 'Mwanza e.V. is a direct project partner. The Butimba project records one steel storage cabinet received through Mwanza e.V.',
    contributions: [
      {
        id: 'mwanza-storage-cabinet',
        title: 'Steel storage cabinet',
        description: 'One steel cabinet was received through Mwanza e.V. to help secure and organise equipment in the computer room.',
        year: 2026,
        status: 'completed',
        quantity: '1 cabinet',
      },
    ],
    sources: [
      { label: 'Butimba project page on Labdoo', url: 'https://platform.labdoo.org/edoovillage?e=227878' },
    ],
    gallery: [],
  },
  {
    slug: 'thomas-barcatta',
    name: 'Thomas Barcatta',
    groupSlug: 'international-technology-partners',
    category: 'Project liaison under Mwanza e.V.',
    location: 'Würzburg, Germany',
    summary: 'A key liaison supporting the Butimba project through Mwanza e.V. and Labdoo Hub Würzburg.',
    role: 'Thomas Barcatta works under Mwanza e.V. and facilitates coordination connected with Labdoo Hub Würzburg. His role is recorded as project coordination and liaison, not as a separate donating organisation.',
    affiliation: {
      name: 'Mwanza e.V.',
      href: '/partners/mwanza-ev',
      description: 'Project coordination and liaison through this organisation.',
    },
    contributions: [
      {
        id: 'thomas-project-coordination',
        title: 'Project coordination and liaison',
        description: 'Coordinates communication and practical collaboration connecting Butimba Primary School, Mwanza e.V. and Labdoo Hub Würzburg.',
        year: 2025,
        status: 'coordination',
      },
    ],
    sources: [
      { label: 'Labdoo Hub Würzburg', url: 'https://platform.labdoo.org/de/hub?h=156799' },
      { label: 'Labdoo announcement about Butimba', url: 'https://www.linkedin.com/posts/labdoo.org_labdoo-mwanza-tanzania-activity-7359819832474628097-I4Kg' },
    ],
    gallery: [],
  },
  {
    slug: 'gundolf-family',
    name: 'The Gundolf Family',
    groupSlug: 'friends-of-butimba',
    category: 'Friends of Butimba Primary School',
    location: 'Munich, Germany',
    summary: 'A family supporter whose contribution helped provide locally made furniture for the computer room.',
    role: 'The Gundolf Family supported the computer-room furniture initiative. Labdoo publicly acknowledged the family’s sponsorship of locally made tables and chairs.',
    contributions: [
      {
        id: 'gundolf-computer-room-furniture',
        title: 'Computer-room furniture',
        description: 'Supported locally made furniture for the Butimba computer room. Twelve tables and twelve benches were completed in January 2026.',
        year: 2026,
        status: 'completed',
        quantity: '12 tables and 12 benches',
      },
    ],
    sources: [
      { label: 'Labdoo announcement about Butimba and the Gundolf sponsorship', url: 'https://www.linkedin.com/posts/labdoo.org_labdoo-mwanza-tanzania-activity-7359819832474628097-I4Kg' },
      { label: 'Butimba project page on Labdoo', url: 'https://platform.labdoo.org/edoovillage?e=227878' },
    ],
    gallery: [],
  },
  {
    slug: 'herman-tanguye',
    name: 'Herman Tanguye',
    groupSlug: 'butimba-alumni-network',
    category: 'Butimba alumnus and supporter',
    location: 'Butimba Alumni Network',
    summary: 'An alumnus recognised for supporting school administration and digital connectivity.',
    role: 'Herman Tanguye is a supporter through the Butimba Alumni Network. His contributions include a photocopy machine and school Wi-Fi support in 2026.',
    contributions: [
      {
        id: 'herman-photocopy-machine',
        title: 'Photocopy machine',
        description: 'Purchased a photocopy machine for Butimba Primary School to support document preparation and school administration.',
        year: 2026,
        status: 'completed',
        quantity: '1 photocopy machine',
      },
      {
        id: 'herman-school-wifi',
        title: 'School Wi-Fi',
        description: 'Purchased Wi-Fi equipment/service for the school to strengthen internet connectivity.',
        year: 2026,
        status: 'completed',
        quantity: 'School Wi-Fi',
      },
    ],
    sources: [],
    gallery: [],
  },
  {
    slug: 'samwel-tanguye',
    name: 'Samwel Tanguye',
    groupSlug: 'butimba-alumni-network',
    category: 'Butimba alumnus and supporter',
    location: 'Butimba Alumni Network',
    summary: 'An alumnus recognised for contributing furniture to improve the staff-room environment.',
    role: 'Samwel Tanguye is a supporter through the Butimba Alumni Network. He purchased fifteen chairs for the staff room.',
    contributions: [
      {
        id: 'samwel-staffroom-chairs',
        title: 'Staff-room chairs',
        description: 'Purchased chairs to improve the staff-room working environment.',
        year: 2026,
        status: 'completed',
        quantity: '15 chairs',
      },
    ],
    sources: [],
    gallery: [],
  },
  {
    slug: 'dr-ancyfrida-prosper',
    name: 'Dr. Ancyfrida Prosper',
    groupSlug: 'butimba-alumni-network',
    category: 'Butimba alumnus/alumna supporter',
    location: 'Butimba Alumni Network',
    summary: 'A leading supporter of initiatives intended to improve dignity, privacy and wellbeing for girls at school.',
    role: 'Dr. Ancyfrida Prosper is a supporter through the Butimba Alumni Network and championed the initiative to establish a safe menstrual hygiene room for girls at Butimba Primary School.',
    contributions: [
      {
        id: 'ancyfrida-safe-menstrual-room',
        title: 'Safe menstrual hygiene room for girls',
        description: 'Spearheaded the initiative to establish a dedicated, safe menstrual hygiene room for girls at Butimba Primary School.',
        year: 2026,
        status: 'paused',
      },
    ],
    statusNote: 'Construction has started but remains incomplete and work is currently paused. The room is not yet operational.',
    sources: [],
    gallery: [],
  },
]

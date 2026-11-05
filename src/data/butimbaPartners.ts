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
  category: string
  location: string
  summary: string
  role: string
  contributions: string[]
  statusNote?: string
  sources: PartnerSource[]
  gallery: PartnerGalleryItem[]
}

export const butimbaPartners: ButimbaPartner[] = [
  {
    slug: 'labdoo',
    name: 'Labdoo',
    category: 'International education technology partner',
    location: 'International network',
    summary: 'Supporting digital inclusion by preparing and delivering reusable computers for education.',
    role: 'Labdoo is the technology partner credited with the fourteen laptops delivered to Butimba Primary School in July 2025.',
    contributions: [
      'Fourteen Labdoo laptops reached Butimba Primary School in July 2025.',
      'The devices form part of the school’s effort to establish practical computer-based learning.',
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
    category: 'Direct project partner',
    location: 'Würzburg, Germany',
    summary: 'A direct partner supporting the Butimba initiative and connecting the school with international project support.',
    role: 'Mwanza e.V. works with the Butimba project through coordination and practical support. The school records one steel storage cabinet received through Mwanza e.V.',
    contributions: [
      'Direct collaboration with the Butimba Digital Learning & Computer Room initiative.',
      'One steel storage cabinet was received through Mwanza e.V.',
      'Coordination support connecting the school with project partners.',
    ],
    sources: [
      { label: 'Butimba project page on Labdoo', url: 'https://platform.labdoo.org/edoovillage?e=227878' },
    ],
    gallery: [],
  },
  {
    slug: 'thomas-barcatta',
    name: 'Thomas Barcatta',
    category: 'Project coordinator and liaison',
    location: 'Würzburg, Germany',
    summary: 'A key liaison connecting the Butimba project with Labdoo Hub Würzburg and Mwanza e.V.',
    role: 'Thomas Barcatta supervises and facilitates the Labdoo-supported work connected with Butimba. This page recognises his coordination role; it does not attribute organisational donations to him personally.',
    contributions: [
      'Project supervision and liaison through Labdoo Hub Würzburg.',
      'Coordination that helped connect Butimba Primary School with technology and project supporters.',
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
    category: 'Friends of Butimba Primary School',
    location: 'Munich, Germany',
    summary: 'A family supporter whose contribution helped provide locally made furniture for the computer room.',
    role: 'The Gundolf Family supported the computer-room furniture initiative. Labdoo publicly acknowledged the family’s sponsorship of locally made tables and chairs.',
    contributions: [
      'Supported the production of furniture for the Butimba computer room.',
      'Twelve tables and twelve benches were completed for the room in January 2026.',
      'Helped combine digital inclusion with support for local craftsmanship.',
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
    category: 'Butimba alumnus and supporter',
    location: 'Butimba Alumni',
    summary: 'An alumnus recognised for supporting the school’s day-to-day administrative and learning operations.',
    role: 'Herman Tanguye supported Butimba Primary School by purchasing a photocopy machine for the school.',
    contributions: [
      'Purchased a photocopy machine for Butimba Primary School.',
      'The machine supports the school’s photocopying and document-preparation needs.',
    ],
    sources: [],
    gallery: [],
  },
  {
    slug: 'samwel-tanguye',
    name: 'Samwel Tanguye',
    category: 'Butimba alumnus and supporter',
    location: 'Butimba Alumni',
    summary: 'An alumnus recognised for contributing furniture to improve the staff-room environment.',
    role: 'Samwel Tanguye supported the school by purchasing fifteen chairs for the staff room.',
    contributions: [
      'Purchased fifteen chairs for the Butimba Primary School staff room.',
      'The chairs contribute to a more functional staff working environment.',
    ],
    sources: [],
    gallery: [],
  },
  {
    slug: 'dr-ancyfrida-prosper',
    name: 'Dr. Ancyfrida Prosper',
    category: 'Girls’ education and wellbeing supporter',
    location: 'Butimba Primary School community',
    summary: 'A leading supporter of initiatives intended to improve dignity, privacy and wellbeing for girls at school.',
    role: 'Dr. Ancyfrida Prosper championed the initiative to establish a safe menstrual hygiene room for girls at Butimba Primary School.',
    contributions: [
      'Spearheaded the initiative to establish a safe menstrual hygiene room for girls.',
      'Construction was initiated, but the project is currently incomplete and work has paused.',
    ],
    statusNote: 'The room is not yet complete or operational. This page records the initiative’s status transparently and does not imply that construction has been finished.',
    sources: [],
    gallery: [],
  },
]

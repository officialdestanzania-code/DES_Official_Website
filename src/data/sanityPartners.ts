import { createClient } from '@sanity/client'
import type { ButimbaPartner, ContributionRecord, PartnerGroup, PartnerGalleryItem, PartnerSource } from './butimbaPartners'
import { isSanityConfigured, sanityDataset, sanityProjectId } from '../sanity/sanityEnv'

const apiVersion = '2025-01-01'

const client = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

type SanityImage = {
  src?: string
  alt?: string
  caption?: string
}

type SanityContribution = {
  _id: string
  title: string
  description: string
  year: number
  status: ContributionRecord['status']
  quantity?: string
  gallery?: SanityImage[]
  sources?: PartnerSource[]
}

type SanityPartner = {
  name: string
  slug: string
  category: string
  location?: string
  summary: string
  role: string
  group?: { slug: string; title: string; description: string }
  affiliation?: { name: string; slug: string }
  sources?: PartnerSource[]
  gallery?: SanityImage[]
  contributions?: SanityContribution[]
}

export type PartnerDirectoryData = {
  partners: ButimbaPartner[]
  groups: PartnerGroup[]
}

const partnerQuery = `*[_type == "partner" && defined(slug.current)] | order(name asc) {
  name,
  "slug": slug.current,
  category,
  location,
  summary,
  role,
  "group": group->{ "slug": slug.current, title, description },
  "affiliation": affiliation->{ name, "slug": slug.current },
  sources[]{ label, url },
  gallery[permissionConfirmed == true]{
    "src": image.asset->url,
    alt,
    caption
  },
  "contributions": *[_type == "contribution" && references(^._id)] | order(year desc, _createdAt desc) {
    "_id": _id,
    title,
    description,
    year,
    status,
    quantity,
    gallery[permissionConfirmed == true]{
      "src": image.asset->url,
      alt,
      caption
    },
    sources[]{ label, url }
  }
}`

function mapGallery(items: SanityImage[] = []): PartnerGalleryItem[] {
  return items
    .filter((item): item is SanityImage & { src: string; alt: string } => Boolean(item.src && item.alt))
    .map((item) => ({ src: item.src, alt: item.alt, caption: item.caption ?? '' }))
}

function mapSourceLists(...lists: (PartnerSource[] | undefined)[]): PartnerSource[] {
  const unique = new Map<string, PartnerSource>()
  for (const source of lists.flat()) {
    if (source?.url && source?.label) unique.set(source.url, source)
  }
  return [...unique.values()]
}

export async function fetchPartnerDirectoryFromCms(): Promise<PartnerDirectoryData | null> {
  if (!client) return null

  const records = await client.fetch<SanityPartner[]>(partnerQuery)
  if (!records.length) return null

  const partners: ButimbaPartner[] = records.map((record) => {
    const contributions: ContributionRecord[] = (record.contributions ?? []).map((item) => ({
      id: item._id,
      title: item.title,
      description: item.description,
      year: item.year,
      status: item.status ?? 'completed',
      ...(item.quantity ? { quantity: item.quantity } : {}),
    }))

    const allSources = mapSourceLists(
      record.sources,
      ...(record.contributions ?? []).map((item) => item.sources),
    )
    const allGallery = [
      ...mapGallery(record.gallery),
      ...(record.contributions ?? []).flatMap((item) => mapGallery(item.gallery)),
    ]

    return {
      slug: record.slug,
      name: record.name,
      groupSlug: record.group?.slug ?? 'other-supporters',
      category: record.category,
      location: record.location ?? 'Butimba project community',
      summary: record.summary,
      role: record.role,
      ...(record.affiliation ? {
        affiliation: {
          name: record.affiliation.name,
          href: '/partners/' + record.affiliation.slug,
          description: 'Affiliated with this partner organisation.',
        },
      } : {}),
      contributions,
      sources: allSources,
      gallery: allGallery,
    }
  })

  const groupsBySlug = new Map<string, PartnerGroup>()
  for (const record of records) {
    if (record.group?.slug) {
      groupsBySlug.set(record.group.slug, {
        slug: record.group.slug,
        title: record.group.title,
        description: record.group.description,
      })
    }
  }

  return { partners, groups: [...groupsBySlug.values()] }
}

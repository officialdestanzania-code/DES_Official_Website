import { createClient } from '@sanity/client'
import { isSanityConfigured, sanityDataset, sanityProjectId } from '../sanity/sanityEnv'

const client = isSanityConfigured
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: '2025-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null

export type NewsSpan = {
  _key?: string
  _type?: string
  text?: string
  marks?: string[]
}

export type NewsBlock = {
  _key?: string
  _type: 'block' | 'image'
  style?: string
  listItem?: 'bullet' | 'number'
  level?: number
  children?: NewsSpan[]
  markDefs?: Array<{ _key: string; _type: string; href?: string }>
  url?: string
  alt?: string
  caption?: string
  permissionConfirmed?: boolean
}

export type NewsArticle = {
  _id: string
  title: string
  slug: string
  category: string
  excerpt: string
  publishedAt: string
  author?: string
  featured?: boolean
  coverImage?: { url?: string; alt: string; caption?: string; permissionConfirmed?: boolean }
  body: NewsBlock[]
  tags?: string[]
  sources?: Array<{ label: string; url: string }>
  seoTitle?: string
  seoDescription?: string
}

const newsQuery = `*[
  _type == "newsArticle" &&
  defined(slug.current) &&
  defined(publishedAt) &&
  dateTime(publishedAt) <= dateTime(now())
] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  author,
  featured,
  "coverImage": {
    "url": coverImage.image.asset->url,
    "alt": coverImage.alt,
    "caption": coverImage.caption,
    "permissionConfirmed": coverImage.permissionConfirmed
  },
  "body": body[]{
    _key,
    _type,
    style,
    listItem,
    level,
    children[]{ _key, _type, text, marks },
    markDefs[]{ _key, _type, href },
    "url": asset->url,
    alt,
    caption,
    permissionConfirmed
  },
  tags,
  sources[]{ label, url },
  seoTitle,
  seoDescription
}`

export async function fetchNewsFromCms(): Promise<NewsArticle[]> {
  if (!client) return []

  const articles = await client.fetch<NewsArticle[]>(newsQuery)
  return articles.map((article) => ({
    ...article,
    coverImage: article.coverImage?.url && article.coverImage.permissionConfirmed
      ? article.coverImage
      : undefined,
    body: (article.body ?? []).filter((block) => {
      if (block._type !== 'image') return true
      return Boolean(block.url && block.permissionConfirmed)
    }),
  }))
}

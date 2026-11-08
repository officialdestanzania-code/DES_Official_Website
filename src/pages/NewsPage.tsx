import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, Search } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { fetchNewsFromCms } from '../data/sanityNews'
import type { NewsArticle, NewsBlock } from '../data/sanityNews'
import './NewsPage.css'

declare global {
  interface Window {
    __DES_NEWS_ARTICLES__?: NewsArticle[]
  }
}

const DEFAULT_DESCRIPTION = 'Read the latest news, project updates, announcements and education technology insights from Digital Education Solutions.'

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-TZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

function updateMeta(selector: string, value: string) {
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = value
}

function updateCanonical(url: string) {
  const element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (element) element.href = url
}

function renderText(block: NewsBlock) {
  return (block.children ?? []).map((span, index) => {
    let content: ReactNode = span.text ?? ''
    for (const mark of span.marks ?? []) {
      if (mark === 'strong') content = <strong>{content}</strong>
      else if (mark === 'em') content = <em>{content}</em>
      else {
        const link = block.markDefs?.find((definition) => definition._key === mark && definition._type === 'link')
        if (link?.href && /^https?:\/\//i.test(link.href)) {
          content = <a href={link.href} target="_blank" rel="noopener noreferrer">{content}</a>
        }
      }
    }
    return <span key={span._key ?? index}>{content}</span>
  })
}

function ArticleBody({ blocks }: { blocks: NewsBlock[] }) {
  const elements: ReactNode[] = []
  let index = 0

  while (index < blocks.length) {
    const block = blocks[index]

    // Keep consecutive Sanity list items in one semantic HTML list.
    // Numbered items must render as <ol>, not <ul>.
    if (block._type === 'block' && block.listItem) {
      const listKind = block.listItem
      const listLevel = block.level ?? 1
      const listBlocks: NewsBlock[] = []
      let cursor = index

      while (cursor < blocks.length) {
        const candidate = blocks[cursor]
        if (
          candidate._type !== 'block' ||
          candidate.listItem !== listKind ||
          (candidate.level ?? 1) !== listLevel
        ) break
        listBlocks.push(candidate)
        cursor += 1
      }

      const ListElement = listKind === 'number' ? 'ol' : 'ul'
      elements.push(
        <ListElement key={block._key ?? index}>
          {listBlocks.map((item, itemIndex) => (
            <li key={item._key ?? itemIndex}>{renderText(item)}</li>
          ))}
        </ListElement>,
      )
      index = cursor
      continue
    }

    if (block._type === 'image' && block.url && block.alt) {
      elements.push(
        <figure className="des-news-inline-image" key={block._key ?? index}>
          <img src={block.url} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>,
      )
      index += 1
      continue
    }

    if (block._type !== 'block' || !block.children?.length) {
      index += 1
      continue
    }

    const text = renderText(block)
    if (block.style === 'h2') {
      elements.push(<h2 key={block._key ?? index}>{text}</h2>)
    } else if (block.style === 'h3') {
      elements.push(<h3 key={block._key ?? index}>{text}</h3>)
    } else if (block.style === 'blockquote') {
      elements.push(<blockquote key={block._key ?? index}>{text}</blockquote>)
    } else {
      elements.push(<p key={block._key ?? index}>{text}</p>)
    }
    index += 1
  }

  return <div className="des-news-article-body">{elements}</div>
}

function ArticleCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  return (
    <article className={'des-news-card' + (featured ? ' is-featured' : '')}>
      <Link to={'/news/' + article.slug} className="des-news-card-image" aria-label={'Read ' + article.title}>
        {article.coverImage?.url ? (
          <img src={article.coverImage.url} alt={article.coverImage.alt} loading="lazy" />
        ) : (
          <span className="des-news-image-placeholder">DES News</span>
        )}
      </Link>
      <div className="des-news-card-content">
        <div className="des-news-meta">
          <span className="des-news-category">{article.category}</span>
          <span><CalendarDays size={14} /> {formatDate(article.publishedAt)}</span>
        </div>
        <h2><Link to={'/news/' + article.slug}>{article.title}</Link></h2>
        <p>{article.excerpt}</p>
        <Link to={'/news/' + article.slug} className="des-news-read-link">
          Read update <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  )
}

export default function NewsPage({ initialArticles }: { initialArticles?: NewsArticle[] }) {
  const { pathname } = useLocation()
  const [articles, setArticles] = useState<NewsArticle[]>(
    () => initialArticles ?? (typeof window !== 'undefined' ? window.__DES_NEWS_ARTICLES__ : undefined) ?? [],
  )
  const [loading, setLoading] = useState(
    () => initialArticles === undefined && (typeof window === 'undefined' || window.__DES_NEWS_ARTICLES__ === undefined),
  )
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    if (initialArticles !== undefined || window.__DES_NEWS_ARTICLES__ !== undefined) return
    let cancelled = false
    fetchNewsFromCms()
      .then((result) => {
        if (!cancelled) setArticles(result)
      })
      .catch((error: unknown) => {
        console.error('Could not load published DES news:', error)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [initialArticles])

  const segments = pathname.split('/').filter(Boolean)
  const slug = segments.length > 1 ? segments[1] : undefined
  const article = slug ? articles.find((item) => item.slug === slug) : undefined
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(articles.map((item) => item.category).filter(Boolean)))],
    [articles],
  )
  const filteredArticles = useMemo(() => {
    const query = search.trim().toLowerCase()
    return articles.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const matchesSearch = !query || [item.title, item.excerpt, item.category, ...(item.tags ?? [])]
        .join(' ')
        .toLowerCase()
        .includes(query)
      return matchesCategory && matchesSearch
    })
  }, [articles, category, search])

  useEffect(() => {
    if (article) {
      const title = article.seoTitle || article.title + ' | DES News'
      const description = article.seoDescription || article.excerpt || DEFAULT_DESCRIPTION
      document.title = title
      updateMeta('meta[name="description"]', description)
      updateMeta('meta[property="og:title"]', title)
      updateMeta('meta[property="og:description"]', description)
      updateMeta('meta[property="og:url"]', 'https://des.co.tz/news/' + article.slug)
      if (article.coverImage?.url) {
        updateMeta('meta[property="og:image"]', article.coverImage.url)
        updateMeta('meta[name="twitter:image"]', article.coverImage.url)
      }
      updateCanonical('https://des.co.tz/news/' + article.slug)
    } else {
      document.title = 'News & Updates | Digital Education Solutions'
      updateMeta('meta[name="description"]', DEFAULT_DESCRIPTION)
      updateMeta('meta[property="og:title"]', 'News & Updates | Digital Education Solutions')
      updateMeta('meta[property="og:description"]', DEFAULT_DESCRIPTION)
      updateMeta('meta[property="og:url"]', 'https://des.co.tz/news')
      updateCanonical('https://des.co.tz/news')
    }
  }, [article])

  const featured = filteredArticles.find((item) => item.featured) ?? filteredArticles[0]

  return (
    <div className="des-news-page">
      <SiteHeader />
      {article ? (
        <>
          <section className="des-news-hero des-news-article-hero">
            <div className="des-news-container">
              <Link to="/news" className="des-news-back"><ArrowLeft size={16} /> All News &amp; Updates</Link>
              <span className="des-news-category">{article.category}</span>
              <h1>{article.title}</h1>
              <p>{article.excerpt}</p>
              <div className="des-news-article-date"><CalendarDays size={16} /> {formatDate(article.publishedAt)}{article.author ? ' · ' + article.author : ''}</div>
            </div>
          </section>
          <main id="main-content" className="des-news-container des-news-article-main">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'NewsArticle',
                  headline: article.title,
                  description: article.seoDescription || article.excerpt,
                  datePublished: article.publishedAt,
                  author: article.author ? { '@type': 'Person', name: article.author } : { '@type': 'Organization', name: 'Digital Education Solutions' },
                  publisher: {
                    '@type': 'Organization',
                    name: 'Digital Education Solutions (DES)',
                    url: 'https://des.co.tz/',
                    logo: { '@type': 'ImageObject', url: 'https://des.co.tz/images/des-ai-logo.png' },
                  },
                  mainEntityOfPage: 'https://des.co.tz/news/' + article.slug,
                  ...(article.coverImage?.url ? { image: [article.coverImage.url] } : {}),
                }).replaceAll('<', '\\u003c'),
              }}
            />
            {article.coverImage?.url && (
              <figure className="des-news-cover-image">
                <img src={article.coverImage.url} alt={article.coverImage.alt} />
                {article.coverImage.caption && <figcaption>{article.coverImage.caption}</figcaption>}
              </figure>
            )}
            <ArticleBody blocks={article.body ?? []} />
            {article.sources && article.sources.length > 0 && (
              <section className="des-news-sources">
                <h2>References &amp; Further Information</h2>
                {article.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} <ExternalLink size={14} />
                  </a>
                ))}
              </section>
            )}
            <div className="des-news-article-actions">
              <Link to="/news" className="des-news-back"><ArrowLeft size={16} /> Back to News &amp; Updates</Link>
              <Link to="/contact" className="des-news-read-link">Contact DES <ArrowRight size={16} /></Link>
            </div>
          </main>
        </>
      ) : slug ? (
        <main id="main-content" className="des-news-container des-news-not-found">
          <h1>{loading ? 'Loading article…' : 'Article not found'}</h1>
          {!loading && <p>This article may have been unpublished or the address may be incorrect.</p>}
          <Link to="/news" className="des-news-read-link"><ArrowLeft size={16} /> View all news</Link>
        </main>
      ) : (
        <>
          <section className="des-news-hero">
            <div className="des-news-container">
              <span className="des-news-eyebrow">DES JOURNAL</span>
              <h1>News &amp; Updates</h1>
              <p>News, project progress, announcements and perspectives from Digital Education Solutions.</p>
            </div>
          </section>
          <main id="main-content" className="des-news-container des-news-listing">
            {articles.length > 0 ? (
              <>
                {featured && category === 'All' && !search && (
                  <section className="des-news-featured">
                    <div>
                      <span className="des-news-eyebrow">LATEST FEATURE</span>
                      <h2>Stories and progress from DES</h2>
                      <p>Follow practical work in digital learning, school ICT, education technology and collaboration.</p>
                    </div>
                    <ArticleCard article={featured} featured />
                  </section>
                )}
                <div className="des-news-toolbar">
                  <div>
                    <h2>Latest updates</h2>
                    <p>{filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}</p>
                  </div>
                  <label className="des-news-search">
                    <Search size={17} />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search news and updates" aria-label="Search news and updates" />
                  </label>
                </div>
                <div className="des-news-filters" aria-label="Filter news by category">
                  {categories.map((item) => (
                    <button key={item} type="button" className={category === item ? 'is-active' : ''} onClick={() => setCategory(item)}>{item}</button>
                  ))}
                </div>
                {filteredArticles.length > 0 ? (
                  <div className="des-news-grid">
                    {filteredArticles
                      .filter((item) => !(item.slug === featured?.slug && category === 'All' && !search))
                      .map((item) => <ArticleCard key={item._id} article={item} />)}
                  </div>
                ) : (
                  <div className="des-news-empty"><h3>No matching updates</h3><p>Try a different search term or category.</p></div>
                )}
              </>
            ) : (
              <div className="des-news-empty">
                <CalendarDays size={30} />
                <h2>{loading ? 'Loading DES updates…' : 'New updates are being prepared'}</h2>
                <p>Published news, announcements and verified project updates will appear here.</p>
                <Link to="/projects" className="des-news-read-link">Explore DES projects <ArrowRight size={16} /></Link>
              </div>
            )}
          </main>
        </>
      )}
      <SiteFooter />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchNewsFromCms } from '../data/sanityNews'
import type { NewsArticle } from '../data/sanityNews'
import './NewsPreview.css'

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('en-TZ', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

export default function NewsPreview() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchNewsFromCms()
      .then((items) => {
        if (!cancelled) setArticles(items.slice(0, 3))
      })
      .catch((error: unknown) => {
        console.error('Could not load DES homepage news preview:', error)
      })
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => { cancelled = true }
  }, [])

  return (
    <section className="des-home-news section-padding">
      <div className="container">
        <div className="des-home-news-heading">
          <div>
            <span className="section-label">STAY INFORMED</span>
            <h2>News &amp; <span>Updates</span></h2>
            <p>Follow the latest announcements, project progress and developments from DES.</p>
          </div>
          <Link to="/news" className="des-home-news-all">All news &amp; updates <ArrowRight size={17} /></Link>
        </div>

        {articles.length > 0 ? (
          <div className="des-home-news-grid">
            {articles.map((article) => (
              <article className="des-home-news-card" key={article._id}>
                <Link to={'/news/' + article.slug} className="des-home-news-image">
                  {article.coverImage?.url
                    ? <img src={article.coverImage.url} alt={article.coverImage.alt} loading="lazy" />
                    : <span>DES News</span>}
                </Link>
                <div className="des-home-news-card-content">
                  <div className="des-home-news-meta"><span>{article.category}</span><span><CalendarDays size={13} />{formatDate(article.publishedAt)}</span></div>
                  <h3><Link to={'/news/' + article.slug}>{article.title}</Link></h3>
                  <p>{article.excerpt}</p>
                  <Link to={'/news/' + article.slug} className="des-home-news-read">Read update <ArrowRight size={15} /></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="des-home-news-empty">
            <p>{loaded ? 'Published DES news and verified project updates will appear here.' : 'Loading the latest DES updates…'}</p>
            <Link to="/news">Visit News &amp; Updates <ArrowRight size={15} /></Link>
          </div>
        )}
      </div>
    </section>
  )
}

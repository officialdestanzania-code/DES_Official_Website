import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Handshake, Image as ImageIcon } from 'lucide-react'
import { butimbaPartners } from '../data/butimbaPartners'
import './ButimbaPartnersPage.css'

const projectUrl = '/projects/butimba-digital-learning-computer-room'

function PageHeader() {
  return (
    <header className="partner-header">
      <div className="partner-container partner-nav">
        <Link to="/" className="partner-brand" aria-label="DES Home">
          <img src="/images/des-ai-logo.png" alt="Digital Education Solutions" />
        </Link>
        <Link to={projectUrl} className="partner-back-link">
          <ArrowLeft size={17} /> Butimba Project
        </Link>
      </div>
    </header>
  )
}

function PartnerCard({ partner }: { partner: (typeof butimbaPartners)[number] }) {
  return (
    <article className="partner-card">
      <div className="partner-card-mark"><Handshake size={25} /></div>
      <span className="partner-category">{partner.category}</span>
      <h2>{partner.name}</h2>
      <span className="partner-location">{partner.location}</span>
      <p>{partner.summary}</p>
      <Link to={'/partners/' + partner.slug} className="partner-card-link">
        View partner profile <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function PartnerDirectory() {
  return (
    <>
      <section className="partner-hero">
        <div className="partner-container">
          <span className="partner-eyebrow">BUTIMBA DIGITAL LEARNING PROJECT</span>
          <h1>Partners & Supporters</h1>
          <p>Every contribution has a story. Explore the organisations, project coordinators, alumni and friends who have supported learning at Butimba Primary School.</p>
        </div>
      </section>
      <main className="partner-container partner-main">
        <div className="partner-intro-note">
          <Handshake size={24} />
          <p>Each supporter has an individual profile link recording their role and the contribution connected with the Butimba project. New contributions and verified photographs can be added as the project grows.</p>
        </div>
        <div className="partner-grid">
          {butimbaPartners.map((partner) => (
            <PartnerCard key={partner.slug} partner={partner} />
          ))}
        </div>
      </main>
    </>
  )
}

function PartnerProfile({ partner }: { partner: (typeof butimbaPartners)[number] }) {
  return (
    <>
      <section className="partner-hero partner-profile-hero">
        <div className="partner-container">
          <Link to="/partners" className="partner-hero-back"><ArrowLeft size={16} /> All partners and supporters</Link>
          <span className="partner-eyebrow">{partner.category}</span>
          <h1>{partner.name}</h1>
          <span className="partner-location partner-profile-location">{partner.location}</span>
          <p>{partner.summary}</p>
        </div>
      </section>
      <main className="partner-container partner-main">
        <div className="partner-profile-grid">
          <section className="partner-panel">
            <h2>Role in the Butimba Project</h2>
            <p>{partner.role}</p>
          </section>
          <section className="partner-panel">
            <h2>Contribution & Project Record</h2>
            <ul className="partner-contributions">
              {partner.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
            </ul>
            {partner.statusNote && <p className="partner-status-note">{partner.statusNote}</p>}
          </section>
        </div>

        <section className="partner-gallery-panel">
          <div className="partner-section-heading">
            <ImageIcon size={22} />
            <div>
              <h2>Photo Gallery</h2>
              <p>Photographs documenting this contribution and its use at the school.</p>
            </div>
          </div>
          {partner.gallery.length > 0 ? (
            <div className="partner-gallery-grid">
              {partner.gallery.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="partner-gallery-empty">
              <ImageIcon size={27} />
              <p>Verified photographs for this profile have not yet been added.</p>
              <span>Only authentic project photographs with permission for public use will be displayed here.</span>
            </div>
          )}
        </section>

        {partner.sources.length > 0 && (
          <section className="partner-sources-panel">
            <h2>Related Project Records</h2>
            <p>External references documenting this work or partnership.</p>
            <div className="partner-source-links">
              {partner.sources.map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                  {source.label} <ExternalLink size={15} />
                </a>
              ))}
            </div>
          </section>
        )}

        <div className="partner-footer-actions">
          <Link to="/partners" className="partner-outline-button"><ArrowLeft size={16} /> Back to all partners</Link>
          <Link to={projectUrl} className="partner-primary-button">Butimba Project <ArrowRight size={16} /></Link>
        </div>
      </main>
    </>
  )
}

export default function ButimbaPartnersPage() {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)
  const slug = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : undefined
  const partner = slug ? butimbaPartners.find((item) => item.slug === slug) : undefined

  useEffect(() => {
    document.title = partner
      ? partner.name + ' | Butimba Partners | DES Tanzania'
      : 'Butimba Partners & Supporters | DES Tanzania'
  }, [partner])

  return (
    <div className="partner-page">
      <PageHeader />
      {partner ? (
        <PartnerProfile partner={partner} />
      ) : slug ? (
        <main className="partner-container partner-main partner-not-found">
          <h1>Partner profile not found</h1>
          <p>The requested profile could not be found.</p>
          <Link to="/partners" className="partner-primary-button">View all partners</Link>
        </main>
      ) : (
        <PartnerDirectory />
      )}
      <footer className="partner-footer">
        <div className="partner-container">
          <span>© {new Date().getUTCFullYear()} Digital Education Solutions (DES).</span>
          <Link to="/">DES Official Website</Link>
        </div>
      </footer>
    </div>
  )
}

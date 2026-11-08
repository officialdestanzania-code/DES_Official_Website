import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Handshake, Image as ImageIcon } from 'lucide-react'
import { butimbaPartners, partnerGroups } from '../data/butimbaPartners'
import type { ButimbaPartner, PartnerGroup } from '../data/butimbaPartners'
import { fetchPartnerDirectoryFromCms } from '../data/sanityPartners'
import type { PartnerDirectoryData } from '../data/sanityPartners'
import './ButimbaPartnersPage.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

declare global {
  interface Window {
    __DES_PARTNER_DIRECTORY__?: PartnerDirectoryData
  }
}

const projectUrl = '/projects/butimba-digital-learning-computer-room'

function PartnerCard({ partner }: { partner: ButimbaPartner }) {
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

function PartnerDirectory({ partners, groups }: { partners: ButimbaPartner[]; groups: PartnerGroup[] }) {
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
        <div className="partner-group-list">
          {groups.map((group) => {
            const groupPartners = partners.filter((partner) => partner.groupSlug === group.slug)
            if (groupPartners.length === 0) return null
            return (
              <section className="partner-group-section" key={group.slug}>
                <div className="partner-group-heading">
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
                <div className="partner-grid">
                  {groupPartners.map((partner) => (
                    <PartnerCard key={partner.slug} partner={partner} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}

function PartnerProfile({ partner }: { partner: ButimbaPartner }) {
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
            {partner.affiliation && (
              <div className="partner-affiliation">
                <span>Affiliated with</span>
                {partner.affiliation.href ? (
                  <Link to={partner.affiliation.href}>{partner.affiliation.name}</Link>
                ) : (
                  <strong>{partner.affiliation.name}</strong>
                )}
                <small>{partner.affiliation.description}</small>
              </div>
            )}
          </section>
          <section className="partner-panel">
            <h2>Contribution & Project Record</h2>
            <div className="partner-contributions">
              {partner.contributions.map((contribution) => (
                <article className="partner-contribution-item" key={contribution.id}>
                  <div className="partner-contribution-heading">
                    <h3>{contribution.title}</h3>
                    <span className="partner-contribution-year">{contribution.year}</span>
                  </div>
                  <p>{contribution.description}</p>
                  <div className="partner-contribution-meta">
                    {contribution.quantity && (
                      <span className="partner-contribution-quantity">
                        <strong>Quantity:</strong> {contribution.quantity}
                      </span>
                    )}
                    <span className={'partner-contribution-status status-' + contribution.status}>
                      {contribution.status === 'completed'
                        ? 'Completed'
                        : contribution.status === 'ongoing'
                          ? 'Ongoing'
                          : contribution.status === 'paused'
                            ? 'Paused'
                            : 'Coordination'}
                    </span>
                  </div>
                </article>
              ))}
            </div>
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

export default function ButimbaPartnersPage({ initialDirectory }: { initialDirectory?: PartnerDirectoryData }) {
  const { pathname } = useLocation()
  const browserDirectory = typeof window !== 'undefined' ? window.__DES_PARTNER_DIRECTORY__ : undefined
  const [directory, setDirectory] = useState<PartnerDirectoryData>(
    () => initialDirectory ?? browserDirectory ?? { partners: butimbaPartners, groups: partnerGroups },
  )
  const [cmsLoaded, setCmsLoaded] = useState(false)
  const pathSegments = pathname.split('/').filter(Boolean)
  const slug = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : undefined

  useEffect(() => {
    let cancelled = false
    fetchPartnerDirectoryFromCms()
      .then((result) => {
        if (!cancelled && result) setDirectory(result)
      })
      .catch((error: unknown) => {
        console.error('Could not load published partner records from CMS:', error)
      })
      .finally(() => {
        if (!cancelled) setCmsLoaded(true)
      })
    return () => { cancelled = true }
  }, [])

  const partner = slug ? directory.partners.find((item) => item.slug === slug) : undefined

  useEffect(() => {
    document.title = partner
      ? partner.name + ' | Butimba Partners | DES Tanzania'
      : 'Butimba Partners & Supporters | DES Tanzania'
  }, [partner])

  return (
    <div className="partner-page">
      <SiteHeader />
      <div id="main-content">
        {partner ? (
          <PartnerProfile partner={partner} />
        ) : slug && !cmsLoaded ? (
          <main className="partner-container partner-main partner-not-found">
            <h1>Loading partner profile…</h1>
          </main>
        ) : slug ? (
          <main className="partner-container partner-main partner-not-found">
            <h1>Partner profile not found</h1>
            <p>The requested profile could not be found.</p>
            <Link to="/partners" className="partner-primary-button">View all partners</Link>
          </main>
        ) : (
          <PartnerDirectory partners={directory.partners} groups={directory.groups} />
        )}
      </div>
      <SiteFooter />
    </div>
  )
}

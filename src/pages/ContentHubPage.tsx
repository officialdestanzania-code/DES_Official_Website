import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  GraduationCap,
  Laptop,
  Palette,
  Users,
  ExternalLink,
  Mail,
  Copy,
  Check,
} from 'lucide-react'
import { projects, resourceGroups, solutions } from '../data/siteContent'
import { butimbaPartners } from '../data/butimbaPartners'
import type { ProjectItem, SolutionItem } from '../data/siteContent'
import './ContentHubPage.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'

type Section = 'solutions' | 'projects' | 'resources'


const DES_EMAIL = 'officialdestanzania@gmail.com'

const gmailComposeLink = (subject: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${DES_EMAIL}&su=${encodeURIComponent(subject)}`

function ContactActions({ subject }: { subject: string }) {
  const [copyMessage, setCopyMessage] = useState('')

  const copyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard access is unavailable')
      }
      await navigator.clipboard.writeText(DES_EMAIL)
      setCopyMessage('Email address copied. Paste it into your email app.')
    } catch {
      setCopyMessage('Copy is unavailable here. Select the email address above and copy it.')
    }
  }

  return (
    <div className="hub-contact-actions">
      <div className="hub-email-details">
        <span className="hub-email-label">Email DES</span>
        <span className="hub-email-address">{DES_EMAIL}</span>
        <span className="hub-copy-status" aria-live="polite">{copyMessage}</span>
      </div>
      <div className="hub-contact-buttons">
        <a href={gmailComposeLink(subject)} className="hub-button">
          <Mail size={16} /> Open Gmail
        </a>
        <button type="button" className="hub-copy-button" onClick={copyEmail}>
          {copyMessage.startsWith('Email address copied') ? <Check size={16} /> : <Copy size={16} />}
          Copy email
        </button>
      </div>
    </div>
  )
}

const solutionIcons = {
  learning: BookOpen,
  ai: BrainCircuit,
  ict: Laptop,
  creative: Palette,
  software: Code2,
  skills: GraduationCap,
}

const titles: Record<Section, { eyebrow: string; title: string; description: string }> = {
  solutions: {
    eyebrow: 'WHAT WE DO',
    title: 'DES Solutions',
    description: 'Practical digital approaches that connect education, technology and creativity.',
  },
  projects: {
    eyebrow: 'OUR WORK',
    title: 'DES Projects',
    description: 'Explore initiatives being developed and delivered by Digital Education Solutions.',
  },
  resources: {
    eyebrow: 'LEARNING MATERIALS',
    title: 'DES Learning Resources',
    description: 'A starting point for teaching and learning materials available through the DES digital learning environment.',
  },
}

function HubIntro({ section }: { section: Section }) {
  const content = titles[section]
  return (
    <section className="hub-hero">
      <div className="hub-container">
        <span className="hub-eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </div>
    </section>
  )
}

function SolutionCard({ item }: { item: SolutionItem }) {
  const Icon = solutionIcons[item.icon]
  return (
    <article className="hub-card">
      <div className="hub-card-icon"><Icon size={27} /></div>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <Link to={`/solutions/${item.slug}`} className="hub-card-link">
        Explore solution <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="hub-card">
      <span className={`hub-status hub-status-${item.status.toLowerCase().replaceAll(' ', '-')}`}>
        {item.status}
      </span>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <Link to={`/projects/${item.slug}`} className="hub-card-link">
        View project <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function ListingPage({ section }: { section: 'solutions' | 'projects' }) {
  return (
    <>
      <HubIntro section={section} />
      <main className="hub-container hub-main">
        <div className="hub-grid">
          {section === 'solutions'
            ? solutions.map((item) => <SolutionCard key={item.slug} item={item} />)
            : projects.map((item) => <ProjectCard key={item.slug} item={item} />)}
        </div>
        <div className="hub-contact-panel">
          <div>
            <h2>Let’s work together</h2>
            <p>Contact DES to discuss a school, learning or digital innovation initiative.</p>
          </div>
          <ContactActions subject="DES Enquiry" />
        </div>
      </main>
    </>
  )
}

function SolutionDetail({ item }: { item: SolutionItem }) {
  const Icon = solutionIcons[item.icon]
  return (
    <>
      <section className="hub-detail-hero">
        <div className="hub-container">
          <Link to="/solutions" className="hub-back-link"><ArrowLeft size={16} /> All Solutions</Link>
          <div className="hub-card-icon"><Icon size={29} /></div>
          <span className="hub-eyebrow">DES SOLUTION</span>
          <h1>{item.title}</h1>
          <p>{item.overview}</p>
        </div>
      </section>
      <main className="hub-container hub-main hub-detail-grid">
        <section className="hub-detail-panel">
          <h2>Areas of Focus</h2>
          <ul>{item.focusAreas.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </section>
        <section className="hub-detail-panel">
          <h2>Who This Supports</h2>
          <ul>{item.audiences.map((entry) => <li key={entry}>{entry}</li>)}</ul>
        </section>
        <div className="hub-contact-panel hub-detail-contact">
          <div>
            <h2>Discuss this solution with DES</h2>
            <p>Tell us about your school, organisation or learning needs.</p>
          </div>
          <ContactActions subject={item.title} />
        </div>
      </main>
    </>
  )
}

function ProjectDetail({ item }: { item: ProjectItem }) {
  return (
    <>
      <section className="hub-detail-hero">
        <div className="hub-container">
          <Link to="/projects" className="hub-back-link"><ArrowLeft size={16} /> All Projects</Link>
          <span className="hub-eyebrow">DES PROJECT</span>
          <span className={`hub-status hub-status-${item.status.toLowerCase().replaceAll(' ', '-')}`}>
            {item.status}
          </span>
          <h1>{item.title}</h1>
          <p>{item.overview}</p>
        </div>
      </section>
      <main className="hub-container hub-main hub-detail-grid">
        <section className="hub-detail-panel">
          <h2>Project Highlights</h2>
          <ul>{item.highlights.map((entry) => <li key={entry}>{entry}</li>)}</ul>
          {item.link && (
            <a
              href={item.link}
              className="hub-button hub-project-button"
              target={item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {item.linkLabel ?? 'Explore project'}
              {item.link.startsWith('http') ? <ExternalLink size={16} /> : <ArrowRight size={16} />}
            </a>
          )}
        </section>
        {item.slug === 'butimba-digital-learning-computer-room' && (
          <section className="hub-detail-panel hub-partners-preview">
            <h2>Partners &amp; Supporters</h2>
            <p>Explore an individual profile for each organisation, coordinator, alumnus and friend supporting the Butimba initiative.</p>
            <div className="hub-partners-mini-grid">
              {butimbaPartners.map((partner) => (
                <Link key={partner.slug} to={'/partners/' + partner.slug} className="hub-partner-mini-link">
                  <span>{partner.name}</span>
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
            <Link to="/partners" className="hub-card-link hub-all-partners-link">
              View all partners and supporters <ArrowRight size={16} />
            </Link>
          </section>
        )}
        <div className="hub-contact-panel hub-detail-contact">
          <div>
            <h2>Interested in collaborating?</h2>
            <p>Contact DES to discuss partnership and project opportunities.</p>
          </div>
          <ContactActions subject="DES Project Enquiry" />
        </div>
      </main>
    </>
  )
}

function ResourcesPage() {
  return (
    <>
      <HubIntro section="resources" />
      <main className="hub-container hub-main">
        <div className="hub-resource-note">
          <BookOpen size={25} />
          <div>
            <h2>One learning destination</h2>
            <p>DES is building its learning resources around the DES AI Learning Platform. This avoids splitting notes and teaching materials across disconnected websites.</p>
          </div>
        </div>
        <div className="hub-grid hub-resource-grid">
          {resourceGroups.map((group) => (
            <article className="hub-card hub-resource-card" key={group.slug}>
              <div className="hub-card-icon">{group.slug === 'teacher-resources' ? <Users size={27} /> : <GraduationCap size={27} />}</div>
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <ul>{group.items.map((entry) => <li key={entry}>{entry}</li>)}</ul>
              <a href="https://learn.des.co.tz/login" target="_blank" rel="noopener noreferrer" className="hub-card-link">
                Open DES Learning Platform <ExternalLink size={16} />
              </a>
            </article>
          ))}
        </div>
        <p className="hub-resource-footnote">The availability of individual materials depends on what has been published on the learning platform.</p>
      </main>
    </>
  )
}

export default function ContentHubPage({ section }: { section: Section }) {
  const { pathname } = useLocation()
  const pathSegments = pathname.split('/').filter(Boolean)
  const slug = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : undefined
  const solution = section === 'solutions' ? solutions.find((item) => item.slug === slug) : undefined
  const project = section === 'projects' ? projects.find((item) => item.slug === slug) : undefined

  useEffect(() => {
    const pageTitle = solution?.title ?? project?.title
    const title = pageTitle
      ? `${pageTitle} | DES Tanzania`
      : `${titles[section].title} | DES Tanzania`
    const description = solution?.summary ?? project?.summary ?? titles[section].description
    const canonicalUrl = 'https://des.co.tz' + pathname
    document.title = title
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const ogTitleMeta = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    const ogDescriptionMeta = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    const ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (descriptionMeta) descriptionMeta.content = description
    if (ogTitleMeta) ogTitleMeta.content = title
    if (ogDescriptionMeta) ogDescriptionMeta.content = description
    if (ogUrlMeta) ogUrlMeta.content = canonicalUrl
    if (canonical) canonical.href = canonicalUrl
  }, [section, solution, project, pathname])

  let content
  if (section === 'resources') {
    content = <ResourcesPage />
  } else if (section === 'solutions' && solution) {
    content = <SolutionDetail item={solution} />
  } else if (section === 'projects' && project) {
    content = <ProjectDetail item={project} />
  } else if (slug) {
    content = (
      <main className="hub-container hub-main">
        <h1>Page not found</h1>
        <p>The requested DES page could not be found.</p>
        <Link to={`/${section}`} className="hub-button">Return to {titles[section].title}</Link>
      </main>
    )
  } else {
    content = <ListingPage section={section as 'solutions' | 'projects'} />
  }

  return (
    <div className="hub-page">
      <SiteHeader />
      <div id="main-content">{content}</div>
      <SiteFooter />
    </div>
  )
}

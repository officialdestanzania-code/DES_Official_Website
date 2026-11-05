import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
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
  Wrench,
  ExternalLink,
} from 'lucide-react'
import { projects, resourceGroups, solutions } from '../data/siteContent'
import type { ProjectItem, SolutionItem } from '../data/siteContent'
import './ContentHubPage.css'

type Section = 'solutions' | 'projects' | 'resources'

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

function HubHeader() {
  return (
    <header className="hub-header">
      <div className="hub-container hub-nav">
        <Link to="/" className="hub-brand" aria-label="DES Home">
          <img src="/images/des-ai-logo.png" alt="Digital Education Solutions" />
        </Link>
        <Link to="/" className="hub-back-link">
          <ArrowLeft size={17} /> Back to DES Website
        </Link>
      </div>
    </header>
  )
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
      <Link to={\`/solutions/\${item.slug}\`} className="hub-card-link">
        Explore solution <ArrowRight size={16} />
      </Link>
    </article>
  )
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <article className="hub-card">
      <span className={\`hub-status hub-status-\${item.status.toLowerCase().replaceAll(' ', '-')}\`}>
        {item.status}
      </span>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      <Link to={\`/projects/\${item.slug}\`} className="hub-card-link">
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
          <a href="mailto:officialdestanzania@gmail.com?subject=DES%20Enquiry" className="hub-button">
            Contact DES <ArrowRight size={17} />
          </a>
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
          <a href={\`mailto:officialdestanzania@gmail.com?subject=\${encodeURIComponent(item.title)}\`} className="hub-button">
            Make an enquiry <ArrowRight size={17} />
          </a>
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
          <span className={\`hub-status hub-status-\${item.status.toLowerCase().replaceAll(' ', '-')}\`}>
            {item.status}
          </span>
          <h1>{item.title}</h1>
          <p>{item.overview}</p>
        </div>
      </section>
      <main className="hub-container hub-main">
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
        <div className="hub-contact-panel">
          <div>
            <h2>Interested in collaborating?</h2>
            <p>Contact DES to discuss partnership and project opportunities.</p>
          </div>
          <a href="mailto:officialdestanzania@gmail.com?subject=DES%20Project%20Enquiry" className="hub-button">
            Contact DES <ArrowRight size={17} />
          </a>
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
              <a href="https://learn.des.co.tz" target="_blank" rel="noopener noreferrer" className="hub-card-link">
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
  const { slug } = useParams()
  const solution = section === 'solutions' ? solutions.find((item) => item.slug === slug) : undefined
  const project = section === 'projects' ? projects.find((item) => item.slug === slug) : undefined

  useEffect(() => {
    const pageTitle = solution?.title ?? project?.title
    document.title = pageTitle
      ? \`\${pageTitle} | DES Tanzania\`
      : \`\${titles[section].title} | DES Tanzania\`
  }, [section, solution, project])

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
        <Link to={\`/\${section}\`} className="hub-button">Return to {titles[section].title}</Link>
      </main>
    )
  } else {
    content = <ListingPage section={section as 'solutions' | 'projects'} />
  }

  return (
    <div className="hub-page">
      <HubHeader />
      {content}
      <footer className="hub-footer">
        <div className="hub-container">
          <span>© {new Date().getUTCFullYear()} Digital Education Solutions (DES).</span>
          <Link to="/">DES Official Website</Link>
        </div>
      </footer>
    </div>
  )
}

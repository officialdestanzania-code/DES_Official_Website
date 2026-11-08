import { ArrowRight, BookOpen, BrainCircuit, Code2, Globe, Laptop, Lightbulb, Palette, GraduationCap, Mail, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import { solutions } from '../data/siteContent'
import './StaticPages.css'

const icons = {
  learning: BookOpen,
  ai: BrainCircuit,
  ict: Laptop,
  creative: Palette,
  software: Code2,
  skills: GraduationCap,
}

function setPageMetadata(title: string, description: string, path: string) {
  document.title = title
  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  const ogTitleMeta = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
  const ogDescriptionMeta = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
  const ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]')
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (descriptionMeta) descriptionMeta.content = description
  if (ogTitleMeta) ogTitleMeta.content = title
  if (ogDescriptionMeta) ogDescriptionMeta.content = description
  if (ogUrlMeta) ogUrlMeta.content = 'https://des.co.tz' + path
  if (canonical) canonical.href = 'https://des.co.tz' + path
}

export function AboutPage() {
  useEffect(() => {
    setPageMetadata(
      'About DES | Digital Education Solutions Tanzania',
      'Learn about Digital Education Solutions, our vision, mission, values and focus on education, digital skills and creative technology.',
      '/about',
    )
  }, [])

  return (
    <div className="des-static-page">
      <SiteHeader />
      <section className="des-static-hero">
        <div className="des-static-container">
          <span className="des-static-eyebrow">ABOUT DIGITAL EDUCATION SOLUTIONS</span>
          <h1>Connecting education, technology and <span>creativity.</span></h1>
          <p>Digital Education Solutions (DES) is a digital innovation and education initiative focused on practical technology-enabled learning, digital skills and creative solutions.</p>
          <div className="des-static-actions">
            <Link to="/projects" className="des-static-primary">Explore our projects <ArrowRight size={17} /></Link>
            <Link to="/contact" className="des-static-secondary">Work with DES</Link>
          </div>
        </div>
      </section>

      <main id="main-content" className="des-static-container des-about-main">
        <section className="des-about-intro">
          <div>
            <span className="des-static-eyebrow">OUR PURPOSE</span>
            <h2>Technology should create meaningful learning opportunities.</h2>
          </div>
          <p>DES explores, develops and promotes digital solutions that respond to practical needs in education and communities. Our work connects learning platforms, responsible use of artificial intelligence, school ICT environments, creative technology and software development.</p>
        </section>

        <section className="des-about-pillars" aria-label="DES vision, mission and values">
          <article>
            <div className="des-static-icon"><Globe size={26} /></div>
            <h2>Our Vision</h2>
            <p>To contribute to a future where digital technology, creativity and innovation make quality learning opportunities more accessible to all.</p>
          </article>
          <article>
            <div className="des-static-icon"><Lightbulb size={26} /></div>
            <h2>Our Mission</h2>
            <p>To explore, develop and promote practical digital solutions that empower learners, educators and communities through technology and creative learning.</p>
          </article>
          <article>
            <div className="des-static-icon"><BrainCircuit size={26} /></div>
            <h2>Our Values</h2>
            <p>Creativity, innovation, collaboration, accessibility, continuous learning and practical impact guide our work.</p>
          </article>
        </section>

        <section className="des-about-focus">
          <div className="des-static-section-heading">
            <span className="des-static-eyebrow">OUR AREAS OF WORK</span>
            <h2>Where education meets digital innovation</h2>
            <p>Our focus areas bring practical technology and learning experiences together.</p>
          </div>
          <div className="des-about-focus-grid">
            {solutions.map((item) => {
              const Icon = icons[item.icon]
              return (
                <Link key={item.slug} to={'/solutions/' + item.slug} className="des-about-focus-card">
                  <span className="des-static-icon"><Icon size={24} /></span>
                  <span><strong>{item.title}</strong><small>{item.summary}</small></span>
                  <ArrowRight size={17} />
                </Link>
              )
            })}
          </div>
        </section>

        <section className="des-about-cta">
          <div><h2>Let’s build practical solutions together.</h2><p>We welcome collaboration with educators, schools, institutions, technology professionals and development partners.</p></div>
          <Link to="/contact" className="des-static-primary">Start a conversation <ArrowRight size={17} /></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export function ContactPage() {
  useEffect(() => {
    setPageMetadata(
      'Contact DES | Digital Education Solutions Tanzania',
      'Contact Digital Education Solutions about digital learning, school ICT, education technology and partnership opportunities.',
      '/contact',
    )
  }, [])

  return (
    <div className="des-static-page">
      <SiteHeader />
      <section className="des-static-hero des-contact-hero">
        <div className="des-static-container">
          <span className="des-static-eyebrow">CONTACT DES</span>
          <h1>Let’s talk about education and <span>digital innovation.</span></h1>
          <p>Contact Digital Education Solutions about learning technology, school ICT, digital skills, software development and opportunities to collaborate.</p>
        </div>
      </section>

      <main id="main-content" className="des-static-container des-contact-main">
        <section className="des-contact-grid">
          <article className="des-contact-card des-contact-primary-card">
            <span className="des-static-icon"><Mail size={27} /></span>
            <span className="des-static-eyebrow">OFFICIAL EMAIL</span>
            <h2>Send DES an enquiry</h2>
            <p>For general enquiries, project discussions, partnerships and collaboration proposals, contact the DES team by email.</p>
            <a href="mailto:officialdestanzania@gmail.com" className="des-static-primary">officialdestanzania@gmail.com <ArrowRight size={17} /></a>
          </article>
          <article className="des-contact-card">
            <span className="des-static-icon"><Users size={27} /></span>
            <h2>Partnerships &amp; collaboration</h2>
            <p>We welcome practical collaboration with schools, educators, institutions, technology professionals and development partners.</p>
            <a href="mailto:officialdestanzania@gmail.com?subject=DES%20Partnership%20Enquiry" className="des-static-text-link">Discuss a partnership <ArrowRight size={16} /></a>
          </article>
          <article className="des-contact-card">
            <span className="des-static-icon"><Laptop size={27} /></span>
            <h2>Access digital services</h2>
            <p>Visit the DES AI Learning Platform for student, teacher and administrator services, or explore the Digital Store.</p>
            <a href="https://learn.des.co.tz/login" target="_blank" rel="noopener noreferrer" className="des-static-text-link">Open Learning Platform <ArrowRight size={16} /></a>
            <a href="https://learn.des.co.tz/store" target="_blank" rel="noopener noreferrer" className="des-static-text-link">Visit DES Digital Store <ArrowRight size={16} /></a>
          </article>
        </section>
        <section className="des-contact-guidance">
          <h2>Help us direct your enquiry</h2>
          <p>When writing, include the school or organisation you represent, the service or project you are asking about, and the best way for the DES team to respond. Do not send passwords, identity documents or confidential pupil information by email.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

export function NotFoundPage() {
  useEffect(() => { document.title = 'Page Not Found | Digital Education Solutions' }, [])
  return (
    <div className="des-static-page">
      <SiteHeader />
      <main id="main-content" className="des-static-container des-not-found">
        <span className="des-static-eyebrow">404 · PAGE NOT FOUND</span>
        <h1>This page is not available.</h1>
        <p>The link may be incorrect, or the page may have moved. Use the links below to continue exploring DES.</p>
        <div className="des-static-actions">
          <Link to="/" className="des-static-primary">Go to DES home <ArrowRight size={17} /></Link>
          <Link to="/contact" className="des-static-secondary des-not-found-secondary">Contact DES</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

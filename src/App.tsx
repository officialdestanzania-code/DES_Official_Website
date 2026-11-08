import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Palette,
  Laptop,
  GraduationCap,
  Globe,
  Lightbulb,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './App.css'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import NewsPreview from './components/NewsPreview'
import { projects, solutions } from './data/siteContent'
import type { NewsArticle } from './data/sanityNews'
function App({ initialNewsArticles }: { initialNewsArticles?: NewsArticle[] }) {
  const solutionIcons = {
    learning: BookOpen,
    ai: BrainCircuit,
    ict: Laptop,
    creative: Palette,
    software: Code2,
    skills: GraduationCap,
  }

  return (
    <>
      <SiteHeader />

      <main id="main-content">
        <section className="hero-section" id="home">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">
                <Lightbulb size={17} />
                Creativity Within Us.
              </span>

              <h1>
                Empowering Education Through{' '}
                <span>Digital Innovation.</span>
              </h1>

              <p>
                Bringing education, technology and creativity together
                to empower learners, educators and communities.
              </p>

              <div className="hero-actions">
                <a href="#solutions" className="btn btn-primary">
                  Explore Our Solutions <ArrowRight size={18} />
                </a>
                <a href="#projects" className="btn btn-secondary">
                  Discover Our Projects
                </a>
              </div>

              <div className="hero-note">
                <span className="note-line" />
                Innovation begins with creativity.
              </div>
            </div>

            <div className="hero-visual">
              <img
                src="/images/des-learning.jpg"
                alt="Students exploring digital technology and computer learning"
              />
              <div className="visual-badge">
                <BrainCircuit size={25} />
                <span>
                  Learning Through
                  <strong>Innovation</strong>
                </span>
              </div>
              <div className="visual-decoration" />
            </div>
          </div>
        </section>

        <section className="intro-section section-padding" id="about">
          <div className="container">
            <div className="about-intro">
              <span className="section-label">ABOUT DES</span>
              <h2>
                Connecting Education, Technology and <span>Creativity.</span>
              </h2>
              <p>
                Digital Education Solutions (DES) is a digital innovation
                and education initiative focused on using technology and
                creativity to expand learning opportunities and address
                practical educational needs.
              </p>
            </div>

            <div className="about-pillars">
              <article className="about-card">
                <div className="solution-icon">
                  <Globe size={27} />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To contribute to a future where digital technology,
                  creativity and innovation make quality learning
                  opportunities more accessible to all.
                </p>
              </article>

              <article className="about-card">
                <div className="solution-icon">
                  <Lightbulb size={27} />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To explore, develop and promote practical digital
                  solutions that empower learners, educators and
                  communities through technology and creative learning.
                </p>
              </article>

              <article className="about-card">
                <div className="solution-icon">
                  <BrainCircuit size={27} />
                </div>
                <h3>Our Core Values</h3>
                <p>
                  Creativity, innovation, collaboration, accessibility,
                  continuous learning and practical impact guide our work.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="solutions-section section-padding" id="solutions">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHAT WE DO</span>
              <h2>Our Areas of <span>Innovation</span></h2>
              <p>
                Exploring technology-driven opportunities for education,
                creativity and community development.
              </p>
            </div>

            <div className="solutions-grid">
              {solutions.map((solution) => {
                const Icon = solutionIcons[solution.icon]

                return (
                  <article className="solution-card" key={solution.slug}>
                    <div className="solution-icon">
                      <Icon size={27} />
                    </div>
                    <h3>{solution.title}</h3>
                    <p>{solution.summary}</p>
                    <Link
                      to={`/solutions/${solution.slug}`}
                      aria-label={`Learn more about ${solution.title}`}
                    >
                      Explore <ArrowRight size={16} />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="platform-section section-padding" id="projects">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">OUR WORK</span>
              <h2>Projects That Turn Ideas Into <span>Action</span></h2>
              <p>
                Explore DES initiatives in digital learning, school ICT and access to educational information.
              </p>
            </div>
            <div className="home-projects-grid">
              {projects.map((project) => (
                <article className="home-project-card" key={project.slug}>
                  <span className={`home-project-status home-project-status-${project.status.toLowerCase().replaceAll(' ', '-')}`}>
                    {project.status}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <Link to={`/projects/${project.slug}`}>
                    View project <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
            <div className="home-projects-cta">
              <Link to="/projects" className="btn btn-primary">
                Explore All Projects <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <NewsPreview initialArticles={initialNewsArticles} />

        <section className="partnership-section section-padding">
          <div className="container partnership-content">
            <span className="section-label">LET'S COLLABORATE</span>
            <h2>Building a More Creative Digital Future Together.</h2>
            <p>
              We welcome meaningful collaborations with educators,
              institutions, technology professionals and development partners.
            </p>
            <a href="#contact" className="btn btn-primary">
              Connect With DES <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

export default App
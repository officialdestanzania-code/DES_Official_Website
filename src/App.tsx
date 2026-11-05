import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Palette,
  Laptop,
  Menu,
  GraduationCap,
  Globe,
  Lightbulb,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { projects, solutions } from './data/siteContent'
const CURRENT_YEAR = new Date().getUTCFullYear()
function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const solutionIcons = {
    learning: BookOpen,
    ai: BrainCircuit,
    ict: Laptop,
    creative: Palette,
    software: Code2,
    skills: GraduationCap,
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <nav className="navbar container">
          <a href="#home" className="brand" onClick={closeMenu}>
            <img
              src="/images/des-ai-logo.png"
              alt="DES Digital Education Solutions"
              className="brand-logo"
            />
          </a>

          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#solutions" onClick={closeMenu}>Solutions</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <Link to="/resources" onClick={closeMenu}>Resources</Link>
            <Link to="/matokeo-darasa-la-saba-2026" onClick={closeMenu}>
              PSLE Results 2026
            </Link>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a
              href="https://learn.des.co.tz"
              className="nav-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learning Platform <ArrowRight size={16} />
            </a>
          </div>
        </nav>
      </header>

      <main>
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

      <footer className="site-footer" id="contact">
        <div className="container footer-main">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <img
                src="/images/des-ai-logo.png"
                alt="DES Digital Education Solutions"
                className="brand-logo"
              />
            </a>
            <p>Creativity Within Us.</p>
            <p>Empowering Education Through Digital Innovation.</p>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=officialdestanzania@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              officialdestanzania@gmail.com
            </a>
            <a href="https://learn.des.co.tz" target="_blank" rel="noopener noreferrer">
              DES AI Learning Platform
            </a>
            <a
              href="https://www.youtube.com/@DESTanzania"
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
                  fill="#FF0000"
                />
                <path d="m9.6 15.5 6.2-3.5-6.2-3.5v7Z" fill="#FFFFFF" />
              </svg>
              <span>YouTube – DES Tanzania</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            © {CURRENT_YEAR} Digital Education Solutions (DES).
            All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
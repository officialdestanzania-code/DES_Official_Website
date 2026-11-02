import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Code2,
  Palette,
  Menu,
  GraduationCap,
  Globe,
  Lightbulb,
  X,
} from 'lucide-react'
import { useState } from 'react'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const solutions = [
    {
      icon: GraduationCap,
      title: 'Digital Education',
      description:
        'Promoting accessible digital learning resources and innovative educational experiences.',
    },
    {
      icon: BrainCircuit,
      title: 'Artificial Intelligence',
      description:
        'Exploring AI-powered solutions that support teaching, learning and educational development.',
    },
    {
      icon: Code2,
      title: 'Software Development',
      description:
        'Building digital platforms and applications that address real-world educational needs.',
    },
    {
      icon: Palette,
      title: 'Creative Technology',
      description:
        'Inspiring creativity through robotics, programming, digital art and 3D design.',
    },
    {
      icon: BookOpen,
      title: 'Digital Skills Training',
      description:
        'Supporting practical technology skills for learners, educators and communities.',
    },
    {
      icon: Globe,
      title: 'Projects & Partnerships',
      description:
        'Building collaborations that expand opportunities through education and technology.',
    },
  ]

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
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a
              href="https://learn.des.co.tz"
              className="nav-cta"
              target="_blank"
              rel="noreferrer"
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
                const Icon = solution.icon

                return (
                  <article className="solution-card" key={solution.title}>
                    <div className="solution-icon">
                      <Icon size={27} />
                    </div>
                    <h3>{solution.title}</h3>
                    <p>{solution.description}</p>
                    <a href="#contact" aria-label={`Learn more about ${solution.title}`}>
                      Explore <ArrowRight size={16} />
                    </a>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="platform-section section-padding" id="projects">
          <div className="container platform-card">
            <div className="platform-content">
              <span className="platform-label">FEATURED DIGITAL INITIATIVE</span>
              <h2>Discover the DES AI Learning Platform</h2>
              <p>
                An evolving digital learning platform designed to support
                teachers and learners through technology-enhanced
                educational experiences.
              </p>
              <a
                href="https://learn.des.co.tz"
                target="_blank"
                rel="noreferrer"
                className="btn btn-light"
              >
                Visit Learning Platform <ArrowRight size={18} />
              </a>
            </div>
            <div className="platform-icon">
              <BrainCircuit size={115} strokeWidth={1.2} />
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
            <a href="mailto:officialdestanzania@gmail.com">
              officialdestanzania@gmail.com
            </a>
            <a href="https://learn.des.co.tz" target="_blank" rel="noreferrer">
              DES AI Learning Platform
            </a>
            <a
              href="https://www.youtube.com/@DESTanzania"
              target="_blank"
              rel="noreferrer"
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
            © {new Date().getFullYear()} Digital Education Solutions (DES).
            All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
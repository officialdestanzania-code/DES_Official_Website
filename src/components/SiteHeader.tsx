import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import './SiteChrome.css'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="des-site-header">
      <a className="des-skip-link" href="#main-content">Skip to content</a>
      <div className="des-site-nav-wrap">
        <Link to="/" className="des-site-brand" aria-label="Digital Education Solutions home" onClick={closeMenu}>
          <img src="/images/des-ai-logo.png" alt="Digital Education Solutions" />
        </Link>

        <button
          type="button"
          className="des-mobile-menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="des-primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          id="des-primary-navigation"
          aria-label="Main navigation"
          className={'des-primary-navigation' + (menuOpen ? ' is-open' : '')}
        >
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/solutions" onClick={closeMenu}>Solutions</Link>
          <Link to="/projects" onClick={closeMenu}>Projects</Link>
          <Link to="/news" onClick={closeMenu}>News &amp; Updates</Link>
          <details className="des-nav-more">
            <summary>Explore <ChevronDown size={14} /></summary>
            <div className="des-nav-dropdown">
              <Link to="/partners" onClick={closeMenu}>Butimba Project Partners</Link>
              <Link to="/resources" onClick={closeMenu}>Learning Resources</Link>
              <Link to="/matokeo-darasa-la-saba-2026" onClick={closeMenu}>NECTA Results Portal</Link>
              <a href="https://learn.des.co.tz/store" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>DES Digital Store <ArrowRight size={14} /></a>
            </div>
          </details>
          <Link to="/contact" onClick={closeMenu}>Contact</Link>
          <a
            href="https://learn.des.co.tz/login"
            className="des-learning-portal-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Learning Portal <ArrowRight size={16} />
          </a>
        </nav>
      </div>
    </header>
  )
}

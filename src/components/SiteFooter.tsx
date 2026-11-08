import { ArrowUpRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import './SiteChrome.css'

const CURRENT_YEAR = new Date().getUTCFullYear()

export default function SiteFooter() {
  return (
    <footer className="des-site-footer">
      <div className="des-footer-main">
        <div className="des-footer-brand">
          <Link to="/" aria-label="DES home">
            <img src="/images/des-ai-logo.png" alt="Digital Education Solutions" />
          </Link>
          <p className="des-footer-tagline">Creativity Within Us.</p>
          <p>Empowering education through digital innovation, practical technology and creative learning.</p>
          <a href="https://www.youtube.com/@DESTanzania" target="_blank" rel="noopener noreferrer" className="des-footer-social">
            YouTube – DES Tanzania <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="des-footer-column">
          <h2>Explore DES</h2>
          <Link to="/about">About DES</Link>
          <Link to="/solutions">Our Solutions</Link>
          <Link to="/projects">Our Projects</Link>
          <Link to="/news">News &amp; Updates</Link>
          <Link to="/partners">Butimba Project Partners</Link>
          <Link to="/contact">Contact DES</Link>
        </div>

        <div className="des-footer-column">
          <h2>Digital Services</h2>
          <a href="https://learn.des.co.tz/login" target="_blank" rel="noopener noreferrer">DES AI Learning Platform <ArrowUpRight size={14} /></a>
          <a href="https://learn.des.co.tz/store" target="_blank" rel="noopener noreferrer">DES Digital Store <ArrowUpRight size={14} /></a>
          <Link to="/resources">Learning Resources</Link>
          <Link to="/matokeo-darasa-la-saba-2026">NECTA Results Portal</Link>
        </div>

        <div className="des-footer-column des-footer-contact">
          <h2>Get in Touch</h2>
          <a href="mailto:officialdestanzania@gmail.com"><Mail size={15} /> officialdestanzania@gmail.com</a>
          <Link to="/contact">Enquiries &amp; collaborations</Link>
        </div>
      </div>
      <div className="des-footer-bottom">
        <div>
          <span>© {CURRENT_YEAR} Digital Education Solutions (DES). All rights reserved.</span>
          <span>Creativity Within Us.</span>
        </div>
      </div>
    </footer>
  )
}

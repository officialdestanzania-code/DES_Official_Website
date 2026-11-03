import { useEffect } from 'react'
import './ResultsPage.css'
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  MapPin,
  Search,
} from 'lucide-react'
import { Link } from 'react-router-dom'
const CURRENT_YEAR = new Date().getUTCFullYear()
const regions = [
  'Arusha',
  'Dar es Salaam',
  'Dodoma',
  'Geita',
  'Iringa',
  'Kagera',
  'Katavi',
  'Kigoma',
  'Kilimanjaro',
  'Lindi',
  'Manyara',
  'Mara',
  'Mbeya',
  'Morogoro',
  'Mtwara',
  'Mwanza',
  'Njombe',
  'Pwani',
  'Rukwa',
  'Ruvuma',
  'Shinyanga',
  'Simiyu',
  'Singida',
  'Songwe',
  'Tabora',
  'Tanga',
]

const NECTA_RESULTS_URL =
  'https://matokeo.necta.go.tz/results/2026/psle/psle.htm'

const PAGE_TITLE = 'Matokeo Darasa la Saba 2026 | DES Tanzania'
const PAGE_DESCRIPTION =
  'Pata maelekezo na kiungo rasmi cha kuangalia matokeo ya Darasa la Saba (PSLE) 2026 kupitia Baraza la Mitihani la Tanzania (NECTA).'
const PAGE_URL = 'https://des.co.tz/matokeo-darasa-la-saba-2026'
const HOME_TITLE =
  'Digital Education Solutions (DES) | Education, AI & Digital Innovation'

const HOME_DESCRIPTION =
  'Digital Education Solutions (DES) is a Tanzania-based initiative advancing education through AI-powered learning, digital skills, software development and creative technology.'

const HOME_URL = 'https://des.co.tz/'

function StandardSevenResults2026() {
  useEffect(() => {
  const resultsMetadata = [
    {
      selector: 'meta[name="description"]',
      value: PAGE_DESCRIPTION,
    },
    {
      selector: 'meta[property="og:title"]',
      value: PAGE_TITLE,
    },
    {
      selector: 'meta[property="og:description"]',
      value:
        'Mwongozo wa kuangalia matokeo ya Darasa la Saba 2026 kupitia tovuti rasmi ya NECTA.',
    },
    {
      selector: 'meta[property="og:url"]',
      value: PAGE_URL,
    },
    {
      selector: 'meta[name="twitter:title"]',
      value: PAGE_TITLE,
    },
    {
      selector: 'meta[name="twitter:description"]',
      value:
        'Mwongozo wa kuangalia matokeo ya Darasa la Saba 2026 kupitia tovuti rasmi ya NECTA.',
    },
  ]

  const homeMetadata = [
    {
      selector: 'meta[name="description"]',
      value: HOME_DESCRIPTION,
    },
    {
      selector: 'meta[property="og:title"]',
      value: HOME_TITLE,
    },
    {
      selector: 'meta[property="og:description"]',
      value: HOME_DESCRIPTION,
    },
    {
      selector: 'meta[property="og:url"]',
      value: HOME_URL,
    },
    {
      selector: 'meta[name="twitter:title"]',
      value: HOME_TITLE,
    },
    {
      selector: 'meta[name="twitter:description"]',
      value: HOME_DESCRIPTION,
    },
  ]

  const canonical = document.head.querySelector(
    'link[rel="canonical"]',
  )

  document.title = PAGE_TITLE

  resultsMetadata.forEach(({ selector, value }) => {
    document.head
      .querySelector(selector)
      ?.setAttribute('content', value)
  })

  canonical?.setAttribute('href', PAGE_URL)

  return () => {
    document.title = HOME_TITLE

    homeMetadata.forEach(({ selector, value }) => {
      document.head
        .querySelector(selector)
        ?.setAttribute('content', value)
    })

    canonical?.setAttribute('href', HOME_URL)
  }
}, [])

  return (
    <main className="results-page">
      <header className="results-header">
        <div className="results-container results-nav">
          <Link to="/" className="results-brand">
            <img
              src="/images/des-ai-logo.png"
              alt="Digital Education Solutions"
            />
          </Link>

          <Link to="/" className="results-home-link">
            <ArrowLeft size={17} />
            Back to DES Website
          </Link>
        </div>
      </header>

      <section className="results-hero">
        <div className="results-container">
          <div className="results-eyebrow">
            <GraduationCap size={18} />
            DES EDUCATION RESULTS PORTAL
          </div>

          <h1>
            Standard Seven
            <span> Examination Results 2026</span>
          </h1>

          <p className="results-hero-description">
            Find and access the official 2026 Primary School Leaving
            Examination (PSLE) results released by the National
            Examinations Council of Tanzania (NECTA).
          </p>

          <a
            href={NECTA_RESULTS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="results-primary-button"
          >
            View Official NECTA Results
            <ExternalLink size={19} />
          </a>

          <p className="results-source-note">
            Results are published and managed by NECTA. DES provides
            this page as an access point to the official results.
          </p>
        </div>
      </section>

      <section className="results-content section-padding">
        <div className="results-container">
          <div className="results-section-heading">
            <span className="section-label">PSLE 2026</span>
            <h2>Find Results by Region</h2>
            <p>
              Select your region from the official NECTA results page
              to continue searching for your district and school.
            </p>
          </div>

          <div className="results-instructions">
            <div className="results-instruction-icon">
              <Search size={25} />
            </div>
            <div>
              <h3>How to check examination results</h3>
              <ol>
                <li>Open the official NECTA results page.</li>
                <li>Select your region from the list provided.</li>
                <li>Choose your district or council.</li>
                <li>Find your school and open its results.</li>
                <li>Search for the candidate's examination number or name.</li>
              </ol>
            </div>
          </div>

          <div className="results-region-heading">
            <MapPin size={21} />
            <h3>Regions of Tanzania</h3>
            <span>{regions.length} Regions</span>
          </div>

          <div className="results-region-grid">
            {regions.map((region, index) => (
              <div className="results-region-card" key={region}>
                <span className="results-region-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{region}</span>
                <ArrowUpRight size={16} />
              </div>
            ))}
          </div>

          <div className="results-bottom-cta">
            <div>
              <BookOpen size={27} />
              <h3>Ready to check your results?</h3>
              <p>
                Continue to the official NECTA examination results system.
              </p>
            </div>

            <a
              href={NECTA_RESULTS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="results-primary-button"
            >
              Open NECTA Results
              <ExternalLink size={18} />
            </a>
          </div>

          <p className="results-disclaimer">
            Disclaimer: Digital Education Solutions (DES) is not the
            examination authority and does not publish, alter or verify
            individual examination results. For official information,
            always refer to NECTA.
          </p>
        </div>
      </section>

      <footer className="results-footer">
        <div className="results-container">
          <p>
            © {CURRENT_YEAR} Digital Education Solutions (DES).
            All rights reserved.
          </p>
          <a href="https://des.co.tz/">DES Official Website</a>
        </div>
      </footer>
    </main>
  )
}

export default StandardSevenResults2026
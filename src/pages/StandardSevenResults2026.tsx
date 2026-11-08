import { useEffect, useState } from 'react'
import './ResultsPage.css'
import SiteHeader from '../components/SiteHeader'
import SiteFooter from '../components/SiteFooter'
import {
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  MapPin,
  Search,
} from 'lucide-react'
const NECTA_RESULTS_BASE_URL =
  'https://matokeo.necta.go.tz/results/2026/psle/results'

const regions = [
  { name: 'Arusha', file: 'reg_01.htm' },
  { name: 'Dar es Salaam', file: 'reg_02.htm' },
  { name: 'Dodoma', file: 'reg_03.htm' },
  { name: 'Geita', file: 'reg_24.htm' },
  { name: 'Iringa', file: 'reg_04.htm' },
  { name: 'Kagera', file: 'reg_05.htm' },
  { name: 'Katavi', file: 'reg_25.htm' },
  { name: 'Kigoma', file: 'reg_06.htm' },
  { name: 'Kilimanjaro', file: 'reg_07.htm' },
  { name: 'Lindi', file: 'reg_08.htm' },
  { name: 'Manyara', file: 'reg_21.htm' },
  { name: 'Mara', file: 'reg_09.htm' },
  { name: 'Mbeya', file: 'reg_10.htm' },
  { name: 'Morogoro', file: 'reg_11.htm' },
  { name: 'Mtwara', file: 'reg_12.htm' },
  { name: 'Mwanza', file: 'reg_13.htm' },
  { name: 'Njombe', file: 'reg_26.htm' },
  { name: 'Pwani', file: 'reg_14.htm' },
  { name: 'Rukwa', file: 'reg_15.htm' },
  { name: 'Ruvuma', file: 'reg_16.htm' },
  { name: 'Shinyanga', file: 'reg_17.htm' },
  { name: 'Simiyu', file: 'reg_27.htm' },
  { name: 'Singida', file: 'reg_18.htm' },
  { name: 'Songwe', file: 'reg_31.htm' },
  { name: 'Tabora', file: 'reg_19.htm' },
  { name: 'Tanga', file: 'reg_20.htm' },
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
    const [regionSearch, setRegionSearch] = useState('')

  const filteredRegions = regions
    .map((region, index) => ({
      ...region,
      number: index + 1,
    }))
    .filter((region) =>
      region.name
        .toLowerCase()
        .includes(regionSearch.trim().toLowerCase()),
    )
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
    <div className="results-page">
      <SiteHeader />

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

      <section id="main-content" className="results-content section-padding">
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

          <div className="results-region-search">
  <Search size={20} />

  <input
    type="search"
    placeholder="Search a region, e.g. Mwanza..."
    aria-label="Search regions of Tanzania"
    value={regionSearch}
    onChange={(event) => setRegionSearch(event.target.value)}
  />

  {regionSearch && (
    <button
      type="button"
      onClick={() => setRegionSearch('')}
      aria-label="Clear region search"
    >
      Clear
    </button>
  )}
</div>

<p className="results-region-count" aria-live="polite">
  Showing {filteredRegions.length} of {regions.length} regions
</p>

<div className="results-region-grid">
  {filteredRegions.length > 0 ? (
    filteredRegions.map((region) => (
      <a
        className="results-region-card"
        key={region.name}
        href={`${NECTA_RESULTS_BASE_URL}/${region.file}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${region.name} examination results on NECTA`}
      >
        <span className="results-region-number">
          {String(region.number).padStart(2, '0')}
        </span>
        <span>{region.name}</span>
        <ArrowUpRight size={16} />
      </a>
    ))
  ) : (
    <p className="results-region-empty">
      No region found. Try another region name.
    </p>
  )}
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

      <SiteFooter />
    </div>
  )
}

export default StandardSevenResults2026
import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StandardSevenResults2026 from './pages/StandardSevenResults2026.tsx'
import ContentHubPage from './pages/ContentHubPage.tsx'
import ButimbaPartnersPage from './pages/ButimbaPartnersPage.tsx'
import PartnerAdminRoute from './pages/PartnerAdminRoute.tsx'
import NewsPage from './pages/NewsPage.tsx'
import { AboutPage, ContactPage, NotFoundPage } from './pages/StaticPages.tsx'

const root = document.getElementById('root')!

const application = (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsPage />} />
        <Route
          path="/matokeo-darasa-la-saba-2026"
          element={<StandardSevenResults2026 />}
        />
        <Route path="/solutions" element={<ContentHubPage section="solutions" />} />
        <Route path="/solutions/:slug" element={<ContentHubPage section="solutions" />} />
        <Route path="/projects" element={<ContentHubPage section="projects" />} />
        <Route path="/projects/:slug" element={<ContentHubPage section="projects" />} />
        <Route path="/resources" element={<ContentHubPage section="resources" />} />
        <Route path="/partners" element={<ButimbaPartnersPage />} />
        <Route path="/partners/:slug" element={<ButimbaPartnersPage />} />
        <Route path="/admin/*" element={<PartnerAdminRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}

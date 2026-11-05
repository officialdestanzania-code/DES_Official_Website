import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StandardSevenResults2026 from './pages/StandardSevenResults2026.tsx'
import ContentHubPage from './pages/ContentHubPage.tsx'
import ButimbaPartnersPage from './pages/ButimbaPartnersPage.tsx'

const root = document.getElementById('root')!

const application = (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}

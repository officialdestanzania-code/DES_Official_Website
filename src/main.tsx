import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StandardSevenResults2026 from './pages/StandardSevenResults2026.tsx'

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
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

if (root.dataset.prerendered === 'true') {
  hydrateRoot(root, application)
} else {
  createRoot(root).render(application)
}

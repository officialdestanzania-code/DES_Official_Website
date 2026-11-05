import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The Sanity Vercel integration prefixes both public settings and secret
// tokens with VITE. Expose only the four public project/dataset variables;
// never let read/write tokens enter the browser environment.
export default defineConfig({
  envPrefix: [
    'VITE_SANITY_API_PROJECT_ID',
    'VITE_SANITY_API_DATASET',
    'VITE_SANITY_STUDIO_PROJECT_ID',
    'VITE_SANITY_STUDIO_DATASET',
  ],
  plugins: [react(), tailwindcss()],
})

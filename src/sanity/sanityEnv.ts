// Access only the public settings required by the browser bundle.
// Do not read import.meta.env as a whole: the Vercel integration also creates
// VITE-prefixed sensitive token variables that must never enter client code.
export const sanityProjectId =
  import.meta.env.VITE_SANITY_API_PROJECT_ID?.trim() ||
  import.meta.env.VITE_SANITY_PROJECT_ID?.trim() ||
  ''

export const sanityDataset =
  import.meta.env.VITE_SANITY_API_DATASET?.trim() ||
  import.meta.env.VITE_SANITY_DATASET?.trim() ||
  'production'

export const sanityStudioProjectId =
  import.meta.env.VITE_SANITY_STUDIO_PROJECT_ID?.trim() || sanityProjectId

export const sanityStudioDataset =
  import.meta.env.VITE_SANITY_STUDIO_DATASET?.trim() || sanityDataset

export const isSanityConfigured = /^[a-z0-9]+$/.test(sanityProjectId)

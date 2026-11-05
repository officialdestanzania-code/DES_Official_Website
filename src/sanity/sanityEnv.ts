const env = import.meta.env

// The Vercel Sanity integration provisions API and Studio variables separately.
// Keep the legacy names as fallbacks for local development and existing deployments.
export const sanityProjectId =
  env.VITE_SANITY_API_PROJECT_ID?.trim() ||
  env.VITE_SANITY_PROJECT_ID?.trim() ||
  ''

export const sanityDataset =
  env.VITE_SANITY_API_DATASET?.trim() ||
  env.VITE_SANITY_DATASET?.trim() ||
  'production'

export const sanityStudioProjectId =
  env.VITE_SANITY_STUDIO_PROJECT_ID?.trim() || sanityProjectId

export const sanityStudioDataset =
  env.VITE_SANITY_STUDIO_DATASET?.trim() || sanityDataset

export const isSanityConfigured = /^[a-z0-9]+$/.test(sanityProjectId)

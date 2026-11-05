export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() ?? ''
export const sanityDataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production'
export const isSanityConfigured = /^[a-z0-9]+$/.test(sanityProjectId)

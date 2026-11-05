import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { partnerSchemaTypes } from './schemaTypes'

export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() ?? ''
export const sanityDataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production'
export const isSanityConfigured = /^[a-z0-9]+$/.test(sanityProjectId)

export const studioConfig = defineConfig({
  name: 'des-partners',
  title: 'DES Partners & Contributions',
  projectId: sanityProjectId || 'replace-with-sanity-project-id',
  dataset: sanityDataset,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: { types: partnerSchemaTypes },
})

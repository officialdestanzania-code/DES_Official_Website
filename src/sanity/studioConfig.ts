import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { partnerSchemaTypes } from './schemaTypes'
import { sanityProjectId, sanityDataset } from './sanityEnv'

export const studioConfig = defineConfig({
  name: 'des-partners',
  title: 'DES Partners & Contributions',
  projectId: sanityProjectId || 'replace-with-sanity-project-id',
  dataset: sanityDataset,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: { types: partnerSchemaTypes },
})

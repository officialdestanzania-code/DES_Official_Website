import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { partnerSchemaTypes } from './schemaTypes'
import { sanityStudioDataset, sanityStudioProjectId } from './sanityEnv'

export const studioConfig = defineConfig({
  name: 'des-partners',
  title: 'DES Partners & Contributions',
  projectId: sanityStudioProjectId || 'replace-with-sanity-project-id',
  dataset: sanityStudioDataset,
  basePath: '/admin',
  plugins: [structureTool()],
  schema: { types: partnerSchemaTypes },
})

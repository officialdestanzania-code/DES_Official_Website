import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './deskStructure'
import { siteSchemaTypes } from './schemaTypes'
import { sanityStudioDataset, sanityStudioProjectId } from './sanityEnv'

export const studioConfig = defineConfig({
  name: 'des-content',
  title: 'DES Content Studio',
  projectId: sanityStudioProjectId || 'replace-with-sanity-project-id',
  dataset: sanityStudioDataset,
  basePath: '/admin',
  plugins: [structureTool({ structure: deskStructure })],
  schema: { types: siteSchemaTypes },
})

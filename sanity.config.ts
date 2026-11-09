import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { deskStructure } from './src/sanity/deskStructure'
import { siteSchemaTypes } from './src/sanity/schemaTypes'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_API_PROJECT_ID ||
  process.env.VITE_SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  'replace-with-sanity-project-id'

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_API_DATASET ||
  process.env.VITE_SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'des-content',
  title: 'DES Content Studio',
  projectId,
  dataset,
  basePath: '/admin',
  plugins: [structureTool({ structure: deskStructure })],
  schema: { types: siteSchemaTypes },
})

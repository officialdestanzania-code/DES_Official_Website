import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  deployment: {
    appId: 'q36gqys524nivk2pvjewn33i',
  },
  project: { basePath: '/admin' },
  api: {
    projectId:
      process.env.VITE_SANITY_API_PROJECT_ID ||
      process.env.VITE_SANITY_STUDIO_PROJECT_ID ||
      process.env.SANITY_STUDIO_PROJECT_ID ||
      process.env.VITE_SANITY_PROJECT_ID ||
      '',
    dataset:
      process.env.VITE_SANITY_API_DATASET ||
      process.env.VITE_SANITY_STUDIO_DATASET ||
      process.env.SANITY_STUDIO_DATASET ||
      process.env.VITE_SANITY_DATASET ||
      'production',
  },
})

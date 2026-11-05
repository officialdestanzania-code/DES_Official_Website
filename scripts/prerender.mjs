import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const routes = [
  {
    path: '/matokeo-darasa-la-saba-2026',
    module: '/src/pages/StandardSevenResults2026.tsx',
    title: 'Matokeo Darasa la Saba 2026 | DES Tanzania',
    description: 'Pata maelekezo na kiungo rasmi cha kuangalia matokeo ya Darasa la Saba (PSLE) 2026 kupitia Baraza la Mitihani la Tanzania (NECTA).',
    ogDescription: 'Mwongozo wa kuangalia matokeo ya Darasa la Saba 2026 kupitia tovuti rasmi ya NECTA.',
  },
  {
    path: '/solutions',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'DES Solutions | Digital Education Solutions Tanzania',
    description: 'Explore DES services in digital learning platforms, AI in education, school ICT, creative technology, software development and digital skills.',
  },
  {
    path: '/solutions/digital-learning-platforms',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'Digital Learning Platforms | DES Tanzania',
    description: 'Explore digital learning platforms, educational resources and technology-supported learning initiatives from DES.',
  },
  {
    path: '/solutions/ai-in-education',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'AI in Education | DES Tanzania',
    description: 'Discover how DES explores practical and responsible artificial intelligence applications for teaching and learning.',
  },
  {
    path: '/solutions/school-ict-transformation',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'School ICT & Digital Transformation | DES Tanzania',
    description: 'Learn about DES focus areas in school computer rooms, ICT equipment, connectivity and digital learning programmes.',
  },
  {
    path: '/solutions/coding-robotics-creative-technology',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'Coding, Robotics & Creative Technology | DES Tanzania',
    description: 'Explore coding, robotics, digital art and 3D design learning activities promoted by DES.',
  },
  {
    path: '/solutions/software-development',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'Software & Web Development | DES Tanzania',
    description: 'Explore DES work in websites, educational platforms, applications and user-centred digital tools.',
  },
  {
    path: '/solutions/digital-skills-training',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'solutions' },
    title: 'Digital Skills Training | DES Tanzania',
    description: 'Explore practical digital skills learning for students, teachers and communities through DES.',
  },
  {
    path: '/projects',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'projects' },
    title: 'DES Projects | Digital Education Solutions Tanzania',
    description: 'Explore DES initiatives in digital learning, school ICT development and access to official examination information.',
  },
  {
    path: '/projects/des-ai-learning-platform',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'projects' },
    title: 'DES AI Learning Platform | DES Tanzania',
    description: 'Learn about the DES AI Learning Platform and its development for teachers and learners.',
  },
  {
    path: '/projects/butimba-digital-learning-computer-room',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'projects' },
    title: 'Butimba Digital Learning & Computer Room | DES Tanzania',
    description: 'Learn about the Butimba Primary School digital learning and computer room initiative in Mwanza.',
  },
  {
    path: '/projects/des-necta-results-portal',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'projects' },
    title: 'DES NECTA Results Portal | DES Tanzania',
    description: 'Explore the DES public access portal for official NECTA examination results.',
  },
  {
    path: '/resources',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'resources' },
    title: 'Learning Resources | DES Tanzania',
    description: 'Find pathways to teacher resources and student learning materials through the DES AI Learning Platform.',
  },
]

function updateMeta(html, matcher, value) {
  const escapedValue = value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')

  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    if (!matcher.test(tag)) return tag
    return tag.replace(/\bcontent="[^"]*"/i, 'content="' + escapedValue + '"')
  })
}

async function main() {
  const projectRoot = process.cwd()
  const distDirectory = path.join(projectRoot, 'dist')
  const indexFile = path.join(distDirectory, 'index.html')
  const indexTemplate = await readFile(indexFile, 'utf8')

  if (!indexTemplate.includes('<div id="root"></div>')) {
    throw new Error('Empty React root was not found in dist/index.html.')
  }

  const vite = await createServer({
    configFile: path.join(projectRoot, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const modules = new Map()

    for (const route of routes) {
      if (!modules.has(route.module)) {
        const loaded = await vite.ssrLoadModule(route.module)
        modules.set(route.module, loaded.default)
      }
    }

    for (const route of routes) {
      const Page = modules.get(route.module)
      const renderedPage = renderToString(
        React.createElement(
          StaticRouter,
          { location: route.path },
          React.createElement(Page, route.props ?? {}),
        ),
      )

      const canonicalUrl = 'https://des.co.tz' + route.path
      const outputDirectory = path.join(
        distDirectory,
        route.path.replace(/^\/+/, ''),
      )
      const outputFile = path.join(outputDirectory, 'index.html')
      let html = indexTemplate.replace(
        '<div id="root"></div>',
        '<div id="root" data-prerendered="true">' + renderedPage + '</div>',
      )

      html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + route.title + '</title>')
      html = updateMeta(html, /name="description"/i, route.description)
      html = updateMeta(html, /property="og:title"/i, route.title)
      html = updateMeta(html, /property="og:description"/i, route.ogDescription ?? route.description)
      html = updateMeta(html, /property="og:url"/i, canonicalUrl)
      html = updateMeta(html, /name="twitter:title"/i, route.title)
      html = updateMeta(html, /name="twitter:description"/i, route.ogDescription ?? route.description)

      if (!/<link\b[^>]*\brel="canonical"/i.test(html)) {
        throw new Error('Canonical link was not found in index.html.')
      }

      html = html.replace(
        /<link\b[^>]*\brel="canonical"[^>]*>/i,
        '<link rel="canonical" href="' + canonicalUrl + '" />',
      )

      await mkdir(outputDirectory, { recursive: true })
      await writeFile(outputFile, html, 'utf8')
      console.log('Prerendered ' + route.path + ' (' + Buffer.byteLength(html) + ' bytes)')
    }

    console.log('Prerender completed successfully for ' + routes.length + ' routes.')
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error('Prerendering failed:')
  console.error(error)
  process.exitCode = 1
})

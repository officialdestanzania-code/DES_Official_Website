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
    path: '/partners',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Butimba Partners & Supporters | DES Tanzania',
    description: 'Meet the organisations, project coordinators, alumni and friends supporting the Butimba Primary School digital learning project.',
  },
  {
    path: '/partners/labdoo',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Labdoo | Butimba Partners | DES Tanzania',
    description: 'Learn about Labdoo’s contribution of educational laptops to Butimba Primary School in Mwanza, Tanzania.',
  },
  {
    path: '/partners/mwanza-ev',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Mwanza e.V. | Butimba Partners | DES Tanzania',
    description: 'Learn about Mwanza e.V.’s direct partnership and support for the Butimba digital learning project.',
  },
  {
    path: '/partners/thomas-barcatta',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Thomas Barcatta | Butimba Partners | DES Tanzania',
    description: 'Recognising Thomas Barcatta’s project coordination and liaison role through Labdoo Hub Würzburg.',
  },
  {
    path: '/partners/gundolf-family',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'The Gundolf Family | Butimba Partners | DES Tanzania',
    description: 'Recognising the Gundolf Family’s support for locally made furniture for the Butimba computer room.',
  },
  {
    path: '/partners/herman-tanguye',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Herman Tanguye | Butimba Partners | DES Tanzania',
    description: 'Recognising Butimba alumnus Herman Tanguye’s contribution of a photocopy machine to the school.',
  },
  {
    path: '/partners/samwel-tanguye',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Samwel Tanguye | Butimba Partners | DES Tanzania',
    description: 'Recognising Butimba alumnus Samwel Tanguye’s contribution of fifteen staff-room chairs.',
  },
  {
    path: '/partners/dr-ancyfrida-prosper',
    module: '/src/pages/ButimbaPartnersPage.tsx',
    title: 'Dr. Ancyfrida Prosper | Butimba Partners | DES Tanzania',
    description: 'Recognising Dr. Ancyfrida Prosper’s leadership in initiating a safe menstrual hygiene room for girls at Butimba Primary School.',
  },
  {
    path: '/resources',
    module: '/src/pages/ContentHubPage.tsx',
    props: { section: 'resources' },
    title: 'Learning Resources | DES Tanzania',
    description: 'Find pathways to teacher resources and student learning materials through the DES AI Learning Platform.',
  },
  {
    path: '/about',
    module: '/src/pages/AboutPage.tsx',
    title: 'About DES | Digital Education Solutions Tanzania',
    description: 'Learn about Digital Education Solutions, our vision, mission, values and focus on education, digital skills and creative technology.',
  },
  {
    path: '/contact',
    module: '/src/pages/ContactPage.tsx',
    title: 'Contact DES | Digital Education Solutions Tanzania',
    description: 'Contact Digital Education Solutions about digital learning, school ICT, education technology and partnership opportunities.',
  },
  {
    path: '/news',
    module: '/src/pages/NewsPage.tsx',
    title: 'News & Updates | Digital Education Solutions',
    description: 'Read the latest news, project updates, announcements and education technology insights from Digital Education Solutions.',
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
    const partnerDataModule = await vite.ssrLoadModule('/src/data/sanityPartners.ts')
    const cmsPartnerDirectory = await partnerDataModule.fetchPartnerDirectoryFromCms()
    const newsDataModule = await vite.ssrLoadModule('/src/data/sanityNews.ts')
    const cmsNewsArticles = await newsDataModule.fetchNewsFromCms()
    const partnerProfileRoutes = (cmsPartnerDirectory?.partners ?? []).map((partner) => ({
      path: '/partners/' + partner.slug,
      module: '/src/pages/ButimbaPartnersPage.tsx',
      props: { initialDirectory: cmsPartnerDirectory },
      title: partner.name + ' | Butimba Partners | DES Tanzania',
      description: partner.summary,
    }))

    const newsArticleRoutes = cmsNewsArticles.map((article) => ({
      path: '/news/' + article.slug,
      module: '/src/pages/NewsPage.tsx',
      props: { initialArticles: cmsNewsArticles },
      title: (article.seoTitle || article.title + ' | DES News'),
      description: article.seoDescription || article.excerpt,
      ogDescription: article.seoDescription || article.excerpt,
      ogImage: article.coverImage?.url,
    }))

    const routeMap = new Map(routes.map((route) => [route.path, route]))
    routeMap.set('/news', {
      path: '/news',
      module: '/src/pages/NewsPage.tsx',
      props: { initialArticles: cmsNewsArticles },
      title: 'News & Updates | Digital Education Solutions',
      description: 'Read the latest news, project updates, announcements and education technology insights from Digital Education Solutions.',
    })
    for (const route of partnerProfileRoutes) routeMap.set(route.path, route)
    for (const route of newsArticleRoutes) routeMap.set(route.path, route)
    const partnerDirectoryRoute = routeMap.get('/partners')
    if (partnerDirectoryRoute && cmsPartnerDirectory) {
      routeMap.set('/partners', {
        ...partnerDirectoryRoute,
        props: { initialDirectory: cmsPartnerDirectory },
      })
    }
    for (const route of routeMap.values()) {
      if (route.module === '/src/pages/ButimbaPartnersPage.tsx' && cmsPartnerDirectory) {
        route.props = { ...(route.props ?? {}), initialDirectory: cmsPartnerDirectory }
      }
    }
    const routesToRender = [...routeMap.values()]

    const modules = new Map()

    for (const route of routesToRender) {
      if (!modules.has(route.module)) {
        const loaded = await vite.ssrLoadModule(route.module)
        modules.set(route.module, loaded.default)
      }
    }

    for (const route of routesToRender) {
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
      const partnerDataScript =
        route.module === '/src/pages/ButimbaPartnersPage.tsx' && cmsPartnerDirectory
          ? '<script>window.__DES_PARTNER_DIRECTORY__=' +
            JSON.stringify(cmsPartnerDirectory).replaceAll('<', '\\u003c') +
            ';</script>'
          : ''
      let html = indexTemplate.replace(
        '<div id="root"></div>',
        partnerDataScript + '<div id="root" data-prerendered="true">' + renderedPage + '</div>',
      )

      html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>' + route.title + '</title>')
      html = updateMeta(html, /name="description"/i, route.description)
      html = updateMeta(html, /property="og:title"/i, route.title)
      html = updateMeta(html, /property="og:description"/i, route.ogDescription ?? route.description)
      html = updateMeta(html, /property="og:url"/i, canonicalUrl)
      html = updateMeta(html, /name="twitter:title"/i, route.title)
      html = updateMeta(html, /name="twitter:description"/i, route.ogDescription ?? route.description)
      if (route.ogImage) {
        html = updateMeta(html, /property="og:image"/i, route.ogImage)
        html = updateMeta(html, /name="twitter:image"/i, route.ogImage)
      }

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

    const sitemapFile = path.join(distDirectory, 'sitemap.xml')
    try {
      let sitemap = await readFile(sitemapFile, 'utf8')
      for (const route of routesToRender.filter((item) => item.path.startsWith('/partners/') || item.path.startsWith('/news/'))) {
        const url = 'https://des.co.tz' + route.path
        if (!sitemap.includes('<loc>' + url + '</loc>')) {
          sitemap = sitemap.replace(
            '</urlset>',
            '  <url><loc>' + url + '</loc><lastmod>' +
              new Date().toISOString().slice(0, 10) +
              '</lastmod></url>\n</urlset>',
          )
        }
      }
      await writeFile(sitemapFile, sitemap, 'utf8')
    } catch (error) {
      console.warn('Could not update sitemap with CMS partner profiles:', error)
    }

    console.log('Prerender completed successfully for ' + routesToRender.length + ' routes.')
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error('Prerendering failed:')
  console.error(error)
  process.exitCode = 1
})

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { createServer } from 'vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const route = '/matokeo-darasa-la-saba-2026'
const pageTitle = 'Matokeo Darasa la Saba 2026 | DES Tanzania'
const pageDescription =
  'Pata maelekezo na kiungo rasmi cha kuangalia matokeo ya Darasa la Saba (PSLE) 2026 kupitia Baraza la Mitihani la Tanzania (NECTA).'
const canonicalUrl = `https://des.co.tz${route}`

function updateMeta(html, matcher, value) {
  const escapedValue = value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')

  return html.replace(/<meta\b[^>]*>/gi, (tag) => {
    if (!matcher.test(tag)) return tag

    return tag.replace(
      /\bcontent="[^"]*"/i,
      `content="${escapedValue}"`,
    )
  })
}

async function main() {
  const projectRoot = process.cwd()
  const distDirectory = path.join(projectRoot, 'dist')
  const outputDirectory = path.join(
    distDirectory,
    route.slice(1),
  )
  const outputFile = path.join(outputDirectory, 'index.html')

  const vite = await createServer({
    configFile: path.join(projectRoot, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'error',
  })

  try {
    const { default: ResultsPage } = await vite.ssrLoadModule(
      '/src/pages/StandardSevenResults2026.tsx',
    )

    const renderedPage = renderToString(
      React.createElement(
        StaticRouter,
        { location: route },
        React.createElement(ResultsPage),
      ),
    )

    const indexFile = path.join(distDirectory, 'index.html')
    let html = await readFile(indexFile, 'utf8')

    if (!html.includes('<div id="root"></div>')) {
      throw new Error('Empty React root was not found in dist/index.html.')
    }

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root" data-prerendered="true">${renderedPage}</div>`,
    )

    html = html.replace(
      /<title>[\s\S]*?<\/title>/i,
      `<title>${pageTitle}</title>`,
    )

    html = updateMeta(
      html,
      /name="description"/i,
      pageDescription,
    )

    html = updateMeta(
      html,
      /property="og:title"/i,
      pageTitle,
    )

    html = updateMeta(
      html,
      /property="og:description"/i,
      'Mwongozo wa kuangalia matokeo ya Darasa la Saba 2026 kupitia tovuti rasmi ya NECTA.',
    )

    html = updateMeta(
      html,
      /property="og:url"/i,
      canonicalUrl,
    )

    html = updateMeta(
      html,
      /name="twitter:title"/i,
      pageTitle,
    )

    html = updateMeta(
      html,
      /name="twitter:description"/i,
      'Mwongozo wa kuangalia matokeo ya Darasa la Saba 2026 kupitia tovuti rasmi ya NECTA.',
    )

    if (!/<link\b[^>]*\brel="canonical"/i.test(html)) {
      throw new Error('Canonical link was not found.')
    }

    html = html.replace(
      /<link\b[^>]*\brel="canonical"[^>]*>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )

    await mkdir(outputDirectory, { recursive: true })
    await writeFile(outputFile, html, 'utf8')

    console.log('Prerender completed successfully.')
    console.log(`Route: ${route}`)
    console.log(`Output: ${outputFile}`)
    console.log(`HTML size: ${Buffer.byteLength(html)} bytes`)
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error('Prerendering failed:')
  console.error(error)
  process.exitCode = 1
})

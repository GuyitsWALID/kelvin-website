import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'motion/react'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })

try {
  const { App } = await vite.ssrLoadModule('/src/main.jsx')
  const catalogueTemplate = await readFile(new URL('../dist/products.html', import.meta.url), 'utf8')
  for (const page of ['index.html', 'products.html', 'privacy.html']) {
    const path = page === 'index.html' ? '/' : `/${page}`
    const file = new URL(`../dist/${page}`, import.meta.url)
    const html = await readFile(file, 'utf8')
    if (!html.includes('<div id="root"></div>')) throw new Error(`Missing root in ${page}`)
    const body = renderToString(createElement(MotionConfig, { reducedMotion: 'user' }, createElement(App, { path })))
    if (!body.includes('<h1')) throw new Error(`Missing page content in ${page}`)
    await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
  }
  const products = JSON.parse(await readFile(new URL('../src/catalogue.json', import.meta.url), 'utf8'))
  for (let number = 2; number <= Math.ceil(products.length / 9); number++) {
    const page = `products-page-${number}.html`
    const url = `https://kelvinchem.ae/${page}`
    const html = catalogueTemplate
      .replaceAll('https://kelvinchem.ae/products.html', url)
      .replaceAll('Professional Cleaning Products | Kelvin UAE', `Cleaning Products, Page ${number} | Kelvin UAE`)
    const body = renderToString(createElement(MotionConfig, { reducedMotion: 'user' }, createElement(App, { path: `/${page}` })))
    if (!body.includes(products[(number - 1) * 9].name)) throw new Error(`Wrong catalogue content in ${page}`)
    await writeFile(new URL(`../dist/${page}`, import.meta.url), html.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
  }
} finally {
  await vite.close()
}

import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MotionConfig } from 'motion/react'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true } })

try {
  const { App } = await vite.ssrLoadModule('/src/main.jsx')
  const catalogueTemplate = await readFile(new URL('../dist/products.html', import.meta.url), 'utf8')
  for (const page of ['index.html', 'products.html', 'privacy.html', 'commercial-cleaning.html', 'food-beverage-cleaning.html', 'life-sciences-hygiene.html', 'water-treatment.html']) {
    const path = page === 'index.html' ? '/' : `/${page}`
    const file = new URL(`../dist/${page}`, import.meta.url)
    const html = await readFile(file, 'utf8')
    if (!html.includes('<div id="root"></div>')) throw new Error(`Missing root in ${page}`)
    const body = renderToString(createElement(MotionConfig, { reducedMotion: 'user' }, createElement(App, { path })))
    if (!body.includes('<h1')) throw new Error(`Missing page content in ${page}`)
    await writeFile(file, html.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
  }
  const products = JSON.parse(await readFile(new URL('../src/catalogue.json', import.meta.url), 'utf8'))
  const pageDescriptions = {
    2: 'Explore Kelvin fabric conditioner, laundry neutralizer, cutlery pre-soak, and floor cleaning products on catalogue page 2.',
    3: 'Explore Kelvin floor finishes, floor maintenance products, specialty surface cleaners, and laundry detergent on catalogue page 3.',
    4: 'Explore Kelvin laundry booster, warewashing products, surface cleaners, and commercial washroom and carpet care on catalogue page 4.',
    5: 'Explore Kelvin hand wash, kitchen cleaning, food production, life sciences hygiene, and RO membrane products on catalogue page 5.',
    6: 'Explore Kelvin RO scale control, boiler deposit control, and cooling scale control products on catalogue page 6.',
  }
  for (let number = 2; number <= Math.ceil(products.length / 9); number++) {
    const page = `products-page-${number}.html`
    const url = `https://kelvinchem.ae/${page}`
    const html = catalogueTemplate
      .replaceAll('https://kelvinchem.ae/products.html', url)
      .replaceAll('Professional Cleaning Products | Kelvin UAE', `Cleaning Products, Page ${number} | Kelvin UAE`)
      .replace('Browse Kelvin products for floor care, commercial cleaning, food production, life sciences hygiene, and water treatment.', pageDescriptions[number])
      .replace('Explore Kelvin products by application and industry.', pageDescriptions[number])
    const body = renderToString(createElement(MotionConfig, { reducedMotion: 'user' }, createElement(App, { path: `/${page}` })))
    if (!body.includes(products[(number - 1) * 9].name)) throw new Error(`Wrong catalogue content in ${page}`)
    await writeFile(new URL(`../dist/${page}`, import.meta.url), html.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
  }
} finally {
  await vite.close()
}

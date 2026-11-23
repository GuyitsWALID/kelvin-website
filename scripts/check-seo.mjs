import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const dist = fileURLToPath(new URL('../dist/', import.meta.url))
const origin = 'https://kelvinchem.ae'
const files = (await readdir(dist)).filter((file) => file.endsWith('.html'))
const pages = new Map(await Promise.all(files.map(async (file) => [file, await readFile(resolve(dist, file), 'utf8')])))
const sitemap = await readFile(resolve(dist, 'sitemap.xml'), 'utf8')
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
const expectedUrls = files.map((file) => `${origin}/${file === 'index.html' ? '' : file}`)
assert.deepEqual([...locations].sort(), [...expectedUrls].sort(), 'Sitemap must match the built pages exactly')
const robots = await readFile(resolve(dist, 'robots.txt'), 'utf8')
assert.match(robots, /User-agent:\s*\*\s+Allow:\s*\//)
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`))

const titles = new Set()
const descriptions = new Set()
const decode = (text) => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'")
for (const [file, html] of pages) {
  const canonical = `${origin}/${file === 'index.html' ? '' : file}`
  const values = (pattern) => [...html.matchAll(pattern)].map((match) => match[1])
  const [title] = values(/<title>(.*?)<\/title>/g)
  const [description] = values(/<meta name="description" content="([^"]+)"/g)
  assert.ok(title && !titles.has(title), `${file}: missing or duplicate title`)
  assert.ok(description && !descriptions.has(description), `${file}: missing or duplicate description`)
  titles.add(title)
  descriptions.add(description)
  assert.deepEqual(values(/<link rel="canonical" href="([^"]+)"/g), [canonical], `${file}: canonical`)
  assert.deepEqual(values(/<meta property="og:url" content="([^"]+)"/g), [canonical], `${file}: social URL`)
  assert.equal(values(/(<h1\b)/g).length, 1, `${file}: expected one primary heading`)
  assert.doesNotMatch(html, /content="[^"]*\bnoindex\b/i, `${file}: accidental noindex`)
  assert.match(html, /<html lang="en"/)
  assert.match(html, /<div id="root">.+<main>/s, `${file}: missing prerendered content`)

  const structuredData = values(/<script type="application\/ld\+json">(.*?)<\/script>/gs).map((text) => JSON.parse(text))
  if (file !== 'index.html') {
    const breadcrumbs = structuredData.filter((item) => item['@type'] === 'BreadcrumbList')
    assert.equal(breadcrumbs.length, 1, `${file}: expected breadcrumb structured data`)
    const items = breadcrumbs[0].itemListElement
    assert.ok(items.length >= 2)
    assert.equal(items.at(-1).item, canonical, `${file}: breadcrumb canonical`)
    assert.match(html, /aria-label="Breadcrumb"/)
    for (const [index, item] of items.entries()) {
      assert.equal(item.position, index + 1)
      assert.ok(html.includes(item.name.replaceAll('&', '&amp;')), `${file}: breadcrumb must be visible`)
    }
  }

  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(decode(raw), canonical)
    if (url.origin !== origin) continue
    const target = decodeURIComponent(url.pathname.slice(1)) || 'index.html'
    assert.ok(!target.includes('..'), `${file}: invalid local path`)
    await access(resolve(dist, target)).catch(() => assert.fail(`${file}: missing local target ${target}`))
    if (url.hash && pages.has(target)) {
      assert.ok(pages.get(target).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${file}: missing anchor ${raw}`)
    }
  }
}

const home = pages.get('index.html')
for (const className of ['hero__eyebrow', 'hero__intro', 'hero__actions']) {
  const tag = home.match(new RegExp(`<[^>]+class="${className}"[^>]*>`))?.[0]
  assert.ok(tag && !/opacity:\s*0(?:;|")/.test(tag), `${className}: content hidden before hydration`)
}
const products = JSON.parse(await readFile(new URL('../src/catalogue.json', import.meta.url), 'utf8'))
for (const [index, product] of products.entries()) {
  const number = Math.floor(index / 9) + 1
  const file = number === 1 ? 'products.html' : `products-page-${number}.html`
  assert.ok(decode(pages.get(file)).includes(`<h3>${product.name}</h3>`), `${product.id}: missing catalogue content`)
  for (let page = 1; page <= Math.ceil(products.length / 9); page++) {
    const path = page === 1 ? '/products.html' : `/products-page-${page}.html`
    assert.ok(pages.get(file).includes(`href="${path}#catalogue-title"`), `${file}: missing pagination link ${path}`)
  }
}
console.log(`SEO checks passed: ${files.length} pages, ${products.length} catalogue products, sitemap, metadata, breadcrumbs, local links/assets and visible hero content.`)

export const siteUrl = 'https://kelvinchem.ae'

const pageNames = {
  '/products.html': 'Products',
  '/commercial-cleaning.html': 'Commercial cleaning',
  '/food-beverage-cleaning.html': 'Food & beverage production',
  '/life-sciences-hygiene.html': 'Life sciences hygiene',
  '/water-treatment.html': 'Water treatment',
  '/privacy.html': 'Privacy notice',
}

export function breadcrumbsFor(path) {
  const cataloguePage = path.match(/^\/products-page-(\d+)\.html$/)
  if (cataloguePage) return [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products.html' },
    { name: `Page ${cataloguePage[1]}`, path },
  ]
  return pageNames[path] ? [{ name: 'Home', path: '/' }, { name: pageNames[path], path }] : []
}

export function breadcrumbData(path) {
  const breadcrumbs = breadcrumbsFor(path)
  if (!breadcrumbs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem', position: index + 1, name: crumb.name,
      item: `${siteUrl}${crumb.path}`,
    })),
  }
}

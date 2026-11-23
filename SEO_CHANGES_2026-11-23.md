# SEO improvements prepared 23 November 2026

Status: implemented and checked; approved for publication as a separate branch and draft pull request. Production deployment is pending review and is outside this change's authorization.
Base repository commit: `1a7f20cda6f19044d92b1ec425cbb1748d580f19`.

## Observed production baseline

A fresh HTTP crawl of all 12 sitemap URLs returned 200. Each page had a title, one H1, a self-referencing HTTPS canonical, and no observed meta or HTTP-header noindex directive. The robots file permits crawling and points at the sitemap. The repository already prerenders its pages and exposes all 48 products through catalogue pagination.

The homepage's H1 was a general brand slogan, and the catalogue's H1 did not identify its product category. The homepage introduction, eyebrow, and calls to action were emitted with opacity zero and depended on hydration to become visible. Other than the homepage Organization and WebSite data, there was no structured data. Missing breadcrumb markup alone is not an indexing blocker.

## Changes

- Homepage H1: “Professional cleaning chemicals in the UAE.” Catalogue H1: “Professional cleaning products for UAE businesses.” These use the site's existing business and location facts; there is no verified search-volume dataset behind the wording.
- Keep the introductory text and links visible before JavaScript executes. Preserve their entrance movement for visitors who allow motion.
- Add visible, wrapping breadcrumb navigation on all 11 secondary pages, including a Products parent on paginated catalogue pages. Add matching BreadcrumbList JSON-LD during prerendering. Both use the same route labels and canonical paths.
- Run an SEO check automatically after every production build. Check sitemap coverage, unique titles and descriptions, canonical and social URLs, prerendered content, headings, robots directives, JSON-LD, breadcrumb text, internal link/anchor and asset targets, visible hero elements, all 48 catalogue entries, and crawlable pagination.

## Verification

`npm ci`: succeeded, zero reported vulnerabilities at installation time.

`npm run build`: succeeded, including `npm run check:seo` for all 12 pages and 48 products.

Browser checks: desktop homepage rendered the new heading and introduction. Mobile checks of the homepage, catalogue page 2, and food/beverage page found the expected headings and breadcrumb labels with no measured horizontal overflow. Reduced-motion mode was enabled for the mobile checks. The browser reported two external Google font cache failures during the initial desktop load; fallback fonts rendered. Those requests are unrelated to the code changes, but font loading should be rechecked after deployment.

JSON-LD parses and required breadcrumb properties pass local assertions. Google's Rich Results Test has not been run on a deployed version of these changes. No new Lighthouse or real-user Core Web Vitals result is claimed.

## Remaining work

1. After approval, publish a separate branch and pull request, review the heading changes, then deploy through the existing process.
2. Validate deployed breadcrumb markup with Google's Rich Results Test and inspect representative URLs in Search Console.
3. Read current Search Console indexing and query reports before deciding on further landing pages. The repository's 22 November audit records historical account observations; they were not independently reverified in this session.
4. Obtain Kelvin-approved technical documents and original company evidence to improve industry and product copy. Avoid inventing chemical performance, certifications, safety instructions, reviews, prices, or stock status.

These improvements clarify the pages and protect their crawlable content. They do not establish current indexing or guarantee higher rankings.

## Guidance

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google breadcrumb documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

# Kelvin search launch handoff

Updated 21 November 2026. This audit follows the [SEO Audit](https://github.com/coreyhaines31/marketingskills/blob/main/skills/seo-audit/SKILL.md) and [SEO/GEO](https://github.com/resciencelab/opc-skills/blob/main/skills/seo-geo/SKILL.md) workflows listed in [Awesome SEO Skills](https://github.com/screpylabs/awesome-seo-skills). Recommendations were checked against current search-engine documentation.

## Completed in the site

- Canonical URLs, unique page titles and descriptions, social-share metadata, `robots.txt`, and `sitemap.xml` use `kelvinchem.ae`.
- The homepage includes Organization structured data using only Kelvin's confirmed name, domain, logo, and service telephone.
- Production builds render content into the initial HTML, then hydrate the interactive React site. Every page has one visible H1 before JavaScript runs.
- Six linked catalogue pages expose all 48 product entries in HTML, nine per page except the last. Each page has a self-canonical URL and is listed in the sitemap. The catalogue's search and filters remain interactive.
- Draft phrases such as “concept” and “proposed” were removed from public product descriptions. Product directions and safety details still require the matching Kelvin technical documents.
- The general robots rule allows search crawlers, including AI search crawlers. No special AI-only file or markup is required for Google AI features.
- After deployment, the homepage, all six catalogue pages, privacy page, sitemap, robots file, and social image returned HTTP 200. The HTTP and `www` home addresses returned permanent redirects to the canonical HTTPS domain.

The 21 November spot check measured about 0.38–0.54 seconds to the first byte for three HTML pages from one network location. This is a delivery check, not a Core Web Vitals or mobile rendering score. Google's public PageSpeed API initially returned HTTP 429; the owner later supplied PageSpeed results from the official interface.

On 21 November, the owner provided a Google Search Console screenshot of the `kelvinchem.ae` domain property. Its submitted `https://kelvinchem.ae/sitemap.xml` showed **Success**, last read the same day, with **8 discovered pages**. The live XML screenshot showed the same eight URLs. This confirms sitemap processing, not that the URLs are indexed. The account's Pages and URL Inspection reports have not been reviewed yet.

Later the same day, the owner shared the Pages report. It said **“Processing data, please check again in a day or so”** and showed no indexing totals or exclusion reasons yet. This is a new-property reporting delay, not evidence that all pages are indexed or rejected.

The owner also ran PageSpeed Insights on the live homepage on 21 November. These are Lighthouse **lab** results; PageSpeed showed no real-user field data yet.

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 72 | 90 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| First Contentful Paint | 2.1 s | 0.4 s |
| Largest Contentful Paint | 11.7 s | 2.1 s |
| Total Blocking Time | 70 ms | 40 ms |
| Cumulative Layout Shift | 0.018 | 0 |

PageSpeed's largest flagged opportunity was image delivery (estimated savings about 1,606 KiB mobile and 2,487 KiB desktop). The site-wide background PNG was 1,815,684 bytes. It has been visually checked, re-encoded as a 124,406-byte WebP, and preloaded from each page head, saving about 1.61 MiB per request. This asset change was deployed and the new WebP returned HTTP 200. An independent Lighthouse run identified the hero H1 as its LCP element; the previous server HTML hid that heading with `opacity:0` until JavaScript hydrated. The heading now renders visibly in the initial HTML. The local run used different test conditions from PageSpeed, so its score is not compared with the baseline above. Rerun PageSpeed after this heading fix deploys before claiming a measured speed gain.

## Monday account-side checks

1. In Google Search Console, revisit the Pages report once processing finishes, then inspect the homepage and catalogue URLs. Request indexing for eligible pages if needed. The domain property and sitemap submission are complete.
2. Add the site to Bing Webmaster Tools and submit the same sitemap.
3. Inspect the homepage and catalogue on a real mobile browser after deployment, including pagination, filters, and the WhatsApp handoff.
4. After deploying the visible hero heading, rerun PageSpeed Insights on mobile and desktop and compare with the baseline above. Investigate image delivery details if the 11.7-second mobile LCP remains. Interaction to Next Paint requires field data and is not available yet.
5. If Kelvin has an eligible staffed location and an owner-approved address, set up or update its Google Business Profile. Use the same company name, phone, and location details as the website.

## Content work after launch

- Use Search Console queries to choose the strongest category and product topics. The initial targets are professional cleaning chemicals in the UAE, commercial floor care, laundry care, warewashing, and cleaning products for food production. These are topic hypotheses, not measured search volumes.
- Individual product pages should wait for unique, verified technical information. Forty-eight near-identical pages based only on one-sentence descriptions would add little value.
- Publish original manufacturing information, real facility photography, product documents, and application guidance when Kelvin supplies and approves them. These are stronger trust signals than unsupported performance claims.

Google says AI Overviews use the same foundational SEO practices as regular Search. It also says the `meta keywords` tag has no effect, and FAQ rich results are generally limited to authoritative government and health sites. Those tactics were intentionally omitted. Search Console indexing cannot be confirmed from the sitemap result alone.

Sources: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading), [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [Search Console sitemap submission](https://support.google.com/webmasters/answer/7451001).

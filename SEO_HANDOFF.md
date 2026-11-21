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

The owner also ran PageSpeed Insights on the live homepage on 21 November. These are Lighthouse **lab** results; PageSpeed showed no real-user field data yet. The first run, before the performance fixes, was:

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 72 | 90 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| First Contentful Paint | 2.1 s | 0.4 s |
| Largest Contentful Paint | 11.7 s | 2.1 s |
| Total Blocking Time | 70 ms | 40 ms |
| Cumulative Layout Shift | 0.018 | 0 |

The official rerun after the smaller background, visible hero heading, and touch-device animation change showed:

| Metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | **93** | **100** |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| First Contentful Paint | 2.1 s | Not captured in the screenshots |
| Largest Contentful Paint | **2.1 s** | Not captured in the screenshots |
| Total Blocking Time | **10 ms** | Not captured in the screenshots |
| Cumulative Layout Shift | **0** | Not captured in the screenshots |

After the two logo images received intrinsic dimensions, another official [mobile PageSpeed run](https://pagespeed.web.dev/analysis/https-kelvinchem-ae/438q2klwdx?hl=en&form_factor=mobile) showed **99 Performance**, **100 Accessibility**, **100 Best Practices**, and **100 SEO**. Its FCP and LCP were both **1.7 s**, TBT **20 ms**, CLS **0.019**, and Speed Index **2.1 s**. Across these same-day lab runs, mobile LCP fell from 11.7 to 1.7 seconds and desktop Performance rose from 90 to 100. Scores vary between runs and PageSpeed still showed no real-user field data. The latest mobile report flagged the Google Fonts stylesheet as render blocking (estimated 710 ms), one oversized product image (estimated 89 KiB), and unused JavaScript (estimated 69 KiB); none prevented the 99 score.

PageSpeed's largest flagged opportunity was image delivery (estimated savings about 1,606 KiB mobile and 2,487 KiB desktop). The site-wide background PNG was 1,815,684 bytes. It has been visually checked, re-encoded as a 124,406-byte WebP, and preloaded from each page head, saving about 1.61 MiB per request. This asset change was deployed and the new WebP returned HTTP 200. An independent Lighthouse run identified the hero H1 as its LCP element; the previous server HTML hid that heading with `opacity:0` until JavaScript hydrated. The heading now renders visibly in the deployed initial HTML. The local run used different test conditions from PageSpeed, so its score is not compared with the baseline above.

A repeat local Lighthouse run still could not calculate a reliable performance score because its emulated phone CPU never reached an idle period. The full-screen WebGL animation was running continuously, even on touch devices without mouse hover. The site now keeps its static background on non-hover devices and starts the WebGL effect only where hover is available. This change is deployed. A later local rerun ended with a browser `NO_FCP` error. Neither incomplete local result is compared with the official PageSpeed results above.

## Monday account-side checks

1. In Google Search Console, revisit the Pages report once processing finishes, then inspect the homepage and catalogue URLs. Request indexing for eligible pages if needed. The domain property and sitemap submission are complete.
2. Add the site to Bing Webmaster Tools and submit the same sitemap.
3. Inspect the homepage and catalogue on a real mobile browser after deployment, including pagination, filters, and the WhatsApp handoff.
4. Monitor the Search Console Core Web Vitals report as real-user field data becomes available. Interaction to Next Paint cannot be assessed from these lab screenshots. Rerun PageSpeed after future changes to catch regressions.
5. If Kelvin has an eligible staffed location and an owner-approved address, set up or update its Google Business Profile. Use the same company name, phone, and location details as the website.

## Content work after launch

- Use Search Console queries to choose the strongest category and product topics. The initial targets are professional cleaning chemicals in the UAE, commercial floor care, laundry care, warewashing, and cleaning products for food production. These are topic hypotheses, not measured search volumes.
- Individual product pages should wait for unique, verified technical information. Forty-eight near-identical pages based only on one-sentence descriptions would add little value.
- Publish original manufacturing information, real facility photography, product documents, and application guidance when Kelvin supplies and approves them. These are stronger trust signals than unsupported performance claims.

Google says AI Overviews use the same foundational SEO practices as regular Search. It also says the `meta keywords` tag has no effect, and FAQ rich results are generally limited to authoritative government and health sites. Those tactics were intentionally omitted. Search Console indexing cannot be confirmed from the sitemap result alone.

Sources: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading), [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [Search Console sitemap submission](https://support.google.com/webmasters/answer/7451001).

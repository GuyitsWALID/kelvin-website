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

The 21 November spot check measured about 0.38–0.54 seconds to the first byte for three HTML pages from one network location. This is a delivery check, not a Core Web Vitals or mobile rendering score. Google's public PageSpeed API returned HTTP 429 during the audit, so no PageSpeed score is reported.

On 21 November, the owner provided a Google Search Console screenshot of the `kelvinchem.ae` domain property. Its submitted `https://kelvinchem.ae/sitemap.xml` showed **Success**, last read the same day, with **8 discovered pages**. The live XML screenshot showed the same eight URLs. This confirms sitemap processing, not that the URLs are indexed. The account's Pages and URL Inspection reports have not been reviewed yet.

## Monday account-side checks

1. In Google Search Console, inspect the Pages report and the homepage and catalogue URLs. Request indexing for eligible pages if needed. The domain property and sitemap submission are complete.
2. Add the site to Bing Webmaster Tools and submit the same sitemap.
3. Inspect the homepage and catalogue on a real mobile browser after deployment, including pagination, filters, and the WhatsApp handoff.
4. Run PageSpeed Insights on mobile and desktop when the service accepts a request. Record Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift before making performance changes.
5. If Kelvin has an eligible staffed location and an owner-approved address, set up or update its Google Business Profile. Use the same company name, phone, and location details as the website.

## Content work after launch

- Use Search Console queries to choose the strongest category and product topics. The initial targets are professional cleaning chemicals in the UAE, commercial floor care, laundry care, warewashing, and cleaning products for food production. These are topic hypotheses, not measured search volumes.
- Individual product pages should wait for unique, verified technical information. Forty-eight near-identical pages based only on one-sentence descriptions would add little value.
- Publish original manufacturing information, real facility photography, product documents, and application guidance when Kelvin supplies and approves them. These are stronger trust signals than unsupported performance claims.

Google says AI Overviews use the same foundational SEO practices as regular Search. It also says the `meta keywords` tag has no effect, and FAQ rich results are generally limited to authoritative government and health sites. Those tactics were intentionally omitted. Search Console indexing cannot be confirmed from the sitemap result alone.

Sources: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading), [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [Search Console sitemap submission](https://support.google.com/webmasters/answer/7451001).

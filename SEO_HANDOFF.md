# Kelvin search launch handoff

Updated 21 November 2026. This audit follows the [SEO Audit](https://github.com/coreyhaines31/marketingskills/blob/main/skills/seo-audit/SKILL.md) and [SEO/GEO](https://github.com/resciencelab/opc-skills/blob/main/skills/seo-geo/SKILL.md) workflows listed in [Awesome SEO Skills](https://github.com/screpylabs/awesome-seo-skills). Recommendations were checked against current search-engine documentation.

## Completed in the site

- Canonical URLs, unique page titles and descriptions, social-share metadata, `robots.txt`, and `sitemap.xml` use `kelvinchem.ae`.
- The homepage includes Organization structured data using only Kelvin's confirmed name, domain, logo, and service telephone.
- Production builds render content into the initial HTML, then hydrate the interactive React site. Every page has one visible H1 before JavaScript runs.
- Six linked catalogue pages expose all 48 product entries in HTML, nine per page except the last. Each page has a self-canonical URL and is listed in the sitemap. The catalogue's search and filters remain interactive.
- Draft phrases such as “concept” and “proposed” were removed from public product descriptions. Product directions and safety details still require the matching Kelvin technical documents.
- The general robots rule allows search crawlers, including AI search crawlers. No special AI-only file or markup is required for Google AI features.

## Monday account-side checks

1. Verify the `kelvinchem.ae` domain property in Google Search Console. Submit `https://kelvinchem.ae/sitemap.xml`, inspect the homepage and catalogue URL, and request indexing if eligible.
2. Add the site to Bing Webmaster Tools and submit the same sitemap.
3. Check the deployed homepage, all six catalogue pages, privacy page, sitemap, and social image over HTTPS. Confirm the `www` and HTTP addresses redirect to the canonical HTTPS host.
4. Run PageSpeed Insights on mobile and desktop. Record Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift before making performance changes.
5. If Kelvin has an eligible staffed location and an owner-approved address, set up or update its Google Business Profile. Use the same company name, phone, and location details as the website.

## Content work after launch

- Use Search Console queries to choose the strongest category and product topics. The initial targets are professional cleaning chemicals in the UAE, commercial floor care, laundry care, warewashing, and cleaning products for food production. These are topic hypotheses, not measured search volumes.
- Individual product pages should wait for unique, verified technical information. Forty-eight near-identical pages based only on one-sentence descriptions would add little value.
- Publish original manufacturing information, real facility photography, product documents, and application guidance when Kelvin supplies and approves them. These are stronger trust signals than unsupported performance claims.

Google says AI Overviews use the same foundational SEO practices as regular Search. It also says the `meta keywords` tag has no effect, and FAQ rich results are generally limited to authoritative government and health sites. Those tactics were intentionally omitted. Search Console verification and indexing cannot be confirmed from the repository alone.

Sources: [Google AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading), [Google link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [Google Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization), [Search Console sitemap submission](https://support.google.com/webmasters/answer/7451001).

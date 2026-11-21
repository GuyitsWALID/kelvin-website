# Kelvin SEO audit and fix plan

Audited 21 November 2026 against the live `https://kelvinchem.ae/` deployment, its eight sitemap URLs, the source and production HTML, Google Search Console, and the owner's official PageSpeed Insights reports. The goal is qualified discovery for Kelvin's professional cleaning and related industry products in the UAE. This is a company and enquiry website, not an online store.

## Skills and method

The [Awesome SEO Skills directory](https://github.com/screpylabs/awesome-seo-skills) points to the [SEO Audit skill](https://github.com/coreyhaines31/marketingskills/blob/main/skills/seo-audit/SKILL.md) and [SEO/GEO skill](https://github.com/resciencelab/opc-skills/blob/main/skills/seo-geo/SKILL.md). Both are installed in Codex as `seo-audit` and `seo-geo`. This audit follows their crawlability, indexation, on-page, content, authority, and monitoring steps. The SEO/GEO skill's `seo_audit.py` was run on the live homepage, then its output was checked against the actual HTML and Google documentation.

The script reported a 14-character description because its regex stopped at the apostrophe in “Kelvin's”; the full meta description is present. It reported no AI bots *mentioned* in `robots.txt`, but `User-agent: *` and `Allow: /` permit them generally. Neither script line is a site defect. The skill's claims of fixed AI visibility gains and FAQ markup benefits were not treated as established facts; [Google says AI features use normal SEO foundations](https://developers.google.com/search/docs/appearance/ai-features).

## Verified baseline

| Area | Evidence on 21 November | Result |
| --- | --- | --- |
| Sitemap | Search Console showed `https://kelvinchem.ae/sitemap.xml` as **Success**, with eight discovered URLs. Live XML contains the same eight canonical URLs. | Pass for discovery; not proof of indexing. |
| Live pages | Homepage, six catalogue pages, and privacy page returned HTTP 200 with one H1 each, self-canonicals, and content in initial HTML. | Pass. |
| Internal links | Checked all eight generated HTML files: 0 broken internal page links, fragment targets, or local images. The six catalogue pages expose all 48 products. | Pass. |
| Redirects and security | HTTP and `www` home URLs returned 308 to `https://kelvinchem.ae/`; HTTPS has HSTS. Search Console reports no manual actions or security issues. | Pass for checked paths. |
| Google index | URL Inspection: homepage **is on Google**, fetched successfully by Googlebot smartphone on 21 November, with crawling/indexing allowed and the inspected URL chosen as canonical. | Pass for homepage only. |
| Catalogue index | URL Inspection: `/products.html` and `/products-page-6.html` were **unknown to Google** at audit time. A live test found `/products.html` available and indexable; Search Console confirmed its indexing request entered the priority crawl queue. | Pending crawl/index decision. |
| Search data | Page indexing, Performance, and Links reports still said processing/no data. Core Web Vitals had insufficient 90-day usage data on mobile and desktop. | Cannot assess queries, rankings, referring sites, or field vitals yet. |
| PageSpeed lab | Owner's latest official homepage report: mobile Performance **99**, LCP **1.7 s**, CLS **0.019**; desktop Performance **100** on the preceding run. Accessibility, Best Practices, and SEO scored 100. | Strong lab result; no field data yet. |

## Findings, ordered by impact

| ID | Priority | Finding and evidence | Fix |
| --- | --- | --- | --- |
| I1 | High, monitor now | The main catalogue and page 6 were unknown in URL Inspection despite a successful sitemap; the property's aggregate reports are still processing. This is a new-domain discovery lag, not a confirmed technical block. | Recheck all eight URLs in Search Console after processing. Record each index status and Google's selected canonical. Investigate only specific exclusion reasons; the main catalogue has already been submitted once for indexing. |
| C1 | High, content | Four industry links on the homepage lead to `/products.html?family=...`. Those filters use the same canonical catalogue URL and server HTML as the unfiltered page, so they cannot serve as distinct search landing pages for commercial cleaning, food and beverage production, life sciences hygiene, or water treatment. | Create four substantial, crawlable industry pages with their own URLs, H1s, titles, descriptions, useful application explanations, relevant Kelvin products, and enquiry links. Link them from the homepage, navigation or catalogue, and sitemap. Use only approved Kelvin facts; obtain technical details before making suitability, safety, or performance claims. |
| C2 | High, content | Most of the 48 catalogue entries have a single short application sentence, and the company story has limited original evidence beyond location and years in operation. | Add Kelvin-owned, verified information: real manufacturing and quality-process details, facility images, product ranges, application guidance, and approved technical documents where available. Prioritize the industry pages before individual product pages. |
| O1 | Medium, on-page | Catalogue pages 2–6 have distinct numbered titles and canonicals, but share the same meta description and introductory copy. Their URLs and titles describe pagination, not industry intent. | Give each paginated page a description of its actual listed products. Keep self-canonicals and links. Do not turn numbered pages into thin keyword-targeted landing pages. |
| O2 | Medium, targeting | There is no evidence-backed keyword-to-page map or query baseline yet. The homepage title targets “professional cleaning chemicals in the UAE,” while its H1 is a brand statement. No page directly targets each industry topic. | Build a keyword map from Kelvin's approved offerings, representative UAE search results, and Search Console queries once available. Align each new page's title, visible heading, copy, and internal links with one distinct search intent. Preserve the homepage's approved visual headline if desired; its supporting visible copy can carry the category description. |
| A1 | Medium, authority | Search Console's Links report is still processing. Existing public references to Kelvin, business directory consistency, and an eligible Google Business Profile were not verified. | Check existing profiles and citations with Kelvin's confirmed company details. If Kelvin has an eligible staffed location, set up or correct its Business Profile. Seek genuine industry and partner references; do not buy links. |
| P1 | Low, performance | The latest mobile lab report flagged a Google Fonts stylesheet as render blocking (estimated 710 ms), one oversized product image (estimated 89 KiB), and about 69 KiB of unused JavaScript. The score was 99. | Revisit only after higher-impact content and index work, or if field data shows a regression. Preserve the current design and motion. |

## Fix plan

1. **Confirm Google coverage.** Revisit the Page indexing report when processing finishes. Inspect the remaining catalogue URLs and privacy URL once, record status/canonical, and fix only reported problems. Recheck the requested `/products.html` URL; repeated indexing requests do not increase its priority.
2. **Map search intent.** Draft one page brief for each of the four homepage industries, plus floor care, laundry care, and warewashing. Record target audience, search intent, approved Kelvin products, proof available, and competing search results. Treat phrases as hypotheses until Search Console or reliable keyword data supports them.
3. **Build the four industry pages.** Use the existing page design and prerender pattern. Add each page to Vite's build inputs, the prerender script, internal navigation, and sitemap. Include unique, useful information and links to the relevant catalogue entries. Validate mobile layout and initial HTML before publishing.
4. **Improve catalogue presentation.** Write page-specific metadata for pages 2–6, and add more substance to product descriptions only where Kelvin has approved technical information. Do not generate 48 near-identical product pages or unsupported `Product` markup.
5. **Publish proof and measure.** Add real company/facility evidence and approved product documents as Kelvin supplies them. Then monitor Search Console queries, indexed pages, and referring links; use those results to choose further pages. Submit the sitemap to Bing Webmaster Tools and assess Business Profile eligibility.

## Decision and evidence limits

The website is technically ready to be crawled. Broad industry visibility is still an **unproven outcome**, because the property is new, most catalogue URLs have not appeared in Google's index report yet, and query/link data is unavailable. PageSpeed's SEO score checks selected technical items; it is not a ranking score. No search volume, ranking position, backlink count, or AI citation lift is claimed in this audit.

Sources: [Google SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [URL Inspection](https://support.google.com/webmasters/answer/9012289), [meta descriptions](https://developers.google.com/search/docs/appearance/snippet), [AI features](https://developers.google.com/search/docs/appearance/ai-features).

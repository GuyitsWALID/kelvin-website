# Kelvin SEO: fresh audit, 22 November 2026

## Verdict

**The site has a solid technical SEO foundation, but it is not yet optimized enough to expect dependable discovery for non-brand industry searches.** The main constraint now is search visibility and evidence-rich content, not an obvious crawl-blocking defect. A 100 Lighthouse SEO score and a successful sitemap do not establish rankings or indexing.

This audit follows the installed `seo-audit` and `seo-geo` skills linked from [Awesome SEO Skills](https://github.com/screpylabs/awesome-seo-skills). Their checklists guided the crawl, on-page, content, and authority review. Google documentation is the authority for search behavior; the GEO skill's claimed percentage gains, blanket schema advice, and named-AI-bot check were not treated as proven requirements. [Google's guidance for AI search](https://developers.google.com/search/docs/appearance/ai-features) relies on the same core search practices.

## Evidence and scope

- Fresh live HTML crawl on 22 November: all **12 sitemap URLs** returned HTTP 200. Each had one H1, a self-canonical, an indexable robots directive, and its main text in initial HTML. Every examined image had alt text. The sitemap and `robots.txt` were reachable in the crawl. Filtered catalogue URLs are navigation states whose canonical is the main catalogue URL; they are intentionally absent from the sitemap.
- The homepage has syntactically valid `Organization` and `WebSite` JSON-LD. The confirmed legal name is **Kelvin Chemical Industries**; the visual brand and preferred site name are **Kelvin**. Other pages have no JSON-LD, which by itself is not a defect. Product schema would require supported product facts.
- All four industry pages have distinct titles, descriptions, H1s, relevant catalogue products, and enquiry links. The six catalogue pages have unique page titles and page-specific descriptions. All 48 catalogue entries appear across linked pages in initial HTML. The life sciences page retains the technical-review qualification.
- The installed SEO/GEO script found the homepage title, description, H1, social tags, structured data, sitemap, and robots file. Its “AI bots mentioned: none” result only means no bots are named: `User-agent: *` plus `Allow: /` permits general crawling. Its single-request load time is not a Core Web Vitals result.
- Direct Search Console inspection on **22 November** confirmed the homepage and main catalogue **indexed** with self-selected canonicals. Catalogue pages 2–3 and privacy were **unknown to Google**; catalogue pages 4–6 were **discovered, currently not indexed**. A follow-up inspection of the four industry pages found commercial cleaning **unknown to Google**, and food and beverage, life sciences, and water treatment **discovered, currently not indexed**. None of those four had a recorded crawl or Google-selected canonical. A live test of the commercial page said **“URL is available to Google”** and **“Page can be indexed.”** The sitemap showed **Success**, last read 22 November, with **12 discovered URLs**. Aggregate Page indexing, Performance/queries, and Links reports still said they were processing.
- The latest recorded official [PageSpeed Insights homepage run](https://pagespeed.web.dev/analysis/https-kelvinchem-ae/6zpxfw6uqa?form_factor=mobile) showed **93 mobile / 100 desktop Performance** and 100 for Accessibility, Best Practices, and SEO in both modes. Mobile LCP was 2.1 s and CLS 0. The report had no real-user field data. These are one-run lab results, not a sitewide ranking measure.
- The owner's public Google-search screenshots showed the homepage for `kelvinchem` and `kelvinchem.ae`, while broader company and category queries did not visibly surface Kelvin. Similar company names in Germany, Pakistan, and India appeared. Screenshot results are location/time dependent and cannot establish exact rank positions.

## Findings and action order

| Priority | Finding | Evidence and recommended next action |
| --- | --- | --- |
| High | **Ten of 12 intended URLs were not confirmed indexed.** | Only the homepage and main catalogue were indexed at inspection time. The other ten had no recorded crawl: four were unknown to Google and six were discovered but not indexed. The commercial page passed Google's live availability test. Recheck URL Inspection and the Page indexing report after Google processes the expanded sitemap. Record Google's selected canonical and any actual exclusion reason before changing code. Do not treat sitemap discovery as indexing or repeat queued requests. |
| High | **Industry pages have limited original proof and depth.** | They describe applications and list matching products, but approved source material supplies little technical detail, real facility evidence, process evidence, or document access. Obtain verified Kelvin application guidance, specifications, safety/technical documents, and real company imagery; add only approved claims. These are the strongest content improvements for qualified industry searches. |
| High | **Brand/entity signals are weak outside the site.** | The confirmed legal name was only recently added to visible copy and structured data; search screenshots show confusion with unrelated firms. The Search Console Links report is still processing, and the limited public exact-name search did not verify independent Kelvin references. Audit genuine company, supplier, association, and partner profiles for consistent legal name, domain, contact details, and UAE location. Do not infer zero backlinks from the limited check. |
| Medium | **No query or ranking baseline yet.** | Search Console Performance is still processing, and no verified search-volume or keyword-position dataset is available. Track impressions, clicks, queries, pages, and country after data appears. Use those results to choose wording and further topics. Do not promise top-10 or top-15 positions for broad phrases. |
| Medium | **Catalogue descriptions are generic.** | Many of the 48 products have one short application sentence. This is appropriate as a holding catalogue, but weak for specific product searches. Enrich selected entries from verified product documents, starting with products that appear on the four industry pages. Avoid 48 near-duplicate product pages or unsupported Product schema. |
| Low | **Some lab opportunities remain.** | Prior reports flagged external Google Fonts as render blocking and unused JavaScript. Current lab performance is strong, with no field data. Monitor real-user Core Web Vitals when available; optimize only if measurements show a meaningful issue. |
| Pending by owner choice | **Bing Webmaster verification.** | The owner declined the Google-to-Bing account disclosure. No Bing property or sitemap has been submitted; do not mark it complete. |

## Technical checklist

| Area | Result |
| --- | --- |
| Robots and sitemap | Pass: general allow rule; sitemap names 12 canonical HTTPS URLs. |
| Initial HTML and navigation | Pass: page text and product names exist without waiting for JavaScript; linked catalogue pagination. |
| Titles, descriptions, H1, canonical | Pass for the 12 crawled pages; industry metadata is distinct. No arbitrary character-count rule was used. |
| Structured data | Valid homepage Organization and WebSite JSON-LD in raw HTML; no unsupported Product or AI-only markup. |
| Search Console | Partial: 12 discovered; two confirmed indexed; ten with no recorded crawl at inspection time; aggregate reports pending. |
| Performance | Strong lab result on homepage; field Core Web Vitals and other-page lab results unknown. |
| Search demand and authority | Not established: no reliable query/position or backlink report yet. |

## Completion criteria

1. Search Console has inspected all 12 URLs; recheck the ten without a recorded crawl after processing, and diagnose any persistent exclusion from its actual reason and canonical choice.
2. Search Console query/page data supplies a baseline for the four industry topics; changes are judged against impressions and qualified enquiries over time, not a single personalized search.
3. Kelvin supplies approved technical and company evidence, and the priority industry/product copy is expanded from it.
4. Existing public company references are verified for identity consistency. Bing remains pending unless the owner changes the earlier decision.

Google controls crawl timing and ranking. [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), and [URL Inspection help](https://support.google.com/webmasters/answer/9012289) explain why site readiness, discovery, indexing, and ranking are separate stages.

## Limits

The live crawl verifies current responses and raw page markup; it does not show Google's private crawl state. Search Console was read directly on 22 November, but its aggregate reports are still processing. A network call from this local shell later failed DNS resolution; that does not overturn the successful live crawl, but live HTTP behavior should be rechecked from another network if deployment changes. No complete backlink, competitor ranking, search-volume, or conversion audit was possible from the available evidence.

## Action plan and work started, 22 November

1. **Now — improve paths to the four new pages.** The shared footer now links directly to each industry page from all 12 HTML pages and states the confirmed legal name, Kelvin Chemical Industries. The production build passed; generated-page checks found one H1, the four footer links, and the legal name on every page. This is a crawl-path and identity improvement, not proof of a ranking lift.
2. **After Google processes the sitemap — diagnose coverage.** Recheck the ten pages without a recorded crawl. If a page remains excluded, use its URL Inspection reason, live availability, and Google-selected canonical to decide whether a site fix is warranted. Do not submit repeated indexing requests just to chase the dashboard.
3. **As soon as Kelvin approves source material — add useful evidence.** Start with commercial cleaning and food/beverage products: product-specific directions and limitations, real facility/process evidence, and current technical documents. Keep life-sciences claims subject to documented technical review. Without this material, making the pages longer would add little value.
4. **When query data appears — refine targets.** Compare impressions, clicks, queries, and country by landing page. Use real search language to revise titles and explanations, then assess whether floor care, laundry, or warewashing deserve separate pages.
5. **Measure outcomes.** Record indexed URLs, non-brand impressions, qualified enquiries, and mobile Core Web Vitals over time. Compare like-for-like periods after Google begins showing data; a single Google search or Lighthouse score is not an outcome measure.

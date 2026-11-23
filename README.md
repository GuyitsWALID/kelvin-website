# Kelvin website

Kelvin's responsive company website has a home page, a 48-product catalogue, and a privacy notice. It uses the supplied Kelvin logo, a motion-responsive WebGL2 background, and Motion for React transitions. The office is in Dubai and manufacturing is in Khalifa Economic Zones Abu Dhabi (KEZAD).

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`, `/products.html`, or `/privacy.html`. Run `npm run build` to produce the home page, six linked catalogue pages, four industry pages, and privacy notice in `dist/`. The build also runs `npm run check:seo` to verify the generated pages, metadata, sitemap, breadcrumbs, catalogue coverage, and internal links. The build renders their page content into HTML before deployment, then hydrates the interactive React site in the browser.

## Catalogue and enquiries

The catalogue contains 12 Kelvin products featured on the home page and 36 additional catalogue products. All 48 entries and their packshots are approved for the company website. The site presents the range and does not take orders. Customers should request the matching Kelvin technical documents for product directions, hazards, and specifications.

Product cards use transparent, Kelvin-branded WebP packshots. The project owner considers the 14 new packshots final artwork. Product formulations, directions, hazards, and application suitability remain subject to Kelvin's technical documentation. The supplied logo and branded social-sharing image are in `public/assets/`. [CATALOGUE_RESEARCH.md](CATALOGUE_RESEARCH.md) records competitor research and the source and review status of the expanded range.

The enquiry form opens WhatsApp at +971 4 608 1236 with a prefilled message. The visitor reviews it and taps Send in WhatsApp; the website does not store the form details in a database. The footer also lists Kelvin's service telephone, +971 4 608 1235. The [privacy notice](privacy.html) explains this handoff.

## Search and deployment

The canonical address is `https://kelvinchem.ae/`. The `www` hostname redirects permanently to it. `robots.txt`, `sitemap.xml`, page metadata, and the homepage Organization structured data use the same address. The six catalogue pages use crawlable pagination links so every product appears in initial HTML. The site is deployed through Vercel; DNS is managed at AEserver. Google Search Console verification, sitemap submission, and live indexing checks are the next SEO handoff steps.

Built with React, Vite, WebGL2, and [Motion for React](https://motion.dev/docs/react). The background uses a static fallback when WebGL2 is unavailable or reduced motion is preferred. Rendering pauses when the tab is hidden, and touch devices use a lower drawing rate.

The home page Range section uses four interactive blueprint figures built with the [Anatomy](https://skills.wheresryan.sh/anatomy) isometric kit. Drag the figure to turn its view; keyboard users can use the left/right arrows to turn and up/down arrows to change the illustrated speed. Motion pauses offscreen and when reduced motion is preferred. The kit's MIT license is included in `src/anatomy/kit/LICENSE`.


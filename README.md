# Kelvin website

Kelvin's responsive company website has a home page, a 34-product catalogue, and a privacy notice. It uses the supplied Kelvin logo, a motion-responsive WebGL2 background, and Motion for React transitions. The office is in Dubai and manufacturing is in Khalifa Economic Zones Abu Dhabi (KEZAD).

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`, `/products.html`, or `/privacy.html`. Run `npm run build` to produce all three pages in `dist/`.

## Catalogue and enquiries

The catalogue contains 12 current Kelvin products featured on the home page and 22 proposed products marked **Concept**. The project owner approved the product information for this company website. The site presents the range and does not take orders. Customers should request the matching Kelvin technical documents for product directions, hazards, and specifications.

Product cards use transparent, Kelvin-branded WebP packshots. The supplied logo and branded social-sharing image are in `public/assets/`. [CATALOGUE_RESEARCH.md](CATALOGUE_RESEARCH.md) records competitor research and the distinction between Kelvin's current and proposed ranges.

The enquiry form opens WhatsApp at +971 4 608 1236 with a prefilled message. The visitor reviews it and taps Send in WhatsApp; the website does not store the form details in a database. The footer also lists Kelvin's service telephone, +971 4 608 1235. The [privacy notice](privacy.html) explains this handoff.

## Search and deployment

The current canonical address is `https://kelvin-website-one.vercel.app/`. `robots.txt`, `sitemap.xml`, and the page metadata use this address. Update all three when Kelvin moves to a custom domain.

Built with React, Vite, WebGL2, and [Motion for React](https://motion.dev/docs/react). The background uses a static fallback when WebGL2 is unavailable or reduced motion is preferred. Rendering pauses when the tab is hidden, and touch devices use a lower drawing rate.

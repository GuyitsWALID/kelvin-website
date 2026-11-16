# Kelvin website — review build

A responsive home page and 32-product concept catalogue for Kelvin. It uses the supplied Kelvin vector logo. A live WebGL2 dot field responds to pointer movement, with Motion for React smoothing the interaction. The header uses a navy-to-blue gradient, the story and contact areas use solid blue, and the footer is navy. Product cards use Motion hover effects with a reduced-motion fallback.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/` for the home page and `http://127.0.0.1:5173/products.html` for the catalogue. Run `npm run build` to create both production pages in `dist/`.

## Content status

This is a **review build**, not a verified commercial catalogue. The 32 products, their names, descriptions, labels, and packaging are original concepts for review. The home page's three featured products are editorial picks, not a claim about sales. [CATALOGUE_RESEARCH.md](CATALOGUE_RESEARCH.md) records the reference sources and content boundary.

The following need Kelvin approval before public launch:

- Actual product range, names, pack sizes, descriptions, specifications, safety and technical documents
- The client-provided nine-year history, Dubai office, and KEZAD manufacturing location, including exact legal entity and addresses
- Credentials, certifications, and performance claims
- FAQ answers
- Contact email and any additional office details

The enquiry form opens WhatsApp at +971 4 608 1236 with a prefilled message. The visitor must review it and tap Send in WhatsApp; the website does not store the form data. The footer also lists Kelvin's service telephone, +971 4 608 1235. Add an approved privacy notice before launch. No Betco labels, formulations, images, or technical claims were copied into the site. The transparent PNG packshots are AI-generated concept renders, not photographs of manufactured products. Their label text and shapes need Kelvin's review before use outside this preview.

## Tools and motion

Built with React, Vite, WebGL2, and [Motion for React](https://motion.dev/docs/react). To add the optional Motion AI skill and MCP configuration to your local checkout, run `npx motion-ai` and choose the project scope. The dot field is procedural; the original logo-free image is only a fallback when WebGL2 is unavailable or reduced motion is preferred. Rendering pauses when the tab is hidden, and touch devices use a lower drawing rate.

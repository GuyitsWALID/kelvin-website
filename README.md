# Kelvin website — initial version

A responsive, single-page first version of Kelvin's company website. It uses the supplied Kelvin vector logo. A live WebGL2 dot field responds to pointer movement, with Motion for React smoothing the interaction. The header uses a navy-to-blue gradient, the story and contact areas use solid blue, and the footer is navy.

## Run locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173/`. Run `npm run build` to create the production bundle in `dist/`.

## Content status

This is a **review build**, not publication-ready copy. The following are provisional and should be replaced or confirmed when Kelvin returns the questionnaire:

- Product families, descriptions, product names, specifications, photographs, and technical documents
- Exact company story, manufacturing role, company location, and service markets
- Credentials, certifications, and performance claims
- FAQ answers
- Contact email, phone, WhatsApp, and form destination

The contact section intentionally does not send enquiries yet. No Betco labels, formulations, images, or technical claims were copied into the site. The final product catalogue and enquiry delivery should be implemented only with Kelvin-approved information.

## Tools and motion

Built with React, Vite, WebGL2, and [Motion for React](https://motion.dev/docs/react). To add the optional Motion AI skill and MCP configuration to your local checkout, run `npx motion-ai` and choose the project scope. The dot field is procedural; the original logo-free image is only a fallback when WebGL2 is unavailable or reduced motion is preferred. Rendering pauses when the tab is hidden, and touch devices use a lower drawing rate.

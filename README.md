# Joensuun Huoltopalvelu Oy – website redesign demo

Speculative redesign by **Hades Design** for Joensuun Huoltopalvelu Oy, a household
appliance repair and spare-parts company in Joensuu (est. 1976).
**Not the company's official website** – the demo is published with `noindex` and its
forms never send data.

* Live demo: https://samijturunen01.github.io/joensuun-huoltopalvelu-demo/
* Original site: https://www.joensuunhuoltopalvelu.fi/

## Concept – "Tyyppikilpi" (the rating plate)

Every appliance carries a rating plate, and every repair or spare-part order at
Joensuun Huoltopalvelu starts from it – the company's own site already has a detailed,
photographed guide for finding it. The redesign makes the plate the design language:
label-stock paper, mono "plate field" labels, hairline data rows, decorative barcodes
that encode real public data (the business ID), and the green of the company's own logo
badge. The logo's washing-machine mark is rebuilt as geometry and used for the intro,
the icon family and the drum-window motif.

Signature moments:

* **"Linkous" logo intro** – the mark draws itself, the control-panel light switches on,
  the gear turns in, the drum spins like a spin cycle and drains, and the door opens onto a
  real rating-plate photo. The header wordmark is applied like a label. Plays on every
  full load of the homepage (never on in-app navigation, no storage), skips on any input,
  disabled for `prefers-reduced-motion`. "Pyöritä rumpua" spins to the next photo.
* **Tyyppikilpiopas** – brand → appliance → the company's photo with a round magnifier
  (the drum window again) and full-size viewer; links straight into a pre-filled request.
* **Plate decoder**, **varaosalappu** (spare-part slip that fills the form), receipt-style
  price list with a travel-zone diagram, appliance index with a drum-window preview.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP · Lucide.
Every route is prerendered to static HTML (`scripts/prerender.mjs`) with its own
metadata and structured data, so deep links and refreshes work on GitHub Pages.

```
src/components/  brand (logo, mark, icons) · home · guide · forms · contact · layout · ui
src/pages/       Home, Service (Huolto), Parts (Varaosat), PlateGuidePage, Prices, Request, Contact, NotFound
src/data/        company, brands, appliances, plateGuide, prices, faq, seo – all verified content
src/lib/         forms (validation + adapters), motion, intro, barcode, asset paths
scripts/         build-logo, prepare-images, prerender, serve-dist, capture (visual QA)
tests/           Playwright: pages, navigation, intro, features, a11y (axe)
docs/            sources, provenance, improvements, status
```

## Commands

```bash
npm install
npm run dev          # dev server
npm run lint         # ESLint
npm run typecheck    # tsc
npm run build        # typecheck + build + prerender → dist/
npm run preview      # serve dist/ like GitHub Pages (http://127.0.0.1:4317/joensuun-huoltopalvelu-demo/)
npm test             # Playwright (needs a build; desktop + mobile)
npm run assets       # regenerate logo files and optimised photos from source-assets/
LIVE_URL=https://samijturunen01.github.io npx playwright test   # test the deployed demo
```

## Forms

`src/lib/forms/submit.ts` keeps delivery separate from the UI. The default **demo
adapter** sends nothing and stores nothing ("Demoversio – viestiä ei lähetetty.").
A prepared Google Apps Script adapter activates only with
`VITE_FORM_MODE=apps-script` + `VITE_FORM_ENDPOINT`; reCAPTCHA v3 uses only the public
site key in the browser – the secret key belongs in Apps Script (server-side verification).

## Going to production

Set `VITE_BASE_PATH=/`, `SITE_URL=https://www.joensuunhuoltopalvelu.fi/` and – only after
the customer approves – `VITE_ALLOW_INDEXING=true`. See `docs/PROJECT_STATUS.md`.

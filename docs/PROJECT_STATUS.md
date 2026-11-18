# Project status – Joensuun Huoltopalvelu Oy redesign demo

_Last updated: 18.11.2026_

## Target

- **Company:** Joensuun Huoltopalvelu Oy (Y-tunnus 0167861-4), kodinkonehuolto ja varaosat, Pamilonkatu 34, Joensuu
- **Original website:** https://www.joensuunhuoltopalvelu.fi/
- **Not to be confused with:** Itä-Suomen Huoltopalvelu Sarola (ishp.fi) – a different company with its own demo in `C:\VERKKOSIVUT\Itä-Suomen Huoltopalvelu Sarola`.
- **Master prompt:** `C:\VERKKOSIVUT\Prompt.md` (not modified). User instruction: target URL above overrides the example URL; work autonomously incl. GitHub Pages deployment.

## Current phase

Phase 12–13: deployed and verified (see Deployment). Remaining work is optional polish and customer-side confirmation.

## Asset publication permissions

The user confirmed permission to use and publicly publish the company's logo, branding
materials and authorised company photographs for this demo (master prompt §8). All
published assets are the company's own (see `docs/ASSET_PROVENANCE.md`). AI images and
third-party logos from the old site are excluded.

## Creative direction

**"Tyyppikilpi"** – the rating plate as design language. Palette: label paper `#f1f2ec`,
ink `#0d1a12`, logo-gradient greens (`#5ac071 → #008648 → #005223`), night `#05120a`.
Type: Bricolage Grotesque (condensed display, echoes the logo's condensed lettering),
Onest (body), Red Hat Mono (plate fields). Motion: "Linkous" spin-cycle intro,
drum-window reveals, self-drawing lines; calm elsewhere.

## Completed

- Research, source documentation, weakness analysis (`docs/`)
- Logo traced 1:1 (wordmark) + mark rebuilt and overlay-verified; favicons from the company's JHP icon
- 22 authentic plate photos optimised (WebP 480/960/1600)
- Pages: Etusivu, Huolto, Varaosat, Tyyppikilpi (opas), Hinnasto, Huoltopyyntö, Yhteystiedot, branded 404
- Homepage intro (plays on every full load, not on in-app navigation; reduced-motion safe; skippable)
- Interactive rating-plate guide with magnifier + dialog, plate decoder, spare-part slip, zone diagram, FAQ
- Demo-mode service request form with validation, prefill and contextual plate helper; Apps Script/reCAPTCHA adapter prepared but inactive
- Click-to-load Google Map (keyless embed) + directions/open buttons
- Prerendered routes with per-page metadata, LocalBusiness/FAQ/Breadcrumb JSON-LD, sitemap, robots `Disallow`, `noindex`
- Scroll manager: menu/CTA navigation opens at top, anchors work, back/forward restore
- Mobile: dedicated hero order, sticky Soita/WhatsApp/Huoltopyyntö bar, menu with focus trap
- Playwright suite (94 tests desktop+mobile incl. axe) – all passing locally

## Testing status

- `npm run lint` ✔, `npm run typecheck` ✔, `npm run build` ✔ (8 prerendered routes)
- `npm test` ✔ 94 passed / 2 skipped (mobile-only tests on desktop project) – 18.11.2026
- Visual QA with screenshots at 1440×900, 834×1112, 390×844 – no horizontal overflow, no console errors

## Deployment

- Repository: https://github.com/samijturunen01/joensuun-huoltopalvelu-demo
- Live demo: https://samijturunen01.github.io/joensuun-huoltopalvelu-demo/
- GitHub Actions workflow `.github/workflows/deploy.yml` (lint → build → tests → Pages)
- Status: see the bottom of this file (updated after each deploy)

## Known issues / to confirm with the customer

- Postal code 80130 (website) vs 80100 (PRH register) – site uses 80130
- SKHL membership and Luotettava Kumppani status shown as on the original site; not independently verified
- Price list labels are terse; exact scope of each item to be confirmed
- "Joulukuussa 2026 yritys täyttää 50 vuotta" is computed from the registration date

## Next recommended action

1. Present the demo to the customer; collect confirmations listed above.
2. Optional photos (storefront, workshop, technician) – see `docs/IMAGE_REPLACEMENT_LIST.md`.
3. For production: domain/DNS, Apps Script + reCAPTCHA, privacy notice, enable indexing.

## Deploy log

- 18.11.2026 – initial deploy (see final handover for verification results)

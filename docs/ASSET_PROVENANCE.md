# Asset provenance – Joensuun Huoltopalvelu Oy concept demo

**Publication rights:** the client (Hades Design) has confirmed permission to use and
publicly publish the company's original logo, branding materials and authorised
company photographs for this demo. All assets below are the company's own material
from joensuunhuoltopalvelu.fi unless stated otherwise. No AI-generated photographs,
stock photos or competitor images are used.

Originals are kept unmodified in `source-assets/` (not deployed).

## Brand

| Local file | Original source URL | Platform | Description | Usage | Rights |
|---|---|---|---|---|---|
| `public/brand/logo.svg`, `logo.png` | https://www.joensuunhuoltopalvelu.fi/wp-content/uploads/2025/07/Logofinalnew-colors.png | Company website | Logo badge rebuilt as SVG: gradient sampled from the original, washing-machine mark rebuilt as geometry (overlay-verified), wordmark traced 1:1 with potrace (`scripts/build-logo.mjs`) | Header, footer, structured data | Authorised (company logo) |
| `public/brand/wordmark-white.svg`, `wordmark-ink.svg` | same | Company website | Traced wordmark "Joensuun Huoltopalvelu Oy" | Logo intro wipe | Authorised |
| `src/components/brand/Mark.tsx` (inline SVG) | same | Company website | Washing-machine mark, animatable strokes | Hero intro, icons, panels | Authorised |
| `public/brand/favicon.svg`, `public/favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | https://www.joensuunhuoltopalvelu.fi/wp-content/uploads/2025/10/cropped-favicon-green.png | Company website | "JHP" favicon (SVG traced from it, PNGs resized) | Browser icons | Authorised |
| `public/images/og-joensuun-huoltopalvelu.jpg` | Composite of the logo + `miele-ppk-kilpi-scaled.jpg` | Generated (`scripts/prepare-images.mjs`) | 1200×630 link preview | Open Graph | Authorised material only |

## Photographs (company's own rating-plate photos, "Ota yhteyttä" page)

All from `https://www.joensuunhuoltopalvelu.fi/wp-content/uploads/2025/10/<file>`; optimised to WebP 480/960/1600 px in `public/images/plates/<id>-<w>.webp`.

| Local id | Original file | Subject | Used on | Rights |
|---|---|---|---|---|
| miele-pesukone | miele-ppk-kilpi-scaled.jpg | Miele washing machine plate in the door collar | Hero drum, guide, Huolto, OG | Authorised |
| miele-kuivausrumpu | miele-kkr-scaled.jpg | Miele dryer plate at the back | Guide | Authorised |
| miele-uuni | miele-uuni-scaled.jpg | Miele oven plate | Hero drum, guide, Huolto | Authorised |
| miele-astianpesukone | miele-apk-scaled.jpg | Miele dishwasher plate on the door | Guide, Huolto | Authorised |
| miele-imuri | miele-imuri-scaled.jpg | Miele vacuum plate under the unit | Guide, Huolto | Authorised |
| electrolux-jaakaappi | elux-jkpk-tyyppikilpi.jpg | Electrolux fridge-freezer plate | Guide, Huolto, appliance index | Authorised |
| electrolux-pesukone | pyykinpesukone-elux.jpg | Electrolux washer plate | Hero drum, guide | Authorised |
| electrolux-uuni | liesi_uuni-elux-scaled.jpg | Electrolux cooker plate | Guide | Authorised |
| electrolux-astianpesukone | apk-electrolux-scaled.jpg | Electrolux dishwasher plate | Guide | Authorised |
| electrolux-mikro | elux-mikro-scaled.jpg | Electrolux microwave plate | Guide, Huolto | Authorised |
| gorenje-jaakaappi | upo-jk-kilpi-scaled.jpg | UPO fridge-freezer plate | Guide | Authorised |
| gorenje-pesukone | gorenje-ppk-edesta-scaled.jpg | Gorenje washer plate | Hero drum, guide | Authorised |
| gorenje-pesukone-paalta | upo-paaltataytettava-vanha-scaled.jpg | Old top-loader plate in the lint-filter hatch | Guide | Authorised |
| gorenje-uuni | upo-liesi-scaled.jpg | UPO cooker plate | Guide | Authorised |
| gorenje-astianpesukone | asko-apk-scaled.jpg | Asko dishwasher plate | Guide | Authorised |
| gorenje-keittotaso | induktiotaso-upo-scaled.jpg | UPO induction hob plate | Guide, Huolto | Authorised |
| gorenje-mikro | mikro-gorenje-scaled.jpg | Gorenje microwave plate | Guide | Authorised |
| bsh-jaakaappi | siemens-jk-scaled.jpg | Siemens fridge plate | Hero drum, guide | Authorised |
| bsh-pesukone | bosch-ppk-scaled.jpg | Bosch washer plate | Hero drum, guide | Authorised |
| bsh-uuni | bosch-uuni-scaled.jpg | Bosch oven sticker | Guide | Authorised |
| bsh-astianpesukone | bsh-apk1-scaled.jpg | BSH dishwasher stamped data | Guide | Authorised |
| bsh-mikro | bosch-mikro-scaled.jpg | Bosch microwave plate | Guide | Authorised |

Captions describe exactly what the photo shows (where the plate is). They are not
presented as customer projects.

## Badges

| Local file | Original source URL | Description | Rights / note |
|---|---|---|---|
| `public/images/badges/skhl-320.webp` | https://www.joensuunhuoltopalvelu.fi/wp-content/uploads/2025/07/SKHL.png | Suomen Kodinkonehuoltojen Liitto ry logo, as shown on the company homepage | Shown as on the original site; membership to be confirmed (see CONTENT_SOURCES) |
| `public/images/badges/luotettava-kumppani-720.webp` | https://www.joensuunhuoltopalvelu.fi/wp-content/uploads/2025/09/Luotettava-kumppani_2.png | Luotettava Kumppani logo, as shown on the company homepage | Shown as on the original site; status to be confirmed |

## Fonts and libraries

| Asset | Licence |
|---|---|
| Bricolage Grotesque (variable, via @fontsource-variable) | SIL Open Font License 1.1 |
| Onest (variable) | SIL Open Font License 1.1 |
| Red Hat Mono (variable) | SIL Open Font License 1.1 |
| Lucide icons | ISC |
| GSAP 3 | Standard "no charge" GSAP licence |

## Excluded material

AI-generated images (`4dd35d62-…png` portrait, `Backdrop-smaler*.png` render), the
unrelated Pexels sea photo, third-party brand logos and unrelated PNGs in the media
library were deliberately **not** used.

# Content sources – Joensuun Huoltopalvelu Oy concept demo

Researched 18.11.2026. The company's own website is the primary source. Anything
not found there or in an official register is **not** used on the site.

## Sources

| # | Source | What it provided |
|---|--------|------------------|
| S1 | https://www.joensuunhuoltopalvelu.fi/ (Etusivu) | Name, "vuonna 1976 perustettu kodinkonehuolto", area "Joensuun, sekä Pohjois-Karjalan alueella", 18 brands, advice to find brand/model/article number on the rating plate, contact block, hours, billing details, SKHL + Luotettava Kumppani badges |
| S2 | https://www.joensuunhuoltopalvelu.fi/hinnasto/ | Full price list "Hinnat (sis. alv 25.5%)" incl. travel zones |
| S3 | https://www.joensuunhuoltopalvelu.fi/ota-yhteytta/ | Rating-plate guide (Miele, Electrolux, Gorenje, BSH groups) with 22 photos, BSH Z-Nr/FD note, contact-form fields |
| S4 | https://www.joensuunhuoltopalvelu.fi/yhteystiedot/ | Phone + hours "ma – pe 8:30 – 16:30", address, email, WhatsApp link (wa.me/358405328734), Google Maps place link with coordinates 62.6227818, 29.7425953, "Voit ottaa yhteyttä … sähköpostilla, whatsapilla, soittamalla tai … tekstiviestillä", "tule käymään" |
| S5 | WordPress REST API of the same site (`/wp-json/wp/v2/media`, `/pages`) | Inventory of all uploaded media (logos, favicon, photos); confirms only 4 pages and no blog posts |
| S6 | PRH / YTJ open data – `avoindata.prh.fi/opendata-ytj-api/v3/companies?businessId=0167861-4` | Official name *Joensuun Huoltopalvelu Oy*, Y-tunnus **0167861-4**, registered **17.12.1976**, osakeyhtiö, TOL 95220 *Kotitalouskoneiden sekä kodin ja puutarhan laitteiden korjaus ja huolto*, postal address Pamilonkatu 34, **80100** Joensuu |
| S7 | Fonecta directory (search result snippet only, page returned 403) | Same Y-tunnus and founding date; listed hours differ (see below) – **not used** |

The e-invoice address on S1 (`003701678614` = 0037 + Y-tunnus without hyphen) independently confirms the business ID.

## Facts used on the site

| Fact | Value on site | Source |
|------|---------------|--------|
| Company name | Joensuun Huoltopalvelu Oy | S1, S6 |
| Business ID | 0167861-4 | S6 (+ S1 e-invoice address) |
| Founded | 17.12.1976 ("vuodesta 1976") | S6, S1 |
| Line of business | Kodinkonehuolto ja varaosat / kotitalouskoneiden korjaus ja huolto | S1, S6 |
| Area | Joensuu ja Pohjois-Karjala | S1 |
| Address | Pamilonkatu 34, 80130 Joensuu | S1, S4 |
| Phone | 040 532 8734 (also SMS, WhatsApp) | S1, S4 |
| Email | joensuun.huoltopalvelu@telemail.fi | S1, S4 |
| Hours | ma–pe 8.30–16.30 | S1, S4 |
| E-invoicing | 003701678614 / E204503 / GEP Finland Oy | S1 |
| Brands (18) | AEG, Electrolux, ASKO & ASKO Professional, Allaway (keskuspölynimurit), Bosch, Elektro Helios, Gorenje, Gaggenau, Hisense, Junker, Miele & Miele Professional, Puzer (keskuspölynimurit), Progress, Rosenlew, Siemens, UPO, Volta (pölynimurit), Zanussi | S1 |
| Brand groups in the plate guide | Miele; Electrolux/AEG/Progress/Rosenlew; UPO/Gorenje/Asko/Hisense; Bosch/Siemens/Junker/Gaggenau | S3 |
| Prices (incl. VAT 25,5 %) | 25,30 / 39,50 / 59,70 / 75,90 / 79,95 / 113,35 / 151,80 €; travel 15,20 / 30,35 / 40,50 € and 1,60 €/km over 30 km | S2 |
| Rating-plate instructions | Text per group and appliance, lightly copy-edited (spelling, standard Finnish: "aukaiset" → "avaat", "vihannselokeron" → "vihanneslokeron" etc.) | S3 |
| Form fields | Nimi, email, puhelin, osoite, merkki, malli/E-nr, artikkelinumero/PNC/FD, sarjanumero/Z-nr, ostopäivä, takuu, viankuvaus | S3 |
| Association badges | SKHL (Suomen Kodinkonehuoltojen Liitto ry) logo, Luotettava Kumppani logo | S1 (shown on the homepage) |

## Derived or interpreted content (please confirm)

- **"Joulukuussa 2026 yritys täyttää 50 vuotta"** – calculated from the registration date 17.12.1976. The sentence switches automatically after the date.
- **Home visits**: the site does not say "kotikäynti", but the published travel charges ("AJO kaupungin alue" etc.) imply on-site visits. The copy only mentions the travel charges, not a promise of home visits.
- **Appliance list** (pesukoneet, kuivausrummut, jääkaapit, pakastimet, astianpesukoneet, uunit, liedet, keitto-/induktiotasot, mikroaaltouunit, pölynimurit, keskuspölynimurit) – derived from the appliance types in the rating-plate guide (S3) and the vacuum brands (S1).
- **Field aliases on the plate decoder** (PNC/Prod.No. for Electrolux, Art.Nr for UPO/Gorenje, M-Nr/Nr for Miele) – read from the company's own plate photos and the original form labels.
- **Process "Katso kilpi → ota yhteyttä → sovitaan jatko"** – a summary of S1/S4 instructions, no timing promises.
- **"Hinnat näkyvillä etukäteen"** – refers only to the published price list.

## Flagged for verification

| Topic | Issue |
|-------|-------|
| Postal code | Website: **80130**. PRH postal address: **80100**. Google's place for Pamilonkatu 34 uses 80130 – the site uses 80130. Confirm which is correct. |
| Opening hours | Website: 8.30–16.30. Fonecta snippet: 8.00–16.30. The site uses the company's own 8.30–16.30. |
| SKHL membership | The SKHL logo is on the current homepage; membership could not be confirmed from a public member list. Shown as on the original site. |
| Luotettava Kumppani | Logo is on the current homepage; current status not verified from Tilaajavastuu. |
| AA credit rating | `AA-luokitus.png` (Dun & Bradstreet 2024) exists in the media library but is **not** shown on the live site – not used. If still valid, it could be added with a current certificate. |
| Price list | Labels such as "Kustannusarvio/Lisä-/Pienkorjaus" are terse; amounts are shown exactly, labels lightly normalised. Ask what each item covers before production. |
| Authorised service status | No public source confirms authorised (warranty) service status for any brand – the site makes no such claim. |
| Warranty repairs | The original form asks "Takuu voimassa"; the site keeps the question but promises nothing about warranty handling. |
| WhatsApp photos | Not used as a claim; the form helper only points to the plate guide. |

## Not used (and why)

- `4dd35d62-…png` – an AI-generated portrait of a smiling man with a phone (yhteystiedot page). Not a real employee → excluded.
- `Backdrop-smaler*.png`, `backdrop.png` – AI-style 3D render of green appliances used as the current hero → not authentic photography, excluded.
- `pexels-photo-…jpg` – stock photo of ocean waves, unrelated.
- Brand logos (`aeg-3.jpg`, `bosch.png` …) – third-party trademarks; the redesign sets brand names in type instead.
- `pngfind…dell-logo…`, `pngegg…` – unrelated third-party images in the media library.

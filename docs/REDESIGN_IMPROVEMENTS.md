# Redesign improvements – Joensuun Huoltopalvelu Oy

## Who the customer is

- **Primary:** households in Joensuu and North Karelia with a broken washing machine,
  fridge, dishwasher, oven, hob or vacuum. They are often in a hurry, on a phone, and
  unsure whether repair is worth it, what it costs and what information they need.
- **Secondary:** people looking for a specific spare part (seal, filter, element) for one of
  the 18 brands; housing companies and businesses who need e-invoicing details.
- **Purchasing concerns:** "Can they fix my brand?", "What will it cost?", "Do they come
  to me and how much is the trip?", "What do I need to tell them?", "Are they real and local?"
- **Most valuable conversion:** a phone call (040 532 8734). Secondary: service request
  form with correct plate data, WhatsApp/SMS, visiting Pamilonkatu 34.

## The current site (analysis, 18.11.2026)

| Area | Finding | Business impact |
|---|---|---|
| First impression | Generic WordPress (Neve) theme; header shows the company name as plain text – the real logo badge is not used at all. Hero is an AI-style 3D render of green appliances | Feels anonymous, could be any company; nothing says "since 1976" |
| Brand identity | Logo exists in the media library (green badge + washing-machine mark) but is unused; favicon "JHP" only | Brand recognition lost |
| Value proposition | Strong facts (est. 1976, 18 brands, public prices) are hidden in body text | The best trust signals are not seen |
| Navigation & IA | 4 pages; "Ota yhteyttä" and "Yhteystiedot" overlap; the valuable rating-plate guide is buried in accordions on the contact page | Visitors don't find the guide; form and guide compete |
| Service presentation | No description of what is repaired – only a grid of 18 brand logos | Users can't tell whether their appliance type is serviced |
| Pricing | Good, public price list, but a bare table with terse labels; travel zones not explained | Trust opportunity under-used |
| Rating-plate guide | Excellent, unique content with 22 real photos – but hidden behind buttons, not linked to the form, photos small | The company's best differentiator is invisible |
| Mobile | Logo grid long; no sticky contact; form long without help | Calls and requests lost on phones |
| Contact form | 13 fields, no validation messaging, no guidance tied to the chosen brand | Wrong or missing plate data → extra calls |
| Trust | AI portrait on the contact page could be mistaken for staff; no company facts (Y-tunnus) visible | Risk to credibility |
| Accessibility | Images without alt text (brand logos, plate photos), low-contrast green-on-black footer text | WCAG issues |
| Performance | Multiple 1–2 MB PNG backgrounds, unoptimised images | Slow on mobile |
| Local SEO | Title "Joensuun Huoltopalvelu Oy" only, no meta descriptions, no structured data, `lang="en-US"` | Weak visibility for "kodinkonehuolto Joensuu" searches |
| Map | "Löydät meidät täältä" section rendered as an empty green area in our browser test (no map embed in the page HTML) | Looks broken; no directions on the homepage |

## Improvements and their business value

1. **Authentic logo restored and animated.** The real badge is traced 1:1 and used
   everywhere; the homepage intro draws the washing-machine mark, switches on its
   control light, spins the drum and opens the door onto a real plate photo.
   → Instant recognition and a memorable first impression rooted in the company's own identity.
2. **Clear value proposition in the hero:** "Kodinkonehuolto ja varaosat Joensuussa
   vuodesta 1976", phone call as the primary button, hours/address/founding date as
   plate fields. → Visitors know in two seconds what, where and since when.
3. **Interactive rating-plate guide (Tyyppikilpiopas)** as its own page: brand → appliance →
   the company's photo with a magnifier and full-screen view, BSH Z-Nr note, field names
   per brand group, and a button that pre-fills the service request. → Fewer wrong part
   orders and back-and-forth calls; a unique, useful tool competitors don't have.
4. **Plate decoder** explains the three numbers that matter (malli, artikkelinumero,
   sarjanumero) on an illustrated plate. → Customers arrive with the right information.
5. **Smart service request form**: request type (huolto / varaosa / muu), required fields
   clearly marked, accessible inline validation, a side panel that shows the plate
   location for the chosen brand+appliance, prefill from the guide and the spare-part slip.
   Demo mode: nothing is sent. → Better-quality leads.
6. **Service page (Huolto)** shows what is repaired, using the company's own photos,
   a "prepare like this" checklist, prices and FAQ. → Answers "can you fix this?" directly.
7. **Spare-parts page (Varaosat)** with an interactive "varaosalappu" that carries brand,
   appliance, model and article number into the form, and brands grouped by manufacturer
   group. → A dedicated path for the parts business.
8. **Pricing presented with confidence**: receipt-style list with exact published prices
   and a travel-zone diagram. → Removes price uncertainty, a top purchase barrier.
9. **Mobile-first contact**: sticky bottom bar (Soita · WhatsApp · Huoltopyyntö),
   large touch targets, tel/sms/wa links everywhere. → More calls from phones.
10. **Trust**: verified company facts (Y-tunnus, founding date, line of business),
    association badges as on the original site, AI imagery removed, 50-year milestone.
11. **Local SEO**: unique Finnish titles and descriptions per page, `lang="fi"`, semantic
    headings, LocalBusiness + FAQ + Breadcrumb structured data from verified facts,
    sitemap; prerendered HTML for every route. (Demo is `noindex`.)
12. **Working map**: privacy-friendly click-to-load Google Map at Pamilonkatu 34 with
    directions and "Avaa Google Mapsissa" buttons.
13. **Accessibility & performance**: WCAG 2.1 AA checks with axe (0 serious/critical),
    keyboard navigation, reduced-motion support, responsive WebP images (~3 MB of photos
    total, loaded on demand), self-hosted fonts.

## Production migration notes

- The current site runs WordPress on HTTPS. The new site is static (GitHub Pages or any
  static host); DNS, HTTPS certificate and email (telemail.fi) must be checked during
  migration – the demo does not touch them.
- Old URLs to redirect: `/ota-yhteytta/` → `/huoltopyynto/` (and `/tyyppikilpi/`),
  `/yhteystiedot/` → `/yhteystiedot/`, `/hinnasto/` → `/hinnasto/`.

import type { FieldErrors, ServiceRequest } from './types'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^\+?[0-9 ()-]{6,20}$/
const POSTAL = /^\d{5}$/

/** Client-side validation. The future backend must validate again server-side. */
export function validate(d: ServiceRequest): FieldErrors {
  const e: FieldErrors = {}
  if (d.name.trim().length < 2) e.name = 'Kirjoita nimesi.'
  if (!d.email.trim() && !d.phone.trim()) {
    e.phone = 'Anna puhelinnumero tai sähköpostiosoite, jotta voimme vastata.'
  }
  if (d.email.trim() && !EMAIL.test(d.email.trim())) e.email = 'Tarkista sähköpostiosoite (esim. nimi@esimerkki.fi).'
  if (d.phone.trim() && !PHONE.test(d.phone.trim())) e.phone = 'Tarkista puhelinnumero (esim. 040 123 4567).'
  if (d.postalCode.trim() && !POSTAL.test(d.postalCode.trim())) e.postalCode = 'Postinumerossa on viisi numeroa.'
  if (!d.brand.trim()) e.brand = 'Valitse tai kirjoita laitteen merkki.'
  if (d.description.trim().length < 10) e.description = 'Kerro lyhyesti, mitä tarvitset tai miten vika ilmenee (vähintään 10 merkkiä).'
  if (d.description.length > 2000) e.description = 'Kuvaus on liian pitkä (enintään 2000 merkkiä).'
  if (!d.consent) e.consent = 'Hyväksy tietojen käyttö yhteydenottoa varten.'
  return e
}

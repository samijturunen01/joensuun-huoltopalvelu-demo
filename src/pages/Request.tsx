import { PageIntro } from '../components/ui/PageIntro'
import { ServiceRequestForm } from '../components/forms/ServiceRequestForm'

export function Request() {
  return (
    <>
      <PageIntro
        crumb="Huoltopyyntö"
        code="P5"
        label="Huoltopyyntö ja varaosakysely"
        title={
          <>
            Kerro laitteesta, <span className="text-green-600">jatketaan siitä.</span>
          </>
        }
        lede="Täytä yhteystiedot, laitteen tiedot tyyppikilvestä ja lyhyt kuvaus viasta tai tarvittavasta osasta. Pakolliset kentät on merkitty."
      />
      <section aria-label="Huoltopyyntölomake" className="py-12 lg:py-16">
        <div className="container-x">
          <ServiceRequestForm />
        </div>
      </section>
    </>
  )
}

import { Hero } from '../components/home/Hero'
import { ApplianceIndex } from '../components/home/ApplianceIndex'
import { PlateSection } from '../components/home/PlateSection'
import { BrandWall } from '../components/home/BrandWall'
import { Process } from '../components/home/Process'
import { PricePreview } from '../components/home/PricePreview'
import { Heritage } from '../components/home/Heritage'
import { SectionHeading } from '../components/ui/SectionHeading'
import { FaqList } from '../components/ui/FaqList'
import { ContactPanel } from '../components/ui/ContactPanel'
import { faqs } from '../data/faq'

export function Home() {
  return (
    <>
      <Hero />
      <ApplianceIndex />
      <PlateSection />
      <BrandWall />
      <Process />
      <PricePreview />
      <Heritage />
      <section aria-labelledby="ukk-title" className="border-t border-ink/10 py-20 lg:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" code="07" label="Usein kysyttyä" id="ukk-title" title="Kysymyksiä ennen yhteydenottoa?" size="m" />
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>
      <ContactPanel />
    </>
  )
}

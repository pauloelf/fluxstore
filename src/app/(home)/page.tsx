import { FeatureSection } from "./_components/features-section"
import { HeroCarousel } from "./_components/hero-carousel"
import { MostPopularSection } from "./_components/most-popular-section"

export default function Home() {
  return (
    <main className="flex flex-col flex-1 min-h-[calc(100dvh-72px)]">
      <HeroCarousel />
      <FeatureSection />
      <MostPopularSection />
    </main>
  )
}

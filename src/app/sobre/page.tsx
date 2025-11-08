"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { StatsSection } from "./_components/stats-section"
import { StorySection } from "./_components/story-section"
import { ValuesSection } from "./_components/values-section"

export default function AboutPage() {
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      tl.from(titleRef.current, { opacity: 0, y: 100 })
        .from(descriptionRef.current, { opacity: 0, y: 100 })
        .from(".about-stats", { opacity: 0, y: 100 })
        .from(".about-story", { opacity: 0, y: 100 })
        .from(".about-values", { opacity: 0, y: 100 })
    },
    { scope: containerRef },
  )

  return (
    <main
      className="flex flex-col flex-1 w-full h-full min-h-[calc(100dvh-72px)] font-detail"
      ref={containerRef}
    >
      <section className="relative bg-gradient-to-b from-background via-primary/10 to-background py-20 overflow-hidden">
        <div className="z-5 absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

        <div className="z-10 relative mx-auto px-4 lg:px-8 max-w-4xl text-center">
          <div>
            <h1
              className="mb-6 font-bold text-5xl md:text-6xl tracking-tight"
              ref={titleRef}
            >
              Sobre a <span className="text-primary">FluxStore</span>
            </h1>
            <p
              className="text-muted-foreground leading-relaxed"
              ref={descriptionRef}
            >
              Nossa missão é revolucionar as compras online, oferecendo a você a
              melhor seleção de produtos de tecnologia e estilo de vida, tudo em
              um só lugar.
            </p>
          </div>
        </div>
      </section>

      <StatsSection />

      <StorySection />

      <ValuesSection />
    </main>
  )
}

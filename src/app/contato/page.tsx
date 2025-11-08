"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { BusinessHours } from "./_components/business-hours"
import { ContactInformation } from "./_components/contact-information"
import { FormSection } from "./_components/form-section"

export default function ContactPage() {
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
        .from(".contact-form", { opacity: 0, y: 100 })
        .from(".contact-information", { opacity: 0, y: 100 })
        .from(".contact-hours", { opacity: 0, y: 100 })
    },
    { scope: containerRef },
  )

  return (
    <main
      className="flex flex-col flex-1 px-4 w-full h-full min-h-[calc(100dvh-72px)] overflow-hidden"
      ref={containerRef}
    >
      <div className="relative mx-auto w-full max-w-5xl h-full">
        <div
          aria-hidden
          className="top-2/7 left-3/7 absolute bg-secondary blur-2xl rounded-full size-30"
        />
        <div
          aria-hidden
          className="top-6/7 left-32 absolute bg-secondary blur-2xl rounded-full size-52"
        />
        <div
          aria-hidden
          className="top-3/7 left-7/9 absolute bg-secondary blur-2xl rounded-full size-40"
        />

        <section className="z-10 py-20">
          <div className="z-10 relative mx-auto px-4 lg:px-8 max-w-4xl text-center">
            <div>
              <h1
                className="mb-6 font-bold text-5xl md:text-6xl tracking-tight"
                ref={titleRef}
              >
                Entre em <span className="text-primary">Contato</span>
              </h1>
              <p
                className="text-muted-foreground leading-relaxed"
                ref={descriptionRef}
              >
                Adoraríamos receber sua mensagem. Envie-nos uma mensagem!
              </p>
            </div>
          </div>
        </section>

        <div className="gap-16 md:gap-12 grid grid-cols-1 md:grid-cols-2 mb-12">
          <FormSection />

          <div className="z-10 relative space-y-6">
            <ContactInformation />
            <BusinessHours />
          </div>
        </div>
      </div>
    </main>
  )
}

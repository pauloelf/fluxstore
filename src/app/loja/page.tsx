"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { ProductsList } from "./_components/products-list"

export default function LojaPage() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out", delay: 0.1 },
      })

      tl.from(titleRef.current, { opacity: 0, y: 100 }).from(
        descriptionRef.current,
        { opacity: 0, y: 100 },
      )
    },
    { scope: containerRef },
  )

  return (
    <main className="flex flex-col flex-1 mx-auto px-4 py-16 w-full max-w-7xl h-full min-h-[calc(100dvh-72px)]">
      <div className="w-full">
        <div className="z-10 space-y-2" ref={containerRef}>
          <h2 className="font-bold text-4xl lg:text-5xl" ref={titleRef}>
            Explorar <span className="text-primary">Produtos</span>
          </h2>
          <p
            className="text-muted-foreground text-pretty leading-relaxed"
            ref={descriptionRef}
          >
            Descubra nossa coleção completa de produtos premium
          </p>
        </div>
        <ProductsList />
      </div>
    </main>
  )
}

"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import type { Product } from "@/@types/product-types"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { useProducts } from "@/hooks/useProducts"

export function MostPopularSection() {
  const { data, isLoading } = useProducts<Product[]>({
    sortBy: "rating",
    order: "desc",
    limit: 8,
  })
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)

  useGSAP(
    () => {
      if (!data?.products) return

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      const cards = gsap.utils.toArray(".product-card")

      tl.from(titleRef.current, { opacity: 0, y: 100 })
        .from(descriptionRef.current, { opacity: 0, y: 100 })
        .from(cards, { opacity: 0, y: 100, stagger: 0.2 })
    },
    { scope: containerRef, dependencies: [data?.products] },
  )

  return (
    <section
      className="relative space-y-6 mx-auto px-4 py-16 w-full max-w-7xl"
      ref={containerRef}
    >
      <div className="z-5 absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="z-10 space-y-2 text-center">
        <h2 className="font-bold text-4xl lg:text-5xl" ref={titleRef}>
          Produtos <span className="text-primary">Populares</span>
        </h2>
        <p
          className="text-muted-foreground text-pretty leading-relaxed"
          ref={descriptionRef}
        >
          Descubra nossos itens mais bem avaliados e amados por clientes no
          mundo todo
        </p>
      </div>
      {isLoading ? (
        <LoadingSpinner message="Carregando produtos..." />
      ) : (
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6 container-card">
          {data?.products.map((product) => (
            <ProductCard
              className="product-card"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Link className="z-10" href="/loja" tabIndex={-1}>
          <Button pointer size="lg" variant="default">
            Ver Produtos
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </section>
  )
}

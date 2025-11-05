"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"
import { useRef, useState } from "react"
import type { Product } from "@/@types/product-types"
import { ErrorMessage } from "@/components/shared/error-message"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { ProductCard } from "@/components/shared/product-card"
import { useProducts } from "@/hooks/useProducts"
import { cn } from "@/lib/utils"
import { ProductDetails } from "./product-details"
import { ProductExtras } from "./product-extras"

export function ProductSection({ product }: { product?: Product }) {
  const [activeImage, setActiveImage] = useState(0)
  const { data, isLoading, error } = useProducts<Product[]>({
    page: 1,
    limit: 8,
    category: product?.category,
  })
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  let count = 0

  useGSAP(
    () => {
      if (!data?.products) return

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      const images = gsap.utils.toArray(".product-image")
      const cards = gsap.utils.toArray(".product-card")

      tl.from(titleRef.current, { opacity: 0, y: 100 })
        .from(images, { opacity: 0, y: 100, stagger: 0.1 })
        .from(cards, {
          opacity: 0,
          y: 100,
          stagger: 0.1,
        })
    },
    { scope: containerRef, dependencies: [data?.products] },
  )

  if (error || !product) {
    return <ErrorMessage message="Erro ao carregar os dados." />
  }
  return (
    <section
      className="gap-8 grid grid-cols-1 md:grid-cols-2 py-8"
      ref={containerRef}
    >
      <div className="space-y-4">
        <div className="relative *:justify-self-center bg-muted rounded-3xl w-full overflow-hidden product-image">
          <Image
            alt={product.title}
            height={600}
            priority
            src={product.images[activeImage]}
            width={600}
          />
        </div>
        <div className="flex gap-2 md:gap-4 w-full">
          {product.images.map((image, idx) => (
            <button
              className={cn(
                "relative bg-muted/20 border-2 rounded-3xl w-max overflow-hidden transition-colors duration-300 product-image",
                idx === activeImage
                  ? "border-primary bg-muted"
                  : "border-muted hover:border-accent focus-visible:border-accent",
              )}
              key={image}
              onClick={() => setActiveImage(idx)}
              type="button"
            >
              <Image
                alt={product.title}
                className="max-md:size-24"
                height={150}
                src={image}
                width={150}
              />
            </button>
          ))}
        </div>
      </div>

      <ProductDetails product={product} />

      <ProductExtras product={product} />

      <div className="md:col-span-2 mt-16">
        <div className="z-10 space-y-2">
          <h2 className="font-bold text-2xl lg:text-3xl" ref={titleRef}>
            Produtos <span className="text-primary">Relacionados</span>
          </h2>
        </div>

        <div>
          {isLoading ? (
            <LoadingSpinner message="Carregando produtos..." />
          ) : (
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
              {data?.products?.map((prod) => {
                if (prod.id === product.id || count >= 4) return null
                count++

                return (
                  <ProductCard
                    className="product-card"
                    key={prod.id}
                    product={prod}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

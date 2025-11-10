"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Search } from "lucide-react"
import { useRef } from "react"
import type { Product } from "@/@types/product-types"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { ProductCard } from "@/components/shared/product-card"
import { useFilters } from "@/hooks/useFilters"
import { useProducts } from "@/hooks/useProducts"
import { getTotalPages } from "@/lib/utils"
import { LojaFilters } from "./loja-filters"
import { LojaPagination } from "./loja-pagination"

export function ProductsList() {
  const { filters, setFilters } = useFilters()
  const { data, isLoading } = useProducts<Product[]>(filters)
  const { total } = getTotalPages(data?.total ?? 0)
  const containerRef = useRef(null)

  useGSAP(
    () => {
      if (!data?.products) return

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      const cards = gsap.utils.toArray(".product-card")

      tl.from(cards, { opacity: 0, y: 100, stagger: 0.1 })
    },
    { scope: containerRef, dependencies: [data?.products] },
  )

  return (
    <section className="scroll-smooth">
      <LojaFilters filters={filters} setFilters={setFilters} />
      <div ref={containerRef}>
        {isLoading ? (
          <LoadingSpinner message="Carregando produtos..." />
        ) : data?.products.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-4 min-h-[40vh] text-center">
            <div className="bg-muted p-6 rounded-full">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-xl">Nenhum Produto Encontrado</h3>
            <p className="text-muted-foreground">
              Talvez esse produto não exista ou não o temos em nossa loja.{" "}
              <br />
              Tente uma busca diferente
            </p>
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
            {data?.products?.map((product) => (
              <ProductCard
                className="product-card"
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
      {!isLoading && (
        <LojaPagination
          filters={filters}
          setFilters={setFilters}
          total={total}
        />
      )}
    </section>
  )
}

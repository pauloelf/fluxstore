"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import type { Product } from "@/@types/product-types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductOverview } from "./product-overview"
import { ProductReviews } from "./product-reviews"
import { ProductSpecifications } from "./product-specifications"

export function ProductExtras({ product }: { product: Product }) {
  const tabsListRef = useRef(null)
  const tabsContentRef = useRef(null)
  const dividerRef = useRef(null)

  useGSAP(() => {
    if (!product) return

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.3 },
    })

    tl.from(tabsListRef.current, {
      opacity: 0,
      y: 100,
      delay: 0.5,
    })
      .from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.3,
      })
      .from(tabsContentRef.current, {
        opacity: 0,
        y: 100,
      })
  }, [])

  return (
    <Tabs className="md:col-span-2 mt-16 w-full" defaultValue="overview">
      <TabsList ref={tabsListRef}>
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="specifications">Especificações</TabsTrigger>
        <TabsTrigger value="reviews">
          Avaliações ({product.reviews.length || 0})
        </TabsTrigger>
      </TabsList>

      <div className="bg-muted rounded-full w-full h-0.5" ref={dividerRef} />

      <div className="mt-4" ref={tabsContentRef}>
        <TabsContent value="overview">
          <ProductOverview product={product} />
        </TabsContent>
        <TabsContent value="specifications">
          <ProductSpecifications product={product} />
        </TabsContent>
        <TabsContent value="reviews">
          <ProductReviews product={product} />
        </TabsContent>
      </div>
    </Tabs>
  )
}

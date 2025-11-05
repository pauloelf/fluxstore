"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import {
  Check,
  Package,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useContext, useRef, useState } from "react"
import type { Product } from "@/@types/product-types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CartContext } from "@/context/cart-context"
import { UserContext } from "@/context/user-context"
import { formatPrice } from "@/lib/utils"
import { StarReviews } from "./star-reviews"

export function ProductDetails({ product }: { product: Product }) {
  const { isAuthenticated, user } = useContext(UserContext)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const { addItem } = useContext(CartContext)
  const router = useRouter()

  const features = [
    {
      id: 1,
      icon: Truck,
      text: product.shippingInformation || "Free Shipping",
    },
    {
      id: 2,
      icon: Shield,
      text: product.warrantyInformation || "Secure Payment",
    },
    { id: 3, icon: RotateCcw, text: product.returnPolicy || "Easy Returns" },
    { id: 4, icon: Package, text: "Quality Guaranteed" },
  ]

  const containerRef = useRef(null)
  const categoryRef = useRef(null)
  const titleRef = useRef(null)
  const ratingRef = useRef(null)
  const statusRef = useRef(null)
  const priceRef = useRef(null)
  const descriptionRef = useRef(null)
  const quantityRef = useRef(null)

  useGSAP(
    () => {
      if (!product) return

      const tl = gsap.timeline({
        defaults: { duration: 0.15, ease: "power2.out" },
      })

      const feature = gsap.utils.toArray(".product-feature")

      tl.from(categoryRef.current, { opacity: 0, y: 100 })
        .from(titleRef.current, { opacity: 0, y: 100 })
        .from(ratingRef.current, { opacity: 0, y: 100 })
        .from(statusRef.current, { opacity: 0, y: 100 })
        .from(priceRef.current, { opacity: 0, y: 100 })
        .from(descriptionRef.current, { opacity: 0, y: 100 })
        .from(quantityRef.current, { opacity: 0, y: 100 })
        .from(".product-button", { opacity: 0, y: 100 })
        .from(feature, { opacity: 0, y: 100, stagger: 0.1 })
    },
    { scope: containerRef, dependencies: [product] },
  )

  const handleAddToCart = () => {
    if (!isAuthenticated || !user) {
      return router.push("/login")
    }
    if (!product) return null

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: +discountedPrice.toFixed(2),
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
      })
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className="space-y-6 font-detail" ref={containerRef}>
      <div
        className="flex flex-wrap items-center gap-4 select-none"
        ref={categoryRef}
      >
        <Badge className="px-4 w-max text-primary text-sm" variant="secondary">
          {product.category}
        </Badge>
        <span className="text-muted-foreground text-sm">{product.brand}</span>
        <span className="text-muted-foreground text-sm">
          SKU: {product.sku}
        </span>
      </div>

      <h1 className="font-bold text-4xl tracking-tight" ref={titleRef}>
        {product.title}
      </h1>

      <div className="flex flex-wrap items-center gap-2" ref={ratingRef}>
        <StarReviews rating={product.rating} />
        <span className="font-semibold text-lg">
          {product.rating.toFixed(2)}
        </span>
        <span className="text-muted-foreground text-sm">
          ({product.reviews?.length || 0} Avaliações)
        </span>
      </div>

      {product.availabilityStatus && (
        <div className="flex items-center gap-2" ref={statusRef}>
          <div
            className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}
          />
          <span className="font-medium text-sm select-none">
            {product.availabilityStatus}
          </span>
          <span className="text-muted-foreground text-sm">
            ({product.stock} em estoque)
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-baseline gap-4" ref={priceRef}>
        <span className="font-bold text-primary text-4xl">
          {formatPrice(+discountedPrice.toFixed(2))}
        </span>
        {product.discountPercentage > 0 && (
          <>
            <span className="text-muted-foreground text-2xl line-through">
              {formatPrice(+product.price.toFixed(2))}
            </span>
            <Badge>Economize {Math.round(product.discountPercentage)}%</Badge>
          </>
        )}
      </div>

      <div
        className="bg-card shadow-sm p-6 border border-border rounded-3xl"
        ref={descriptionRef}
      >
        <h3 className="mb-3 font-semibold">Descrição</h3>
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span
                className="bg-muted px-3 py-1 rounded-full text-muted-foreground text-xs select-none"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4" ref={quantityRef}>
        <h3 className="font-primary font-medium">Quantidade:</h3>
        <div className="flex items-center gap-3 select-none">
          <Button
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            size="icon-lg"
            variant="outline"
          >
            -
          </Button>
          <span className="w-12 font-semibold text-lg text-center">
            {quantity}
          </span>
          <Button
            disabled={quantity >= 99}
            onClick={() => setQuantity((q) => Math.min(99, q + 1))}
            size="icon-lg"
            variant="outline"
          >
            +
          </Button>
        </div>
      </div>

      <div className="w-full product-button">
        <Button
          className="w-full"
          disabled={product.stock <= 0 || addedToCart}
          onClick={handleAddToCart}
          size="lg"
        >
          {addedToCart ? (
            <>
              <Check className="w-6 h-6" />
              Adicionado ao Carrinho!
            </>
          ) : (
            <>
              <ShoppingCart className="w-6 h-6" />
              Adicionar ao Carrinho
            </>
          )}
        </Button>
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {features.map((feature) => (
          <div
            className="flex items-center gap-3 bg-card p-4 border border-border rounded-3xl product-feature"
            key={feature.id}
          >
            <feature.icon className="size-5 text-primary" />
            <span className="font-medium text-sm">{feature.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import type { Cart } from "@/@types/cart-types"
import { UserContext } from "@/context/user-context"
import { CartEmpty } from "./cart-empty"
import { CartProductCard } from "./cart-product-card"
import { CartSummary } from "./cart-summary"

interface CartSectionInterface {
  cart: Cart | null
  updateQuantity: (item_id: number, quantity: number) => void
  removeItem: (item_id: number) => void
  clearCart: () => void
}

export function CartSection({
  cart,
  updateQuantity,
  removeItem,
  clearCart,
}: CartSectionInterface) {
  const { isAuthenticated, user } = useContext(UserContext)
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const containerRef = useRef(null)

  const hasAnimated = useRef(false)
  const hasEnteredPage = useRef(false)

  useEffect(() => {
    if (pathname === "/carrinho" && !hasEnteredPage.current) {
      hasAnimated.current = false
      hasEnteredPage.current = true
    }
  }, [pathname])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router, isAuthenticated])

  useGSAP(
    () => {
      if (!isAuthenticated || hasAnimated.current) return
      if (cart?.totalProducts === 0) return

      hasAnimated.current = true

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out", delay: 0.1 },
      })

      const card = gsap.utils.toArray(".card-product-cart")

      tl.from(titleRef.current, { opacity: 0, y: 100 })
        .from(descriptionRef.current, { opacity: 0, y: 100 })
        .from(card, { opacity: 0, y: 100, stagger: 0.1 })
        .from(".summary-cart", { opacity: 0, y: 100 })
    },
    {
      scope: containerRef,
      dependencies: [isAuthenticated, cart?.totalProducts],
    },
  )

  if (!user) return null

  if (cart?.totalProducts === 0 && !checkoutSuccess) {
    return <CartEmpty />
  }
  return (
    <section className="relative space-y-8 py-8" ref={containerRef}>
      <div
        aria-hidden
        className="top-1/7 left-5/7 absolute bg-secondary blur-2xl rounded-full size-70"
      />
      <div
        aria-hidden
        className="top-2/7 left-16 absolute bg-secondary blur-2xl rounded-full size-52"
      />
      <div
        aria-hidden
        className="top-4/7 left-7/9 absolute bg-secondary blur-2xl rounded-full size-70"
      />

      <div className="z-10 space-y-2">
        <h1 className="font-bold text-4xl lg:text-5xl" ref={titleRef}>
          Meu <span className="text-primary">Carrinho</span>
        </h1>
        <p
          className="text-muted-foreground text-sm text-pretty"
          ref={descriptionRef}
        >
          {!checkoutSuccess && (
            <>
              {cart?.totalProducts}{" "}
              {(cart?.totalProducts ?? 0) === 1 ? "item" : "items"} no seu
              carrinho
            </>
          )}
        </p>
      </div>

      <div className="gap-6 sm:gap-8 lg:gap-12 grid grid-cols-3 max-[906px]:grid-cols-1">
        <ul className="z-10 space-y-4 col-span-2 max-[906px]:col-span-1">
          {!checkoutSuccess &&
            cart?.products.map((product) => (
              <CartProductCard
                className="card-product-cart"
                key={product.id}
                product={product}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
              />
            ))}
        </ul>

        <CartSummary
          cart={cart}
          checkoutSuccess={checkoutSuccess}
          clearCart={clearCart}
          setCheckoutSuccess={setCheckoutSuccess}
        />
      </div>
    </section>
  )
}

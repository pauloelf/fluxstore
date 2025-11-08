"use client"

import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/context/cart-context"
import { CartSection } from "./_components/cart-section"

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } =
    useContext(CartContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!cart) return

    setMounted(true)
  }, [cart?.totalProducts])

  if (!mounted || !cart) return null
  return (
    <main className="flex flex-col flex-1 px-4 w-full h-full min-h-[calc(100dvh-72px)] overflow-hidden">
      <div className="mx-auto w-full max-w-7xl h-full">
        <CartSection
          cart={cart}
          clearCart={clearCart}
          removeItem={removeItem}
          updateQuantity={updateQuantity}
        />
      </div>
    </main>
  )
}

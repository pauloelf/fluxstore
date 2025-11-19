"use client"

import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/context/cart-context"
import { UserContext } from "@/context/user-context"
import { CartSection } from "./_components/cart-section"

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } =
    useContext(CartContext)
  const { isAuthenticated } = useContext(UserContext)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!cart) return

    setMounted(true)
  }, [cart?.totalProducts])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router, isAuthenticated])

  return (
    <main className="flex flex-col flex-1 px-4 w-full h-full min-h-[calc(100dvh-72px)] overflow-hidden">
      <div className="mx-auto w-full max-w-7xl h-full">
        {!mounted || !cart ? null : (
          <CartSection
            cart={cart}
            clearCart={clearCart}
            removeItem={removeItem}
            updateQuantity={updateQuantity}
          />
        )}
      </div>
    </main>
  )
}

"use client"

import {
  type ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react"
import type { Cart, CartItem } from "@/@types/cart-types"
import { CartContext } from "@/context/cart-context"
import { UserContext } from "@/context/user-context"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useContext(UserContext)
  const { storedValue, setValue } = useLocalStorage<Cart | null>(
    `cart_${user?.id}`,
    null,
  )
  const [items, setItems] = useState<CartItem[]>([])
  const cart = storedValue

  useLayoutEffect(() => {
    if (!isAuthenticated || !user) return setItems([])

    const raw = localStorage.getItem(`cart_${user?.id}`)
    if (raw) {
      const parsed = JSON.parse(raw)
      setItems(parsed.products)
    }
  }, [isAuthenticated])

  useLayoutEffect(() => {
    if (!isAuthenticated || !user) return setValue(null)

    setValue({
      userId: user.id,
      products: items,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.total, 0),
      totalProducts: items.length,
    })
  }, [isAuthenticated, items])

  const addItem = (newItem: Omit<CartItem, "quantity" | "total">) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id)

      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                total: (item.quantity + 1) * item.discountedPrice,
              }
            : item,
        )
      }

      return [
        ...prev,
        {
          ...newItem,
          quantity: 1,
          total: newItem.discountedPrice,
        },
      ]
    })
  }

  const removeItem = (item_id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== item_id))
  }

  const updateQuantity = (item_id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(item_id)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === item_id
          ? {
              ...item,
              quantity,
              total: quantity * item.discountedPrice,
            }
          : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [cart, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

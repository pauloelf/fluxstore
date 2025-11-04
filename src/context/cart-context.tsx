import { createContext } from "react"
import type { Cart, CartItem } from "@/@types/cart-types"

export type CartContextType = {
  cart: Cart | null
  clearCart: () => void
  updateQuantity: (item_id: number, quantity: number) => void
  addItem: (newItem: Omit<CartItem, "quantity" | "total">) => void
  removeItem: (item_id: number) => void
}

export const DEFAULT_CART_CONTEXT: CartContextType = {
  cart: null,
  clearCart: () => {},
  updateQuantity: () => {},
  addItem: () => {},
  removeItem: () => {},
}

export const CartContext = createContext<CartContextType>(DEFAULT_CART_CONTEXT)

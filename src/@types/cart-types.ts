export type Cart = {
  products: CartItem[]
  total: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  total: number
  discountPercentage: number
  discountedPrice: number
  thumbnail: string
}

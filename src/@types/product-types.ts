export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  sku: string
  weight: string
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  images: string[]
  thumbnail: string
}

type Review = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type ProductSortingOption = "price" | "title" | "rating"

export type ProductSortOrder = "asc" | "desc"

export type ProductParams = {
  sortBy?: ProductSortingOption
  order?: ProductSortOrder
  limit?: number
  skip?: number
}

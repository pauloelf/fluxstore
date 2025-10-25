export type FiltersSortBy = "price" | "rating" | ""

export type FiltersSortOrder = "asc" | "desc" | ""

export type Filters = {
  sortBy?: FiltersSortBy
  order?: FiltersSortOrder
  page?: number
  category?: string
  search?: string
  limit?: number
}

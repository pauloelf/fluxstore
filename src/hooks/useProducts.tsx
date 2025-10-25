import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import type { Filters } from "@/@types/filters-types"
import api from "@/lib/api"

const fetchProducts = async ({
  order,
  page,
  sortBy,
  category,
  search,
  limit,
}: Filters) => {
  const limitValue = limit || 16
  const skip = ((page ?? 1) - 1) * limitValue

  if (search && !category) {
    const response = await api.get("/products/search", {
      params: {
        limit: limitValue,
        skip,
        sortBy,
        order,
        q: search,
      },
    })
    return response.data
  } else if (category) {
    const response = await api.get(`/products/category/${category}`, {
      params: {
        limit: limitValue,
        skip,
        sortBy,
        order,
      },
    })
    return response.data
  }

  const response = await api.get("/products", {
    params: {
      limit: limitValue,
      skip,
      sortBy,
      order,
    },
  })
  return response.data
}

export function useProducts<T>({
  order,
  page,
  sortBy,
  category,
  search,
  limit,
}: Filters): UseQueryResult<
  {
    products: T
    total: number
    skip: number
    limit: number
  },
  Error
> {
  return useQuery({
    queryFn: () =>
      fetchProducts({ order, page, sortBy, category, search, limit }),
    queryKey: ["products", sortBy, order, page, category, search, limit],
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

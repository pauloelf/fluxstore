import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import type { ProductParams } from "@/@types/product-types"
import api from "@/lib/api"

const fetchProducts = async ({ limit, order, skip, sortBy }: ProductParams) => {
  const response = await api.get("/products", {
    params: {
      limit,
      skip,
      sortBy,
      order,
    },
  })
  return response.data
}

export function useProducts<T>({
  limit,
  order,
  skip,
  sortBy,
}: ProductParams): UseQueryResult<
  {
    products: T
  },
  Error
> {
  return useQuery({
    queryFn: () => fetchProducts({ limit, order, skip, sortBy }),
    queryKey: ["products", sortBy, order, limit, skip],
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

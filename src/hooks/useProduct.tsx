import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

const fetchProduct = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export function useProduct<T>(id: string): UseQueryResult<T, Error> {
  return useQuery({
    queryFn: () => fetchProduct(id),
    queryKey: ["product", id],
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

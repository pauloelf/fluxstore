import { useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

const fetchCategories = async () => {
  const response = await api.get("/products/category-list")
  return response.data
}

export function useCategories() {
  return useQuery({
    queryFn: fetchCategories,
    queryKey: ["categories"],
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

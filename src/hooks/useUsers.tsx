import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import api from "@/lib/api"

const fetchUsers = async () => {
  const response = await api.get("/users", {
    params: {
      limit: 3,
    },
  })
  return response.data
}

export function useUsers<T>(): UseQueryResult<{ users: T }, Error> {
  return useQuery({
    queryFn: fetchUsers,
    queryKey: ["users"],
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}

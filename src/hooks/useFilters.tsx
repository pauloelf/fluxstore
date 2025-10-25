import { useContext } from "react"
import { FiltersContext } from "@/context/filters-context"

export function useFilters() {
  const context = useContext(FiltersContext)

  return context
}

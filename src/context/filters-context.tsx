import { createContext } from "react"
import type { Filters } from "@/@types/filters-types"

type FiltersContextType = {
  filters: Filters
  setFilters: (newFilters: Partial<Filters>) => void
}

export const DEFAULT_FILTERS: Filters = {
  page: 1,
  sortBy: "rating",
  order: "desc",
  search: "",
  category: "",
}

const DEFAULT_VALUES: FiltersContextType = {
  filters: DEFAULT_FILTERS,
  setFilters: () => null,
}

export const FiltersContext = createContext<FiltersContextType>(DEFAULT_VALUES)

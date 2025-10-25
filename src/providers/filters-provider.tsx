"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import type {
  Filters,
  FiltersSortBy,
  FiltersSortOrder,
} from "@/@types/filters-types"
import { DEFAULT_FILTERS, FiltersContext } from "@/context/filters-context"

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const { replace } = useRouter()

  function getParam<T>(value: keyof Filters): T {
    return (params.get(value) || DEFAULT_FILTERS[value]) as T
  }

  const initialFilters: Filters = {
    search: !getParam("category") ? getParam("search") : "",
    category: !getParam("search") ? getParam("category") : "",
    page: Number(getParam("page")),
    sortBy: getParam<FiltersSortBy>("sortBy"),
    order: getParam<FiltersSortOrder>("order"),
  }

  const [filters, setInternalFilters] = useState<Filters>(initialFilters)

  const setFilters = (newFilters: Partial<Filters>) => {
    const updated = { ...filters, ...newFilters }
    setInternalFilters(updated)

    Object.entries(newFilters).forEach(([key, v]) => {
      v ? params.set(key, String(v)) : params.delete(key)
    })

    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: explanation
  const value = useMemo(
    () => ({
      filters,
      setFilters,
    }),
    [filters],
  )

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}

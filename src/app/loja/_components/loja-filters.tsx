"use client"

import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import type { Filters } from "@/@types/filters-types"
import { LojaFiltersSkeleton } from "@/components/skeletons/loja-filters-skeleton"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/useCategories"
import { LojaSelectCategories } from "./loja-select-categories"

interface LojaFiltersInterface {
  filters: Filters
  setFilters: (newFilters: Partial<Filters>) => void
}

export function LojaFilters({ filters, setFilters }: LojaFiltersInterface) {
  const { data, isLoading } = useCategories()
  const [search, setSearch] = useState(filters.search)
  const [debouncedSearch] = useDebounce(search, 500)

  useEffect(() => {
    if (!debouncedSearch) {
      setSearch("")
      setFilters({
        ...filters,
        search: "",
      })
      return
    }

    if (filters.category) {
      setFilters({
        ...filters,
        search: debouncedSearch,
        page: 1,
        category: "",
      })
    } else {
      setFilters({
        ...filters,
        search: debouncedSearch,
        page: 1,
      })
    }
  }, [debouncedSearch])

  const handleChangeSortedValue = (value: string) => {
    switch (value) {
      case "rating":
        setFilters({ ...filters, order: "desc", sortBy: "rating" })
        break
      case "price-asc":
        setFilters({ ...filters, order: "asc", sortBy: "price" })
        break
      case "price-desc":
        setFilters({ ...filters, order: "desc", sortBy: "price" })
        break
      default:
        setFilters({ ...filters, order: "desc", sortBy: "rating" })
    }
  }

  if (isLoading) return <LojaFiltersSkeleton />
  return (
    <header className="flex max-md:flex-col justify-between md:items-center gap-6 py-8">
      <InputGroup className="max-w-md">
        <InputGroupInput
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Procurar produtos..."
          value={search}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <div className="flex gap-4">
        <Select
          onValueChange={(value) => handleChangeSortedValue(value)}
          value={
            filters.sortBy === "rating"
              ? "rating"
              : `${filters.sortBy}-${filters.order}`
          }
        >
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Selecione a ordem" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ordenar por</SelectLabel>
              <SelectItem value="rating">Mais Populares</SelectItem>
              <SelectItem value="price-asc">Preço: Menor — Maior</SelectItem>
              <SelectItem value="price-desc">Preço: Maior — Menor</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <LojaSelectCategories
          clearSearch={() => setSearch("")}
          data={data}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </header>
  )
}

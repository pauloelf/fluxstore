"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import type { Filters } from "@/@types/filters-types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LojaSelectCategoriesInterface {
  filters: Filters
  setFilters: (newFilters: Partial<Filters>) => void
  clearSearch: () => void
  data: string[]
}

export function LojaSelectCategories({
  filters,
  setFilters,
  data,
  clearSearch,
}: LojaSelectCategoriesInterface) {
  const params = useSearchParams()
  const [category, setCategory] = useState(params.get("category") || "all")

  useEffect(() => {
    const paramCategory = params.get("category") || "all"
    const isInclude = data.includes(paramCategory)

    if (isInclude) {
      setCategory(paramCategory)
      setFilters({ ...filters, category: paramCategory })
    } else {
      setCategory("all")
      setFilters({ ...filters, category: "" })
    }
  }, [params.get("category")])

  const handleChangeCategoryValue = (value: string) => {
    setCategory(value)

    if (filters.search && filters.search.trim() !== "") {
      clearSearch()
    }
    setFilters({
      ...filters,
      category: value === "all" ? "" : value,
      search: "",
    })
  }

  if (!params) return
  return (
    <Select
      onValueChange={(value) => handleChangeCategoryValue(value)}
      value={category}
    >
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          <SelectItem value="all">Todos</SelectItem>
          {data.map((category: string) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

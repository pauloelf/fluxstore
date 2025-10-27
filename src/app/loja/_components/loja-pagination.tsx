"use client"

import { useEffect, useState } from "react"
import type { Filters } from "@/@types/filters-types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

interface LojaPaginationInterface {
  filters: Filters
  setFilters: (newFilters: Partial<Filters>) => void
  total: number
}

export function LojaPagination({
  total,
  filters,
  setFilters,
}: LojaPaginationInterface) {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    setPages(Array.from({ length: total }).map((_, i) => i + 1))
  }, [total])

  useEffect(() => {
    if (total > 0 && ((filters.page ?? 1) < 1 || (filters.page ?? 1) > total)) {
      setFilters({ ...filters, page: 1 })
      return
    }
  }, [])

  const handleChangePage = (page: number) => {
    window.scrollTo(0, 0)
    if (page <= 1 || page > total) {
      setFilters({ ...filters, page: 1 })
      return
    }
    setFilters({ ...filters, page })
  }

  return (
    <div className="flex gap-2 mt-4 overflow-auto">
      <Pagination>
        <PaginationContent>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === filters.page}
                onClick={() => handleChangePage(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    </div>
  )
}

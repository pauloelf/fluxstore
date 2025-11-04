import type { Metadata } from "next"
import { type ReactNode, Suspense } from "react"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { FiltersProvider } from "@/providers/filters-provider"

export const metadata: Metadata = {
  title: "FluxStore — Produtos",
  description: "Explore nossa lista de produtos da FluxStore.",
}

export default function LojaRoot({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner message="Carregando..." />}>
      <FiltersProvider>{children}</FiltersProvider>
    </Suspense>
  )
}

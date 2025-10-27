import type { Metadata } from "next"
import type { ReactNode } from "react"
import { FiltersProvider } from "@/providers/filters-provider"

export const metadata: Metadata = {
  title: "FluxStore — Produtos",
  description: "Explore nossa lista de produtos da FluxStore.",
}

export default function LojaRoot({ children }: { children: ReactNode }) {
  return <FiltersProvider>{children}</FiltersProvider>
}

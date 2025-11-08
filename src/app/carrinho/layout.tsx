import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FluxStore — Carrinho",
  description: "Acesse seu carrinho de compras.",
}

export default function CartRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

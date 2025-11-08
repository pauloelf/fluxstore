import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FluxStore — Sobre",
  description: "Saiba mais sobre nossa loja.",
}

export default function AboutRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

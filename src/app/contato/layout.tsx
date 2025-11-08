import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FluxStore — Contato",
  description: "Entre em contato conosco.",
}

export default function ContactRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FluxStore — Minha Conta",
  description: "Acesse suas informações de conta, pagamentos e endereços.",
}

export default function AccountRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

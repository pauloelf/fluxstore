import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "FluxStore — Entrar",
  description: "Acesse sua conta FluxStore.",
}

export default function LoginRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

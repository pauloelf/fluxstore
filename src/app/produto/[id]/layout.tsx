import type { ReactNode } from "react"
import { fetchProduct } from "@/lib/api"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params

  try {
    const product = await fetchProduct(id)

    return {
      title: `${product?.title || "Produto"} | FluxStore`,
      description: product?.description || "Veja detalhes do Produto",
    }
  } catch (error) {
    return {
      title: "Produto não encontrado | FluxStore",
      description: "Este produto não existe ou foi removido.",
    }
  }
}

export default function ProdutoRoot({ children }: { children: ReactNode }) {
  return <>{children}</>
}

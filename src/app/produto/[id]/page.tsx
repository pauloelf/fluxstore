"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import type { Product } from "@/@types/product-types"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { useProduct } from "@/hooks/useProduct"
import { ProductSection } from "./_components/product-section"

export default function ProductPage() {
  const { id }: { id: string } = useParams()
  const { data, isLoading } = useProduct<Product>(id)

  return (
    <main className="relative flex flex-col flex-1 px-4 w-full h-full min-h-[calc(100dvh-72px)]">
      <div className="z-5 absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="z-10 mx-auto w-full max-w-7xl h-full">
        <Link
          className="flex items-center gap-2 mt-6 border-transparent border-b hover:border-b-primary focus:border-b-primary w-max text-muted-foreground hover:text-primary focus:text-primary transition-colors duration-300"
          href="/loja"
        >
          <ChevronLeft size={16} /> Voltar para Produtos
        </Link>
        {isLoading ? (
          <LoadingSpinner message="Carregando informações do produto..." />
        ) : !data ? (
          notFound()
        ) : (
          <ProductSection product={data} />
        )}
      </div>
    </main>
  )
}

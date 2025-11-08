import { ArrowRight, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CartEmpty() {
  return (
    <div className="flex flex-col justify-center items-center gap-6 min-h-[70vh]">
      <div className="bg-muted p-8 rounded-full">
        <ShoppingBag className="w-16 h-16 text-muted-foreground" />
      </div>
      <div className="text-center">
        <h2 className="mb-2 font-bold text-2xl">Seu carrinho está vazio</h2>
        <p className="mb-6 text-muted-foreground">
          Adicione alguns produtos para começar
        </p>
        <Link href="/loja" tabIndex={-1}>
          <Button pointer size="lg">
            Explorar Produtos
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

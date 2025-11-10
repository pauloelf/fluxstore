import { Home, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex justify-center items-center bg-background px-4 py-16 min-h-[calc(100dvh-72px)]">
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-primary text-9xl">404</h1>
          <div className="bg-primary mx-auto rounded-full w-24 h-1"></div>
        </div>

        <h2 className="mb-4 font-bold text-3xl md:text-4xl">
          Página Não Encontrada
        </h2>
        <p className="mx-auto mb-8 max-w-md text-muted-foreground text-lg leading-relaxed">
          Desculpe, a página que você está procurando não existe ou foi
          removida.
        </p>

        <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
          <Link href={"/"} tabIndex={-1}>
            <Button pointer size="lg">
              <Home className="mr-2 w-5 h-5" />
              Voltar ao Início
            </Button>
          </Link>
          <Link href={"/loja"} tabIndex={-1}>
            <Button pointer size="lg" variant="outline">
              <Search className="mr-2 w-5 h-5" />
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

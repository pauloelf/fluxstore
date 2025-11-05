import { AlertCircle, Box, ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/@types/product-types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ProductOverview({ product }: { product: Product }) {
  const overview = [
    { title: "Marca", text: product.brand, icon: Box },
    { title: "Categoria", text: product.category, icon: AlertCircle },
    {
      title: "Pedido Mínimo",
      text: `${product.minimumOrderQuantity} ${product.minimumOrderQuantity === 1 ? "Unidade" : "Unidades"}`,
      icon: ShoppingCart,
    },
    { title: "Brand", text: `${product.rating.toFixed(2)} / 5.0`, icon: Star },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral do Produto</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent
        className="*:flex *:items-center gap-4 *:gap-2 grid grid-cols-1 sm:grid-cols-2 text-muted-foreground list-none"
        role="list"
      >
        {overview.map((ov) => (
          <li
            className="bg-background px-4 py-2 border rounded-full *:text-sm"
            key={ov.title}
          >
            <ov.icon className="size-5 text-primary" />
            <div className="overflow-hidden">
              <h4 className="font-medium text-card-foreground">{ov.title}</h4>
              <p className="overflow-hidden">{ov.text}</p>
            </div>
          </li>
        ))}
      </CardContent>
    </Card>
  )
}

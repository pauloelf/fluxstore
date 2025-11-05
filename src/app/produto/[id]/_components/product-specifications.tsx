import {
  type LucideProps,
  RotateCcw,
  Ruler,
  Shield,
  Truck,
  Weight,
} from "lucide-react"
import type { ForwardRefExoticComponent, RefAttributes } from "react"
import type { Product } from "@/@types/product-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Specifications = {
  title: string
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >
  content: {
    text: string
    extra?: string | number
  }[]
}

export function ProductSpecifications({ product }: { product: Product }) {
  const specifications: Specifications[] = [
    {
      title: "Dimensões",
      content: [
        { text: "Largura", extra: product.dimensions.width },
        { text: "Altura", extra: product.dimensions.height },
        { text: "Profundidade", extra: product.dimensions.depth },
      ],
      icon: Ruler,
    },
    { title: "Peso", content: [{ text: product.weight }], icon: Weight },
    {
      title: "Informações de Garantia",
      content: [{ text: product.warrantyInformation }],
      icon: Shield,
    },
    {
      title: "Informações de Envio",
      content: [{ text: product.shippingInformation }],
      icon: Truck,
    },
    {
      title: "Política de Devolução",
      content: [{ text: product.returnPolicy }],
      icon: RotateCcw,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Especificações Técnicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 list-none" role="list">
        {specifications.map((specification, idx) => (
          <li
            className={cn(
              "flex items-start gap-4",
              specifications.length - 1 !== idx && "pb-4 border-b",
            )}
            key={specification.title}
          >
            <specification.icon className="size-5 text-primary" />
            <div className="w-full">
              <h4 className="font-medium">{specification.title}</h4>
              <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 w-full">
                {specification.content.map((cnt) => (
                  <div key={cnt.text}>
                    <p className="text-muted-foreground text-sm">{cnt.text}</p>
                    <p className="font-medium">{cnt.extra}</p>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </CardContent>
    </Card>
  )
}

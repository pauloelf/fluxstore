"use client"

import { Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { CartItem } from "@/@types/cart-types"
import { Button } from "@/components/ui/button"
import { cn, formatPrice } from "@/lib/utils"

interface CartProductCardInterface {
  product: CartItem
  updateQuantity: (item_id: number, quantity: number) => void
  removeItem: (item_id: number) => void
  className?: string
}

export function CartProductCard({
  product,
  removeItem,
  updateQuantity,
  className,
}: CartProductCardInterface) {
  return (
    <li
      aria-label={`Produto ${product.title}`}
      className={cn(
        "group max-sm:relative flex max-sm:flex-col max-sm:items-center gap-4 bg-card p-4 border hover:border-primary focus:border-primary rounded-3xl max-sm:text-center transition-colors duration-300",
        className,
      )}
      tabIndex={0}
    >
      <div className="relative *:justify-self-center bg-muted rounded-3xl w-max overflow-hidden product-image">
        <Image
          alt={product.title}
          height={100}
          priority
          src={product.thumbnail}
          width={100}
        />
      </div>

      <div className="flex flex-col flex-1 justify-between max-sm:space-y-4">
        <div>
          <Link
            className="hover:border-primary focus:border-primary hover:border-b focus:border-b font-medium hover:text-primary focus:text-primary group-focus:text-primary group-hover:text-primary leading-tight transition-colors duration-300"
            href={`/produto/${product.id}`}
          >
            {product.title}
          </Link>
          <p className="mt-1 text-muted-foreground text-sm">
            {formatPrice(+product.discountedPrice)} p/ unidade
          </p>
        </div>

        <div className="flex max-sm:flex-col justify-between items-center max-sm:space-y-2 w-full">
          <div className="flex items-center gap-1 select-none">
            <Button
              aria-label="Diminuir quantidade"
              disabled={product.quantity <= 1}
              onClick={() =>
                updateQuantity(product.id, Math.max(1, product.quantity - 1))
              }
              size="icon-sm"
              variant="outline"
            >
              -
            </Button>
            <span className="w-8 font-semibold text-center">
              {product.quantity}
            </span>
            <Button
              aria-label="Aumentar quantidade"
              disabled={product.quantity >= 99}
              onClick={() =>
                updateQuantity(product.id, Math.min(99, product.quantity + 1))
              }
              size="icon-sm"
              variant="outline"
            >
              +
            </Button>
          </div>

          <div className="flex max-sm:justify-center items-center gap-4">
            <p className="font-bold text-primary text-lg">
              {formatPrice(product.total)}
            </p>
            <Button
              aria-label="Remover produto"
              className="top-4 right-2 max-sm:absolute hover:bg-destructive! focus-visible:border-destructive focus-visible:ring-destructive/50 hover:text-destructive-foreground focus-visible:text-destructive"
              onClick={() => removeItem(product.id)}
              size="icon-sm"
              variant="ghost"
            >
              <Trash className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

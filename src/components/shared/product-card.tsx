import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/@types/product-types"
import { cn, formatPrice } from "@/lib/utils"

export function ProductCard({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Link
      aria-label={`Ver detalhes do produto ${product.title}`}
      className={cn(
        "group z-10 flex flex-col items-center bg-card hover:shadow-2xl hover:shadow-primary/10 focus:shadow-2xl focus:shadow-primary/10 border-2 hover:border-primary focus:border-primary rounded-3xl overflow-hidden transition-[box-shadow,border] duration-300",
        className,
      )}
      href={`/produto/${product.id}`}
      key={product.id}
    >
      <div className="relative bg-muted rounded-t-3xl w-full overflow-hidden">
        <Image
          alt={`Imagem do produto ${product.title}` || "Imagem do produto"}
          className="w-full h-full object-cover group-focus:scale-110 group-hover:scale-110 transition-transform duration-500"
          height={400}
          src={product.thumbnail || ""}
          width={400}
        />
        {product.discountPercentage > 0 && (
          <p
            aria-label={`${Math.round(product.discountPercentage)}% de desconto`}
            className="top-3 right-3 absolute bg-primary px-3 py-1 rounded-full font-detail font-bold text-primary-foreground text-xs"
            role="status"
          >
            -{Math.round(product.discountPercentage)}%
          </p>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-focus:opacity-100 group-hover:opacity-100 transition-opacity" />
      </div>

      <article
        aria-labelledby={`product-title-${product.id}`}
        className="flex flex-col flex-1 p-4 w-full"
      >
        <header className="mb-2">
          <h3
            className="font-semibold text-sm line-clamp-2 leading-tight"
            id={`product-title-${product.id}`}
          >
            {product.title}
          </h3>
        </header>

        <div className="flex items-center gap-1 mb-auto font-secondary">
          <Star
            aria-hidden="true"
            className="fill-primary w-4 h-4 text-primary"
            focusable={false}
          />
          <span
            aria-label={`${product.rating.toFixed(1)} de avaliação`}
            className="font-medium text-sm"
            id={`product-rating-${product.id}`}
            role="status"
          >
            {product.rating.toFixed(1)}
          </span>
          <span
            aria-label={`${product.stock} em estoque`}
            className="text-muted-foreground text-xs"
            id={`product-stock-${product.id}`}
            role="status"
          >
            ({product.stock} em estoque)
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div
            aria-atomic="true"
            aria-live="polite"
            className="flex items-baseline gap-2 font-detail"
          >
            <span
              aria-label={`Preço ${formatPrice(discountedPrice)}`}
              className="font-bold text-primary text-xl"
              id={`product-price-${product.id}`}
            >
              {formatPrice(discountedPrice)}
            </span>
            {product.discountPercentage > 0 && (
              <span
                aria-label={`Preço original ${formatPrice(product.price)}`}
                className="text-muted-foreground text-sm line-through"
              >
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

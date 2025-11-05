import type { Product } from "@/@types/product-types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatDate } from "@/lib/utils"
import { StarReviews } from "./star-reviews"

export function ProductReviews({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader className="flex max-sm:flex-col justify-between sm:items-center gap-2">
        <CardTitle>Avaliações de Clientes</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <StarReviews rating={product.rating} size={16} />
          <span className="font-semibold text-sm">
            {product.rating.toFixed(2)} / 5.0
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 list-none" role="list">
        {product.reviews.map((review, idx) => (
          <li
            className={cn(
              "space-y-4",
              product.reviews.length - 1 !== idx && "pb-4 border-b",
            )}
            key={review.reviewerEmail}
          >
            <div className="flex max-sm:flex-col justify-between items-start gap-2 text-sm">
              <div>
                <h4 className="font-medium">{review.reviewerName}</h4>
                <span className="text-muted-foreground">
                  {review.reviewerEmail}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <StarReviews rating={review.rating} size={16} />
                <span>{formatDate(review.date)}</span>
              </div>
            </div>
            <p className="font-detail text-muted-foreground text-base">
              {review.comment}
            </p>
          </li>
        ))}
      </CardContent>
    </Card>
  )
}

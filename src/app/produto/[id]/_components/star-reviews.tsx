import { Star, StarHalf } from "lucide-react"

export function StarReviews({
  rating,
  size = 20,
}: {
  rating: number
  size?: number
}) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, idx) => {
        if (rating > idx && rating < idx + 1) {
          return (
            <StarHalf
              className="fill-primary text-primary"
              key={idx}
              size={size}
            />
          )
        } else if (rating > idx) {
          return (
            <Star className="fill-primary text-primary" key={idx} size={size} />
          )
        }
        return null
      })}
    </div>
  )
}

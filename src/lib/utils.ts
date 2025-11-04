import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatGenre = (genre: string) => {
  switch (genre) {
    case "male":
      return "Masculino"
    case "female":
      return "Feminino"
    default:
      return "Outro"
  }
}

export const formatPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export const getTotalPages = (total: number) => {
  const totalPages = Math.ceil(total / 16)
  return { total: totalPages }
}

export const formatDate = (
  value: Date | string | number,
  includeTime = false,
): string => {
  const date =
    typeof value === "string" || typeof value === "number"
      ? new Date(value)
      : value
  if (Number.isNaN(date.getTime())) return ""

  const options: Intl.DateTimeFormatOptions = includeTime
    ? {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : { day: "2-digit", month: "2-digit", year: "numeric" }

  return date.toLocaleDateString("pt-BR", options)
}

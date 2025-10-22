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

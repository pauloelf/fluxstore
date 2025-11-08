import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import type { Cart } from "@/@types/cart-types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, formatPrice } from "@/lib/utils"

interface CartSummaryInterface {
  cart: Cart | null
  clearCart: () => void
  checkoutSuccess: boolean
  setCheckoutSuccess: Dispatch<SetStateAction<boolean>>
}

export function CartSummary({
  cart,
  clearCart,
  checkoutSuccess,
  setCheckoutSuccess,
}: CartSummaryInterface) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!isCheckingOut) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCheckingOut(false)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isCheckingOut])

  useEffect(() => {
    if (progress === 100) {
      setCheckoutSuccess(true)
      clearCart()

      const timeout = setTimeout(() => {
        setCheckoutSuccess(false)
        router.push("/")
      }, 3000)

      return () => clearTimeout(timeout)
    }
  }, [progress])

  const handleFinalizePurchase = () => {
    setIsCheckingOut(true)
    setProgress(0)
  }

  if (!cart) return null
  return (
    <aside className="z-10 summary-cart">
      <Card className={cn(checkoutSuccess && "border-0! p-0!")}>
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="font-secondary">
          <dl className="space-y-4">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">{formatPrice(cart.total)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground text-sm">Frete</dt>
              <dd className="font-medium text-sm">Grátis</dd>
            </div>

            <div className="flex justify-between">
              <dt className="text-muted-foreground text-sm">Taxa</dt>
              <dd className="font-medium text-sm">
                {formatPrice(cart.total * 0.1)}
              </dd>
            </div>
          </dl>
        </CardContent>
        <CardFooter className="flex-col space-y-4 mx-4 px-0 border-t">
          <div className="flex justify-between w-full">
            <span className="font-semibold text-base">Total</span>
            <span className="font-semibold text-base">
              {formatPrice(cart.total * 1.1)}
            </span>
          </div>
          <div className="space-y-2 w-full">
            <Button
              aria-label="Finalizar compra"
              className="w-full"
              disabled={isCheckingOut}
              onClick={handleFinalizePurchase}
              size="lg"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Finalizando compra
                </>
              ) : (
                <>
                  Finalizar compra
                  <ChevronRight className="size-5" />
                </>
              )}
            </Button>

            {isCheckingOut && (
              <div className="bg-muted mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <p className="font-detail text-muted-foreground text-xs text-center">
              Secure checkout powered by FluxStore
            </p>
          </div>
        </CardFooter>

        {checkoutSuccess && (
          <div className="z-50 absolute flex flex-col justify-center items-center bg-card shadow-xl p-8 border border-primary rounded-3xl overflow-hidden text-center">
            <div className="flex justify-center items-center bg-primary/20 mx-auto mb-6 rounded-full w-20 h-20">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>

            <h2 className="mb-3 font-bold text-3xl">Pedido bem Sucedida!</h2>

            <p className="mb-6 font-detail text-muted-foreground">
              Obrigado por sua compra! Seu pedido foi confirmado e será enviado
              para entrega.
            </p>

            <div className="font-detail font-bold text-primary text-sm">
              Redirecionando para o início...
            </div>
          </div>
        )}
      </Card>
    </aside>
  )
}

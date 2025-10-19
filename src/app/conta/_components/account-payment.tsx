import { CreditCard } from "lucide-react"
import type { User } from "@/@types/user-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountPayment({ user }: { user: User | null }) {
  if (!user) return null
  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading">Métodos de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          {user.bank ? (
            <div className="bg-background px-4 py-2 border rounded-3xl">
              <div className="flex max-sm:flex-col items-center gap-2 text-muted-foreground max-sm:text-center">
                <div className="bg-secondary p-4 rounded-full">
                  <CreditCard />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    {user.bank.cardType} terminado em{" "}
                    {user.bank.cardNumber.slice(
                      user.bank.cardNumber.length - 4,
                    )}
                  </p>
                  <span className="text-sm">
                    Expira em {user.bank.cardExpire}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Nenhum método de pagamento salvo.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

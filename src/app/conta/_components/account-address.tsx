import { MapPin } from "lucide-react"
import type { User } from "@/@types/user-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccountAddress({ user }: { user: User | null }) {
  if (!user) return null
  return (
    <div className="py-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading">Endereços Salvos</CardTitle>
        </CardHeader>
        <CardContent>
          {user.address ? (
            <div className="bg-background px-4 py-2 border rounded-3xl">
              <p className="font-medium">Casa</p>
              <div className="flex items-start gap-2 pt-4 text-muted-foreground">
                <MapPin size={18} />
                <div className="grid text-sm">
                  <span>{user.address.address}</span>
                  <span>
                    {user.address.city}, {user.address.state}{" "}
                    {user.address.postalCode}
                  </span>
                  <span>{user.address.country}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum endereço salvo.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

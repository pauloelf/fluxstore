import { Mail, Phone, User2 } from "lucide-react"
import type { User } from "@/@types/user-types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatGenre } from "@/lib/utils"

export function AccountProfile({ user }: { user: User | null }) {
  if (!user) return null
  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 py-6">
      <Card>
        <CardHeader>
          <CardTitle role="heading">Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent
          className="*:flex *:items-center *:gap-2 space-y-4 text-muted-foreground list-none"
          role="list"
        >
          <li className="flex items-center gap-2">
            <User2 size={18} />
            <div className="overflow-hidden">
              <span className="text-sm">Nome Completo</span>
              <p className="overflow-hidden font-medium text-card-foreground text-ellipsis">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Mail size={18} />
            <div className="overflow-hidden">
              <span className="text-sm">Email</span>
              <p className="overflow-hidden font-medium text-card-foreground text-ellipsis">
                {user.email}
              </p>
            </div>
          </li>
          <li className="flex items-center gap-2">
            <Phone size={18} />
            <div className="overflow-hidden">
              <span className="text-sm">Telefone</span>
              <p className="font-medium text-card-foreground">{user.phone}</p>
            </div>
          </li>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle role="heading">Detalhes da Conta</CardTitle>
        </CardHeader>
        <CardContent
          className="space-y-4 text-muted-foreground list-none"
          role="list"
        >
          <li>
            <span className="text-sm">Username</span>
            <p className="font-medium text-card-foreground">@{user.username}</p>
          </li>
          <li>
            <span className="text-sm">User ID</span>
            <p className="font-medium text-card-foreground">#{user.id}</p>
          </li>
          <li>
            <span className="text-sm">Gênero</span>
            <p className="font-medium text-card-foreground">
              {formatGenre(user.gender)}
            </p>
          </li>
        </CardContent>
      </Card>
    </div>
  )
}

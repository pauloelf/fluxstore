import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BusinessHours() {
  return (
    <Card className="contact-hours">
      <CardHeader>
        <CardTitle>Horário Comercial</CardTitle>
      </CardHeader>
      <CardContent className="font-secondary">
        <dl className="space-y-4 text-muted-foreground text-xs sm:text-sm">
          <div className="flex justify-between">
            <dt>Seg - Sex</dt>
            <dd className="font-medium">9:00 AM - 6:00 PM</dd>
          </div>

          <div className="flex justify-between">
            <dt>Sáb</dt>
            <dd className="font-medium">10:00 AM - 4:00 PM</dd>
          </div>

          <div className="flex justify-between">
            <dt>Dom</dt>
            <dd className="font-medium">Fechado</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

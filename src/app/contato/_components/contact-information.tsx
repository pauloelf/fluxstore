import { Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContactInformation() {
  const features = [
    { icon: Mail, title: "Email", description: "support@fluxstore.com" },
    {
      icon: Phone,
      title: "Telefone",
      description: "+1 (555) 123-4567",
    },
    {
      icon: MapPin,
      title: "Endereço",
      description: "123 Tech Street, San Francisco, CA 94102",
    },
  ]

  return (
    <Card className="contact-information">
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {features.map((feature) => (
          <div className="flex items-center gap-2 feature" key={feature.title}>
            <div className="bg-secondary p-3 rounded-full">
              <feature.icon className="text-primary" />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-medium text-sm">{feature.title}</h3>
              <p className="font-secondary text-muted-foreground text-sm text-ellipsis line-clamp-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

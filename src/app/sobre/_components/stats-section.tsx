import { Award, Target, TrendingUp, Users } from "lucide-react"

export function StatsSection() {
  const stats = [
    { label: "Produtos", value: "10,000+", icon: Target },
    { label: "Clientes", value: "50,000+", icon: Users },
    { label: "Prêmios", value: "25+", icon: Award },
    { label: "Crescimento", value: "300%", icon: TrendingUp },
  ]

  return (
    <section className="bg-card py-16 border-border border-y about-stats">
      <div className="mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="gap-8 grid grid-cols-2 max-[360px]:grid-cols-1 md:grid-cols-4">
          {stats.map((stat) => (
            <div className="text-center" key={stat.label}>
              <div className="flex justify-center items-center bg-primary/10 mx-auto mb-4 rounded-full w-16 h-16">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="font-bold text-primary text-3xl">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

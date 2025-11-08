export function ValuesSection() {
  const values = [
    {
      title: "Inovação em Primeiro Lugar",
      description:
        "Buscamos constantemente tecnologia de ponta para trazer a você os produtos mais recentes e inovadores.",
    },
    {
      title: "Focado no Cliente",
      description:
        "Sua satisfação é nossa prioridade. Estamos aqui para oferecer um serviço excepcional em todas as etapas do processo.",
    },
    {
      title: "Qualidade Garantida",
      description:
        "Cada produto é cuidadosamente selecionado e testado para atender aos nossos elevados padrões de excelência.",
    },
    {
      title: "Futuro Sustentável",
      description:
        "Estamos comprometidos com práticas ambientalmente responsáveis ​​e operações comerciais sustentáveis.",
    },
  ]

  return (
    <section className="bg-muted/30 py-20 about-values">
      <div className="mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-4xl tracking-tight">
            Nossos Valores
          </h2>
          <p className="text-muted-foreground">
            Os princípios que norteiam tudo o que fazemos
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
          {values.map((value) => (
            <div
              className="bg-card p-8 border border-border rounded-2xl"
              key={value.title}
            >
              <h3 className="mb-3 font-medium text-lg">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useGSAP } from "@gsap/react"
import Autoplay from "embla-carousel-autoplay"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const slides = [
  {
    id: 1,
    title: "Produtos Premium",
    subtitle: "Eleve Seu Estilo de Vida",
    description:
      "Explore nossa coleção selecionada de produtos de alta qualidade projetados para uma vida moderna",
    cta: "Coleção da Loja",
    ctaLink: "/loja",
    image: "/hero-slide-1.jpg",
  },
  {
    id: 2,
    title: "Frete Rápido e Grátis",
    subtitle: "Entregue na Sua Porta",
    description:
      "Aproveite a entrega expressa gratuita em todos os pedidos acima de R$ 100 no mundo todo",
    cta: "Saiba Mais",
    ctaLink: "/sobre",
    image: "/hero-slide-2.jpg",
  },
  {
    id: 3,
    title: "Ofertas Exclusivas",
    subtitle: "Economize até 50% de Desconto",
    description:
      "Tenha acesso a descontos exclusivos e ofertas por tempo limitado em suas marcas favoritas",
    cta: "Ver Ofertas",
    ctaLink: "/loja",
    image: "/hero-slide-3.jpg",
  },
  {
    id: 4,
    title: "Experiência de Compra Segura",
    subtitle: "Compre com Confiança",
    description:
      "Pagamento 100% seguro com múltiplas opções de pagamento e garantia de proteção ao comprador",
    cta: "Comece a Comprar",
    ctaLink: "/loja",
    image: "/hero-slide-4.jpg",
  },
]

export function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 3000 }))
  const carouselRef = useRef(null)
  const carouselContentRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      tl.from(carouselRef.current, { opacity: 0, scale: 0.95 }).from(
        carouselContentRef.current,
        { opacity: 0, x: -100 },
      )
    },
    { scope: containerRef },
  )

  return (
    <section className="w-full" ref={containerRef}>
      <Carousel
        className="w-full"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
        opts={{ loop: true }}
        plugins={[plugin.current]}
        ref={carouselRef}
      >
        <CarouselContent
          className="rounded-3xl w-full"
          ref={carouselContentRef}
        >
          {slides.map((slide, i) => {
            return (
              <CarouselItem
                className="relative rounded-2xl w-full h-full min-h-[500px] overflow-hidden"
                key={slide.id}
              >
                <div className="absolute inset-0 w-full">
                  <Image
                    alt={slide.title}
                    className="w-full h-full object-cover scale-110"
                    fill
                    priority={i === 0}
                    src={slide.image || ""}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
                </div>

                <div className="z-10 relative flex flex-col justify-center space-y-6 mx-auto p-12 max-w-7xl h-full text-white select-none">
                  <Badge className="bg-[#d1ebeb] text-black">
                    {slide.subtitle}
                  </Badge>
                  <h1 className="max-w-2xl font-bold text-[#70dbd1] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-tight tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="max-w-2xl font-detail text-lg md:text-xl text-pretty leading-relaxed">
                    {slide.description}
                  </p>
                  <Link
                    className="w-max"
                    href={slide.ctaLink || "#"}
                    tabIndex={-1}
                  >
                    <Button className="bg-[#007779] text-white" size="lg">
                      {slide.cta}
                      <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious size="icon-lg" />
        <CarouselNext size="icon-lg" />
      </Carousel>
    </section>
  )
}

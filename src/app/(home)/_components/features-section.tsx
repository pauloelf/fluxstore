"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Shield, TrendingUp, Truck } from "lucide-react"
import { useRef } from "react"

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected transactions",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    description: "Competitive market rates",
  },
]

export function FeatureSection() {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })

      const features = gsap.utils.toArray(".feature")

      tl.from(features, { opacity: 0, y: 100, stagger: 0.2, delay: 0.2 })
    },
    { scope: containerRef },
  )

  return (
    <section className="bg-gradient-to-b from-card to-accent/10 py-12 border-y">
      <div
        className="flex flex-wrap justify-evenly items-center gap-8 mx-auto px-4 max-w-7xl"
        ref={containerRef}
      >
        {features.map((feature) => (
          <div className="flex items-center gap-1 feature" key={feature.title}>
            <div className="bg-secondary p-3 rounded-full">
              <feature.icon className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{feature.title}</h3>
              <p className="font-secondary text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

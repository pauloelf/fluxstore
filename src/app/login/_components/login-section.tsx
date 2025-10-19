"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CircleAlert, Loader2, User2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import type { User } from "@/@types/user-types"
import { ErrorMessage } from "@/components/shared/error-message"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { useUsers } from "@/hooks/useUsers"

export function LoginSection({
  isAuthenticated,
  login,
}: {
  isAuthenticated: boolean
  login: (user: User) => void
}) {
  const { data, isLoading, error } = useUsers<User[]>()
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const router = useRouter()

  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const alertRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  useGSAP(
    () => {
      if (isLoading || isAuthenticated) return

      const tl = gsap.timeline({
        defaults: { duration: 0.3, ease: "power2.out" },
      })
      const cards = gsap.utils.toArray(".card")

      tl.from(titleRef.current, { opacity: 0, y: 100 })
        .from(descriptionRef.current, { opacity: 0, y: 100 }, ">")
        .from(alertRef.current, { opacity: 0, y: 100 }, ">")
        .from(cards, { opacity: 0, y: 100, stagger: 0.1 }, ">")
    },
    { scope: containerRef, dependencies: [isLoading] },
  )

  const loginAndRedirect = (user: User) => {
    setSelectedUser(user.id)
    setTimeout(() => {
      login(user)
      router.push("/")
    }, 800)
  }

  if (isAuthenticated)
    return (
      <main className="relative flex flex-col flex-1 px-4 py-12 overflow-hidden">
        <LoadingSpinner message="Carregando..." />
      </main>
    )
  return (
    <main
      className="relative flex flex-col flex-1 px-4 py-12 overflow-hidden"
      suppressHydrationWarning
    >
      <div className="z-5 absolute inset-0 bg-[size:4rem_4rem] opacity-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]" />

      <div
        aria-hidden
        className="top-1/7 left-6/7 absolute bg-secondary blur-2xl rounded-full size-70"
      />
      <div
        aria-hidden
        className="top-2/5 left-12 absolute bg-secondary blur-2xl rounded-full size-52"
      />
      <div
        aria-hidden
        className="top-5/7 left-5/9 absolute bg-secondary blur-2xl rounded-full size-70"
      />

      <section
        className="z-10 space-y-12 mx-auto w-full max-w-5xl"
        ref={containerRef}
      >
        <div className="space-y-4">
          <h1
            className="font-bold text-4xl lg:text-5xl text-center"
            ref={titleRef}
          >
            Bem-Vindo a <span className="text-primary">FluxStore</span>
          </h1>
          <p
            className="font-secondary text-muted-foreground text-center"
            ref={descriptionRef}
          >
            Selecione seu perfil para continuar comprando
          </p>
        </div>

        <div
          className="flex justify-self-center items-center gap-2 bg-secondary/20 shadow-sm p-2 px-4 border rounded-full text-muted-foreground"
          ref={alertRef}
        >
          <CircleAlert className="text-primary/80" />
          <p className="text-xs md:text-sm">
            Contas de demonstração apenas para fins de teste!
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner message="Carregando usuários..." />
        ) : (
          <ul className="flex flex-wrap justify-center gap-6 w-full *:min-w-3xs">
            {data?.users.map((user) => (
              <Card
                className="group relative hover:bg-secondary/30 focus:bg-secondary/30 shadow-xl hover:shadow-accent/10 focus:shadow-accent/10 hover:border-ring focus-visible:border-ring focus:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 hover:scale-110! focus:scale-110! transition-[color,box-shadow,scale] duration-300 cursor-pointer card"
                key={user.id}
                onClick={() => loginAndRedirect(user)}
                onKeyDown={({ key }) =>
                  key === "Enter" && loginAndRedirect(user)
                }
                role="listitem"
                tabIndex={0}
              >
                <CardContent className="flex flex-col items-center space-y-6 text-center">
                  <div className="flex justify-center items-center group-focus:shadow-2xl group-focus:shadow-foreground/15 group-hover:shadow-2xl group-hover:shadow-foreground/15 border-2 border-accent rounded-full size-24 overflow-hidden">
                    {user.image ? (
                      <Image
                        alt={user.firstName}
                        height={96}
                        src={user.image}
                        width={96}
                      />
                    ) : (
                      <User2 className="size-20 text-muted" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <h2 className="font-secondary font-semibold text-xl">
                      {user.firstName} {user.lastName}
                    </h2>
                    <p className="font-secondary text-muted-foreground text-sm">
                      @{user.username}
                    </p>
                  </div>
                </CardContent>

                {selectedUser === user.id && (
                  <div className="absolute inset-0 flex justify-center items-center bg-secondary/80 backdrop-blur-sm rounded-3xl">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                )}
              </Card>
            ))}
          </ul>
        )}

        {error && <ErrorMessage message="Erro ao carregar usuários." />}
      </section>
    </main>
  )
}

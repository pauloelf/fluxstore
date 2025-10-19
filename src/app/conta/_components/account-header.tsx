"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { LogOut, User2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { UserContext } from "@/context/user-context"

export function AccountHeader() {
  const { user, logout, isAuthenticated } = useContext(UserContext)
  const router = useRouter()
  const headerRef = useRef(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [router, isAuthenticated])

  useGSAP(() => {
    if (!isAuthenticated) return

    gsap.from(headerRef.current, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.out",
    })
  }, [])

  const logoutAndRedirect = () => {
    setTimeout(() => {
      logout()
      router.push("/login")
    }, 300)
  }

  if (!isAuthenticated) return null
  return (
    <header className="py-4" ref={headerRef}>
      <div className="flex max-sm:flex-col justify-between items-center gap-4 p-4">
        <div className="flex max-sm:flex-col items-center gap-4 max-sm:text-center">
          <div className="flex justify-center items-center border-2 border-accent rounded-full size-20 overflow-hidden">
            {user?.image ? (
              <Image
                alt={user?.firstName || "User Image"}
                height={100}
                src={user?.image}
                width={100}
              />
            ) : (
              <User2 className="size-20 text-muted" />
            )}
          </div>
          <div>
            <h1 className="font-bold text-3xl">
              {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-muted-foreground">@{user?.username}</p>
          </div>
        </div>
        <Button
          onClick={logoutAndRedirect}
          pointer
          size="lg"
          variant="destructive"
        >
          <LogOut /> Sair
        </Button>
      </div>
    </header>
  )
}

"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { CreditCard, MapPin, User2 } from "lucide-react"
import { useContext, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserContext } from "@/context/user-context"
import { AccountAddress } from "./account-address"
import { AccountPayment } from "./account-payment"
import { AccountProfile } from "./account-profile"

export function AccountTabs() {
  const { user, isAuthenticated } = useContext(UserContext)
  const tabsListRef = useRef(null)
  const tabsContentRef = useRef(null)
  const dividerRef = useRef(null)

  useGSAP(() => {
    if (!isAuthenticated) return

    const tl = gsap.timeline({
      defaults: { ease: "power2.out", duration: 0.3 },
    })

    tl.from(tabsListRef.current, {
      opacity: 0,
      y: 100,
      delay: 0.5,
    })
      .from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.3,
      })
      .from(tabsContentRef.current, {
        opacity: 0,
        y: 100,
      })
  }, [])

  if (!user) return null
  return (
    <Tabs className="px-4 w-full" defaultValue="profile">
      <TabsList ref={tabsListRef}>
        <TabsTrigger value="profile">
          <User2 />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="payment">
          <CreditCard /> Pagamento
        </TabsTrigger>
        <TabsTrigger value="address">
          <MapPin /> Endereço
        </TabsTrigger>
      </TabsList>

      <div className="bg-muted rounded-full w-full h-0.5" ref={dividerRef} />

      <div ref={tabsContentRef}>
        <TabsContent asChild value="profile">
          <AccountProfile user={user} />
        </TabsContent>
        <TabsContent asChild value="payment">
          <AccountPayment user={user} />
        </TabsContent>
        <TabsContent asChild value="address">
          <AccountAddress user={user} />
        </TabsContent>
      </div>
    </Tabs>
  )
}

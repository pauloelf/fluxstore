"use client"

import { useEffect, useState } from "react"
import { AccountHeader } from "./_components/account-header"
import { AccountTabs } from "./_components/account-tabs"

export default function AccountPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <main className="flex flex-col flex-1 bg-gradient-to-br from-secondary/10 via-background/80 to-secondary w-full min-h-[calc(100dvh-72px)]">
      <div className="mx-auto w-full max-w-7xl">
        <AccountHeader />
        <AccountTabs />
      </div>
    </main>
  )
}

"use client"

import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context"
import { LoginSection } from "./_components/login-section"

export default function LoginPage() {
  const { isAuthenticated, login } = useContext(UserContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <LoginSection isAuthenticated={isAuthenticated} login={login} />
}

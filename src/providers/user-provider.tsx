"use client"

import { type ReactNode, useCallback, useMemo } from "react"
import type { User } from "@/@types/user-types"
import { UserContext } from "@/context/user-context"
import { useLocalStorage } from "@/hooks/useLocalStorage"

export function UserProvider({ children }: { children: ReactNode }) {
  const { storedValue, setValue } = useLocalStorage<User | null>("user", null)

  const user = storedValue

  const login = useCallback(
    (userData: User) => {
      setValue(userData)
    },
    [setValue],
  )

  const logout = useCallback(() => {
    setValue(null)
  }, [setValue])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

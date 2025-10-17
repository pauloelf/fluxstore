import { createContext } from "react"
import type { User } from "@/@types/user-types"

export type UserContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const DEFAULT_USER_CONTEXT: UserContextType = {
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
}

export const UserContext = createContext<UserContextType>(DEFAULT_USER_CONTEXT)

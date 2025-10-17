"use client"

import { Menu, ShoppingCart, User2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/user-context"
import { LogoDesktop, LogoMobile, LogoTablet } from "../shared/logo"
import { Tooltip } from "../shared/tooltip"
import { HeaderSkeleton } from "../skeletons/header-skeleton"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

const shopCategories = [
  { name: "Beleza", href: "/loja/beauty" },
  { name: "Fragrâncias", href: "/loja/fragrances" },
  { name: "Mantimentos", href: "/loja/groceries" },
  { name: "Smartphones", href: "/loja/smartphones" },
  { name: "Decoração de Casa", href: "/loja/home-decoration" },
  { name: "Acessórios de Desporto", href: "/loja/sports-accessories" },
]

export function Header() {
  const { isAuthenticated, user } = useContext(UserContext)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <HeaderSkeleton />
  return (
    <header className="py-4">
      <div className="flex md:*:flex-1 items-center gap-4 mx-auto px-4 max-w-7xl">
        <NavigationMenu className="max-md:hidden" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className={`${navigationMenuTriggerStyle()}`} href="/">
                  Início
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Loja</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="px-4 pt-2 font-primary font-semibold text-sm leading-none text-accent-foreground">
                  Categorias
                </div>
                <ul className="gap-3 grid p-4">
                  <NavigationMenuLink asChild>
                    <Link
                      className="px-4 pt-2 w-full whitespace-nowrap"
                      href="/loja"
                    >
                      Geral
                    </Link>
                  </NavigationMenuLink>
                  {shopCategories.map((category) => (
                    <li key={category.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          className="px-4 w-full whitespace-nowrap"
                          href={category.href}
                        >
                          {category.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className={navigationMenuTriggerStyle()} href="/sobre">
                  Sobre
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className={navigationMenuTriggerStyle()} href="/contato">
                  Contato
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <nav className="md:hidden">
          <DropdownMenu modal>
            <Tooltip content="Menu">
              <DropdownMenuTrigger asChild>
                <Button size="icon-lg" variant="ghost">
                  <Menu className="size-6" />
                </Button>
              </DropdownMenuTrigger>
            </Tooltip>

            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>
                <LogoMobile />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup className="space-y-1">
                <DropdownMenuItem asChild>
                  <Link href="/">Início</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/loja">Loja</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/sobre">Sobre</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link className="w-full" href="/contato">
                    Contato
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <LogoDesktop />
        <LogoTablet />

        <div className="flex flex-1 justify-end items-center gap-4">
          <Tooltip content="Alterar Tema" side="bottom">
            <AnimatedThemeToggler />
          </Tooltip>

          {isAuthenticated && user ? (
            <>
              <Tooltip content="Carrinho" side="bottom">
                <Link href="/carrinho" tabIndex={-1}>
                  <Button
                    aria-label="Carrinho"
                    pointer
                    size="icon-lg"
                    variant="ghost"
                  >
                    <ShoppingCart className="size-6" />
                  </Button>
                </Link>
              </Tooltip>

              <Tooltip content="Conta" side="bottom">
                <Link
                  aria-label="Conta"
                  className="inline-block border focus-visible:border-ring rounded-full outline-none focus-visible:outline-1 hover:ring-[3px] hover:ring-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 overflow-hidden transition-all duration-300"
                  href="/conta"
                >
                  <Image
                    alt={user.firstName}
                    height={32}
                    src={user.image}
                    width={32}
                  />
                </Link>
              </Tooltip>
            </>
          ) : (
            <Link href="/login" tabIndex={-1}>
              <Button pointer>
                <User2 />
                Entrar
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

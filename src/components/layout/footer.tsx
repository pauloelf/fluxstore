import { Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"
import { LogoDesktop } from "../shared/logo"

export function Footer() {
  return (
    <footer className="bg-card border-border border-t">
      <div className="mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="gap-8 grid grid-cols-1 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex justify-start *:flex!">
              <LogoDesktop />
            </div>
            <p className="text-muted-foreground text-sm">
              Seu destino para tecnologia de ponta e produtos para um estilo de
              vida moderno.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Loja</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="/loja"
                >
                  Geral
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="/loja?category=smartphones"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="/loja?category=laptops"
                >
                  Laptops
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="/sobre"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="/contato"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-primary focus:text-primary transition-colors duration-300"
                  href="#"
                >
                  Termos & Condições
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Siga-nos</h4>
            <div className="flex gap-4">
              <Link
                className="bg-muted hover:bg-primary p-2 border focus-visible:border-primary rounded-full hover:text-primary-foreground focus-visible:text-primary transition-colors"
                href="#"
              >
                <Instagram className="size-5" />
              </Link>
              <Link
                className="bg-muted hover:bg-primary p-2 border focus-visible:border-primary rounded-full hover:text-primary-foreground focus-visible:text-primary transition-colors"
                href="#"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                className="bg-muted hover:bg-primary p-2 border focus-visible:border-primary rounded-full hover:text-primary-foreground focus-visible:text-primary transition-colors"
                href="#"
              >
                <Facebook className="size-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-border border-t text-muted-foreground text-center">
          <p>
            &copy;
            <span className="font-primary">
              {" "}
              {new Date().getFullYear()} FluxStore
            </span>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

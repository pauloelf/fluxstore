import type { Metadata } from "next"
import { Anton, Inter, Open_Sans, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
})

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "FluxStore — Loja de Produtos Variados",
  description:
    "Explore uma loja virtual com experiência visual única. Produtos dinâmicos, animações modernas e categorias variadas como moda, tecnologia, beleza e decoração. Dados reais da API DummyJSON.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${inter.variable} ${anton.variable} ${openSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

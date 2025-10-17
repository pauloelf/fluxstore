export function LogoDesktop() {
  return (
    <div className="hidden lg:flex justify-center items-center font-accent font-bold text-4xl select-none">
      <span className="text-primary">Flux</span>Store
    </div>
  )
}

export function LogoTablet() {
  return (
    <div className="hidden lg:hidden md:flex justify-center items-center font-accent font-bold text-4xl select-none">
      <span className="text-primary">F</span>S
    </div>
  )
}

export function LogoMobile() {
  return (
    <div className="md:hidden flex items-center font-accent font-bold text-4xl select-none">
      <span className="text-primary">F</span>S
    </div>
  )
}

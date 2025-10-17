export function HeaderSkeleton() {
  return (
    <header className="py-4">
      <div className="flex items-center gap-4 mx-auto px-4 max-w-7xl animate-pulse">
        <div className="hidden md:flex flex-1 items-center gap-3">
          <div className="bg-muted rounded-full w-20 h-5" />
          <div className="bg-muted rounded-full w-20 h-5" />
          <div className="bg-muted rounded-full w-20 h-5" />
        </div>

        <div className="flex flex-1 justify-center">
          <div className="bg-muted rounded-full w-36 h-8" />
        </div>

        <div className="flex flex-1 justify-end items-center gap-4">
          <div className="bg-muted rounded-full w-8 h-8" />
          <div className="hidden sm:block bg-muted rounded-full w-20 h-8" />
        </div>
      </div>
    </header>
  )
}

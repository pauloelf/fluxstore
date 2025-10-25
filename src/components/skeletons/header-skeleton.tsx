import { Skeleton } from "../ui/skeleton"

export function HeaderSkeleton() {
  return (
    <header className="py-4">
      <div className="flex items-center gap-4 mx-auto px-4 max-w-7xl">
        <div className="hidden md:flex flex-1 items-center gap-3">
          <Skeleton className="rounded-full w-20 h-5" />
          <Skeleton className="rounded-full w-20 h-5" />
          <Skeleton className="rounded-full w-20 h-5" />
        </div>

        <div className="flex flex-1 justify-center">
          <Skeleton className="rounded-full w-36 h-8" />
        </div>

        <div className="flex flex-1 justify-end items-center gap-4">
          <Skeleton className="rounded-full w-8 h-8" />
          <Skeleton className="hidden sm:block rounded-full w-20 h-8" />
        </div>
      </div>
    </header>
  )
}

import { Skeleton } from "../ui/skeleton"

export function LojaFiltersSkeleton() {
  return (
    <header className="flex max-md:flex-col justify-between items-center gap-6 py-8">
      <Skeleton className="rounded-full w-md h-10" />
      <div className="flex gap-4">
        <Skeleton className="rounded-full w-28 h-8" />
        <Skeleton className="rounded-full w-18 h-8" />
      </div>
    </header>
  )
}

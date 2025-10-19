import { Loader2 } from "lucide-react"

export function LoadingSpinner({ message }: { message: string }) {
  return (
    <div
      aria-live="polite"
      className="flex justify-center items-center gap-2 bg-secondary/10 mx-auto p-2 px-4 border rounded-full w-max"
      role="status"
    >
      <Loader2 className="w-5 h-5 text-primary animate-spin" />
      <span className="text-muted-foreground text-sm">{message}</span>
    </div>
  )
}

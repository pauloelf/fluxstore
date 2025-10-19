import { CircleAlert } from "lucide-react"

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 bg-destructive/10 mx-auto p-2 px-4 border border-destructive rounded-full w-max text-destructive">
      <CircleAlert className="w-5 h-5" />
      <span>{message}</span>
    </div>
  )
}

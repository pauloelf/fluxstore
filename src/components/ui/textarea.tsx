import type * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex bg-input disabled:opacity-50 shadow-xs px-4 py-2 border border-border aria-invalid:border-destructive focus-visible:border-ring rounded-3xl outline-none aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:aria-invalid:ring-destructive/40 w-full min-h-24 placeholder:text-muted-foreground md:text-sm text-base transition-[color,box-shadow] field-sizing-content disabled:cursor-not-allowed",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  )
}

export { Textarea }

"use client"

import type { ReactNode } from "react"
import * as T from "../ui/tooltip"

export function Tooltip({
  children,
  content,
  side = "top",
  ...props
}: {
  children: ReactNode
  content: string
  side?: "top" | "right" | "bottom" | "left"
}) {
  return (
    <T.Tooltip delayDuration={100}>
      <T.TooltipTrigger asChild {...props}>
        <div>{children}</div>
      </T.TooltipTrigger>
      <T.TooltipContent side={side}>
        <p>{content}</p>
      </T.TooltipContent>
    </T.Tooltip>
  )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext()

const Popover = ({ children, ...props }) => {
  const [open, setOpen] = React.useState(false)
  
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div {...props}>{children}</div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const { setOpen } = React.useContext(PopoverContext)
  
  if (asChild) {
    return React.cloneElement(children, {
      ref,
      className: cn("", className),
      onClick: () => setOpen(prev => !prev),
      ...props
    })
  }
  
  return (
    <div
      ref={ref}
      className={cn("", className)}
      onClick={() => setOpen(prev => !prev)}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
  const { open, setOpen } = React.useContext(PopoverContext)
  
  if (!open) return null
  
  return (
    <div
      ref={ref}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

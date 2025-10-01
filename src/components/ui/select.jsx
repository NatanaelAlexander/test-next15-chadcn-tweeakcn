"use client"

import * as React from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext()

const Select = ({ children, value, onValueChange, ...props }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value)
  
  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }
  
  return (
    <SelectContext.Provider value={{ 
      open, 
      setOpen, 
      selectedValue, 
      handleValueChange 
    }}>
      <div className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
  const { open, setOpen, selectedValue } = React.useContext(SelectContext)
  
  if (asChild) {
    return React.cloneElement(children, {
      ref,
      className: cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      ),
      onClick: () => setOpen(!open),
      ...props
    })
  }
  
  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => {
  const { open, setOpen } = React.useContext(SelectContext)
  
  if (!open) return null
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      {...props}
    >
      <div className="p-1">
        {children}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectValue = ({ placeholder }) => {
  const { selectedValue } = React.useContext(SelectContext)
  return <span>{selectedValue || placeholder}</span>
}

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { handleValueChange, selectedValue } = React.useContext(SelectContext)
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        selectedValue === value && "bg-accent text-accent-foreground",
        className
      )}
      onClick={() => handleValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selectedValue === value && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

export {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}

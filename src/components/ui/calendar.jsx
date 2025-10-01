"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Calendar = ({ className, selected, onSelect, ...props }) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)
  
  const handleDateClick = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onSelect?.(date)
  }
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={goToPreviousMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          onClick={goToNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center p-2">
            {day}
          </div>
        ))}
        
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="p-2" />
        ))}
        
        {days.map((day) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isSelected = selected && 
            date.getDate() === selected.getDate() &&
            date.getMonth() === selected.getMonth() &&
            date.getFullYear() === selected.getFullYear()
          
          return (
            <button
              key={day}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
              )}
              onClick={() => handleDateClick(day)}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }

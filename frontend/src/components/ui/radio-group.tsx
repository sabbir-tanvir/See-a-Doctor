"use client"

import * as React from "react"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

// Simple RadioGroup component that doesn't require radix-ui
const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div ref={ref} className={cn("grid gap-2", className)} {...props} />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> & {
    value: string
  }
>(({ className, id, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext)
  const checked = context.value === value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && context.onValueChange) {
      context.onValueChange(value)
    }
  }

  return (
    <div className="relative">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="peer absolute opacity-0 w-0 h-0"
        ref={ref}
        {...props}
      />
      <label 
        htmlFor={id}
        className={cn(
          "aspect-square h-4 w-4 rounded-full border border-primary",
          "flex items-center justify-center",
          "ring-offset-background focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {checked && (
          <Circle className="h-2.5 w-2.5 fill-primary text-primary" />
        )}
      </label>
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

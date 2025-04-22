"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

// Simple checkbox component that doesn't require radix-ui
const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { onCheckedChange?: (checked: boolean) => void }
>(({ className, onCheckedChange, checked, ...props }, ref) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onCheckedChange) {
      onCheckedChange(event.target.checked)
    }
  }

  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "peer-checked:bg-primary peer-checked:text-primary-foreground",
          className
        )}
      >
        {checked && (
          <div className="flex h-full w-full items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };

// AlertMessage.tsx
import React, { useEffect, useState } from "react"
import { Alert } from "@material-tailwind/react"
import type { variant } from "@material-tailwind/react/types/components/alert"

interface AlertMessageProps {
  children: React.ReactNode
  variant: variant
  className: string
  timeout: number
  onClose?: () => void
}

export const AlertMessage: React.FC<AlertMessageProps> = ({ children, variant, className, timeout, onClose }) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false)
      if (onClose) onClose()
    }, timeout)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Alert open={open} variant={variant} className={className}>{children}</Alert>
  )
}
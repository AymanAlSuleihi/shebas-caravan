/// <reference types="vite/client" />

import * as React from "react"

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    placeholder?: string
    onPointerEnterCapture?: React.PointerEventHandler<T>
    onPointerLeaveCapture?: React.PointerEventHandler<T>
    crossOrigin?: string
  }
}

import {} from "@material-tailwind/react"

type EventCapture = {
  onPointerEnterCapture?: unknown
  onPointerLeaveCapture?: unknown
}

declare module "@material-tailwind/react" {
  export interface ButtonProps extends EventCapture {
    placeholder?: unknown
  }
  export interface InputProps extends EventCapture {
    crossOrigin?: unknown
  }
  export interface SelectProps extends EventCapture {
    placeholder?: unknown
  }
  export interface SpinnerProps extends EventCapture {
    placeholder?: unknown
  }
}
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

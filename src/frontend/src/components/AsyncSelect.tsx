import { uniqueId } from "lodash"
import React, { useEffect, useState } from "react"
import { Select, SelectProps } from "@material-tailwind/react"

const AsyncSelect = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const [key, setKey] = useState("")

  useEffect(() => setKey(uniqueId()), [props])

  return <Select key={key} ref={ref} {...props} />
})

AsyncSelect.displayName = "AsyncSelect"

export default AsyncSelect
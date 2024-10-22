import { useEffect, useState } from "react"

export const useLocalStorage = <T>(key:string,initialValue: T | (() => T)) =>{
  const [value,setValue] = useState<T>(() =>{
    const jsonValue = localStorage.getItem(key)
    if (jsonValue !== null) {
      return JSON.parse(jsonValue)
    }

    if (typeof initialValue === "function"){
      return (initialValue as () => T)()
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
    window.dispatchEvent(new Event("storage"))
  }, [key, value])

  useEffect(() => {
    const listenStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(() => {
          const jsonValue = localStorage.getItem(key)
          if (jsonValue !== null) {
            return JSON.parse(jsonValue)
          }

          localStorage.setItem(key, JSON.stringify(initialValue))
          window.dispatchEvent(new Event("storage"))
          return initialValue
        })
      }
    }
    window.addEventListener("storage", listenStorageChange)
    return () => window.removeEventListener("storage", listenStorageChange)
  }, [])

  return [value, setValue] as [ typeof value, typeof setValue ]
}

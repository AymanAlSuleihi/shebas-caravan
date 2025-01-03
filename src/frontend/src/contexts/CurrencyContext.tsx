import React, { createContext, useState, useContext, useEffect } from "react"
import { CurrencyOut, CurrencyService } from "../client"

interface CurrencyContextType {
  selectedCurrency: CurrencyOut | undefined
  setSelectedCurrency: (currency: CurrencyOut) => void
  rates: CurrencyOut[]
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const useCurrencyContext = () =>{
  return useContext(CurrencyContext)
}

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOut>({
    id: 1,
    timestamp: "",
    base_code: "GBP",
    target_code: "GBP",
    symbol: "£",
    rate: 1,
  })
  const [rates, setRates] = useState<CurrencyOut[]>([{
    id: 1,
    timestamp: "",
    base_code: "GBP",
    target_code: "GBP",
    symbol: "£",
    rate: 1,
  }])

  useEffect(() => {
    CurrencyService.currencyReadCurrencies({
      limit: 1000,
      sortField: "target_code",
      sortOrder: "ASC",
      filters: '{"stripe_supported":true}',
    }).then((response) => setRates(response.currencies))
  }, [])

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  )
}
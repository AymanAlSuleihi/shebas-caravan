import { Option } from "@material-tailwind/react"
import { useCurrencyContext } from "../context/CurrencyContext"
import AsyncSelect from "./AsyncSelect"

export const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency, rates } = useCurrencyContext()!

  return (
    <AsyncSelect
      value={selectedCurrency?.target_code}
      onChange={(value) => {
        const currency = rates.find(c => c.target_code === value)
        if (currency) setSelectedCurrency(currency)
      }}
      className={"border-none bg-transparent text-gray-900 rounded"}
      containerProps={{ className: "w-[85px] min-w-[85px] max-w-[85px] p-0" }}
      menuProps={{ className: "p-1"}}
      labelProps={{ 
        className: "hidden",
      }}
      variant="outlined"
    >
      {rates.map((rate) => (
        <Option key={rate.target_code} value={rate.target_code}>
          {rate.target_code}
        </Option>
      ))}
    </AsyncSelect>
  )
}
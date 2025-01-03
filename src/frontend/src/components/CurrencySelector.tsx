import { Option } from "@material-tailwind/react"
import { useCurrencyContext } from "../contexts/CurrencyContext"
import AsyncSelect from "./AsyncSelect"
import { useDarkMode } from "../contexts/DarkModeContext"

export const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency, rates } = useCurrencyContext()!
  const { isDarkMode } = useDarkMode()

  return (
    <AsyncSelect
      value={selectedCurrency?.target_code}
      onChange={(value) => {
        const currency = rates.find(c => c.target_code === value)
        if (currency) setSelectedCurrency(currency)
      }}
      className={`border-none bg-transparent ${isDarkMode ? "text-gray-200" : "text-gray-800"} rounded font-semibold`}
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
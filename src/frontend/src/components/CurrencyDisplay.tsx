import { useEffect, useState } from "react"
import { useCurrencyContext } from "../contexts/CurrencyContext"
import { Tooltip } from "@material-tailwind/react"
import { CurrencyOut, CurrencyService } from "../client"

interface CurrencyDisplayProps {
  baseAmount: number
  overrideConvertedAmount?: number
  overrideSelectedCurrency?: CurrencyOut
}

export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  baseAmount,
  overrideConvertedAmount,
  overrideSelectedCurrency,
}) => {
  const { selectedCurrency } = useCurrencyContext()!
  const currency = overrideSelectedCurrency || selectedCurrency
  const [convertedAmount, setConvertedAmount] = useState<string>(
    baseAmount.toLocaleString(
      "en-GB",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )
  )

  useEffect(() => {
    if (overrideConvertedAmount) {
      setConvertedAmount(overrideConvertedAmount.toLocaleString(
        "en-GB",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      ))
      return
    }

    CurrencyService.currencyConvertCurrency({
      amount: baseAmount,
      baseCode: "GBP",
      targetCode: selectedCurrency?.target_code || "GBP"
    }).then((response) => {
      const convertedAmountString = response.toLocaleString(
        "en-GB",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )
      setConvertedAmount(convertedAmountString)
    })
  }, [baseAmount, selectedCurrency, overrideConvertedAmount])

  return (
    <Tooltip
      placement="top"
      content={
        `${baseAmount.toFixed(2)} ${ currency?.base_code}
        ≈
        ${convertedAmount} ${currency?.target_code}`
      }
      className={
        currency?.base_code === currency?.target_code ?
        `hidden`: `block`
      }
    >
      <span className="whitespace-nowrap">{currency?.symbol} {convertedAmount}</span>
    </Tooltip>
  )
}
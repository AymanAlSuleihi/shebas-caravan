import React, { useState, useEffect } from 'react'
import { Button, List, ListItem, Radio } from '@material-tailwind/react'
import { ShippingRatesService } from '../client/services/ShippingRatesService'
import { ShippingRateOut, ShippingRateOutOpen } from '../client'
import { CurrencyDisplay } from './CurrencyDisplay'
import { useDarkMode } from '../contexts/DarkModeContext'

interface FinalShippingProps {
  productIds: number[]
  countryId: number
  onRateSelect: (rate: ShippingRateOut | ShippingRateOutOpen) => void
  onComplete: () => void
}

const FinalShipping: React.FC<FinalShippingProps> = ({ productIds, countryId, onRateSelect, onComplete }) => {
  const [shippingRates, setShippingRates] = useState<ShippingRateOut[] | ShippingRateOutOpen[]>([])
  const [selectedRate, setSelectedRate] = useState<number | undefined>(undefined)
  const { isDarkMode } = useDarkMode()

  const handleRateChange = (value: string) => {
    const rateId = parseInt(value)
    setSelectedRate(rateId)
    onRateSelect(shippingRates.find(rate => rate.id === rateId)!)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onComplete()
  }

  useEffect(() => {
    if (countryId !== undefined) {
      ShippingRatesService.shippingRatesPackItems({
        "countryId": countryId,
        "requestBody": productIds,
      }).then(response => setShippingRates(response))
    }
    else {
      setShippingRates([])
    }
  }, [countryId, productIds])

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      {countryId && shippingRates.length > 0 ? (
          <List className="m-0 p-0">
            {[...shippingRates]
              .sort((a, b) => a.price - b.price)
              .map((rate) => (
              <ListItem key={rate.id} className={`p-0 rounded ${isDarkMode ? "hover:bg-gray-800" : ""}`}>
                <label htmlFor={`rate-${rate.id}`} className={`flex w-full cursor-pointer items-center px-3 py-1 space-x-4 ${isDarkMode ? "text-gray-200 hover:bg-gray-800" : "text-gray-900"}`}>
                  <Radio
                    name="shipping-rate"
                    id={`rate-${rate.id}`}
                    value={rate.id.toString()}
                    onChange={(e) => handleRateChange(e.target.value)}
                    checked={selectedRate === rate.id}
                    className={`hover:before:opacity-0`}
                    containerProps={{
                      className: "p-0",
                    }}
                    color="blue-gray"
                    ripple={false}
                  />
                  <div className="flex w-full justify-between">
                    <div>
                      <div className="font-semibold">
                        {rate.service_name}
                      </div>
                      <div className="text-sm">
                        {rate.delivery_time}
                      </div>
                    </div>
                    <div className="font-semibold">
                      <CurrencyDisplay baseAmount={rate.price} />
                    </div>
                  </div>
                </label>
              </ListItem>
            ))}
          </List>
      ) : (
        <div className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
          {countryId && (
            <div>No shipping rates available for the selected country.</div>
          )}
        </div>
      )}
    <div>
      <button id="submit">
        <Button
          variant="outlined"
          ripple={false}
          className={`rounded border-gray-500 mt-5 ${isDarkMode ? "text-gray-200 border-gray-700" : "text-gray-900 border-gray-500"}`}
          >Continue</Button>
      </button>
    </div>
    </form>
  )
}

export default FinalShipping

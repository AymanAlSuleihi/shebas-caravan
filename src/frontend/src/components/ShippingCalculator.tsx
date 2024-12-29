import React, { useState, useEffect } from 'react'
import { ShippingRatesService } from '../client/services/ShippingRatesService'
import { ShippingCountriesService } from '../client/services/ShippingCountriesService'
import { ShippingCountryOut, ShippingRateOut, ShippingRateOutOpen } from '../client'

interface ShippingCalculatorProps {
  productId: number
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ productId }) => {
  const [countryId, setCountryId] = useState<number | undefined>()
  const [shippingRates, setShippingRates] = useState<ShippingRateOut[] | ShippingRateOutOpen[]>([])
  const [countries, setCountries] = useState<ShippingCountryOut[]>([])

  useEffect(() => {
    ShippingCountriesService.shippingCountriesReadShippingCountries({limit: 1000})
      .then(response => {
        const sortedCountries = response.shipping_countries.sort((a, b) => {
          if (a.name === "United Kingdom") return -1
          if (b.name === "United Kingdom") return 1
          return a.name.localeCompare(b.name)
        })
        setCountries(sortedCountries)
      })
  }, [])

  useEffect(() => {
    if (countryId !== undefined) {
      ShippingRatesService.shippingRatesReadShippingRatesForProduct({ productId, countryId })
        .then(response => setShippingRates(response))
    }
    else {
      setShippingRates([])
    }
  }, [countryId, productId])

  return (
    <div>
      {/* <h3 className="font-semibold text-lg">Calculate Shipping</h3> */}
      <select
        value={countryId}
        onChange={(e) => setCountryId(Number(e.target.value) || undefined)}
        className="border rounded p-2 w-full"
      >
        <option value={undefined}>Select Country</option>
        {countries.map(country => (
          <option key={country.id} value={country.id}>{country.name}</option>
        ))}
      </select>
      <div className="mt-4">
        {countryId && shippingRates.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Service</th>
                <th className="border p-2">Estimated Delivery</th>
                <th className="border p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {shippingRates.map(rate => (
                <tr key={rate.id}>
                  <td className="border p-2">{rate.package_size_name} {rate.service_name}</td>
                  <td className="border p-2">{rate.delivery_time}</td>
                  <td className="border p-2">£{rate.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            {countryId && (
              <p>No shipping rates available for the selected country.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ShippingCalculator

import React, { useState, useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ShippingCountriesService, ShippingCountryOut } from "../client"
import { Button, Input, Option } from "@material-tailwind/react"
import AsyncSelect from "./AsyncSelect"
import { useDarkMode } from "../contexts/DarkModeContext"

export type OrderFormData = {
  first_name: string
  last_name: string
  address_1: string
  address_2: string
  country: string
  postal_code: string
  city: string
  county: string
  tel: string
}

interface OrderFormProps {
  onComplete: (data: OrderFormData) => void
  countryId: (id: number | undefined) => void
}

const OrderForm: React.FC<OrderFormProps> = ({ onComplete, countryId }) => {
  const { control, register, handleSubmit } = useForm<OrderFormData>()
  const [countries, setCountries] = useState<ShippingCountryOut[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>()
  const { isDarkMode } = useDarkMode()

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
    if (selectedCountry) {
      const country = countries.find(country => country.name === selectedCountry)
      console.log("Selected country", country)
      countryId(country?.id)
    }
  }, [selectedCountry])

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    console.log("Submit order form")
    console.log(data)
    onComplete(data)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap place-content-between gap-2 mb-2">
        <div className="flex-1">
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>First Name</span>
          <Input
            {...register('first_name')}
            type="text"
            className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Last Name</span>
          <Input
            {...register('last_name')}
            type="text"
            className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
      </div>
      <div className="mb-2">
        <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Address 1</span>
        <Input
          {...register('address_1')}
          type="text"
          className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
          required
        />
      </div>
      <div className="mb-2">
        <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Address 2</span>
        <Input
          {...register('address_2')}
          type="text"
          className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
        />
      </div>
      <div className="mb-2">
        <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Country</span>
        <Controller
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <AsyncSelect
                {...field}
                className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-900 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                  error ? 'border-red-500' : ""
                }`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[80px]" }}
                menuProps={{ className: `h-56 ${isDarkMode && "bg-gray-900 text-gray-200"}` }}
                onChange={(e) => {
                  setSelectedCountry(e)
                  field.onChange(e)
                }}
              >
                {countries.map(country => (
                  <Option key={country.id} value={country.name}>{country.name}</Option>
                ))}
              </AsyncSelect>
              {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
            </>
          )}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <div className="flex-1">
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Postal Code</span>
          <Input
            {...register('postal_code')}
            type="text"
            className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>City</span>
          <Input
            {...register('city')}
            type="text"
            className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>County</span>
          <Input
            {...register('county')}
            type="text"
            className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
          />
        </div>
      </div>
      <div className="mb-2">
        <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Phone Number</span>
        <Input
          {...register('tel')}
          type="tel"
          className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
          pattern="[0-9+]*"
          required
        />
      </div>
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

export default OrderForm
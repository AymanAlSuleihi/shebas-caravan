import React, { useState, useEffect, useRef, FormEvent } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { CustomerUpdate, OrderCreate } from "../client"
import { useCustomersStore } from "../store/customers-store"
import { useOrdersStore } from "../store/orders-store"
import { Button, Input, Option, Select } from "@material-tailwind/react"
import InputWithDropdown from "./PhoneNumberInput"



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
}

const OrderForm: React.FC<OrderFormProps> = ({ onComplete }) => {
  const { control, register, handleSubmit, reset } = useForm<OrderFormData>()

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    console.log("Submit order form")
    console.log(data)
    onComplete(data)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap place-content-between gap-2 mb-2">
        <div className="flex-1">
          First Name
          <Input
            {...register('first_name')}
            type="text"
            // id="firstName"
            // name="firstName"
            className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          Last Name
          <Input
            {...register('last_name')}
            type="text"
            // id="lastName"
            // name="lastName"
            className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
      </div>
      <div className="mb-2">
        Address 1
        <Input
          {...register('address_1')}
          type="text"
          // id="address1"
          // name="address1"
          className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
          required
        />
      </div>
      <div className="mb-2">
        Address 2
        <Input
          {...register('address_2')}
          type="text"
          // id="address2"
          // name="address2"
          className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
        />
      </div>
      <div className="mb-2">
        Country
        <Controller
          control={control}
          name="country"
          rules={{ required: "Country is required" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                {...field}
                className={`!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                  error ? 'border-red-500' : ""
                }`}
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[80px]" }}
              >
                <Option value="United Kingdom">United Kingdom</Option>
              </Select>
              {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
            </>
          )}
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        <div className="flex-1">
          Postal Code
          <Input
            {...register('postal_code')}
            type="text"
            // id="postalCode"
            // name="postalCode"
            className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          City
          <Input
            {...register('city')}
            type="text"
            // id="city"
            // name="city"
            className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
            required
          />
        </div>
        <div className="flex-1">
          County
          <Input
            {...register('county')}
            type="text"
            // id="county"
            // name="county"
            className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[80px]" }}
          />
        </div>
      </div>
      <div className="mb-2">
        Phone Number
        {/* <InputWithDropdown /> */}
        <Input
          {...register('tel')}
          type="tel"
          // id="tel"
          // name="tel"
          className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
            className="rounded border-gray-500 mt-5"
            >Continue</Button>
        </button>
      </div>
    </form>
  )
}

export default OrderForm
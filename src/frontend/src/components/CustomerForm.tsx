import React, { useState, useEffect, useRef, FormEvent } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { CustomerCreate } from "../client"
import { useCustomersStore } from "../store/customers-store"
import { Button, Input } from "@material-tailwind/react"


interface CustomerFormProps {
  onComplete: (email: string) => void
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm<CustomerCreate>()
  const { addCustomer } = useCustomersStore()

  const onSubmit: SubmitHandler<CustomerCreate> = async (data) => {
    console.log(data)
    // setIsLoading(true)
    // try {
    //   await addCustomer(data)
    // } catch(err: any) {
    //   console.log(err)
    //   if (err.status && err.status === 409) {
    //     console.log(err.body)
    //     onComplete(data.email)
    //   } else{
    //     console.error("Error occurred", err)
    //   }
    // }
    // console.log("customerForm Complete", data.email)
    onComplete(data.email)
    // setIsLoading(false)
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div>
        Email
        <Input
          {...register('email')}
          type="email"
          // id="email"
          // name="email"
          className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
          required
        />
      </div>
      {/* <Button
        variant="outlined"
        ripple={false}
        className="rounded border-gray-500 mt-5"
        onClick={() => handleOpen(2)}
        >Continue</Button> */}
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

export default CustomerForm
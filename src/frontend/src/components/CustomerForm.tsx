import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { CustomerCreate } from "../client"
import { Button, Input } from "@material-tailwind/react"
import { useDarkMode } from "../contexts/DarkModeContext"

interface CustomerFormProps {
  onComplete: (email: string) => void
}

const CustomerForm: React.FC<CustomerFormProps> = ({ onComplete }) => {
  const { register, handleSubmit, reset } = useForm<CustomerCreate>()
  const { isDarkMode } = useDarkMode()

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
      <div className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
        Email
        <Input
          {...register('email')}
          type="email"
          className={`!border ${isDarkMode ? "!border-gray-700 bg-gray-800 text-gray-200" : "!border-gray-300 bg-white text-gray-900"} rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10`}
          labelProps={{
            className: "hidden",
          }}
          containerProps={{ className: "min-w-[80px]" }}
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

export default CustomerForm
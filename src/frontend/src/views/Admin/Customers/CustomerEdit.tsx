import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react"
import { useForm } from "react-hook-form"
import { CustomerOut, CustomerUpdate, CustomersService } from "../../../client"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"


const CustomerEdit: React.FC = () => {
  const { control, register, handleSubmit, reset } = useForm<CustomerUpdate>()
  const { customerId = "" } = useParams<string>()
  const [customer, setCustomer] = useState<CustomerOut>()

  useEffect(() => {
    CustomersService.customersReadCustomerById({
      customerId: parseInt(customerId),
    }).then((response) => setCustomer(response))
  }, [])

  const onSubmit = async (data: CustomerUpdate) => {
    console.log(data)
    await CustomersService.customersUpdateCustomer({
      customerId: parseInt(customerId),
      requestBody: data,
    })
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Edit Customer
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="red" size="sm">
                    Discard
                  </Button>
                  <button id="submit">
                    <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="black" size="sm">
                      Save
                    </Button>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-2">
                Email
                <Input
                  {...register('email')}
                  type="email"
                  defaultValue={customer?.email}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                First Name
                <Input
                  {...register('first_name')}
                  type="text"
                  defaultValue={customer?.first_name}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Last Name
                <Input
                  {...register('last_name')}
                  type="text"
                  defaultValue={customer?.last_name}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default CustomerEdit
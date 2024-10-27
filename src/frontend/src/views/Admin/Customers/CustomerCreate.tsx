import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import { useForm } from "@refinedev/react-hook-form"
import { HttpError, BaseKey } from "@refinedev/core"
import { CustomerCreate as CustomerCreateSchema } from "../../../client"

const CustomerCreate: React.FC = () => {
  const navigate = useNavigate()

  const {
    refineCore: { onFinish, formLoading, redirect },
    register,
    handleSubmit,
    reset,
  } = useForm<CustomerCreateSchema, HttpError>({
    refineCoreProps: {
      resource: "customers",
      redirect: false,
    }
  })

  const save = (customer: CustomerCreateSchema) => {
    onFinish(customer).then(() => {
      navigate("/admin/customers")
      console.log("nav")
    })
  }

  const saveAndContinue = (customer: CustomerCreateSchema) => {
      onFinish(customer).then(({ data }) => {
        navigate("/admin/edit", data.id)
      })
  }

  const saveAndAddAnother = (customer: CustomerCreateSchema) => {
      onFinish(customer).then(() => {
        reset()
      })
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <form onSubmit={handleSubmit(save)}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <Typography variant="h5" color="blue-gray">
                  New Customer
                </Typography>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button
                    className="flex items-center gap-3 shadow-none hover:shadow-md"
                    color="red"
                    size="sm"
                    onClick={navigate(-1)}
                  >
                    Discard
                  </Button>
                  <Button
                    className="flex items-center gap-3 shadow-none hover:shadow-md"
                    color="black"
                    size="sm"
                    type="submit"
                    // disabled={isSubmitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-2">
                Email
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                />
              </div>
              <div className="mb-2">
                First Name
                <Input
                  {...register("first_name", { required: true })}
                  type="text"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                />
              </div>
              <div className="mb-2">
                Last Name
                <Input
                  {...register("last_name", { required: true })}
                  type="text"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                />
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default CustomerCreate
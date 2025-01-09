import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react"
import { useForm } from "@refinedev/react-hook-form"
import { CustomersService, CustomerUpdate } from "../../../client"
import { useParams, useNavigate } from "react-router-dom"
import ConfirmDialog from "../../../components/Admin/ConfirmDelete"
import { useState } from "react"
import { useDarkMode } from "../../../contexts/DarkModeContext"

const CustomerEdit: React.FC = () => {
  const { customerId = "" } = useParams<string>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()

  const {
    refineCore: { onFinish, formLoading, query },
    register,
    handleSubmit,
    saveButtonProps,
  } = useForm<CustomerUpdate, HttpError>({
    refineCoreProps: {
      resource: "customers",
      action: "edit",
      id: customerId,
    },
  })
  const customer = query?.data?.data

  const handleDelete = async () => {
    await CustomersService.customersDeleteCustomer({ customerId: parseInt(customerId) })
    setDeleteDialogOpen(false)
    navigate('/admin/customers')
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`h-full w-full ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
          <form onSubmit={handleSubmit(onFinish)}>
            <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                    Edit Customer
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button 
                    className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} 
                    color="red" 
                    size="sm" 
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                  <Button 
                    className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} 
                    color="gray" 
                    size="sm" 
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} 
                    color="black" 
                    size="sm" 
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className={isDarkMode ? "bg-gray-900" : ""}>
              <div className="mb-2">
                Email
                <Input
                  {...register('email')}
                  type="email"
                  defaultValue={customer?.email}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
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
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this customer? This action cannot be undone."
      />
    </main>
  )
}

export default CustomerEdit
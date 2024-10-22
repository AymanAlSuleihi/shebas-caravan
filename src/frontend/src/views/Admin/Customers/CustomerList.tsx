import React, { useState, useEffect } from "react"
import { CustomerOut } from "../../../client/models/CustomerOut"
import { CustomersService } from "../../../client"
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"
import { EyeIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"

const TABLE_HEAD = ["id", "Customer", "Orders", ""]

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerOut[]>()

  useEffect(() => {
    CustomersService.customersReadCustomers({}).then(
      (response) => setCustomers(response))
  }, [])

  useEffect(() => {
    console.log(customers)
  }, [customers])

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Customers
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Link to={`/admin/customers/create`}>
                  <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add customer
                  </Button>
                </Link>
              </div>
            </div>
            {/* <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp&nbsp{label}&nbsp&nbsp
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
            </div> */}
          </CardHeader>
          <CardBody className="overflow-auto px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers?.map(
                  ({ id, email, first_name, last_name, orders }, index) => {
                    const isLast = index === customers.length - 1
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50"
                    const totalSpend = orders?.reduce((accumulator, currentOrder) => accumulator + currentOrder.amount, 0)
                    return (
                      <tr key={email}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {first_name} {last_name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {orders?.length}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            £{totalSpend}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Edit Customer">
                            <Link to={`/admin/customers/${id}/edit`}>
                              <IconButton variant="text">
                                <PencilIcon className="h-4 w-4" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                        </td>
                      </tr>
                    )
                  },
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography variant="small" color="blue-gray" className="font-normal">
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default CustomerList
import React, { useState, useEffect } from "react"
import { OrderOut } from "../../../client/models/OrderOut"
import { OrdersService } from "../../../client"
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

const formatDate = (date?: string) => {
  if (date) {
    const dateString = new Date(date)
    return dateString.toISOString().split('T')[0]
  }
  return null
}

const TABLE_HEAD = ["id", "Ordered at", " Status", "Products", "Customer", "Amount", ""]

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<OrderOut[]>()
  const [orderStatus, setOrderStatus] = useState<Record<string, any>>()

  useEffect(() => {
    OrdersService.ordersReadOrders({}).then(
      (response) => setOrders(response))
    OrdersService.ordersOrderStatus().then(
      (response) => setOrderStatus(response))
  }, [])

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Orders
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add order
                </Button>
              </div>
            </div>
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
                {orderStatus && orders?.map(
                  ({ id, amount, status, products, created_at, customer }, index) => {
                    const isLast = index === orders.length - 1
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50"
                    const statusName = Object.keys(orderStatus).find((key) => orderStatus[key] == status)
                    console.log(orderStatus)
                    console.log(status)
                    console.log(statusName)
                    return (
                      <tr key={id}>
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
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {formatDate(created_at)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={statusName}
                              color={
                                statusName?.toUpperCase() === "PENDING"
                                  ? "gray"
                                  : statusName === "PROCESSING"
                                  ? "orange"
                                  : statusName === "SHIPPED"
                                  ? "blue"
                                  : statusName === "DELIVERED"
                                  ? "green"
                                  : "gray"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          {products?.map((product) => (
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {product.name}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </td>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {customer?.first_name} {customer?.last_name}
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
                            £{amount}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="View Order">
                            <Link to={`/admin/orders/${id}`}>
                              <IconButton variant="text">
                                <EyeIcon className="h-4 w-4" />
                              </IconButton>
                            </Link>
                          </Tooltip>
                          <Tooltip content="Edit Order">
                            <Link to={`/admin/orders/${id}/edit`}>
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

export default OrderList
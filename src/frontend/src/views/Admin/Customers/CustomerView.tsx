import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CustomerOut } from "../../../client/models/CustomerOut"
import { CustomersService, OrdersService } from "../../../client"
import formatDate from "../../../utils/utils"
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
} from "@material-tailwind/react"
import { EyeIcon, PencilIcon } from "@heroicons/react/24/solid"
import { Link } from "react-router-dom"
import { useDarkMode } from "../../../contexts/DarkModeContext"

const CustomerView: React.FC = () => {
  const { isDarkMode } = useDarkMode()
  const [customer, setCustomer] = useState<CustomerOut>()
  const [orderStatusList, setOrderStatusList] = useState<Record<string, number>>()
  const { customerId = "" } = useParams<string>()

  useEffect(() => {
    CustomersService.customersReadCustomerById({
      customerId: parseInt(customerId)
    }).then((response) => setCustomer(response))
  }, [customerId])

  useEffect(() => {
    OrdersService.ordersOrderStatus().then(
      (response) => setOrderStatusList(response))
  }, [])

  const getOrderStatusName = (status: number) => {
    return Object.keys(orderStatusList || {}).find((key) => orderStatusList![key] === status) || ""
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`h-full w-full ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
          <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                  Customer #{customer?.id}
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to={`/admin/customers/${customer?.id}/edit`}>
                  <Button className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} color="black" size="sm">
                    <PencilIcon strokeWidth={2} className="h-4 w-4" /> Edit
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardBody className={`overflow-auto px-0 ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <div className="grid grid-cols-1 gap-4">
              <Card shadow={false} className={`rounded ${isDarkMode ? "bg-gray-900" : ""}`}>
                <CardBody className="px-4 pb-4 pt-2">
                  <p className={isDarkMode ? "text-gray-200" : ""}>
                    <strong>Name:</strong> {customer?.first_name} {customer?.last_name}
                  </p>
                  <p className={isDarkMode ? "text-gray-200" : ""}>
                    <strong>Email:</strong> {customer?.email}
                  </p>
                </CardBody>
              </Card>
              <Card shadow={false} className={`rounded ${isDarkMode ? "bg-gray-900" : ""}`}>
                <CardHeader floated={false} shadow={false} className={isDarkMode ? "bg-gray-900" : ""}>
                  <Typography variant="h6" color={isDarkMode ? "white" : "blue-gray"}>
                    Orders
                  </Typography>
                </CardHeader>
                <CardBody className="px-0 pb-4 pt-2">
                  {customer?.orders?.length ? (
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          <th className={`cursor-pointer border-y p-4 transition-colors ${
                            isDarkMode ? "border-gray-700 bg-black/15 hover:bg-gray-700" : "border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                          }`}>
                            <Typography
                              variant="small"
                              color={isDarkMode ? "white" : "blue-gray"}
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              Order ID
                            </Typography>
                          </th>
                          <th className={`cursor-pointer border-y p-4 transition-colors ${
                            isDarkMode ? "border-gray-700 bg-black/15 hover:bg-gray-700" : "border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                          }`}>
                            <Typography
                              variant="small"
                              color={isDarkMode ? "white" : "blue-gray"}
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              Date
                            </Typography>
                          </th>
                          <th className={`cursor-pointer border-y p-4 transition-colors ${
                            isDarkMode ? "border-gray-700 bg-black/15 hover:bg-gray-700" : "border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                          }`}>
                            <Typography
                              variant="small"
                              color={isDarkMode ? "white" : "blue-gray"}
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              Amount
                            </Typography>
                          </th>
                          <th className={`cursor-pointer border-y p-4 transition-colors ${
                            isDarkMode ? "border-gray-700 bg-black/15 hover:bg-gray-700" : "border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                          }`}>
                            <Typography
                              variant="small"
                              color={isDarkMode ? "white" : "blue-gray"}
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              Status
                            </Typography>
                          </th>
                          <th className={`cursor-pointer border-y p-4 transition-colors ${
                            isDarkMode ? "border-gray-700 bg-black/15 hover:bg-gray-700" : "border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50"
                          }`}>
                            <Typography
                              variant="small"
                              color={isDarkMode ? "white" : "blue-gray"}
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                            >
                              Actions
                            </Typography>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.orders.map((order) => (
                          <tr key={order.id}>
                            <td className={`p-4 border-b ${isDarkMode ? "border-gray-700 text-gray-200" : "border-blue-gray-50"}`}>
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                {order.id}
                              </Typography>
                            </td>
                            <td className={`p-4 border-b ${isDarkMode ? "border-gray-700 text-gray-200" : "border-blue-gray-50"}`}>
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                {formatDate(order.created_at)}
                              </Typography>
                            </td>
                            <td className={`p-4 border-b ${isDarkMode ? "border-gray-700 text-gray-200" : "border-blue-gray-50"}`}>
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                £{order.amount}
                              </Typography>
                            </td>
                            <td className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-blue-gray-50"}`}>
                              <Chip
                                className="w-fit"
                                variant="ghost"
                                size="sm"
                                value={getOrderStatusName(order.status)}
                                color={
                                  getOrderStatusName(order.status)?.toUpperCase() === "PENDING"
                                    ? "gray"
                                    : getOrderStatusName(order.status) === "PROCESSING"
                                    ? "orange"
                                    : getOrderStatusName(order.status) === "SHIPPED"
                                    ? "blue"
                                    : getOrderStatusName(order.status) === "DELIVERED"
                                    ? "green"
                                    : "gray"
                                }
                              />
                            </td>
                            <td className={`p-4 border-b ${isDarkMode ? "border-gray-700" : "border-blue-gray-50"}`}>
                              <Link to={`/admin/orders/${order.id}`}>
                                <Button size="sm" variant="text" className={isDarkMode ? "text-gray-200" : ""}>
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Typography variant="body2" className={isDarkMode ? "text-gray-200" : "text-blue-gray-600"}>
                      No orders available.
                    </Typography>
                  )}
                </CardBody>
              </Card>
              <Card shadow={false} className={`rounded ${isDarkMode ? "bg-gray-900" : ""}`}>
                <CardHeader floated={false} shadow={false} className={isDarkMode ? "bg-gray-900" : ""}>
                  <Typography variant="h6" color={isDarkMode ? "white" : "blue-gray"}>
                    Logs
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  {customer?.logs?.length ? (
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className={`px-2 py-1 text-left ${isDarkMode ? "text-gray-200" : ""}`}>Created At</th>
                          <th className={`px-2 py-1 text-left ${isDarkMode ? "text-gray-200" : ""}`}>Level</th>
                          <th className={`px-2 py-1 text-left ${isDarkMode ? "text-gray-200" : ""}`}>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.logs.map((log) => (
                          <tr key={log.id}>
                            <td className={`px-2 py-1 ${isDarkMode ? "text-gray-200" : ""}`}>{formatDate(log.created_at, true)}</td>
                            <td className={`px-2 py-1 ${isDarkMode ? "text-gray-200" : ""}`}>{log.level}</td>
                            <td className={`px-2 py-1 ${isDarkMode ? "text-gray-200" : ""}`}>{log.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Typography variant="body2" className={isDarkMode ? "text-gray-200" : "text-blue-gray-600"}>
                      No logs available.
                    </Typography>
                  )}
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default CustomerView

import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { OrderOut } from "../../../client/models/OrderOut"
import { OrderUpdate, OrdersService } from "../../../client"
import formatDate from "../../../utils/utils"

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"
import { EyeIcon, PencilIcon, PrinterIcon, TruckIcon, UserIcon } from "@heroicons/react/24/solid"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
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
import DispatchMenu from "../../../components/Admin/DispatchMenu"
import { Link } from "@refinedev/core"
import CancelOrder from "../../../components/Admin/CancelOrder"

const TABLE_HEAD = ["id", "Name", "Sku", "Quantity", "Price", "Type"]

const OrderView: React.FC = () => {
  const [order, setOrder] = useState<OrderOut>()
  const [orderStatusList, setOrderStatusList] = useState<Record<string, number>>()
  const [orderStatusName, setOrderStatusName] = useState<string>("")
  const { orderId = "" } = useParams<string>()
  const [orderStatus, setOrderStatus] = useState<number>()
  const [saving, setSaving] = useState(false)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    OrdersService.ordersReadOrderById({
      orderId: parseInt(orderId)
    }).then((response) => setOrder(response))
  }, [orderStatus])

  useEffect(() => {
    OrdersService.ordersOrderStatus().then(
      (response) => setOrderStatusList(response))
    if (order && orderStatusList) {
      setOrderStatusName(Object.keys(orderStatusList).find((key) => orderStatusList[key] == order.status) || "")
    }
    console.log(order)
  }, [order, orderStatus])

  const markDelivered = async () => {
    if (orderStatusList) {
      const updatedOrder: OrderUpdate = {
        status: orderStatusList["DELIVERED"],
      }
      const order = await OrdersService.ordersUpdateOrder({
        orderId: parseInt(orderId),
        requestBody: updatedOrder,
      })
      setOrderStatus(order.status)
    }
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Order #{order?.id}
                </Typography>
                <Chip
                  className="w-fit"
                  variant="ghost"
                  size="sm"
                  value={orderStatusName}
                  color={
                    orderStatusName?.toUpperCase() === "PENDING"
                      ? "gray"
                      : orderStatusName === "PROCESSING"
                      ? "orange"
                      : orderStatusName === "SHIPPED"
                      ? "blue"
                      : orderStatusName === "DELIVERED"
                      ? "green"
                      : "gray"
                  }
                />
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button
                  className="flex items-center gap-3 shadow-none hover:shadow-md"
                  color="red"
                  size="sm"
                  onClick={() => setCancelDialogOpen(true)}
                >
                  Refund
                </Button>
                <Button className="flex items-center gap-3 shadow-none hover:shadow-md bg-gray-800" size="sm" onClick={() => navigate(-1)}>
                  Back
                </Button>
                <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="black" size="sm">
                  <PrinterIcon strokeWidth={2} className="h-4 w-4" /> Print
                </Button>
                {order && orderStatusList &&
                  <>
                    {["PENDING", "PROCESSING"].includes(orderStatusName) &&
                      <DispatchMenu
                        orderId={order.id}
                        shipments={order.shipments}
                        orderStatus={(res) => setOrderStatus(res)}
                      />
                    }
                    {["SHIPPED"].includes(orderStatusName) &&
                      <Button
                        className="flex items-center gap-3 shadow-none hover:shadow-md"
                        size="sm"
                        onClick={() => markDelivered()}
                      >
                        <TruckIcon strokeWidth={2} className="h-4 w-4" /> Mark Delivered
                      </Button>
                    }
                  </>
                }
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-auto px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card shadow={false} className="rounded">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Order
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  <p><strong>Order Placed:</strong> {formatDate(order?.created_at, true)}</p>
                  <p><strong>Last Updated:</strong> {formatDate(order?.updated_at, true)}</p>
                </CardBody>
                </Card>
                <Card shadow={false} className="rounded">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Customer
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  <Link to={`/admin/customers/${order?.customer?.id}`}>
                    <p>{order?.customer?.first_name} {order?.customer?.last_name}</p>
                    <p>{order?.customer?.email}</p>
                  </Link>
                </CardBody>
              </Card>
              <Card shadow={false} className="rounded">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Shipping
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  <p>{order?.shipping_address?.first_name} {order?.shipping_address?.last_name}</p>
                  <p>{order?.shipping_address?.address_1}</p>
                  <p>{order?.shipping_address?.address_2}</p>
                  <p>{order?.shipping_address?.city}</p>
                  <p>{order?.shipping_address?.county}</p>
                  <p>{order?.shipping_address?.postal_code}</p>
                  <p>{order?.shipping_address?.country}</p>
                  <p>{order?.shipping_address?.tel}</p>
                </CardBody>
              </Card>
              <Card shadow={false} className="rounded">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Payments
                  </Typography>
                </CardHeader>
                <CardBody className="flex flex-row space-x-10 px-4 pb-4 pt-2">
                  <table className="w-full">
                    <thead>
                      <tr className="space-x-2">
                        <th className="py-1 text-left">Paid At</th>
                        <th className="py-1 text-left">Amount</th>
                        <th className="py-1 text-left">Status</th>
                        <th className="py-1 text-left">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.payment?.id && (
                        <tr key={0} className="space-x-2">
                          <td className="py-1">{formatDate(new Date(Number(order?.payment?.created) * 1000).toString(), true)}</td>
                          <td className="py-1">{Number(order?.payment?.amount) / 100} {order?.payment?.currency}</td>
                          <td className="py-1">
                          <Chip
                            className="w-fit"
                            variant="ghost"
                            size="sm"
                            value={order?.payment?.status}
                            color={
                              order?.payment?.status === "succeeded"
                                ? "green"
                                : order?.payment?.status === "pending"
                                ? "orange"
                                : "red"
                            }
                          />
                          </td>
                          <td className="py-1">
                            <a
                              href={`https://dashboard.stripe.com/payments/${order?.payment?.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <IconButton
                                variant="text"
                                className="flex items-center rounded h-7 w-7"
                              >
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                              </IconButton>
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CardBody>
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Refunds
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  {order?.refunds?.length ? (
                    <table className="w-full">
                      <thead>
                        <tr className="space-x-2">
                          <th className="py-1 text-left">Refunded At</th>
                          <th className="py-1 text-left">Amount</th>
                          <th className="py-1 text-left">Status</th>
                          <th className="py-1 text-left">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.refunds.map((refund, index) => (
                          <tr key={index} className="space-x-2">
                            <td className="py-1">{formatDate(new Date(Number(refund.created) * 1000).toString(), true)}</td>
                            <td className="py-1">{Number(refund.amount) / 100} {refund.currency}</td>
                            <td className="py-1">
                            <Chip
                              className="w-fit"
                              variant="ghost"
                              size="sm"
                              value={refund.status}
                              color={
                                refund.status === "succeeded"
                                  ? "green"
                                  : refund.status === "pending"
                                  ? "orange"
                                  : "red"
                              }
                            />
                            </td>
                            <td className="py-1">
                              <a
                                href={`https://dashboard.stripe.com/refunds/${refund.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <IconButton
                                  variant="text"
                                  className="flex items-center rounded h-7 w-7"
                                >
                                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                </IconButton>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Typography variant="body2" color="blue-gray">
                      No refunds available.
                    </Typography>
                  )}
                </CardBody>
              </Card>
              <Card shadow={false} className="rounded col-span-1 md:col-span-2">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                  Shipments
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  {order?.shipments?.length ? (
                    <table className="w-full">
                      <thead>
                        <tr className="space-x-2">
                          <th className="py-1 text-left">Dispatched At</th>
                          <th className="py-1 text-left">Method</th>
                          <th className="py-1 text-left">Tracking Number</th>
                          <th className="py-1 text-left">Tracking Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.shipments.map((shipment) => (
                          <tr key={shipment.tracking_number} className="space-x-2">
                            <td className="py-1">{formatDate(shipment.dispatched_at)}</td>
                            <td className="py-1">{shipment.method}</td>
                            <td className="py-1">{shipment.tracking_number}</td>
                            <td className="py-1">
                              <a href={shipment.tracking_link}>
                                <Button size="sm">Track</Button>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Typography variant="body2" color="blue-gray">
                      No shipments available.
                    </Typography>
                  )}
                </CardBody>
              </Card>
            </div>
            <Card shadow={false}>
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
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order?.ordered_product_data?.map(
                    ({ id, images, name, sku, order_quantity, price, type }, index) => {
                      const isLast = index === order?.ordered_product_data!.length - 1
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50"
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
                            <div className="flex items-center gap-3">
                              <Avatar 
                                src={images ? `/public/products/${sku}/${images?.[0]}` : undefined}
                                alt={name}
                                size="sm"
                              />
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {name}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {sku}
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
                              {order_quantity}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              £{price}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {type}
                            </Typography>
                          </td>
                        </tr>
                      )
                    },
                  )}
                </tbody>
              </table>
            </Card>
            <div className="flex flex-col md:flex-row gap-4">
              <Card shadow={false} className="rounded flex-grow">
                <CardHeader floated={false} shadow={false} className="flex justify-between">
                  <Typography variant="h6" color="blue-gray" className="">
                  Notes
                  </Typography>
                  {saving && (
                  <div className="flex items-center gap-2">
                    <span>Saving...</span>
                    <svg
                    className="animate-spin h-5 w-5 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                    </svg>
                  </div>
                  )}
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  rows={4}
                  placeholder="Add notes here..."
                  value={order?.notes || ""}
                  onChange={async (e) => {
                    setOrder(order ? { ...order, notes: e.target.value } : undefined)
                    if (order) {
                      setSaving(true)
                      const updatedOrder: OrderUpdate = { notes: e.target.value }
                      await OrdersService.ordersUpdateOrder({
                        orderId: parseInt(orderId),
                        requestBody: updatedOrder,
                      })
                      setSaving(false)
                    }
                  }}
                  />
                </CardBody>
              </Card>
              <Card shadow={false} className="rounded flex-grow">
                <CardHeader floated={false} shadow={false}>
                  <Typography variant="h6" color="blue-gray">
                    Logs
                  </Typography>
                </CardHeader>
                <CardBody className="px-4 pb-4 pt-2">
                  {order?.logs?.length ? (
                    <table className="w-full">
                      <thead>
                        <tr className="space-x-2">
                          <th className="py-1 text-left">Created At</th>
                          <th className="py-1 text-left">Level</th>
                          <th className="py-1 text-left">Message</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.logs.map((log) => (
                          <tr key={log.id} className="space-x-2">
                            <td className="py-1">{formatDate(log.created_at, true)}</td>
                            <td className="py-1">{log.level}</td>
                            <td className="py-1">{log.message}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <Typography variant="body2" color="blue-gray">
                      No logs available.
                    </Typography>
                  )}
                </CardBody>
              </Card>
            </div>
          </CardBody>
        </Card>
        <CancelOrder
          open={cancelDialogOpen}
          onClose={() => setCancelDialogOpen(false)}
          order={order as OrderOut}
        />
      </div>
    </main>
  )
}

export default OrderView
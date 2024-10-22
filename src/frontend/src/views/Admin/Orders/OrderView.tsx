import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { OrderOut } from "../../../client/models/OrderOut"
import { OrderUpdate, OrdersService } from "../../../client"
import formatDate from "../../../utils/utils"

import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline"
import { EyeIcon, PencilIcon, PrinterIcon, TruckIcon } from "@heroicons/react/24/solid"
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

const TABLE_HEAD = ["id", "Name", "Sku", "Quantity", "Price", "Type"]

const OrderView: React.FC = () => {
  const [order, setOrder] = useState<OrderOut>()
  const [orderStatusList, setOrderStatusList] = useState<Record<string, number>>()
  const [orderStatusName, setOrderStatusName] = useState<string>("")
  const { orderId = "" } = useParams<string>()
  const [orderStatus, setOrderStatus] = useState<number>()

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
                <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="red" size="sm">
                  Cancel
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
            <Card shadow={false} className="rounded border border-gray-300 m-4 w-fit">
              <CardHeader floated={false} shadow={false}>
                <Typography variant="h6" color="blue-gray">
                  Order
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pb-4 pt-2">
                <p><strong>Order Placed</strong> {formatDate(order?.created_at)}</p>
                <p><strong>Last Updated</strong> {formatDate(order?.updated_at)}</p>
              </CardBody>
            </Card>
            <Card shadow={false} className="rounded border border-gray-300 m-4 w-fit">
              <CardHeader floated={false} shadow={false}>
                <Typography variant="h6" color="blue-gray">
                  Customer
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pb-4 pt-2">
                <p>{order?.customer?.first_name} {order?.customer?.last_name}</p>
                <p>{order?.customer?.email}</p>
              </CardBody>
            </Card>
            <Card shadow={false} className="rounded border border-gray-300 m-4 w-fit">
              <CardHeader floated={false} shadow={false}>
                <Typography variant="h6" color="blue-gray">
                  Shipping
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pb-4 pt-2">
                <p>{order?.shipping_address!["first_name"]} {order?.shipping_address!["last_name"]}</p>
                <p>{order?.shipping_address!["address_1"]}</p>
                <p>{order?.shipping_address!["address_2"]}</p>
                <p>{order?.shipping_address!["city"]}</p>
                <p>{order?.shipping_address!["county"]}</p>
                <p>{order?.shipping_address!["postal_code"]}</p>
                <p>{order?.shipping_address!["country"]}</p>
                <p>{order?.shipping_address!["tel"]}</p>
              </CardBody>
            </Card>
            <Card shadow={false} className="rounded border border-gray-300 m-4 w-fit">
              <CardHeader floated={false} shadow={false}>
                <Typography variant="h6" color="blue-gray">
                  Billing
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pb-4 pt-2">
                <p><strong>Status</strong> {order?.payment?.status}</p>
                <p><strong>Amount</strong> {order?.payment?.amount/100} {order?.payment?.currency}</p>
              </CardBody>
            </Card>
            <Card shadow={false} className="rounded border border-gray-300 m-4 w-fit">
              <CardHeader floated={false} shadow={false}>
                <Typography variant="h6" color="blue-gray">
                  Shipments
                </Typography>
              </CardHeader>
              <CardBody className="px-4 pb-4 pt-2">
                <table>
                  <tbody>
                    {order?.shipments?.map((shipment) => (
                      <tr>
                        <td className="px-2">{shipment.dispatched_at}</td>
                        <td className="px-2">{shipment.method}</td>
                        <td className="px-2">{shipment.tracking_number}</td>
                        <td className="px-2">
                          <a href={shipment.tracking_link}>
                            <Button size="sm">Track</Button>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
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
                                src={images && Array.isArray(images) && images.length > 0 ? images[0] : undefined}
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
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default OrderView
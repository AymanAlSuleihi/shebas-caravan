import React, { useState, useEffect } from "react"
import { OrdersService } from "../../client"
import { OrderOut } from "../../client/models/OrderOut"
import { Link } from "react-router-dom"
import formatDate from "../../utils/utils"
import { useDarkMode } from "../../contexts/DarkModeContext"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Chip,
  Input,
} from "@material-tailwind/react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

const calculatePercentDifference = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100
  return ((current - previous) / previous) * 100
}

const Dashboard: React.FC = () => {
  const { isDarkMode } = useDarkMode()
  const [startDate, setStartDate] = useState<string>("2023-01-01")
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [totalSales, setTotalSales] = useState<number>(0)
  const [previousTotalSales, setPreviousTotalSales] = useState<number>(0)
  const [totalOrders, setTotalOrders] = useState<number>(0)
  const [previousTotalOrders, setPreviousTotalOrders] = useState<number>(0)
  const [averageOrderValue, setAverageOrderValue] = useState<number>(0)
  const [previousAverageOrderValue, setPreviousAverageOrderValue] = useState<number>(0)
  const [salesData, setSalesData] = useState<{ date: string, value: number }[]>([])
  const [ordersData, setOrdersData] = useState<{ date: string, value: number }[]>([])
  const [averageOrderValueData, setAverageOrderValueData] = useState<{ date: string, value: number }[]>([])
  const [recentOrders, setRecentOrders] = useState<OrderOut[]>([])
  const [orderStatusList, setOrderStatusList] = useState<Record<string, number>>()
  const [salesByCategory, setSalesByCategory] = useState<Record<string, any>[]>([])
  const [previousSalesData, setPreviousSalesData] = useState<{ date: string, value: number }[]>([])
  const [ordersPerStatus, setOrdersPerStatus] = useState<Record<string, number>>({})

  const dateRanges = [
    { label: "Today", days: 0 },
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
    { label: "Last 90 Days", days: 90 },
    { label: "All Time", days: null },
  ]

  const setDateRange = (days: number | null) => {
    const start = new Date()
    const end = new Date()
    if (days !== null) {
      start.setDate(start.getDate() - days)
    } else {
      start.setFullYear(2023, 0, 1)
    }

    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await OrdersService.ordersGetSalesData({ startDate, endDate })
        const currentPeriod = response.current_period
        const previousPeriod = response.previous_period

        const totalSales = currentPeriod.reduce((acc, data) => acc + data.revenue, 0)
        const previousTotalSales = previousPeriod.reduce((acc, data) => acc + data.revenue, 0)

        const totalOrders = currentPeriod.reduce((acc, data) => acc + data.orders, 0)
        const previousTotalOrders = previousPeriod.reduce((acc, data) => acc + data.orders, 0)

        const averageOrderValue = totalSales / totalOrders
        const previousAverageOrderValue = previousTotalSales / previousTotalOrders

        setTotalSales(totalSales)
        setPreviousTotalSales(previousTotalSales)

        setTotalOrders(totalOrders)
        setPreviousTotalOrders(previousTotalOrders)

        setAverageOrderValue(averageOrderValue)
        setPreviousAverageOrderValue(previousAverageOrderValue)

        setSalesData(currentPeriod.map(data => ({ date: data.date, value: data.revenue })))
        setOrdersData(currentPeriod.map(data => ({ date: data.date, value: data.orders })))
        setAverageOrderValueData(currentPeriod.map(data => ({ date: data.date, value: data.revenue / data.orders })))
        setPreviousSalesData(previousPeriod.map(data => ({ date: data.date, value: data.revenue })))
      } catch (error) {
        console.error("Failed to fetch sales data", error)
      }
    }
  
    fetchTotalSales()
  }, [startDate, endDate])

  useEffect(() => {
    OrdersService.ordersOrderStatus().then((status) =>
      setOrderStatusList(status)
    )

    OrdersService.ordersReadOrders({
      limit: 5,
      sortField: "created_at",
      sortOrder: "desc",
    }).then((response) => {
      setRecentOrders(response.orders)
    })
  }, [])

  useEffect(() => {
    OrdersService.ordersGetSalesByCategory({ startDate, endDate }).then(
      (response) => setSalesByCategory(response)
    )

    OrdersService.ordersGetOrdersPerStatus({
      startDate: startDate,
      endDate: endDate,
    }).then((response) => {
      setOrdersPerStatus(response)
    })
  }, [startDate, endDate])

  const getOrderStatusName = (status: number) => {
    return Object.keys(orderStatusList || {}).find(
      (key) => orderStatusList![key] === status
    ) || ""
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 1.4
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 0.05
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={isDarkMode ? "white" : "black"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${salesByCategory[index].category} (${(percent * 100).toFixed(0)}%)`}
      </text>
    )
  }

  return (
    <main className={`flex-grow pt-14 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"} h-full`}>
      <div className="max-w-full w-auto mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center">
          <Typography tag="h1" variant="h5" className={`${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Dashboard
          </Typography>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2 pr-5">
              {dateRanges.map((range) => (
                <Button
                  key={range.label}
                  size="sm"
                  variant="outlined"
                  onClick={() => setDateRange(range.days)}
                  className={`normal-case ${isDarkMode ? "text-gray-200 border-gray-600" : "text-gray-800 border-gray-300"}`}
                >
                  {range.label}
                </Button>
              ))}
            </div>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"} rounded shadow-sm`}
              containerProps={{ className: "min-w-[140px] w-[140px]" }}
              label="Start Date"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"} rounded shadow-sm`}
              containerProps={{ className: "min-w-[140px] w-[140px]" }}
              label="End Date"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardBody className="flex flex-col items-center p-4">
              <Typography variant="small" className="text-gray-600 dark:text-gray-400 w-full">
                Total Sales
              </Typography>
              <div className="flex items-center w-full">
                <div className="flex flex-col items-start my-4">
                  <Typography variant="h4" className="dark:text-white">
                    £{totalSales.toFixed(2)}
                  </Typography>
                  <Typography variant="small" color={calculatePercentDifference(totalSales, previousTotalSales) >= 0 ? 'green' : 'red'} className="">
                    {calculatePercentDifference(totalSales, previousTotalSales).toFixed(2)}%
                  </Typography>
                </div>
                <ResponsiveContainer height="100%" className="ml-auto">
                  <LineChart data={salesData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardBody className="flex flex-col items-center p-4">
              <Typography variant="small" className="text-gray-600 dark:text-gray-400 w-full">
                Total Orders
              </Typography>
              <div className="flex items-center w-full">
                <div className="flex flex-col items-start my-4">
                  <Typography variant="h4" className="dark:text-white">
                    {totalOrders}
                  </Typography>
                  <Typography variant="small" color={calculatePercentDifference(totalOrders, previousTotalOrders) >= 0 ? 'green' : 'red'} className="">
                    {calculatePercentDifference(totalOrders, previousTotalOrders).toFixed(2)}%
                  </Typography>
                </div>
                <ResponsiveContainer height="100%" className="ml-auto">
                  <LineChart data={ordersData}>
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <CardBody className="flex flex-col items-center p-4">
              <Typography variant="small" className="text-gray-600 dark:text-gray-400 w-full">
                Average Order Value
              </Typography>
              <div className="flex items-center w-full">
                <div className="flex flex-col items-start my-4">
                  <Typography variant="h4" className="dark:text-white">
                    £{averageOrderValue.toFixed(2)}
                  </Typography>
                  <Typography variant="small" color={calculatePercentDifference(averageOrderValue, previousAverageOrderValue) >= 0 ? 'green' : 'red'} className="">
                    {calculatePercentDifference(averageOrderValue, previousAverageOrderValue).toFixed(2)}%
                  </Typography>
                </div>
                <ResponsiveContainer width="100%" height={50}>
                  <LineChart data={averageOrderValueData}>
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          <Card className={`col-span-12 lg:col-span-7 ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900" : ""}`}>
              <Typography variant="h6" color={isDarkMode ? "white" : "blue-gray"}>
                Sales Overview
              </Typography>
            </CardHeader>
            <CardBody>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPreviousRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
                    <XAxis dataKey="date" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                        borderColor: isDarkMode ? "#374151" : "#E5E7EB",
                        color: isDarkMode ? "#E5E7EB" : "#111827"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      data={salesData}
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      data={previousSalesData}
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPreviousRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          <div className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-6">
            <Card className={`${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
              <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900" : ""}`}>
                <Typography variant="h6" color={isDarkMode ? "white" : "blue-gray"}>
                  Orders by Status
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.entries(ordersPerStatus).map(([status, count]) => ({ status: getOrderStatusName(Number(status)), count }))}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        innerRadius={"40%"}
                        outerRadius={"70%"}
                        fill="#8884d8"
                        stroke="none"
                        label={({ name, percent, count }) => `${name} (${count}) (${(percent * 100).toFixed(0)}%)`}
                      >
                        {Object.entries(ordersPerStatus).map(([status], index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
            <Card className={`${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
              <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900" : ""}`}>
                <Typography variant="h6" color={isDarkMode ? "white" : "blue-gray"}>
                  Sales by Category
                </Typography>
              </CardHeader>
              <CardBody>
                <div className="h-[200px] ">
                  <ResponsiveContainer width="100%" height="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesByCategory}
                        dataKey="sales"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={"70%"}
                        fill="#8884d8"
                        stroke="none"
                        label={renderCustomizedLabel}
                        labelLine={false}
                      >
                        {salesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mt-6">
          <Card className={`${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900" : ""}`}>
              <div className="flex items-center justify-between gap-8 mb-4">
                <div>
                  <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                    Recent Orders
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Link to="/admin/orders">
                    <Button variant="outlined" size="sm" className={isDarkMode ? "text-gray-200" : ""}>
                      View All
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {["Order", "Customer", "Date", "Amount", "Status"].map((head) => (
                      <th
                        key={head}
                        className={`border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 ${
                          isDarkMode ? "border-gray-700 bg-gray-800 text-gray-200" : ""
                        }`}
                      >
                        <Typography
                          variant="small"
                          className={`font-normal leading-none ${isDarkMode ? "text-gray-200" : "text-blue-gray-600"}`}
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => {
                    const isLast = index === recentOrders.length - 1
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50"

                    return (
                      <tr key={order.id}>
                        <td className={classes}>
                          <Link to={`/admin/orders/${order.id}`}>
                            <Typography
                              variant="small"
                              className={`font-normal ${isDarkMode ? "text-gray-200" : ""}`}
                            >
                              #{order.id}
                            </Typography>
                          </Link>
                        </td>
                        <td className={classes}>
                          <Link to={`/admin/customers/${order.customer?.id}`}>
                            <Typography
                              variant="small"
                              className={`font-normal ${isDarkMode ? "text-gray-200" : ""}`}
                            >
                              {order.customer?.first_name} {order.customer?.last_name}
                            </Typography>
                          </Link>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className={`font-normal ${isDarkMode ? "text-gray-200" : ""}`}
                          >
                            {formatDate(order.created_at)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            className={`font-normal ${isDarkMode ? "text-gray-200" : ""}`}
                          >
                            £{order.amount.toFixed(2)}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Chip
                            className={`w-24 text-center ${getOrderStatusName(order.status)?.toUpperCase() === "PENDING" ? "text-gray-500 border-gray-500" : ""}`}
                            size="sm"
                            variant="outlined"
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
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Dashboard

import React, { useEffect, useState } from "react"
import { OrderOut } from "../../../client/models/OrderOut"
import { OrdersService } from "../../../client"
import { EyeIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useDataGrid } from "@refinedev/mui"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const OrderList: React.FC = () => {
  const [orderStatus, setOrderStatus] = useState<Record<string, any>>()

  useEffect(() => {
    OrdersService.ordersOrderStatus().then(
      (response) => setOrderStatus(response))
  }, [])

  const { dataGridProps } = useDataGrid<OrderOut>({
    resource: "orders",
  })

  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    sortingMode,
    sortModel,
    onSortModelChange,
    filterMode,
    filterModel,
    onFilterModelChange,
    ...restDataGridProps
  } = dataGridProps

  const columns = React.useMemo<GridColDef<OrderOut>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "created_at",
        headerName: "Ordered at",
        renderCell: (params) => {
          const date = params.value ? new Date(params.value) : null
          const formattedDate = date ? date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }) : "N/A"
          return <span>{formattedDate}</span>
        },
        maxWidth: 150,
        flex: 0.3,
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: (params) => {
          const statusName = orderStatus
            ? Object.keys(orderStatus).find((key) => orderStatus[key] === params.row.status)
            : "Unknown"
        
          const statusColor = 
            statusName?.toUpperCase() === "PENDING" ? "gray"
            : statusName === "PROCESSING" ? "orange"
            : statusName === "SHIPPED" ? "blue"
            : statusName === "DELIVERED" ? "green"
            : "gray"
        
          return (
            <Chip
              variant="ghost"
              size="sm"
              value={statusName}
              color={statusColor}
            />
          )
        },
        maxWidth: 90,
      },
      {
        field: "products",
        headerName: "Products",
        sortable: false,
        renderCell: (params) => (
          <div>
            {params.row.products &&
              params.row.products.map((product: any, index: number) => (
                <div className="flex items-center gap-3">
                  <Avatar 
                    src={product.images ? `/public/products/${product.sku}/${product.images?.[0]}` : undefined}
                    alt={product.name}
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.name}
                    </Typography>
                  </div>
                  {index < params.row.products.length - 1 && <br />}
                </div>
              ))}
          </div>
        ),
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "customer",
        headerName: "Customer",
        sortable: false,
        valueGetter: (params) => {
          const customer = params?.row?.customer
          if (customer) {
            return `${customer.first_name} ${customer.last_name}`
          }
          return ""
        },
        minWidth: 120,
        flex: 0.2,
      },
      {
        field: "shipping_address",
        headerName: "Ship To",
        sortable: false,
        renderCell: (params) => {
          const addressFields = [
            params.row.shipping_address?.address_1,
            params.row.shipping_address?.address_2,
            params.row.shipping_address?.city,
            params.row.shipping_address?.postal_code,
            params.row.shipping_address?.county,
            params.row.shipping_address?.country,
          ]
          return (
            <div>
              {addressFields
                .filter(Boolean)
                .map((field, index) => (
                  <div key={index}>{field}</div>
                ))}
            </div>
          )
        },
        minWidth: 120,
        flex: 0.2,
      },
      {
        field: "amount",
        headerName: "Amount",
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <Tooltip content="View Order">
              <Link to={`/admin/orders/${params.row.id}`}>
                <IconButton variant="text">
                  <EyeIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="Edit Order">
              <Link to={`/admin/orders/${params.row.id}/edit`}>
                <IconButton variant="text">
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        ),
        width: 100,
      },
    ],
    [orderStatus],
  )

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
            <DataGrid
              columns={columns}
              {...restDataGridProps}
              paginationMode={paginationMode}
              paginationModel={paginationModel}
              onPaginationModelChange={onPaginationModelChange}
              sortingMode={sortingMode}
              sortModel={sortModel}
              onSortModelChange={onSortModelChange}
              filterMode={filterMode}
              filterModel={filterModel}
              onFilterModelChange={onFilterModelChange}
              autoHeight
              getRowHeight={() => 'auto'}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default OrderList
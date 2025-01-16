import React from "react"
import { CustomerOut } from "../../../client/models/CustomerOut"
import { EyeIcon, PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useDataGrid } from "@refinedev/mui"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useDarkMode } from "../../../contexts/DarkModeContext"

const CustomerList: React.FC = () => {
  const { isDarkMode } = useDarkMode()

  const { dataGridProps } = useDataGrid<CustomerOut>({
    resource: "customers",
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

  const columns = React.useMemo<GridColDef<CustomerOut>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        maxWidth: 80,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "first_name",
        headerName: "Customer",
        valueGetter: (params) => {
          console.log(params)
          const customer = params?.row
          if (customer) {
            return `${customer.first_name} ${customer.last_name}`
          }
          return ""
        },
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "orders",
        headerName: "Orders",
        sortable: false,
        renderCell: (params) => {
          const orders = params?.row?.orders
          const totalSpend = orders?.reduce((accumulator, currentOrder) => accumulator + currentOrder.amount, 0)
          return (
            <div>
              <Typography
                variant="small"
                className="font-normal"
              >
                {orders?.length}
              </Typography>
              <Typography
                variant="small"
                className="font-normal opacity-70"
              >
                £{totalSpend}
              </Typography>
            </div>
          )
        },
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <Tooltip content="View Customer">
              <Link to={`/admin/customers/${params.row.id}`}>
                <IconButton variant="text" className={isDarkMode ? "text-gray-200" : ""}>
                  <EyeIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="Edit Customer">
              <Link to={`/admin/customers/${params.row.id}/edit`}>
                <IconButton variant="text" className={isDarkMode ? "text-gray-200" : ""}>
                  <PencilIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
          </div>
        ),
        width: 100,
      },
    ],
    [],
  )

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`h-full w-full ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
          <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                  Customers
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm" className={isDarkMode ? "text-gray-200" : ""}>
                  view all
                </Button>
                <Link to={`/admin/customers/create`}>
                  <Button className="flex items-center gap-3" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add customer
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>
          <CardBody className={`overflow-auto px-0 ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
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
              getRowHeight={() => "auto"}
              className={isDarkMode ? "text-gray-200" : ""}
              sx={{
                "& .MuiDataGrid-cell": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiDataGrid-columnHeaders": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiTablePagination-root": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiTablePagination-selectLabel": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiTablePagination-displayedRows": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiSelect-icon": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
                "& .MuiIconButton-root": {
                  color: isDarkMode ? "#E5E7EB" : "inherit",
                },
              }}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default CustomerList
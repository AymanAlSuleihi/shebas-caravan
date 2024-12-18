import React from "react"
import { ProductOut } from "../../../client/models/ProductOut"
import { EyeIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/solid"
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useDataGrid } from "@refinedev/mui"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const ProductList: React.FC = () => {
  const { dataGridProps } = useDataGrid<ProductOut>({
    resource: "products",
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

  const columns = React.useMemo<GridColDef<ProductOut>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        width: 50,
      },
      {
        field: "name",
        headerName: "Name",
        renderCell: (params) => (
          <div className="flex items-center gap-3">
            <Avatar
              src={
                params.row.images ?
                `/public/products/${params.row.sku}/${params.row.images?.[0]}`
                : undefined
              }
              alt={params.row.name}
              size="sm"
            />
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {params.row.name}
              </Typography>
            </div>
          </div>
        ),
        minWidth: 120,
        flex: 0.3,
      },
      {
        field: "sku",
        headerName: "SKU",
        minWidth: 120,
      },
      {
        field: "type",
        headerName: "Type",
        minWidth: 120,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "number",
        minWidth: 120,
      },
      {
        field: "cost",
        headerName: "Cost",
        valueGetter: (params) => (`£${params.row.cost}`),
        type: "number",
        minWidth: 120,
      },
      {
        field: "price",
        headerName: "Price",
        valueGetter: (params) => (`£${params.row.price}`),
        type: "number",
        minWidth: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <Tooltip content="View Product" >
              <Link to={`/treasure/${params.row.url_key}`} target="_blank">
                <IconButton variant="text">
                  <EyeIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="Edit Product">
              <Link to={`/admin/products/${params.row.id}/edit`}>
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
    []
  )

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Products
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Link to={`/admin/products/create`}>
                  <Button className="flex items-center gap-3" size="sm">
                      <PlusIcon strokeWidth={2} className="h-4 w-4" /> Create Product
                  </Button>
                </Link>
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
              getRowHeight={() => 75}
            />
          </CardBody>
        </Card>
      </div>
    </main>
  )
}

export default ProductList
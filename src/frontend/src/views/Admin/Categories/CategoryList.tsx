import React, { useEffect } from "react"
import { CategoryOut } from "../../../client/models/CategoryOut"
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
import { useDarkMode } from "../../../contexts/DarkModeContext"

const CategoryList: React.FC = () => {
  const { isDarkMode } = useDarkMode()
  const { dataGridProps } = useDataGrid<CategoryOut>({
    resource: "categories",
  })

  useEffect(() => {
    console.log("DataGrid Props:", dataGridProps)
  }, [dataGridProps])

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

  const columns = React.useMemo<GridColDef<CategoryOut>[]>(
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
                params.row.thumbnail ?
                `/public/categories/${params.row.name}/thumbnails/${params.row.thumbnail?.replace(/(\.[^.]+)$/, "_thumbnail$1")}`
                : undefined
              }
              alt={params.row.name}
              size="sm"
            />
            <div className="flex flex-col">
              <Typography
                variant="small"
                className={`font-normal ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
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
        field: "url_key",
        headerName: "URL Key",
        minWidth: 120,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        renderCell: (params) => (
          <div className="flex gap-2">
            <Tooltip content="View Category" >
              <Link to={`/treasures/${params.row.url_key}`} target="_blank">
                <IconButton variant="text" className={isDarkMode ? "text-gray-200" : ""}>
                  <EyeIcon className="h-4 w-4" />
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip content="Edit Category">
              <Link to={`/admin/categories/${params.row.id}/edit`}>
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
    [isDarkMode]
  )

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`h-full w-full ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
          <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
            <div className="flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                  Categories
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link to="/admin/categories/create">
                  <Button className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} color="black" size="sm">
                    <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
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
              getRowHeight={() => 75}
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

export default CategoryList
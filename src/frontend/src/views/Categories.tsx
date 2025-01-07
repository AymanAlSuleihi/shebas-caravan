import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ProgressiveImage from "../components/ProgressiveImage"
import { ProductOut, ProductsService, CategoriesService, CategoryOut } from "../client"
import { Button, Input, Select, Option, Typography } from "@material-tailwind/react"
import { BarsArrowUpIcon, BarsArrowDownIcon } from "@heroicons/react/24/solid"
import { FunnelIcon } from "@heroicons/react/24/outline"
import { Drawer, IconButton } from "@material-tailwind/react"
import CategorySkeleton from "../components/Skeletons/CategorySkeleton"
import { CurrencyDisplay } from "../components/CurrencyDisplay"
import { useDarkMode } from "../contexts/DarkModeContext"


const Categories: React.FC = () => {
  const [products, setProducts] = useState<ProductOut[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductOut[]>([])
  const [categories, setCategories] = useState<CategoryOut[]>([])
  const [filterName, setFilterName] = useState<string>("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterCategory, setFilterCategory] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<string>("asc")
  const [sortField, setSortField] = useState<string>("price")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const { isDarkMode } = useDarkMode()

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  useEffect(() => {
    ProductsService.productsReadProducts({}).then((response) => {
      setProducts(response.products)
      setFilteredProducts(response.products)
    }).catch((error) => {
      console.error("Failed to fetch products:", error)
    })

    CategoriesService.categoriesReadCategories({}).then((response) => {
      setCategories(response.categories ?? [])
    }).catch((error) => {
      console.error("Failed to fetch categories:", error)
      setCategories([])
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 540) {
        setDrawerOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    let updatedProducts = [...products]

    if (filterName) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(filterName.toLowerCase())
      )
    }

    if (filterType) {
      updatedProducts = updatedProducts.filter(product =>
        product.type.toLowerCase().includes(filterType.toLowerCase())
      )
    }

    if (filterCategory) {
      updatedProducts = updatedProducts.filter(product =>
        product.categories?.some(category => category.name.toLowerCase().includes(filterCategory.toLowerCase()))
      )
    }

    if (sortField === "price") {
      updatedProducts.sort((a, b) => sortOrder === "asc" ? a.price - b.price : b.price - a.price)
    } else if (sortField === "name") {
      updatedProducts.sort((a, b) => sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
    }

    setFilteredProducts(updatedProducts)
    setLoaded(true)
  }, [filterName, filterType, filterCategory, sortOrder, sortField, products])

  return (
    <>
      { loaded ? (
      <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <Typography variant="h2" className={`flex font-semibold text-2xl pr-5 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Treasures</Typography>
            <IconButton
              onClick={toggleDrawer}
              className="sm:hidden w-20 !max-w-20 rounded !overflow-visible "
              variant="text"
            >
              <div className="flex items-center">
                <Typography className={`text-xs mr-1 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Filter</Typography>
                <FunnelIcon className={`h-5 w-5 pl-1 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`} />
              </div>
            </IconButton>
            <Drawer
              open={drawerOpen}
              onClose={toggleDrawer}
              className={`sm:hidden ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
              placement="bottom"
            >
              <div className="px-4 pt-4">
                <div className="flex flex-col mb-4">
                  <Input
                    id="filter-name"
                    type="text"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    variant="standard"
                    labelProps={{ className: `after:border-b-[1px] ${isDarkMode ? "!text-gray-200" : ""}` }}
                    containerProps={{ className: "" }}
                    className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                    label="Search By Name"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <Select
                    id="filter-category"
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e ?? "")
                    }}
                    variant="standard"
                    labelProps={{ className: "after:border-b-[1px]" }}
                    containerProps={{ className: "" }}
                    className={`${isDarkMode ? "text-gray-200 placeholder:text-gray-200" : "text-gray-900"}`}
                    label="Category"
                  >
                    <Option value="">All Categories</Option>
                    <Option value="Pendants">Pendants</Option>
                    <Option value="Rings">Rings</Option>
                  </Select>
                </div>
                <div className="flex flex-row mb-4 space-x-4">
                  <div className="flex flex-col max-w-full w-full">
                    <Select
                      id="sort-field"
                      value={sortField}
                      onChange={(e) => setSortField(e)}
                      variant="standard"
                      labelProps={{ className: "after:border-b-[1px] max-w-full w-full" }}
                      containerProps={{ className: "" }}
                      className={`${isDarkMode ? "text-gray-200 placeholder:text-gray-200" : "text-gray-900"}`}
                      label="Sort by"
                    >
                      <Option value="price">Price</Option>
                      <Option value="name">Name</Option>
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <button
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className={`flex items-center justify-center w-10 h-10 mt-1 border rounded ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                      >
                        {sortOrder === "asc" ? (
                          <BarsArrowUpIcon className="h-6 w-6" />
                        ) : (
                          <BarsArrowDownIcon className="h-6 w-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col justify-center mx-4 space-y-2">
                <Button
                  onClick={toggleDrawer}
                  variant="outlined"
                  className={`rounded-md border-gray-400 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                  fullWidth
                >
                  Apply Filters
                </Button>
                <Button
                  onClick={() => {
                    setFilterName("")
                    setFilterType("")
                    setFilterCategory("")
                    setSortOrder("asc")
                    setSortField("price")
                  }}
                  variant="outlined"
                  className={`rounded-md border-gray-400 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                  fullWidth
                >
                  Reset Filters
                </Button>
              </div>
            </Drawer>
            <div className="hidden sm:flex flex-wrap place-content-end gap-3">
              <div className="flex flex-col min-w-36 w-40">
                <Input
                  id="filter-name"
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                  variant="standard"
                  labelProps={{ className: `after:border-b-[1px] ${isDarkMode ? "!text-gray-200" : ""}` }}
                  containerProps={{
                    className: "!min-w-40 !w-40"
                  }}
                  label="Search"
                />
              </div>
              <div className="flex flex-col min-w-24 w-32">
                <Select
                  id="filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e)}
                  className={`pt-1 ${isDarkMode ? "text-gray-200 placeholder:text-gray-200" : "text-gray-900"}`}
                  variant="standard"
                  labelProps={{ className: `after:border-b-[1px] ${isDarkMode ? "!text-gray-200" : ""}` }}
                  containerProps={{
                    className: "!min-w-32 !w-32"
                  }}
                  menuProps={{
                    className: "p-0 "
                  }}
                  label="Category"
                >
                  <Option value="">All Categories</Option>
                  <Option value="Pendants">Pendants</Option>
                  <Option value="Rings">Rings</Option>
                </Select>

                {/*
                  Bug with material-tailwind where dynamically populated
                  options are not displayed when selected.

                  https://github.com/creativetimofficial/material-tailwind/issues/501
                  https://github.com/creativetimofficial/material-tailwind/issues/513

                  Below is a workaround that works by forcing rerender,
                  but this causes unsightly flickering so I'm hardcoding the options instead.
                */}
                {/* <AsyncSelect
                  id="filter-category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e ?? "")}
                  className="pt-1  transform-none transition-none animate-none"
                  variant="standard"
                  labelProps={{ 
                    className: "after:border-b-[1px] transform-none transition-none animate-none"
                  }}
                  containerProps={{
                    className: "min-w-32 w-32 transform-none transition-none animate-none"
                  }}
                  menuProps={{
                    className: "p-0 transform-none transition-none animate-none"
                  }}
                  label="Category"
                >
                  {Array.isArray(categories) && [
                    <Option key="all" value="">All Categories</Option>,
                    ...categories.map(category => (
                      <Option key={category.id} value={category.name}>{category.name}</Option>
                    ))
                  ]}
                </AsyncSelect> */}
              </div>
              <div className="flex flex-row mb-4 space-x-2">
                <div className="flex flex-col ">
                  <Select
                    id="sort-field"
                    value={sortField}
                    onChange={(e) => setSortField(e)}
                    // className=""
                    className={`${isDarkMode ? "text-gray-200 placeholder:text-gray-200" : "text-gray-900"}`}
                    variant="standard"
                    labelProps={{ className: `after:border-b-[1px] ${isDarkMode ? "!text-gray-200" : ""}` }}
                    containerProps={{
                      className: "!min-w-[69px] !w-[69px]"
                    }}
                    menuProps={{
                      className: "p-0"
                    }}
                    label="Sort by"
                  >
                    <Option value="price">Price</Option>
                    <Option value="name">Name</Option>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <button
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className={`flex items-center justify-center w-10 h-10 mt-1 border border-gray-400 rounded ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                    >
                      {sortOrder === "asc" ? (
                        <BarsArrowUpIcon className="h-6 w-6" />
                      ) : (
                        <BarsArrowDownIcon className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Button
                    onClick={() => {
                      setFilterName("")
                      setFilterType("")
                      setFilterCategory("")
                      setSortOrder("asc")
                      setSortField("price")
                    }}
                    className={`w-10 max-w-10 px-[2px] mx-0 mt-1 rounded border-gray-400 shadow-none ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                    variant="outlined"
                  >
                    <Typography className="text-[10px] p-0 m-0">Reset</Typography>
                  </Button>
              </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mt-4">
            {filteredProducts.map((product) => (
              <div className="grid col-span-1" key={product.url_key}>
                <Link to={`/treasure/${product.url_key}`}>
                  <div className={`${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-gray-50 border-gray-200"} border aspect-square relative rounded hover:scale-[1.03] transition-transform`}>
                    <ProgressiveImage
                      thumbnailSrc={`/public/products/${product.sku}/thumbnails/${product.images?.[0]?.replace(/(\.[^.]+)$/, '_thumbnail$1')}`}
                      hdSrc={`/public/products/${product.sku}/${product.images?.[0]}`}
                      alt={product.name}
                      spinner={false}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-2">
                      <div className={`text-center font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                        <span>{product?.name}</span>
                        {product?.name_musnad &&
                          <>
                            <span className="inline-block -translate-y-[1px] mx-[5px]">|</span>
                            <span className="inline-block translate-y-[2px]">{product?.name_musnad}</span>
                          </>
                        }
                      </div>
                      <div className={`text-center font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                        <CurrencyDisplay baseAmount={product.price} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      ) : (
        <CategorySkeleton showFilters />
      )}
    </>
  )
}

export default Categories
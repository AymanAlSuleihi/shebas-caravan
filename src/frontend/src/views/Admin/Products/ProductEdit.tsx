import React, { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "@refinedev/react-hook-form"
import { HttpError } from "@refinedev/core"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Spinner, Textarea, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryOut, MediaService, ProductOut, ProductUpdate, ProductsService } from "../../../client"
import ConfirmDialog from "../../../components/Admin/ConfirmDelete"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { useDarkMode } from "../../../contexts/DarkModeContext"

type ProductUpdateWithDimensions = ProductUpdate & {
  package_dimensions_l?: number
  package_dimensions_w?: number
  package_dimensions_h?: number
}

const ProductEdit: React.FC = () => {
  // const { control, register, handleSubmit, formState, reset } = useForm<FormData>()
  const { productId = "" } = useParams<string>()
  // const [product, setProduct] = useState<ProductOut>()
  const [categories, setCategories] = useState<CategoryOut[]>()
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()


  const {
    register,
    handleSubmit,
    refineCore: { onFinish, query },
    setError,
  } = useForm<ProductUpdate, HttpError>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: productId,
    }
  })
  const product = query?.data?.data as ProductOut

  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [initialPreviews, setInitialPreviews] = useState<string[]>([])

  useEffect(() => {
    CategoriesService.categoriesReadCategories({}).then((response) => setCategories(response.categories))
  }, [])

  useEffect(() => {
    const catIds = product?.categories?.map(category => category.id)
    if (catIds) {
      setCategoryIds(prevIds => {
        const uniqueIds = new Set([...prevIds, ...catIds])
        return Array.from(uniqueIds)
      })
    }
  }, [product])

  useEffect(() => {
    if (product?.images) {
      const previewUrls = product.images.map((image: string) => `/public/products/${product.sku}/${image}`)
      console.log("previewUrls", previewUrls)
      setPreviews(previewUrls)
      setInitialPreviews(previewUrls)
    }
  }, [product])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList
    if (files) {
      const fileArray = Array.from(files)
      const previewUrls = fileArray.map((file: File) => URL.createObjectURL(file))
      setSelectedFiles(Array.from(files))
      setPreviews(previewUrls)
    }
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(previews)
    const files = Array.from(selectedFiles)
    const [reorderedItem] = items.splice(result.source.index, 1)
    const [reorderedFile] = files.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    files.splice(result.destination.index, 0, reorderedFile)

    setPreviews(items)
    setSelectedFiles(files)
  }

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value)
    const isChecked = event.target.checked
    if (isChecked) {
      setCategoryIds(prevIds => [...prevIds, categoryId])
    } else {
      setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId))
    }
  }

  const onFinishHandler = async (data: ProductUpdateWithDimensions) => {
    const originalCategoryIds = product.categories?.map(category => category.id)
    const removedCategoryIds = originalCategoryIds?.filter(id => !categoryIds.includes(id))
    const newCategoryIds = categoryIds.filter(id => !originalCategoryIds?.includes(id))
    if ((removedCategoryIds?.length ?? 0 > 0) || (newCategoryIds.length > 0)) {
      await ProductsService.productsReplaceProductCategories({
        productId: parseInt(productId),
        requestBody: categoryIds,
      })
    }

    if (!data.weight) {
      delete data.weight
    }
    if (!data.size) {
      delete data.size
    }

    const newImages = previews.filter(preview => !initialPreviews.includes(preview))
    const removedImages = initialPreviews.filter(preview => !previews.includes(preview))

    if (newImages.length > 0 || removedImages.length > 0) {
      try {
        setIsUploadLoading(true)

        const res = await MediaService.mediaUploadImages({
          formData: {
            sku: data.sku,
            image_files: selectedFiles,
          }
        })
        data.images = res.filenames

        setIsUploadLoading(false)

      } catch (error) {
        console.log(error)
        setError("images", { message: "Upload failed. Please try again." })
        setIsUploadLoading(false)
      }
    } else {
      data.images = previews.map(preview => preview.split("/").pop() as string)
    }

    data.package_dimensions = [
      data.package_dimensions_l,
      data.package_dimensions_w,
      data.package_dimensions_h,
    ].filter(dim => dim !== undefined)
  
    delete data.package_dimensions_l
    delete data.package_dimensions_w
    delete data.package_dimensions_h

    if (data.package_dimensions?.every(dim => dim === undefined || dim === "")) {
      delete data.package_dimensions
    }

    onFinish(data).then(() => {
      navigate("/admin/products")
    })
  }

  const handleDelete = async () => {
    await ProductsService.productsDeleteProduct({ productId: parseInt(productId) })
    setDeleteDialogOpen(false)
    navigate("/admin/products")
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`"h-full w-full" ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
          <form onSubmit={handleSubmit(onFinishHandler)}>
            <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5">
                    Edit Product
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="red" size="sm" onClick={() => setDeleteDialogOpen(true)}>
                    Delete
                  </Button>
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md bg-gray-800" size="sm" onClick={() => navigate(-1)}>
                    Back
                  </Button>
                  <button id="submit">
                    <Button className="flex items-center gap-3 border-gray-700 border shadow-none hover:shadow-md" color="black" size="sm">
                      Save
                    </Button>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {isUploadLoading && 
                <div className="fixed inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
                  <div className="flex items-center flex-col">
                    <Spinner />
                    <p className="mt-4 text-gray-700 text-lg">Saving...</p>
                  </div>
                </div>
              }
              <div className="mb-2">
                Name
                <Input
                  {...register("name")}
                  type="text"
                  defaultValue={product?.name}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Name (Musnad)
                <Input
                  {...register("name_musnad")}
                  type="text"
                  defaultValue={product?.name_musnad}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                />
              </div>
              <div className="mb-2">
                URL Key
                <Input
                  {...register("url_key")}
                  type="text"
                  defaultValue={product?.url_key}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                SKU
                <Input
                  {...register("sku")}
                  type="text"
                  defaultValue={product?.sku}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Type
                <Input
                  {...register("type")}
                  type="text"
                  defaultValue={product?.type}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Cost
                <Input
                  {...register("cost")}
                  type="number"
                  defaultValue={product?.cost}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Price
                <Input
                  {...register("price")}
                  type="number"
                  defaultValue={product?.price}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Quantity
                <Input
                  {...register("quantity")}
                  type="number"
                  defaultValue={product?.quantity}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2 flex items-center">
                Preorder
                <Checkbox
                  {...register("preorder")}
                  className="ml-2"
                />
              </div>
              <div className="mb-2">
                Images
                {previews.length > 0 && (
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="images" direction="horizontal">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                        >
                          {previews.map((preview, index) => (
                            <Draggable key={`preview-${index}`} draggableId={`preview-${index}`} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{ ...provided.draggableProps.style, width: "auto", height: "150px", border: "1px solid #ccc" }}
                                >
                                  <img
                                    src={preview}
                                    alt={`Selected Preview ${index}`}
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
                <Input
                  {...register("images")}
                  type="file"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-2">
                Short Description
                <Textarea
                  {...register("short_description")}
                  defaultValue={product?.short_description}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Description
                <Textarea
                  {...register("description")}
                  resize={true}
                  defaultValue={product?.description}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Material
                <Input
                  {...register("material")}
                  type="text"
                  defaultValue={product?.material}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Weight
                <Input
                  {...register("weight")}
                  type="number"
                  defaultValue={product?.weight}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Size
                <Input
                  {...register("size")}
                  type="text"
                  defaultValue={product?.size}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Package Dimensions
                <div className="flex gap-2 items-center">
                  <span className="">L</span>
                  <Input
                    {...register("package_dimensions_l")}
                    type="number"
                    step="0.01"
                    defaultValue={product?.package_dimensions?.[0]}
                    className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-20 max-w-20" }}
                  />
                  <span className="ml-4">W</span>
                  <Input
                    {...register("package_dimensions_w")}
                    type="number"
                    step="0.01"
                    defaultValue={product?.package_dimensions?.[1]}
                    className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-20 max-w-20" }}
                  />
                  <span className="ml-4">H</span>
                  <Input
                    {...register("package_dimensions_h")}
                    type="number"
                    step="0.01"
                    defaultValue={product?.package_dimensions?.[2]}
                    className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                    labelProps={{
                      className: "hidden",
                    }}
                    containerProps={{ className: "min-w-20 max-w-20" }}
                  />
                </div>
              </div>
              <div className="mb-2">
                Featured
                <Checkbox
                  {...register("featured")}
                  className="ml-2"
                  defaultChecked={product?.featured}
                />
              </div>
              <div className="mt-5 items-center">
                Categories
                {categories?.map(({ id, name }) => {
                  console.log(id, categoryIds.includes(id))
                  return (
                    <div className="flex">
                      <Checkbox value={id} checked={categoryIds.includes(id)} onChange={handleCheckboxChange} />
                      <div className="flex items-center">{name}</div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </main>
  )
}

export default ProductEdit
import React, { useEffect, useState, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "@refinedev/react-hook-form"
import { HttpError } from "@refinedev/core"
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Spinner, Textarea, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryOut, MediaService, ProductCreate as ProductCreateSchema } from "../../../client"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { useDarkMode } from "../../../contexts/DarkModeContext"
import { FieldValues, SubmitHandler } from "react-hook-form"

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

const ProductCreate: React.FC = () => {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    refineCore: { onFinish },
    setError,
  } = useForm<ProductCreateSchema, HttpError, Nullable<ProductCreateSchema>>({
    refineCoreProps: {
      resource: "products",
      redirect: false,
    }
  })

  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [categories, setCategories] = useState<CategoryOut[]>()
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])

  useEffect(() => {
    CategoriesService.categoriesReadCategories({}).then((response) => setCategories(response.categories))
  }, [])

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


  // const onChangeHandler = async (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   try {
  //     setIsUploadLoading(true)

  //     const target = event.target
  //     const file: File = (target.files as FileList)[0]

  //     console.log(uuid)

  //     const res = await MediaService.mediaUploadImages({
  //       formData: {
  //         uuid: uuid,
  //         image_file: file,
  //       }
  //     })

  //     setUuid(res.uuid)

  //     const { name, size, type, lastModified } = file

  //     const imagePaylod = [
  //       {
  //         name,
  //         size,
  //         type,
  //         lastModified,
  //         url: res.url,
  //       },
  //     ]

  //     setValue("images", imagePaylod, { shouldValidate: true })

  //     setIsUploadLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //     setError("images", { message: "Upload failed. Please try again." })
  //     setIsUploadLoading(false)
  //   }
  // }

  const onFinishHandler: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
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

    if (!data.weight) {
      delete data.weight
    }
    if (!data.size) {
      delete data.size
    }

    const productData = {
      ...data,
      category_ids: categoryIds,
    }

    console.log("Submitting product data:", productData)

    onFinish(productData as unknown as Nullable<ProductCreateSchema>).then(() => {
      navigate("/admin/products")
    }).catch((error) => {
      console.log(error)
      setError("root", { message: "Product creation failed. Please check the form data." })
    })
  }

  // const { control, register, handleSubmit, reset } = useForm<ProductCreateSchema>()


  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value)
    const isChecked = event.target.checked

    if (isChecked) {
      setCategoryIds(prevIds => [...prevIds, categoryId])
    } else {
      setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId))
    }
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className={`h-full w-full ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
          <form onSubmit={handleSubmit(onFinishHandler)}>
            <CardHeader floated={false} shadow={false} className={`rounded-none ${isDarkMode ? "bg-gray-900 text-gray-200" : ""}`}>
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color={isDarkMode ? "white" : "blue-gray"}>
                    New Product
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="red" size="sm">
                    Discard
                  </Button>
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="black" size="sm" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className={isDarkMode ? "bg-gray-900" : ""}>
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Name (Musnad)
                <Input
                  {...register("name_musnad")}
                  type="text"
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                SKU
                <Input
                  {...register("sku")}
                  type="text"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Type
                <Input
                  {...register("type")}
                  type="text"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Cost
                <Input
                  {...register("cost")}
                  type="number"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Price
                <Input
                  {...register("price")}
                  type="number"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Quantity
                <Input
                  {...register("quantity")}
                  type="number"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2 flex items-center">
                Preorder
                <Checkbox
                  {...register("preorder")}
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
                            <Draggable key={index} draggableId={`preview-${index}`} index={index}>
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              {/* <div className="mb-2">
                <label htmlFor="images-input">
                  <Input
                    id="images-input"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={onChangeHandler}
                  />
                  <input
                    id="file"
                    {...register("images", {
                      required: "This field is required",
                    })}
                    type="hidden"
                  />
                  <LoadingButton
                    loading={isUploadLoading}
                    loadingPosition="end"
                    endIcon={<FileUploadIcon />}
                    variant="contained"
                    component="span"
                  >
                    Upload
                  </LoadingButton>
                  <br />
                  {errors.images && (
                    <Typography variant="caption" color="#fa541c">
                      {errors.images?.message?.toString()}
                    </Typography>
                  )}
                </label>
                {imageInput && (
                  <Box
                    component="img"
                    sx={{
                      maxWidth: 250,
                      maxHeight: 250,
                    }}
                    src={imageInput[0].url}
                    alt="Post image"
                  />
                )}
              </div> */}
              <div className="mb-2">
                Short Description
                <Textarea
                  {...register("short_description")}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Description
                <Textarea
                  {...register("description")}
                  resize={true}
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Material
                <Input
                  {...register("material")}
                  type="text"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Weight
                <Input
                  {...register("weight")}
                  type="number"
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"}`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                Featured
                <Checkbox
                  {...register("featured")}
                />
              </div>
              {/* <div className="mb-2">
                Package Dimensions
                <div className="flex gap-2 items-center">
                  <span className="">L</span>
                  <Input
                    {...register("package_dimensions_l")}
                    type="number"
                    step="0.01"
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
              </div> */}
              <div className="mt-5 items-center">
                Categories
                {categories?.map(({ id, name }) => {
                  return (
                    <div className="flex" key={id}>
                      <Checkbox value={id} onChange={handleCheckboxChange} className={isDarkMode ? "text-gray-200" : ""} /> 
                      <div className={`flex items-center ${isDarkMode ? "text-gray-200" : ""}`}>{name}</div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </form>
          {/* </Create> */}
        </Card>
      </div>
    </main>
  )
}

export default ProductCreate
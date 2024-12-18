import React, { useEffect, useState, ChangeEvent } from "react"
import { useForm } from "@refinedev/react-hook-form"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryUpdate, MediaService } from "../../../client"

const CategoryEdit: React.FC = () => {
  const { categoryId = "" } = useParams<string>()
  const navigate = useNavigate()
  const { register, handleSubmit, setError, watch, setValue } = useForm<CategoryUpdate>({
    refineCoreProps: {
      resource: "categories",
      action: "edit",
      id: categoryId,
    },
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const category = watch()

  useEffect(() => {
    if (category.thumbnail) {
      setPreview(`/public/categories/${category.name}/thumbnails/${category.thumbnail}`)
    }
  }, [category])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const onFinishHandler = async (data: CategoryUpdate) => {
    if (selectedFile) {
      try {
        setIsUploadLoading(true)
        const res = await MediaService.mediaUploadImages({
          formData: {
            category_name: data.name,
            image_files: [selectedFile],
          },
        })
        data.thumbnail = res.filenames[0]
        setIsUploadLoading(false)
      } catch (error) {
        console.log(error)
        setError("thumbnail", { message: "Upload failed. Please try again." })
        setIsUploadLoading(false)
      }
    }

    CategoriesService.categoriesUpdateCategory({ categoryId: parseInt(categoryId), requestBody: data })
      .then(() => navigate("/admin/categories"))
      .catch((error) => {
        console.log(error)
        setError("form", { message: "Category update failed. Please check the form data." })
      })
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <form onSubmit={handleSubmit(onFinishHandler)}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Edit Category
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
            <CardBody>
              {isUploadLoading && (
                <div className="fixed inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center">
                  <div className="flex items-center flex-col">
                    <Spinner />
                    <p className="mt-4 text-gray-700 text-lg">Saving...</p>
                  </div>
                </div>
              )}
              <div className="mb-2">
                Name
                <Input
                  {...register("name")}
                  type="text"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                URL Key
                <Input
                  {...register("url_key")}
                  type="text"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Thumbnail
                {preview && (
                  <div>
                    <img src={preview} alt="Selected Preview" style={{ width: "auto", height: "150px", border: "1px solid #ccc" }} />
                  </div>
                )}
                <Input
                  {...register("thumbnail")}
                  type="file"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  onChange={handleFileChange}
                />
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default CategoryEdit

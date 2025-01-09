import React, { useState, ChangeEvent } from "react"
import { useForm } from "@refinedev/react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Input, Spinner, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryCreate as CategoryCreateSchema, MediaService } from "../../../client"
import { useDarkMode } from "../../../contexts/DarkModeContext"

const CategoryCreate: React.FC = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, setError } = useForm<CategoryCreateSchema>({
    refineCoreProps: {
      resource: "categories",
      redirect: false,
    },
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploadLoading, setIsUploadLoading] = useState(false)
  const { isDarkMode } = useDarkMode()

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
    setPreview(file ? URL.createObjectURL(file) : null)
  }

  const onFinishHandler = async (data: CategoryCreateSchema) => {
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

    CategoriesService.categoriesCreateCategory({ requestBody: data })
      .then(() => navigate("/admin/categories"))
      .catch((error) => {
        console.log(error)
        setError("form", { message: "Category creation failed. Please check the form data." })
      })
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
                    New Category
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} color="red" size="sm">
                    Discard
                  </Button>
                  <Button className={`flex items-center gap-3 shadow-none hover:shadow-md ${isDarkMode ? "text-gray-200" : ""}`} color="black" size="sm" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className={isDarkMode ? "bg-gray-900" : ""}>
              {isUploadLoading && (
                <div className={`fixed inset-0 ${isDarkMode ? "bg-gray-900" : "bg-white"} bg-opacity-60 z-10 flex items-center justify-center`}>
                  <div className="flex items-center flex-col">
                    <Spinner className={isDarkMode ? "text-gray-200" : ""} />
                    <p className={`mt-4 text-lg ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Saving...</p>
                  </div>
                </div>
              )}
              <div className="mb-2">
                Name
                <Input
                  {...register("name")}
                  type="text"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
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
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
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
                    <img 
                      src={preview} 
                      alt="Selected Preview" 
                      style={{ width: "auto", height: "150px", border: isDarkMode ? "1px solid #4B5563" : "1px solid #ccc" }} 
                    />
                  </div>
                )}
                <Input
                  {...register("thumbnail")}
                  type="file"
                  className={`!border !border-gray-300 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10 ${
                    isDarkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
                  }`}
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  onChange={handleFileChange}
                  required
                />
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default CategoryCreate
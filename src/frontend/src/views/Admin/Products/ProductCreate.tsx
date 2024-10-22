import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Textarea, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryOut, ProductCreate as ProductCreateSchema, ProductsService } from "../../../client"


const ProductCreate: React.FC = () => {
  const { control, register, handleSubmit, reset } = useForm<ProductCreateSchema>()
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [categories, setCategories] = useState<CategoryOut[]>()

  useEffect(() => {
    CategoriesService.categoriesReadCategories({}).then((response) => setCategories(response))
  }, [])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value)
    const isChecked = event.target.checked

    if (isChecked) {
      setCategoryIds(prevIds => [...prevIds, categoryId])
    } else {
      setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId))
    }
  }

  const onSubmit = async (data: ProductCreateSchema) => {
    await ProductsService.productsCreateProduct({
      requestBody: {
        product_in: data,
        category_ids: categoryIds,
      }
    })
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <Card className="h-full w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    New Product
                  </Typography>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="red" size="sm">
                    Discard
                  </Button>
                  <button id="submit">
                    <Button className="flex items-center gap-3 shadow-none hover:shadow-md" color="black" size="sm">
                      Save
                    </Button>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div className="mb-2">
                Name
                <Input
                  {...register('name')}
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
                  {...register('url_key')}
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
                SKU
                <Input
                  {...register('sku')}
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
                Type
                <Input
                  {...register('type')}
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
                Cost
                <Input
                  {...register('cost')}
                  type="number"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('price')}
                  type="number"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('quantity')}
                  type="number"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Images
                <Input
                  {...register('images')}
                  type="file"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Short Description
                <Textarea
                  {...register('short_description')}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('description')}
                  resize={true}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('material')}
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
                Weight
                <Input
                  {...register('weight')}
                  type="number"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mb-2">
                Size
                <Input
                  {...register('size')}
                  type="text"
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  required
                />
              </div>
              <div className="mt-5 items-center">
                Categories
                {categories?.map(({ id, name }) => {
                  return (
                    <div className="flex">
                      <Checkbox value={id} onChange={handleCheckboxChange} /> 
                      <div className="flex items-center">{name}</div>
                    </div>
                  )
                })}
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
    </main>
  )
}

export default ProductCreate
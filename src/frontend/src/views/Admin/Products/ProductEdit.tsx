import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useForm } from "@refinedev/react-hook-form"
import { HttpError, BaseKey } from "@refinedev/core"
import { useParams, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, CardHeader, Checkbox, Input, Textarea, Typography } from "@material-tailwind/react"
import { CategoriesService, CategoryOut, ProductOut, ProductOutOpen, ProductUpdate, ProductsService } from "../../../client"
import ConfirmDialog from "../../../components/Admin/ConfirmDelete"

type FormData = {
  name: string
  url_key: string
  sku: string
  type: string
  cost: number
  price: number
  quantity: number
  images?: FileList
  short_description: string
  description: string
  material: string
  weight: number
  size: string
}

const ProductEdit: React.FC = () => {
  // const { control, register, handleSubmit, formState, reset } = useForm<FormData>()
  const { productId = "" } = useParams<string>()
  // const [product, setProduct] = useState<ProductOut>()
  const [categories, setCategories] = useState<CategoryOut[]>()
  const [categoryIds, setCategoryIds] = useState<number[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const navigate = useNavigate()


  const {
    saveButtonProps,
    register,
    control,
    handleSubmit,
    refineCore: { onFinish, query },
    formState: { errors },
    setValue,
    setError,
    watch,
  } = useForm<ProductUpdate, HttpError>({
    refineCoreProps: {
      resource: "products",
      action: "edit",
      id: productId,
    }
  })
  const product = query?.data?.data

  useEffect(() => {
    // ProductsService.productsReadProductById({
    //   productId: parseInt(productId),
    // }).then((response) => setProduct(response as ProductOut))
    CategoriesService.categoriesReadCategories({}).then((response) => setCategories(response))
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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(event.target.value)
    const isChecked = event.target.checked
    if (isChecked) {
      setCategoryIds(prevIds => [...prevIds, categoryId])
    } else {
      setCategoryIds(prevIds => prevIds.filter(id => id !== categoryId))
    }
  }

  const onFinishHandler = async (data: FormData) => {
    const originalCategoryIds = product.categories?.map(category => category.id)
    const removedCategoryIds = originalCategoryIds?.filter(id => !categoryIds.includes(id))
    const newCategoryIds = categoryIds.filter(id => !originalCategoryIds?.includes(id))
    if ((removedCategoryIds?.length ?? 0 > 0) || (newCategoryIds.length > 0)) {
      await ProductsService.productsReplaceProductCategories({
        productId: parseInt(productId),
        requestBody: categoryIds,
      })
    }

    onFinish(data).then(() => {
      navigate("/admin/products")
    })
  }

  const onSubmit = async (data: FormData) => {
    const updatedProduct: Partial<ProductUpdate> = Object.fromEntries(
      Object.entries(data).filter(([field]) => formState.dirtyFields[field as keyof FormData]))
      
    console.log("updatedProduct")
    console.log(updatedProduct)

    console.log("dirty fields")
    console.log(formState.dirtyFields)
    
    const res = await ProductsService.productsUpdateProduct({
      productId: parseInt(productId),
      requestBody: updatedProduct,
    })
    console.log(updatedProduct)
    console.log(res)
    if (product) {
      const originalCategoryIds = product.categories?.map(category => category.id)
      const removedCategoryIds = originalCategoryIds?.filter(id => !categoryIds.includes(id))
      const newCategoryIds = categoryIds.filter(id => !originalCategoryIds?.includes(id))
      if ((removedCategoryIds?.length ?? 0 > 0) || (newCategoryIds.length > 0)) {
        await ProductsService.productsReplaceProductCategories({
          productId: parseInt(productId),
          requestBody: categoryIds,
        })
      }
    }
  }

  const handleDelete = async () => {
    await ProductsService.productsDeleteProduct({ productId: parseInt(productId) })
    setDeleteDialogOpen(false)
    navigate('/admin/products')
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
                  defaultValue={product?.name}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
                />
              </div>
              <div className="mb-2">
                URL Key
                <Input
                  {...register('url_key')}
                  type="text"
                  defaultValue={product?.url_key}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('sku')}
                  type="text"
                  defaultValue={product?.sku}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('type')}
                  type="text"
                  defaultValue={product?.type}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('cost')}
                  type="number"
                  defaultValue={product?.cost}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('price')}
                  type="number"
                  defaultValue={product?.price}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('quantity')}
                  type="number"
                  defaultValue={product?.quantity}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('preorder')}
                  className="ml-2"
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
                  // required
                />
              </div>
              <div className="mb-2">
                Short Description
                <Textarea
                  {...register('short_description')}
                  defaultValue={product?.short_description}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('description')}
                  resize={true}
                  defaultValue={product?.description}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('material')}
                  type="text"
                  defaultValue={product?.material}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('weight')}
                  type="number"
                  defaultValue={product?.weight}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
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
                  {...register('size')}
                  type="text"
                  defaultValue={product?.size}
                  className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[80px]" }}
                  // required
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
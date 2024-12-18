import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductOut } from '../client'
import { CategoryOut, CategoriesService } from '../client'
import CategorySkeleton from '../components/Skeletons/CategorySkeleton'
import ProgressiveImage from '../components/ProgressiveImage'

const Category: React.FC = () => {
  const { urlKey = "" } = useParams<string>()
  const [category, setCategory] = useState<CategoryOut>()
  const [products, setProducts] = useState<ProductOut[] | undefined>([])

  useEffect(() => {
    CategoriesService.categoriesReadCategoryByUrlKey({
      "urlKey": urlKey
    }).then((response) => setCategory(response))
  }, [])
  
  useEffect(() => {
    setProducts(category?.products)
  }, [category])

  return (
    <>
      {category && products ? (
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
            <h2 className="my-5 font-semibold text-2xl mb-4">{category?.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {products?.map((product) => (
                <div className="grid col-span-1" key={product.url_key}>
                  <Link to={`/treasure/${product.url_key}`}>
                    <div className="bg-gray-50 border aspect-square relative rounded hover:scale-[1.03] transition-transform">
                      <ProgressiveImage
                        thumbnailSrc={`/public/products/${product.sku}/thumbnails/${product.images?.[0]?.replace(/(\.[^.]+)$/, '_thumbnail$1')}`}
                        hdSrc={`/public/products/${product.sku}/${product.images?.[0]}`}
                        alt={product.name}
                        spinner={false}
                      />
                      <div className="text-center font-semibold">{product.name}</div>
                      <div className="text-center font-semibold">£{product.price}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <CategorySkeleton />
      )}
    </>
  )
}

export default Category
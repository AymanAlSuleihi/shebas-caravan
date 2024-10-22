import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { Button, Carousel, IconButton } from '@material-tailwind/react'

import { ProductOut } from '../client'
import { CategoryOut, CategoriesService } from '../client'

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

//   useEffect(() => {
//     ProductsService.productsReadProductById({
//       "productId": parseInt(id)
//     }).then((response) => setProduct(response))
//   }, [])

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 font-semibold text-2xl mb-4">{category?.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {products?.map((product) => (
            <div className="grid col-span-1">
              <Link to={`/treasure/${product.url_key}`}>
                <div className="bg-gray-50 border aspect-square relative rounded">
                  <img src={product?.images?.[0]} className=""></img>
                  <div className="text-center font-semibold">{product.name}</div>
                  <div className="text-center font-semibold">£{product.price}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
          {/* <tr key={product.id}>
            {Object.values(product).map((val) => (
              <td>{val}</td>
            ))}
          </tr> */}
      </div>
    </main>
  )
}

export default Category
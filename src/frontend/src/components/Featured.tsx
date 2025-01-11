import React, { useEffect, useState } from "react"
import { ProductsService, ProductsOutOpen, ProductsOut } from "../client"
import { Link } from "react-router-dom"
import ProgressiveImage from "./ProgressiveImage"
import { CurrencyDisplay } from "./CurrencyDisplay"
import { useDarkMode } from "../contexts/DarkModeContext"
import FeaturedSkeleton from "./Skeletons/FeaturedSkeleton"

const Featured: React.FC = () => {
  const [products, setProducts] = useState<ProductsOutOpen | ProductsOut>()
  const [loading, setLoading] = useState(true)
  const { isDarkMode } = useDarkMode()

  useEffect(() => {
    ProductsService.productsReadProducts({
      sortField: "created_at",
      sortOrder: "asc",
      filters: '{"featured":true}',
    })
      .then((response) => setProducts(response))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <FeaturedSkeleton />
  }

  return (
    <div>
      {/* <h2 className="my-5 font-semibold text-2xl mb-4">Featured</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {products?.products?.map((product) => (
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
                      <span className="inline-block translate-y-[2px] font-bold">{product?.name_musnad}</span>
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
  )
}

export default Featured
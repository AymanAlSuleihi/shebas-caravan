import React, { useState, useEffect } from 'react'
import { Alert, Button, IconButton, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmblaOptionsType } from 'embla-carousel'

import Carousel from '../components/Carousel'
import { AlertMessage } from '../components/AlertMessage'
import { ProductOutOpen, ProductsService } from '../client'
import { useShoppingCart } from '../context/shoppingCartContext'
import { Link, useParams } from 'react-router-dom'
import TabsSection from '../components/TabsSection'
import ProductSkeleton from '../components/Skeletons/ProductSkeleton'


const OPTIONS: EmblaOptionsType = {}

const Product: React.FC = () => {
  const { urlKey = "" } = useParams<string>()
  const [product, setProduct] = useState<ProductOutOpen>()
  const [cartQuantity, setCartQuantity] = useState<number>(0)
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0)
  const [alertOpen, setAlertOpen] = useState<boolean>(false)
  const [addedAlertOpen, setAddedAlertOpen] = useState<boolean>(false)
  const [maxedAlertOpen, setMaxedAlertOpen] = useState<boolean>(false)
  const [alertContent, setAlertContent] = useState<string>()

  const {
    cartItems,
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart()

  useEffect(() => {
    ProductsService.productsReadProductByUrlKey({
      "urlKey": urlKey
    }).then((response) => setProduct(response))
  }, [cartItems])

  useEffect(() => {
    const quantity = getItemQuantity(product?.id!)
    setCartQuantity(quantity)
  }, [product])

  const tabsData = [
    {
      label: "Delivery",
      value: 0,
      desc:
      <>
        <div className="text-black">
          <h3 className="font-semibold text-lg mt-2">Fulfillment Times</h3>
          <ul className="list-disc pl-5">
            <li>
              <span className="font-semibold">Made-to-Order Items:</span> 
              Handcrafted with care, these pieces take 2–4 weeks to fulfill.
            </li>
            <li>
              <span className="font-semibold">In-Stock Items:</span> 
              These are shipped within 2 business days of your order being placed.
            </li>
          </ul>

          <h3 className="font-semibold text-lg mt-2">Shipping Options</h3>
          <ul className="list-disc pl-5">
            <li>
              <span className="font-semibold">Free Domestic Shipping:</span> 
              We offer free shipping within the UK on all orders, 
              ensuring you receive your jewellery at no extra cost.
            </li>
            <li>
              <span className="font-semibold">Worldwide Shipping:</span> 
              International shipping is available upon request. 
              Please contact us for rates and delivery times.
            </li>
          </ul>

          <h3 className="font-semibold text-lg mt-2">Tracking & Delivery</h3>
          <p>
            Once your order is shipped, you will receive a confirmation email with a tracking number (if applicable). Delivery times may vary depending on your location, but we strive to ensure prompt and reliable service.
          </p>

          <p className="mt-2">
            For international shipments, customs clearance may extend delivery times. Any applicable customs duties or taxes are the responsibility of the recipient.
          </p>
        </div>
      </>
    },
    {
      label: "Returns",
      value: 1,
      desc:
      <>
        <div className="text-black">
          <p>
            At Sheba's Caravan, we want you to be completely satisfied with your purchase.
            If for any reason you are not entirely happy with your order,
            we offer a hassle-free returns policy.
          </p>

          <h3 className="font-semibold text-lg mt-2">Return Conditions</h3>
          <ul className="list-disc pl-5">
              <li>Items must be returned within 30 days of purchase.</li>
              <li>Items must be undamaged, and in their original packaging.</li>
              <li>Customized or personalized items are not eligible for returns.</li>
          </ul>

          <h3 className="font-semibold text-lg mt-2">How to Return</h3>
          <p>
            To initiate a return, please contact our customer service team
            at <a className="font-semibold" href="mailto:contact@shebascaravan.com">contact@shebascaravan.com</a> with
            your order details. We will provide you with a return authorization and instructions
            for returning the item(s).
          </p>

          <h3 className="font-semibold text-lg mt-2">Refunds</h3>
          <p>
            Once we receive your returned item(s) and verify that they meet our return conditions,
            we will process your refund within 7 business days.
            Refunds will be issued to the original payment method.
          </p>

          <h3 className="font-semibold text-lg mt-2">Exchanges</h3>
          <p>
            If you would like to exchange an item for a different size or style,
            please contact our customer service team to arrange the exchange.
            Additional charges may apply for exchanges of higher value items.
          </p>

          <h3 className="font-semibold text-lg mt-2">Questions?</h3>
          <p>
            If you have any questions or concerns about our returns policy,
            feel free to contact us at <a className="font-semibold" href="mailto:contact@shebascaravan.com">contact@shebascaravan.com</a>.
            We're here to help!
          </p>
        </div>
      </>
    },
    {
      label: "Care",
      value: 2,
      desc:
      <>
        <div className="text-black">
          <h2 className="text-l font-semibold">Silver</h2>
          <p>Avoid chemicals, store in a dry place, and clean with a soft cloth.</p>
          <h2 className="text-l font-semibold mt-2">Gold Plated</h2>
          <p>Protect from perfumes and lotions, clean gently, and store separately.</p>
          <h2 className="text-l font-semibold mt-2">General Tips</h2>
          <p>Remove jewellery during activities, check settings regularly, and handle with care.</p>
        </div>
        <div className="text-black mt-4">
          <p>For full care instructions, visit our <Link to="/care" className="font-semibold text-gray-700 hover:text-gray-600 transition">care guide</Link></p>
        </div>
      </>
    },
  ]

  return (
    <>
      {product ? (
        <main className="flex-grow bg-gray-50">
          <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
            <div className="md:flex">
              <div className="flex w-full md:w-3/5 h-fit">
                <Carousel slides={product?.images?.map(image => ({
                  thumbnailSrc: `/public/products/${product?.sku}/thumbnails/${image.replace(/(\.[^.]+)$/, '_thumbnail$1')}`,
                  hdSrc: `/public/products/${product?.sku}/${image}`
                }))} options={OPTIONS}/>
              </div>
              <div className="flex w-full md:w-2/5 md:ml-5 place-content-start">
                <div className="w-full">
                  <div className="flex my-4 pb-2 border-b border-gray-400">
                    <div className="flex-grow font-semibold text-2xl">{product?.name}</div>
                    <div className="flex-none mr-5 text-2xl">£{product?.price}</div>
                  </div>
                  {/* <p>sku: {product?.sku}</p> */}
                  <div>{product?.description}</div>
                  <div className="my-5">
                    <table>
                      <tbody>
                        <tr>
                          <td className="pr-5 font-semibold">Material</td>
                          <td>{product?.material}</td>
                        </tr>
                        <tr>
                          <td className="pr-5 font-semibold">Weight</td>
                          <td>{product?.weight}g</td>
                        </tr>
                        <tr>
                          <td className="pr-5 font-semibold">Size</td>
                          <td>{product?.size}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="relative">
                    {alertContent && 
                      <div className="absolute block translate-y-14 w-full z-50">
                        <AlertMessage variant="outlined" className="!bg-gray-50 border-gray-400 border rounded" timeout={3000} onClose={() => setAlertContent("")}>
                          {alertContent}
                        </AlertMessage>
                      </div>
                    }
                    {product && product.quantity > 0 ?
                      <Button
                        variant="outlined"
                        ripple={false}
                        className="w-full rounded border-gray-400 my-2"
                        onClick = { () => {
                          if (cartQuantity < product.quantity) {
                            increaseQuantity(product.id)
                            // Show alert with content "Treasure added to cart."
                            setAlertContent("Treasure added to cart.")
                            console.log("alert content set - add")
                          } else {
                            setAlertContent(`Sorry, we only have ${product.quantity} of this treasure available.`)
                            console.log("alert content set - maxed")
                            // Show alert with content "Sorry, we only have {product?.quantity} of this treasure available."
                          }
                        }}
                      >Add to Cart</Button>
                      : 
                      product &&
                      <Button
                        variant="outlined"
                        ripple={false}
                        className="w-full rounded border-gray-400 my-2"
                        style={{opacity: 0.9}}
                        disabled
                      >Out of Stock</Button>
                    }
                  </div>
                  <div className="my-5">
                    <TabsSection tabsData={tabsData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <ProductSkeleton />
      )}
    </>
  )
}

export default Product
import React, { useState, useEffect } from "react"
import { Accordion, AccordionHeader, AccordionBody, Button } from "@material-tailwind/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { EmblaOptionsType } from "embla-carousel"

import Carousel from "../components/Carousel"
import { AlertMessage } from "../components/AlertMessage"
import { ProductOutOpen, ProductsService } from "../client"
import { useShoppingCart } from "../contexts/ShoppingCartContext"
import { Link, useParams } from "react-router-dom"
import TabsSection from "../components/TabsSection"
import ProductSkeleton from "../components/Skeletons/ProductSkeleton"
import ShippingCalculator from "../components/ShippingCalculator"
import { CurrencyDisplay } from "../components/CurrencyDisplay"
import { useDarkMode } from "../contexts/DarkModeContext"

const OPTIONS: EmblaOptionsType = {}

const Product: React.FC = () => {
  const { urlKey = "" } = useParams<string>()
  const [product, setProduct] = useState<ProductOutOpen>()
  const [cartQuantity, setCartQuantity] = useState<number>(0)
  const [alertContent, setAlertContent] = useState<string>()

  const [open, setOpen] = useState<boolean>(false)
  const [tabsOpen, setTabsOpen] = useState<boolean>(false)
  const { isDarkMode } = useDarkMode()

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleTabsOpen = () => {
    setTabsOpen(!tabsOpen)
  }

  const {
    cartItems,
    getItemQuantity,
    increaseQuantity,
  } = useShoppingCart()

  useEffect(() => {
    ProductsService.productsReadProductByUrlKey({
      "urlKey": urlKey
    }).then((response) => setProduct(response))
  }, [cartItems])

  useEffect(() => {
    if (product) {
      const quantity = getItemQuantity(product.id)
      setCartQuantity(quantity)
    }
  }, [product])

  const tabsData = [
    {
      label: <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Delivery</span>,
      value: 0,
      desc:
      <>
        <div className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
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
      label: <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Returns</span>,
      value: 1,
      desc:
      <>
        <div className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
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
      label: <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Care</span>,
      value: 2,
      desc:
      <>
        <div className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
          <h2 className="text-l font-semibold">Silver</h2>
          <p>Avoid chemicals, store in a dry place, and clean with a soft cloth.</p>
          <h2 className="text-l font-semibold mt-2">Gold Plated</h2>
          <p>Protect from perfumes and lotions, clean gently, and store separately.</p>
          <h2 className="text-l font-semibold mt-2">General Tips</h2>
          <p>Remove jewellery during activities, check settings regularly, and handle with care.</p>
        </div>
        <div className={`mt-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
          <p>For full care instructions, visit our <Link to="/care" className="font-semibold hover:text-gray-600 transition">care guide</Link></p>
        </div>
      </>
    },
  ]

  return (
    <>
      {product ? (
        <main className={`flex-grow ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
          <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
            <div className="md:flex">
              <div className="flex w-full md:w-3/5 h-fit">
                <Carousel slides={product?.images?.map(image => ({
                  thumbnailSrc: `/public/products/${product?.sku}/thumbnails/${image.replace(/(\.[^.]+)$/, "_thumbnail$1")}`,
                  hdSrc: `/public/products/${product?.sku}/${image}`
                }))} options={OPTIONS}/>
              </div>
              <div className="flex w-full md:w-2/5 md:ml-5 place-content-start">
                <div className="w-full">
                  <div className="flex my-4 pb-2 border-b border-gray-400">
                    <div className="flex-grow font-semibold text-2xl">
                      <span>{product?.name}</span>
                      {product?.name_musnad &&
                        <>
                          <span className="inline-block -translate-y-[1px] mx-[10px]">|</span>
                          <span className="inline-block translate-y-[3px] font-bold">{product?.name_musnad}</span>
                        </>
                      }
                    </div>
                    <div className="flex-none mr-5 text-2xl">
                      <CurrencyDisplay baseAmount={product?.price || 0} />
                    </div>
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
                      <div className="absolute block -translate-y-14 w-full z-50">
                        <AlertMessage variant="outlined" className={`${isDarkMode ? "bg-gray-900 border-gray-600 text-gray-200" : "bg-gray-50 border-gray-400 text-gray-900"} border rounded`} timeout={3000} onClose={() => setAlertContent("")}>
                          {alertContent}
                        </AlertMessage>
                      </div>
                    }
                    {product && product.quantity > 0 ?
                      <Button
                        variant="outlined"
                        ripple={false}
                        className={`w-full rounded ${isDarkMode ? "border-gray-600 text-gray-200" : "border-gray-400 text-gray-900"} my-2`}
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
                        className={`w-full rounded ${isDarkMode ? "border-gray-600 text-gray-200" : "border-gray-400 text-gray-900"} my-2`}
                        style={{opacity: 0.9}}
                        disabled
                      >Out of Stock</Button>
                    }
                  </div>
                  <div className="my-5">
                    <Accordion open={open}>
                      <AccordionHeader onClick={handleOpen}>
                        <div className="flex items-center justify-between w-full">
                          <span className={`${isDarkMode ? "text-gray-200": "text-gray-900"}`}>Shipping Estimate</span>
                          <FontAwesomeIcon
                            icon={open ? faChevronUp : faChevronDown}
                            className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                          />
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <p className={`mb-3 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                          This is just an estimate. The final shipping cost will be calculated at checkout.
                        </p>
                        <ShippingCalculator productId={product?.id} />
                      </AccordionBody>
                    </Accordion>
                  </div>
                  <div className="my-5">
                    <Accordion open={tabsOpen}>
                      <AccordionHeader onClick={handleTabsOpen}>
                        <div className="flex items-center justify-between w-full">
                          <span className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>More Information</span>
                          <FontAwesomeIcon
                            icon={tabsOpen ? faChevronUp : faChevronDown}
                            className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
                          />
                        </div>
                      </AccordionHeader>
                      <AccordionBody>
                        <TabsSection tabsData={tabsData} />
                      </AccordionBody>
                    </Accordion>
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
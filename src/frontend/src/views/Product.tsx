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

  // const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
  // const [isOpen,setIsOpen] = useState(false)

  // const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity,0)

  // const openCart = () => setIsOpen(true)
  // const closeCart = () => setIsOpen(false)

  // const getItemQuantity = (id:number) =>{
  //   return cartItems.find(items => items.id === id) ?.quantity || 0
  // }

  // const increaseQuantity = (id:number) =>{
  //   setCartItems(currentItems =>{
  //     if(currentItems.find(item => item.id === id) == null){
  //       return [...currentItems, { id, quantity:1 }]
  //     }else{
  //       return currentItems.map(item =>{ 
  //         if(item.id === id){
  //           return { ...item, quantity:item.quantity + 1 }
  //         }else{
  //           return item
  //         }
  //       })
  //     }
  //   })
  // }

  // const decreaseQuantity = (id:number) =>{
  //   setCartItems(currentItems =>{
  //     if(currentItems.find(item => item.id === id)?.quantity === 1){
  //       return currentItems.filter(item => item.id !== id)
  //     }else{
  //       return currentItems.map(item =>{ 
  //         if(item.id === id){
  //           return {...item,quantity:item.quantity - 1}
  //         }else{
  //           return item
  //         }
  //       })
  //     }
  //   })
  // }

  // const removeFromCart = (id:number) =>{
  //   setCartItems(currentItems =>{
  //     return currentItems.filter( item => item.id !== id )
  //   })
  // }

  // const isInCart = (productId: number):boolean => Object.keys(cart || {}).includes(productId.toString())

  // useEffect(() => {
  //   setAlertContent("")
  // }, [alertContent])

  useEffect(() => {
    ProductsService.productsReadProductByUrlKey({
      "urlKey": urlKey
    }).then((response) => setProduct(response))
    const quantity = getItemQuantity(product?.id!)
    setCartQuantity(quantity)
  }, [cartItems])

  const tabsData = [
    // {
    //   label: "Description",
    //   value: 0,
    //   desc: ``,
    // },
    // {
    //   label: "Sizing",
    //   value: 0,
    //   desc:
    //   <>
    //     <div className="flex">
    //       {/* <div className="flex w-1/2">
    //         Used to a different ring size format? Use this calculator to convert it to something familiar.
    //       </div>
    //       <div className="flex mx-auto">
    //         <RingSizeConverter />
    //       </div> */}
    //     </div>
    //   </>
    // },
    {
      label: "Care",
      value: 0,
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
      </>,
    },
  ]

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="md:flex">
          <div className="flex w-full md:w-3/5 h-fit">
            <Carousel slides={product?.images?.map(image => `/public/products/${product?.sku}/${image}`)} options={OPTIONS}/>
            {/* <Carousel
              loop={true}
              className="rounded-xl"
              prevArrow={({ loop, handlePrev, firstIndex }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handlePrev}
                  disabled={!loop && firstIndex}
                  className="!absolute top-2/4 left-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </IconButton>
              )}
              nextArrow={({ loop, handleNext, lastIndex }) => (
                <IconButton
                  variant="text"
                  color="black"
                  size="lg"
                  onClick={handleNext}
                  disabled={!loop && lastIndex}
                  className="!absolute top-2/4 right-4 -translate-y-2/4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </IconButton>
              )}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-gray-800" : "w-4 bg-gray-800/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {product?.images?.map((imgSrc, index) => (<img src={imgSrc} key={index} alt=""/>))}
            </Carousel> */}
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
              {/* <div className="grid grid-cols-2 my-5">
                <div className="">Material: Gold plated brass</div>
                <div className="">Weight: 3g</div>
                <div className="">Dimensions: 5cm x 5cm</div>
              </div> */}
              {/* <p>Sold</p> */}
              {/* <div className="border border-gray-500 rounded h-9 mb-2 w-fit ml-auto">
                <Button
                  variant="text"
                  size="sm"
                  className="p-3 mb-px hover:bg-transparent active:bg-transparent"
                  ripple={false}
                  onClick={() => product?.id && decreaseQuantity(product.id)}
                  disabled={cartQuantity === 1}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                  />
                </Button>
                {cartQuantity > 0 && cartQuantity || 1}
                <Button
                  variant="text"
                  size="sm"
                  className="p-3 mb-px hover:bg-transparent active:bg-transparent"
                  ripple={false}
                  onClick={() => product?.id && increaseQuantity(product.id)}
                  disabled={(cartQuantity || 0) >= product?.quantity!}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                  />
                </Button>
              </div> */}
              <div className="relative">
                {alertContent && 
                  <div className="absolute block translate-y-14 w-full z-50">
                    <AlertMessage variant="outlined" className="!bg-gray-50 border-gray-500 border rounded" timeout={3000} onClose={() => setAlertContent("")}>
                      {alertContent}
                    </AlertMessage>
                  </div>
                }
                {product?.quantity! > 0 ?
                  <Button
                    variant="outlined"
                    ripple={false}
                    className="w-full rounded border-gray-500 my-2"
                    onClick = { () => {
                      if (cartQuantity < product?.quantity!) {
                        increaseQuantity(product!.id)
                        // Show alert with content "Treasure added to cart."
                        setAlertContent("Treasure added to cart.")
                        console.log("alert content set - add")
                      } else {
                        setAlertContent(`Sorry, we only have ${product?.quantity} of this treasure available.`)
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
                    className="w-full rounded border-gray-500 my-2"
                    style={{opacity: 0.9}}
                    disabled
                  >Out of Stock</Button>
                }
              </div>
              <div className="my-5">
                <TabsSection tabsData={tabsData} />
              </div>
              {/* <AlertMessage variant="outlined" timeout={3000}>{alertContent}</AlertMessage> */}

              {/* <Alert variant="outlined" open={alertOpen} className="rounded">Treasure added to cart.</Alert>
              <Alert variant="outlined" open={addedAlertOpen} className="rounded">Treasure added to cart.</Alert>
              <Alert variant="outlined" open={maxedAlertOpen} className="rounded">Sorry, we only have {product?.quantity} of this treasure available.</Alert> */}
              {/* <Popover>
                <PopoverHandler>
                  <Button
                    variant="outlined"
                    ripple={false}
                    className="rounded border-gray-500"
                    onClick = { () => increaseQuantity(product!.id) }
                  >Add to Cart</Button>
                </PopoverHandler>
                <PopoverContent>
                  Treasure added to cart.
                </PopoverContent>
              </Popover> */}
            </div>
          </div>
        </div>
        {/* <div className="my-5"> */}
          {/* <p>{product?.description}</p> */}
          {/* <TabsSection tabsData={tabsData} /> */}
          {/* <RingSizeConverter /> */}
        {/* </div> */}
      </div>
    </main>
  )
}

export default Product
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'

import { CartItem, useShoppingCart } from '../context/shoppingCartContext'
import { PaymentsService, ProductOutOpen } from '../client'
import { ProductsService } from '../client'
import { Button } from '@material-tailwind/react'

type OrderSummaryProps = {
  editable: boolean
  productsIn?: ProductOutOpen[]
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ editable }: OrderSummaryProps) => {
  const { 
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
  } = useShoppingCart()

  const [products, setProducts] = useState<ProductOutOpen[]>([])
  const [orderTotal, setOrderTotal] = useState<number>(0)

  const initialized = useRef(false)
  useEffect(() => {
    if (!initialized.current || products.length > 0) {
      initialized.current = true
      // let tempProducts: ProductOut[] = []
      // if (products.length > 0) {
      //   tempProducts = products
      // }
      const existingProductIds = new Set(products.map(product => product.id))
      {cartItems.forEach(item => {
        if (!existingProductIds.has(item.id)) {
          ProductsService.productsReadProductById({
            "productId": item.id,
          }).then((response) => setProducts((prev) => [...prev, response]))
        }
      })}

      const cartItemIds = new Set(cartItems.map(item => item.id))
      const filteredProducts = products.filter(product => cartItemIds.has(product.id))
      setProducts(filteredProducts)
    }

    cartItems.map(item => {
      const quantity = products.find(product => product.id === item.id)?.quantity
      console.log(item.id, item.quantity, quantity)
      if (quantity != null && (item.quantity > quantity)) {
        if (quantity == 0) {
          removeFromCart(item.id)
        } else {
          updateQuantity(item.id, quantity)
        }
      }
    })

    let items: CartItem[]
    // if (!initialized.current) {
    //   initialized.current = true
    //   {cartItems.map(item => (
    //     ProductsService.productsReadProductById({
    //       "productId": item.id,
    //     }).then((response) => setProducts((prev) => [...prev, response]))
    //   ))}
    //   const updatedProducts = products.filter(product => {
    //     return cartItems.some(cartItem => cartItem.id === product.id)
    //   })
    //   setProducts(updatedProducts)
    // }

    // if (products.length > 0) {
    //   tempProducts = products
    // }
    // const existingProductIds = new Set(tempProducts.map(product => product.id))
    // {cartItems.forEach(item => {
    //   if (!existingProductIds.has(item.id)) {
    //     ProductsService.productsReadProductById({
    //       "productId": item.id,
    //     }).then((response) => {
    //       tempProducts.concat(response)
    //       setProducts((prev) => [...prev, response])
    //     })
    //   }
    // })}

    // const updatedProducts = products.filter(product => {
    //   return cartItems.some(cartItem => cartItem.id === product.id)
    // })
    // setProducts(updatedProducts)

    items = cartItems
    if (items) {
      PaymentsService.paymentsCalculateOrderTotal({
        "requestBody": items,
      }).then((response) => setOrderTotal(response))
    }
  }, [cartItems])

  return (
    <div className="">
      {products.length > 0 ?
        <div className="w-full">
          <div className="flex border-t w-full">
            <ul className="w-full">
              {products.map(product => (
                <li key={product.id} className="py-4 border-b">
                  <div className="flex">
                    <div className="flex w-1/6 min-w-28">
                      <Link to={`/treasure/${product.url_key}`}>
                        <img src={`/public/products/${product?.sku}/${product?.images?.[0]}`} className="h-28 w-28"></img>
                      </Link>
                    </div>
                    <div className="flex flex-col md:flex-row w-4/6">
                      <div className="flex items-center md:w-1/2 md:mr-10">
                        <Link to={`/treasure/${product.url_key}`} className="w-full font-semibold">{product.name}</Link>
                      </div>
                      <div className="flex font-semibold items-center md:w-1/2 mt-auto md:mt-0">
                        <div className="mr-auto">
                          {editable && 
                            <Button
                              variant="text"
                              size="sm"
                              className="p-3 mb-px hover:bg-transparent active:bg-transparent"
                              ripple={false}
                              onClick={() => decreaseQuantity(product.id)}
                              disabled={cartItems.find(item => item.id === product.id)?.quantity == 1}
                            >
                              <FontAwesomeIcon
                                icon={faMinus}
                              />
                            </Button>
                          }
                          {cartItems.find(item => item.id === product.id)?.quantity}
                          {editable && 
                            <Button
                              variant="text"
                              size="sm"
                              className="p-3 mb-px hover:bg-transparent active:bg-transparent"
                              ripple={false}
                              onClick={() => increaseQuantity(product.id)}
                              disabled={(cartItems.find(item => item.id === product.id)?.quantity || 0) >= product.quantity}
                            >
                              <FontAwesomeIcon
                                icon={faPlus}
                              />
                            </Button>
                          }
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col-reverse md:flex-row w-1/6 items-center">
                      <div className="ml-auto">
                        <div className="font-semibold ml-auto mb-auto">
                          £{(cartItems.find(item => item.id === product.id)?.quantity || 0) * product.price}
                        </div>
                      </div>
                      {editable && 
                        <div className="items-center ml-auto mb-auto md:mb-0">
                          <Button
                            variant="text"
                            size="sm"
                            className="mb-px p-3 pt-1 md:pt-3 hover:bg-transparent active:bg-transparent"
                            ripple={false}
                            onClick={() => removeFromCart(product.id)}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </Button>
                        </div>
                      }
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex font-semibold flex-col max-w-[432px] ml-auto mt-5">
            <div className="flex place-content-between">
              <div className="flex">Subtotal</div>
              <div className="flex">£{orderTotal}</div>
            </div>
            <div className="flex place-content-between">
              <div className="flex">Shipping</div>
              <div className="flex">£0</div>
            </div>
            <div className="flex place-content-between">
              <div className="flex">Tax</div>
              <div className="flex">£0</div>
            </div>
            <div className="flex place-content-between border-t py-1">
              <div className="flex">Order Total</div>
              <div className="flex">£{orderTotal}</div>
            </div>
          </div>
        </div>
        :
        <div className="my-4 font-semibold text-center">Cart Empty</div>
      }
    </div>
  )
}

export default OrderSummary
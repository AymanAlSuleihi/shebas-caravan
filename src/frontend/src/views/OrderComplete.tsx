import React, { useEffect, useState } from 'react'

import { useShoppingCart } from "../context/shoppingCartContext"
import { OrderOutOpen, OrdersService } from "../client"
import { Link } from 'react-router-dom'


const OrderComplete: React.FC = () => {
  const { clearCart } = useShoppingCart()
  const [order, setOrder] = useState<OrderOutOpen>()
  const queryParameters = new URLSearchParams(window.location.search)
  const paymentIntent = queryParameters.get("payment_intent")

  useEffect(() => {
    const fetchData = async () => {
      if (paymentIntent) {
        console.log("fetching")
        OrdersService.ordersReadOrderByPaymentId({
          paymentId: paymentIntent
        }).then((response) => setOrder(response))
      }
    }
    fetchData()
    return () => {
      clearCart()
    }
  }, [paymentIntent])

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 font-semibold text-2xl mb-4">🌟 A Glittering Tale: Your Order is En Route!</h2>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex w-full lg:w-1/2 border bg-white rounded p-5">
            <p>Greetings, Adventurer of Elegance,<br /><br />

              With great joy, we announce the completion of your quest to adorn yourself with treasures from Sheba's Caravan! Behold, your order has been confirmed and set upon its wondrous journey to your doorstep.<br /><br />

              In the heart of Sheba's Caravan, where jewels whisper tales of ancient lands and shimmering sands, your selection was carefully chosen by our skilled artisans. Each gem, a star in its own right, now eagerly anticipates the moment it graces your presence.<br /><br />

              As the caravan sets forth, accompanied by the whispers of a thousand dreams, we extend our deepest gratitude for entrusting us with your adornment. Your support fuels our passion and drives us to new horizons of beauty and wonder.<br /><br />

              Should you seek counsel or wish to share tales of your newfound treasures, our humble guides await your call at contact@shebascaravan.com. For in the tapestry of Sheba's Caravan, every adventurer finds solace and kinship.<br /><br />

              With hearts aglow and stars as our guides, we bid you farewell until we meet again, dear traveler.<br /><br />

              Shine on, radiant soul,<br /><br />

              Sheba's Caravan</p>
          </div>
          <div className="flex w-full lg:w-1/2 border bg-white rounded p-5">
            <div className="w-full">
              <div className="w-full font-semibold text-xl">Order #{order?.id}</div>
              <ul className="w-full">
                {order?.ordered_product_data?.map(product => (
                  <li key={product.id} className="py-4 border-b">
                    <div className="flex">
                      <div className="flex w-1/6 min-w-28">
                        <Link to={`/treasure/${product.url_key}`}>
                          <img src={product.images?.[0]} className="h-28 w-28"></img>
                        </Link>
                      </div>
                      <div className="flex flex-col md:flex-row w-4/6">
                        <div className="flex items-center md:w-1/2 md:mr-10">
                          <Link to={`/treasure/${product.url_key}`} className="w-full font-semibold">{product.name}</Link>
                        </div>
                        <div className="flex font-semibold items-center md:w-1/2 mt-auto md:mt-0">
                          <div className="mr-auto">
                            {product.order_quantity}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col-reverse md:flex-row w-1/6 items-center">
                        <div className="ml-auto">
                          <div className="font-semibold ml-auto mb-auto">
                            £{product.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex font-semibold flex-col max-w-[432px] ml-auto mt-5">
                <div className="flex place-content-between">
                  <div className="flex">Subtotal</div>
                  <div className="flex">£{order?.amount}</div>
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
                  <div className="flex">£{order?.amount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default OrderComplete
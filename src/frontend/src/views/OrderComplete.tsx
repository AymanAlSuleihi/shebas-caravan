import React, { useEffect, useState } from 'react'

import { useShoppingCart } from "../context/shoppingCartContext"
import { OrderOutOpen, OrdersService } from "../client"
import { Link } from 'react-router-dom'
import { CurrencyDisplay } from '../components/CurrencyDisplay'


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
        <h2 className="my-5 font-semibold text-2xl mb-4">Thank You for Your Order!</h2>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/2 border bg-white rounded p-5 space-y-3">
            <p>Your order has been placed successfully, and the artisan of Sheba's Caravan is now preparing your treasure. Each piece in our collection carries the essence of ancient craftsmanship, and soon it will be on its way to you, ready to become part of your story.</p>
            <p>A confirmation email with all the details has been sent to you via our carrier pigeon. Please check your inbox (and spam folder, just in case).</p>
            <p className="font-semibold">What's next?</p>
            <ul className="list-disc ml-5">
              <li>Some of our treasures are crafted specially after an order is placed. Our artisan will begin crafting it with care and precision.</li>
              <li>Once completed, your order will be carefully packaged to ensure it reaches you in perfect condition.</li>
              <li>After shipping, you’ll receive a tracking link to follow your treasure’s journey to your door.</li>
            </ul>
            <p>
              Feel free to contact us anytime at  {" "}
              <a
                href="mailto:contact@shebascaravan.com"
                className="text-gray-800 hover:text-gray-700 transition"
              >
                contact@shebascaravan.com
              </a>  {" "}
              or visit our Instagram {" "}
              <a
                href="https://www.instagram.com/shebascaravan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-700 transition"
                aria-label="Instagram"
              >
                @shebascaravan
              </a>.
              We are here to ensure your experience is as timeless as our jewellery.
            </p>
            <p className="font-semibold">Sheba's Caravan</p>
          </div>
          <div className="flex w-full lg:w-1/2 border bg-white rounded p-5">
            <div className="w-full">
              <div className="w-full font-semibold text-xl">Order #{order?.id}</div>
              <ul className="w-full">
                {order?.ordered_product_data?.map(product => (
                  <li key={product.id} className="py-4 border-b">
                    <div className="flex">
                      <div className="flex w-1/6 min-w-28 mr-8">
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
                            {product.order_quantity}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col-reverse md:flex-row w-1/6 items-center">
                        <div className="ml-auto">
                          <div className="font-semibold ml-auto mb-auto">
                            <CurrencyDisplay
                              baseAmount={(order?.payment_breakdown?.base?.products?.[product.id]?.total)!}
                              overrideSelectedCurrency={order?.payment_breakdown?.currency}
                              overrideConvertedAmount={(order?.payment_breakdown?.converted?.products?.[product.id]?.total)!}
                            />
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
                  <div className="flex">
                    <CurrencyDisplay
                      baseAmount={(order?.payment_breakdown?.base?.totals?.subtotal)!}
                      overrideSelectedCurrency={order?.payment_breakdown?.currency}
                      overrideConvertedAmount={(order?.payment_breakdown?.converted?.totals?.subtotal)!}
                    />
                  </div>
                </div>
                <div className="flex place-content-between">
                  <div className="flex">Shipping</div>
                  <div className="flex">
                    <CurrencyDisplay
                      baseAmount={(order?.payment_breakdown?.base?.totals?.shipping)!}
                      overrideSelectedCurrency={order?.payment_breakdown?.currency}
                      overrideConvertedAmount={(order?.payment_breakdown?.converted?.totals?.shipping)!}
                    />
                  </div>
                </div>
                <div className="flex place-content-between">
                  <div className="flex">Tax</div>
                  <div className="flex">
                    <CurrencyDisplay
                      baseAmount={(order?.payment_breakdown?.base?.totals?.tax)!}
                      overrideSelectedCurrency={order?.payment_breakdown?.currency}
                      overrideConvertedAmount={(order?.payment_breakdown?.converted?.totals?.tax)!}
                    />
                  </div>
                </div>
                <div className="flex place-content-between border-t py-1">
                  <div className="flex">Order Total</div>
                  <div className="flex">
                    <CurrencyDisplay
                      baseAmount={(order?.payment_breakdown?.base?.totals?.total)!}
                      overrideSelectedCurrency={order?.payment_breakdown?.currency}
                      overrideConvertedAmount={(order?.payment_breakdown?.converted?.totals?.total)!}
                    />
                  </div>
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
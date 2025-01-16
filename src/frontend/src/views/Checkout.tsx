import React, { useState, useEffect, useRef } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react"

import PaymentForm from "../components/PaymentForm"
import OrderSummary from "../components/OrderSummary"
import { CustomersService, CustomerCreate, PaymentsService, UtilsService, OrdersService, ShippingRateOut, ShippingRateOutOpen, CartUpdate } from "../client"
import { useShoppingCart } from "../contexts/ShoppingCartContext"
import CustomerForm from "../components/CustomerForm"
import OrderForm, { OrderFormData } from "../components/OrderForm"
import FinalShipping from "../components/FinalShipping"
import { useCurrencyContext } from "../contexts/CurrencyContext"
import { CartsService } from "../client"
import { useDarkMode } from "../contexts/DarkModeContext"

const stripePromise = loadStripe("pk_test_51OkcLtHgrnxDRk3HNphUOyZbJeUiTQFNFol6TcRJIv7nPGePPzglvsbj0JlWnLm6XF0aW1nU06fNKFBzb0bKNMOh001eto7j59")

const Checkout: React.FC = () => {
  const { cartItems } = useShoppingCart()
  const { selectedCurrency } = useCurrencyContext()!
  const [clientSecret, setClientSecret] = useState("")

  const [countryId, setCountryId] = useState<number | undefined>()
  const [shippingRate, setShippingRate] = useState<ShippingRateOut | ShippingRateOutOpen | undefined>()

  const [orderTotal, setOrderTotal] = useState<number>(0)

  const [currentStage, setCurrentStage] = useState<number>(1)
  const [open, setOpen] = React.useState(1)
  const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value)

  const [cartId, setCartId] = useState<string>()
  const [customerEmail, setCustomerEmail] = useState<string>()
  const [customerId, setCustomerId] = useState<number>()

  const { isDarkMode } = useDarkMode()

  console.log("cartId", cartId)

  const handleContinue = (stage: number) => {
    const nextStage = stage + 1
    setCurrentStage(nextStage)
    setOpen(open === nextStage ? 0 : nextStage)
    // console.log(email)
  }

  const customerFormSubmit = (customerEmail: string) => {
    console.log("customerFormSubmit", customerEmail)
    setCustomerEmail(customerEmail)
    handleContinue(1)
  }

  const [orderForm, setOrderForm] = useState<OrderFormData>()
  const orderFormSubmit = (data: OrderFormData) => {
    setOrderForm(data)
    handleContinue(2)
  }

  const shippingFormSubmit = () => {
    console.log("shippingFormSubmit")
    initialized.current = false
    handleContinue(3)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (orderForm) {
        const customerData: CustomerCreate = {
          email: customerEmail!,
          first_name: orderForm!.first_name,
          last_name: orderForm!.last_name,
        }
        try {
          const customer = await CustomersService.customersCreateCustomer({
            "requestBody": customerData,
          })
          setCustomerId(customer.id)
        } catch (err: unknown) {
          if (typeof err === "object" && err !== null && "status" in err && err.status === 409) {
            CustomersService.customersReadCustomerIdByEmail({
              customerEmail: customerEmail!,
            }).then((response) => setCustomerId(response))
          } else {
            console.error("Error occurred", err)
          }
        }
      }
    }
    fetchData()
  }, [orderForm])

  useEffect(() => {
    const fetchData = async () => {
      const orderStatus = await OrdersService.ordersOrderStatus()
      if (customerId && cartId && shippingRate) {
        const cartIn: CartUpdate = {
          unique_id: cartId,
          amount: orderTotal,
          shipping_address: {
            first_name: orderForm!.first_name,
            last_name: orderForm!.last_name,
            address_1: orderForm!.address_1,
            address_2: orderForm!.address_2,
            country: orderForm!.country,
            postal_code: orderForm!.postal_code,
            city: orderForm!.city,
            county: orderForm!.county,
            tel: orderForm!.tel,
          },
          shipping_rate_data: shippingRate,
          status: orderStatus["PENDING"],
        }
        try {
          const productQuantities = cartItems.reduce((acc, item) => {
              acc[item.id.toString()] = item.quantity
              return acc
          }, {} as Record<string, number>)
          const cart = await CartsService.cartsReadCartByUniqueId({
            "uniqueId": cartId,
          })
          await CartsService.cartsUpdateCartWithProductsAndCustomer({
            "cartId": cart.id,
            "customerId": customerId,
            "requestBody": {
              "cart_in": cartIn,
              "product_quantities": productQuantities,
            }
          })
        } catch (err: unknown) {
          if (typeof err === "object" && err !== null && "status" in err && "body" in err && err.status === 409) {
            console.log(err.body)
          } else {
            console.error("Error occurred", err)
          }
        }
      }
    }
    fetchData()
  }, [customerId, cartId, shippingRate])

  const initialized = useRef(false)
  useEffect(() => {
    const fetchData = async () => {
      if (!initialized.current && cartItems.length > 0 && shippingRate && currentStage >= 4) {
        initialized.current = true
        const tempCartId = await UtilsService.utilsGenerateId()
        setCartId(tempCartId)
        console.log("create payment with cartID", tempCartId)
        PaymentsService.paymentsCreatePayment({
          "requestBody": cartItems,
          "countryId": countryId!,
          "shippingRateId": shippingRate.id,
          "cartId": tempCartId,
          "currency": selectedCurrency?.target_code,
        }).then((data) => setClientSecret(data.clientSecret))

        // {cartItems.map(item => (
        //   ProductsService.productsReadProductById({
        //     "productId": item.id,
        //   }).then((response) => setProducts((prev) => [...prev, response]))
        // ))}

        PaymentsService.paymentsCalculateOrderTotal({
          "requestBody": cartItems,
        }).then((response) => setOrderTotal(response.totals.total))
      }
    }
    fetchData()
  }, [cartItems, shippingRate, currentStage])

  const options = {
    clientSecret,
  }

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-5xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className={`my-5 font-semibold text-2xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Checkout</h2>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className={`flex w-full lg:w-1/2 border ${isDarkMode ? "bg-black/15 border-gray-700" : "bg-white border-gray-200"} rounded`}>
            <div className="w-full p-8">
              <Accordion open={open === 1}>
                <AccordionHeader className={`${isDarkMode ? "text-gray-200 hover:text-gray-500" : "text-gray-900 hover:text-gray-700"}`} onClick={() => handleOpen(1)}>Your Email</AccordionHeader>
                <AccordionBody className={`w-full px-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  <CustomerForm onComplete={(customerEmail) => customerFormSubmit(customerEmail)} />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2} disabled={!(currentStage >= 2)}>
                <AccordionHeader className={`${isDarkMode ? "text-gray-200 hover:text-gray-500" : "text-gray-900 hover:text-gray-700"}`} onClick={() => handleOpen(2)}>Shipping</AccordionHeader>
                <AccordionBody className={`w-full px-2 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  <OrderForm onComplete={(data) => orderFormSubmit(data)} countryId={(countryId) => setCountryId(countryId)} />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3} disabled={!(currentStage >= 3)}>
                <AccordionHeader className={`${isDarkMode ? "text-gray-200 hover:text-gray-500" : "text-gray-900 hover:text-gray-700"}`} onClick={() => handleOpen(3)}>Shipping Method</AccordionHeader>
                <AccordionBody className={`w-full ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  {countryId !== undefined && (
                    <FinalShipping
                      countryId={countryId}
                      productIds={cartItems.map(item => item.id)}
                      onRateSelect={(rate) => setShippingRate(rate)}
                      onComplete={shippingFormSubmit}
                    />
                  )}
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 4} disabled={!(currentStage >= 4)}>
                <AccordionHeader className={`${isDarkMode ? "text-gray-200 hover:text-gray-500" : "text-gray-900 hover:text-gray-700"}`} onClick={() => handleOpen(4)}>Payment</AccordionHeader>
                <AccordionBody className={`w-full ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                  )}
                </AccordionBody>
              </Accordion>
            </div>
          </div>
          <div className={`w-full lg:w-1/2 border ${isDarkMode ? "bg-black/15 border-gray-700" : "bg-white border-gray-200"} rounded p-8`}>
            <div>
              <div className={`w-full font-semibold text-xl ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Order Summary</div>
              <OrderSummary editable={true} shippingRate={shippingRate} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
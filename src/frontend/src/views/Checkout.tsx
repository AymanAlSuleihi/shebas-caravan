import React, { useState, useEffect, useRef, FormEvent } from "react"
import { PaymentIntent, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { Accordion, AccordionBody, AccordionHeader, Button, Input, Option, Select } from "@material-tailwind/react"

import PaymentForm from "../components/PaymentForm"
import OrderSummary from "../components/OrderSummary"
import { CustomersService, CustomerCreate, PaymentsService, UtilsService, CartCreate, OrdersService } from "../client"
import { useShoppingCart } from "../context/shoppingCartContext"
import CustomerForm from "../components/CustomerForm"
import OrderForm, { OrderFormData } from "../components/OrderForm"
import { useCartsStore } from "../store/carts-store"

const stripePromise = loadStripe("pk_test_51OkcLtHgrnxDRk3HNphUOyZbJeUiTQFNFol6TcRJIv7nPGePPzglvsbj0JlWnLm6XF0aW1nU06fNKFBzb0bKNMOh001eto7j59")

// Customer goes to /checkout
// Create unique cart ID
// Cart ID sent in stripe create payment intent metadata
// Customer enters order info
// Create db cart and customer containing all order information
// Customer enters payment info
// Checkout success
// Payment intent success webhook received with cart id
// db Cart turned into db Order

const Checkout: React.FC = () => {
  const { cartItems } = useShoppingCart()
  const [clientSecret, setClientSecret] = useState("")
  // const { register, handleSubmit, reset } = useForm<CustomerCreate>()


  // const [orderData, setOrderData] = useState<stageOneData | stageTwoData>({
  //   email: "",
  //   first_name: "",
  //   last_name: "",
  //   address_1: "",
  //   address_2: "",
  //   country: "",
  //   postal_code: "",
  //   city: "",
  //   county: "",
  //   tel: "",
  // })

  // const [products, setProducts] = useState<ProductOutOpen[]>([])
  const [orderTotal, setOrderTotal] = useState<number>(0)

  const [currentStage, setCurrentStage] = useState<number>(1)
  const [open, setOpen] = React.useState(1)
  const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value)

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>, stage: number, customer: CustomerCreate) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget)
  //   const values = Object.fromEntries(data.entries())

  //   data.forEach((value, key) => {
  //     values[key] = value.toString()
  //   })

  //   setOrderData(prevOrderData => ({
  //     ...prevOrderData,
  //     ...values
  //   }))

  //   // CustomersService.customersCreateCustomer({
  //   //   "requestBody": customer
  //   //   })
  //   // }).then((response) => )

  //   await addCustomer(customer)

  //   const nextStage = stage + 1
  //   setCurrentStage(nextStage)
  //   setOpen(open === nextStage ? 0 : nextStage)
  // }



  // const [email, setEmail] = useState<string>("")
  // const handleContinue = (customerEmail: string | null, stage: number) => {
  //   if (stage === 1) {
  //     setEmail(customerEmail!)
  //   }
  //   console.log("handleContinue", customerEmail, email)

  //   const nextStage = stage + 1
  //   setCurrentStage(nextStage)
  //   setOpen(open === nextStage ? 0 : nextStage)
  //   console.log(email)
  // }

  const [cartId, setCartId] = useState<string>()
  const [customerEmail, setCustomerEmail] = useState<string>()
  // const { customers, getCustomerByEmail, addCustomer } = useCustomersStore()
  const [customerId, setCustomerId] = useState<number>()
  const { addCart, linkProductsToCart } = useCartsStore()
  // const [cartData, setCartData] = useState<CartCreate>({
  //   unique_id: "",
  //   amount: 0,
  //   status: 0,
  // })

  // useEffect(() => {
  //   UtilsService.utilsGenerateId().then((response) => setCartId(response))
  // }, [])
  console.log("cartId", cartId)

  const handleContinue = (stage: number) => {
    const nextStage = stage + 1
    setCurrentStage(nextStage)
    setOpen(open === nextStage ? 0 : nextStage)
    // console.log(email)
  }

  const customerFormSubmit = (customerEmail: string) => {
    console.log("customerFormSubmit", customerEmail)
    // setCustomerData((prevData) => ({
    //   ...prevData,
    //   email: customerEmail!
    // }))
    // console.log(customerData)

    setCustomerEmail(customerEmail)

    handleContinue(1)
  }

    const [orderForm, setOrderForm] = useState<OrderFormData>()

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
          } catch(err: any) {
            if (err.status && err.status === 409) {
              CustomersService.customersReadCustomerIdByEmail({
                customerEmail: customerEmail!,
              }).then((response) => setCustomerId(response))
            } else{
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
        if (customerId && cartId) {
          console.log("create cart with ID", cartId)
          const cart: CartCreate = {
            unique_id: cartId,
            amount: orderTotal,
            shipping_address: {
              first_name: orderForm!.first_name,
              last_name: orderForm!.last_name,
              address_1: orderForm!.address_1,
              address_2: orderForm!.address_2,
              country: "United Kingdom",
              postal_code: orderForm!.postal_code,
              city: orderForm!.city,
              county: orderForm!.county,
              tel: orderForm!.tel,
            },
            status: orderStatus["PENDING"],
          }
          try {
            const productQuantities = cartItems.reduce((acc, item) => {
                acc[item.id.toString()] = item.quantity
                return acc
            }, {} as Record<string, number>)
            await addCart(cart, customerId, productQuantities)
          } catch(err: any) {
            if (err.status && err.status === 409) {
              console.log(err.body)
            } else{
              console.error("Error occurred", err)
            }
          }
          handleContinue(2)
        }
      }
      fetchData()
    }, [customerId, cartId])


  // const orderFormSubmit = async (data: OrderFormData) => {
  //   let customer
  //   const customerData: CustomerCreate = {
  //     email: customerEmail!,
  //     first_name: data.first_name,
  //     last_name: data.last_name,
  //   }
  //   try {
  //     customer = await addCustomer(customerData)
  //   } catch(err: any) {
  //     if (err.status && err.status === 409) {
  //       console.log(err.body)
  //     } else{
  //       console.error("Error occurred", err)
  //     }
  //   }

  //   const cart: CartCreate = {
  //     unique_id: cartId!,
  //     amount: orderTotal,
  //     shipping_address: {
  //       first_name: data.first_name,
  //       last_name: data.last_name,
  //       address_1: data.address_1,
  //       address_2: data.address_2,
  //       country: "United Kingdom",
  //       postal_code: data.postal_code,
  //       city: data.city,
  //       county: data.county,
  //       tel: data.tel,
  //     },
  //     status: 0,
  //   }
  //   try {
  //     await addCart(cart, customer.id, [1])
  //   } catch(err: any) {
  //     if (err.status && err.status === 409) {
  //       console.log(err.body)
  //     } else{
  //       console.error("Error occurred", err)
  //     }
  //   }
  //   handleContinue(2)
  // }

  // const [isLoading, setIsLoading] = useState(false)
  // const { addOrder } = useOrdersStore()
  // const [orderFormSubmitted, setOrderFormSubmitted] = useState<boolean>(false)
  // const [paymentComplete, setPaymentComplete] = useState<boolean>(false)

  // useEffect(() => {
  //   const processOrder = async () => {
  //     setIsLoading(true)
  //     try {
  //       await addCustomer(customerData!)
  //     } catch(err: any) {
  //       if (err.status && err.status === 409) {
  //         console.log(err.body)
  //       } else{
  //         console.error("Error occurred", err)
  //       }
  //     }

  //     try {
  //       await addCart(orderData!)
  //       await addOrder(orderData!)
  //     } catch(err: any) {
  //       if (err.status && err.status === 409) {
  //         console.log(err.body)
  //       } else{
  //         console.error("Error occurred", err)
  //       }
  //     }
  //     setIsLoading(false)
  //   }

  //   if (orderFormSubmitted) {
  //     processOrder()
  //   }
  // }, [orderFormSubmitted])

  // const paymentFormSuccess = async (data: PaymentIntent) => {
  //   setOrderData((prevData) => ({
  //     ...prevData!,
  //     payment: data,
  //   }))

  //   setIsLoading(true)
  //   try {
  //     await addCustomer(customerData!)
  //   } catch(err: any) {
  //     if (err.status && err.status === 409) {
  //       console.log(err.body)
  //     } else{
  //       console.error("Error occurred", err)
  //     }
  //   }

  //   try {
  //     await addOrder(orderData!)
  //   } catch(err: any) {
  //     if (err.status && err.status === 409) {
  //       console.log(err.body)
  //     } else{
  //       console.error("Error occurred", err)
  //     }
  //   }
  //   setIsLoading(false)
  //   setPaymentComplete(true)
  // }

  // Inside return:
  // <PaymentForm onSuccess={(data) => paymentFormSuccess(data)} />


  // const paymentFormSubmit = (data) => {
    
  //   handleContinue(2)
  // }

  // const onSubmit: SubmitHandler<CustomerCreate> = async (data) => {
  //   console.log(data)
  // }

  const initialized = useRef(false)
  useEffect(() => {
    const fetchData = async () => {
      if (!initialized.current) {
        initialized.current = true
        const tempCartId = await UtilsService.utilsGenerateId()
        setCartId(tempCartId)
        console.log("create payment with cartID", tempCartId)
        PaymentsService.paymentsCreatePayment({
          "requestBody": cartItems,
          "cartId": tempCartId,
        }).then((data) => setClientSecret(data.clientSecret))

        // {cartItems.map(item => (
        //   ProductsService.productsReadProductById({
        //     "productId": item.id,
        //   }).then((response) => setProducts((prev) => [...prev, response]))
        // ))}

        PaymentsService.paymentsCalculateOrderTotal({
          "requestBody": cartItems,
        }).then((response) => setOrderTotal(response))
      }
    }
    fetchData()
  }, [cartItems])

  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 font-semibold text-2xl mb-4">Checkout</h2>
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex w-full lg:w-1/2 border bg-white rounded">
            <div className="w-full p-8">
              <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>Your Email</AccordionHeader>
                <AccordionBody className="w-full px-2">
                  <CustomerForm onComplete={(customerEmail) => customerFormSubmit(customerEmail)} />
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 2} disabled={!(currentStage >= 2)}>
                <AccordionHeader onClick={() => handleOpen(2)}>Shipping</AccordionHeader>
                <AccordionBody className="w-full px-2">
                  <OrderForm onComplete={(data) => setOrderForm(data)}/>
                </AccordionBody>
              </Accordion>
              <Accordion open={open === 3} disabled={!(currentStage >= 3)}>
                <AccordionHeader>Payment</AccordionHeader>
                <AccordionBody className="w-full">
                  {clientSecret && (
                    <Elements options={options} stripe={stripePromise}>
                      <PaymentForm />
                    </Elements>
                  )}
                </AccordionBody>
              </Accordion>
            </div>
          </div>
          <div className="w-full lg:w-1/2 border bg-white rounded p-8">
            <div>
              <div className="w-full font-semibold text-xl">Order Summary</div>
              <OrderSummary editable={true} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Checkout
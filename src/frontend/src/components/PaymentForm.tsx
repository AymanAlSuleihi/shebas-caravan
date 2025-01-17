import React, { FormEvent, useEffect, useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button, Spinner } from "@material-tailwind/react"
import { StripeElementsOptions } from "@stripe/stripe-js"
import { useDarkMode } from "../contexts/DarkModeContext"


const PaymentForm: React.FC = () => {
  const [message, setMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { isDarkMode } = useDarkMode()

  const options: StripeElementsOptions = {
    appearance: {
      theme: isDarkMode ? "night" : "stripe",
    }
  }

  elements?.update(options)

  useEffect(() => {
    if (!stripe) {
      return
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if (!clientSecret) {
      return
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!")
          break
        case "processing":
          setMessage("Your payment is processing.")
          break
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.")
          break
        default:
          setMessage("Something went wrong.")
          break
      }
    })
  }, [stripe])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
      return_url: `${import.meta.env.VITE_SERVER_HOST.replace('https://', 'http://')}/order-success`,
      },
    })

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "")
      } else {
        setMessage("An unexpected error occurred.")
        console.log(error)
      }
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs" as const,
  }

  return (
    <>
      {stripe && elements ? (
        <form className="w-full px-2" id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" options={paymentElementOptions}/>
          <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? <div className="spinner" id="spinner"></div>
              :
              <Button
                variant="outlined"
                ripple={false}
                className={`rounded border-gray-500 mt-5 ${isDarkMode ? "text-gray-200 border-gray-700" : "text-gray-900 border-gray-500"}`}
              >Place Order</Button>
              }
            </span>
          </button>
          {message && <div id="payment-message" className={`${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>{message}</div>}
        </form>
      ) : (
        <div className="flex flex-col items-center m-8">
          <Spinner className={`${isDarkMode ? "text-gray-200" : "text-gray-600"}`}/>
        </div>
      )}
    </>
  )
}

export default PaymentForm
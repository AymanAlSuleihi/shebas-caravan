import React from "react"
import { Link } from "react-router-dom"
import { Button } from "@material-tailwind/react"

import OrderSummary from "../components/OrderSummary"
import { useShoppingCart } from "../contexts/ShoppingCartContext"
import { useDarkMode } from "../contexts/DarkModeContext"

const Cart: React.FC = () => {
  const { cartItems } = useShoppingCart()
  const { isDarkMode } = useDarkMode()

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`max-w-5xl mx-auto py-6 px-5 sm:px-6 lg:px-8 border ${isDarkMode ? "bg-black/15" : "bg-white"} rounded my-5`}>
        <h2 className={`font-semibold text-2xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>Cart</h2>
        <OrderSummary editable={true} />
        {cartItems.length > 0 &&
          <div className="flex font-semibold flex-col max-w-[432px] ml-auto">
            <Link to="/checkout">
              <Button
                variant="outlined"
                ripple={false}
                // className="rounded border-gray-500 mt-5 w-full"
                className={`rounded border-gray-500 mt-5 w-full ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
              >Checkout</Button>
            </Link>
          </div>
        }
      </div>
    </main>
  )
}

export default Cart
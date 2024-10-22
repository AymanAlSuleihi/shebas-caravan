import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-tailwind/react'

import OrderSummary from '../components/OrderSummary'
import { useShoppingCart } from '../context/shoppingCartContext'

const Cart: React.FC = () => {
  const { cartItems } = useShoppingCart()

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-5xl mx-auto py-6 px-5 sm:px-6 lg:px-8 border bg-white rounded my-5">
        <h2 className="font-semibold text-2xl mb-4">Cart</h2>
        <OrderSummary editable={true} />
        {cartItems.length > 0 &&
          <div className="flex font-semibold flex-col max-w-[432px] ml-auto">
            <Link to="/checkout">
              <Button
                variant="outlined"
                ripple={false}
                className="rounded border-gray-500 mt-5 w-full"
              >Checkout</Button>
            </Link>
          </div>
        }
      </div>
    </main>
  )
}

export default Cart
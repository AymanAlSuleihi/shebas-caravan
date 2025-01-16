import React, { ReactNode, useContext, createContext } from "react"
// import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartContextProps = {
  children:ReactNode
}

type ShoppingCartContext = {
  getTotalQuantity: () => number
  getItemQuantity: (id:number) => number
  increaseQuantity: (id:number) => void
  decreaseQuantity: (id:number) => void
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id:number) => void
  clearCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
}

export type CartItem = {
  id:number
  quantity:number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () =>{
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({children}:ShoppingCartContextProps) =>{
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

  const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity,0)

  const getTotalQuantity = () => {
    return cartItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  const getItemQuantity = (id:number) => {
    return cartItems.find(items => items.id === id) ?.quantity || 0
  }

  const increaseQuantity = (id:number) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null) {
        return [...currentItems, { id, quantity:1 }]
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity:item.quantity + 1 }
          }else{
            return item
          }
        })
      }
    })
  }

  const decreaseQuantity = (id:number) => {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id)
      } else {
        return currentItems.map(item => {
          if (item.id === id) {
            return {...item,quantity:item.quantity - 1}
          } else {
            return item
          }
        })
      }
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity }
        } else {
          return item;
        }
      })
    })
  }


  const removeFromCart = (id:number) => {
    setCartItems(currentItems => {
      return currentItems.filter( item => item.id !== id )
    })
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <ShoppingCartContext.Provider 
      value={{
        getTotalQuantity,
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartItems,
        cartQuantity
      }}
    >
      {/* <ShoppingCart isOpen={isOpen}/> */}
      {children}
    </ShoppingCartContext.Provider>
  )
}
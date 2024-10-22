import { create } from 'zustand'
import { CartCreate, CartOut, CartsService } from '../client'

interface CartsStore {
    carts: CartOut[]
    getCarts: () => Promise<void>
    addCart: (cart: CartCreate, customerId: number, productQuantities: Record<string, number>) => Promise<void>
    linkProductsToCart: (id: number, productIds: number[]) => Promise<void>
    deleteCart: (id: number) => Promise<void>
}

export const useCartsStore = create<CartsStore>((set) => ({
    carts: [],
    getCarts: async () => {
        const cartsResponse = await CartsService.cartsReadCarts({})
        set({ carts: cartsResponse })
    },
    addCart: async (cart: CartCreate, customerId: number, productQuantities: Record<string, number>) => {
        const cartResponse = await CartsService.cartsCreateCart({
            customerId: customerId,
            requestBody: {
                cart_in: cart,
                product_quantities: productQuantities,
            }
        })
        set((state) => ({ carts: [...state.carts, cartResponse] }))
    },
    linkProductsToCart: async (id: number, productIds: number[]) => {
        const cartResponse = await CartsService.cartsLinkProductsToCart({
            cartId: id,
            requestBody: productIds
        })
        set((state) => ({
            carts: state.carts.map((cart) => cart.id === id ? cartResponse: cart)
        }))
    },
    deleteCart: async (id: number) => {
        await CartsService.cartsDeleteCart({ cartId: id })
        set((state) => ({ carts: state.carts.filter((cart) => cart.id !== id) }))
    },
}))

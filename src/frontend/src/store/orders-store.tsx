import { create } from 'zustand'
import { OrderCreate, OrderOut, OrdersService } from '../client'

interface OrdersStore {
    orders: OrderOut[]
    getOrders: () => Promise<void>
    // getOrderByPaymentId: (payment_id: string) => Promise<void>
    addOrder: (order: OrderCreate) => Promise<void>
    deleteOrder: (id: number) => Promise<void>
}

export const useOrdersStore = create<OrdersStore>((set) => ({
    orders: [],
    getOrders: async () => {
        const ordersResponse = await OrdersService.ordersReadOrders({})
        set({ orders: ordersResponse })
    },
    // getOrderByPaymentId: async (paymentId: string) => {
    //     const orderResponse = await OrdersService.ordersReadOrderByPaymentId({ paymentId: paymentId })
    //     set((state) => ({ orders: [...state.orders, orderResponse] }))
    // },
    addOrder: async (order: OrderCreate) => {
        const orderResponse = await OrdersService.ordersCreateOrder({ requestBody: order })
        set((state) => ({ orders: [...state.orders, orderResponse] }))
    },
    deleteOrder: async (id: number) => {
        await OrdersService.ordersDeleteOrder({ orderId: id })
        set((state) => ({ orders: state.orders.filter((order) => order.id !== id) }))
    },
}))

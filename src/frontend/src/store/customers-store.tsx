import { create } from 'zustand'
import { CustomerCreate, CustomerUpdate, CustomerOut, CustomersService } from '../client'

interface CustomersStore {
    customers: CustomerOut[]
    getCustomers: () => Promise<void>
    getCustomer: (id: number) => Promise<void>
    // getCustomerByEmail: (email: string) => Promise<void>
    addCustomer: (customer: CustomerCreate) => Promise<void>
    updateCustomer: (id: number, customer: CustomerUpdate) => Promise<void>
    deleteCustomer: (id: number) => Promise<void>
}

export const useCustomersStore = create<CustomersStore>((set) => ({
    customers: [],
    getCustomers: async () => {
        const customersResponse = await CustomersService.customersReadCustomers({})
        set({ customers: customersResponse })
    },
    getCustomer: async (id: number) => {
        const customerResponse = await CustomersService.customersReadCustomerById({customerId: id})
        set((state) => ({ customers: [...state.customers, customerResponse] }))
    },
    // getCustomerByEmail: async (email: string) => {
    //     const customerResponse = await CustomersService.customersReadCustomerIdByEmail({customerEmail: email})
    //     set((state) => ({ customers: [...state.customers, customerResponse] }))
    // },
    addCustomer: async (customer: CustomerCreate) => {
        const customerResponse = await CustomersService.customersCreateCustomer({ requestBody: customer })
        set((state) => ({ customers: [...state.customers, customerResponse] }))
    },
    updateCustomer: async (id: number, customer: CustomerUpdate) => {
        const customerResponse = await CustomersService.customersUpdateCustomer({ customerId: id, requestBody: customer})
        set((state) => ({
            customers: state.customers.map((customer) => customer.id === id ? customerResponse: customer)
        }))
    },
    deleteCustomer: async (id: number) => {
        await CustomersService.customersDeleteCustomer({ customerId: id })
        set((state) => ({ customers: state.customers.filter((customer) => customer.id !== id) }))
    },
}))

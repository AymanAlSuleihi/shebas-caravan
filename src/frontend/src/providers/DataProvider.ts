import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteOneParams } from "@refinedev/core"
import { CategoriesService, CustomersService, OrdersService, ProductsService } from "../client"

const serviceMap: Record<string, any> = {
  categories: CategoriesService,
  customers: CustomersService,
  orders: OrdersService,
  products: ProductsService,
}

const methodMap: Record<string, Record<string, string>> = {
  categories: {
    getList: "categoriesReadCategories",
    getOne: "categoriesReadCategoryById",
    create: "categoriesCreateCategory",
    update: "categoriesUpdateCategory",
    deleteOne: "categoriesDeleteCategory",
  },
  customers: {
    getList: "customersReadCustomers",
    getOne: "customersReadCustomerById",
    create: "customersCreateCustomer",
    update: "customersUpdateCustomer",
    deleteOne: "customersDeleteCustomer",
  },
  orders: {
      getList: "ordersReadOrders",
      getOne: "ordersReadOrderById",
      create: "ordersCreateOrder",
      update: "ordersUpdateOrder",
      deleteOne: "ordersDeleteOrder",
  },
  products: {
      getList: "productsReadProducts",
      getOne: "productsReadProductById",
      create: "productsCreateProduct",
      update: "productsUpdateProduct",
      deleteOne: "productsDeleteProduct",
  },
}

const getServiceAndMethod = (resource: string, action: string) => {
  const service = serviceMap[resource]
  if (!service) {
      throw new Error(`No service found for resource: ${resource}`)
  }

  const methodName = methodMap[resource]?.[action]
  if (!methodName || typeof service[methodName] !== "function") {
      throw new Error(`Method ${action} not found for resource: ${resource}`)
  }

  return { service, methodName }
}

export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sort }: GetListParams) => {
    const { service, methodName } = getServiceAndMethod(resource, "getList")

    const sortField = sort?.[0]?.field
    const sortOrder = sort?.[0]?.order === 'desc' ? 'desc' : 'asc'

    const response = await service[methodName]({
      skip: (pagination?.current - 1) * (pagination?.pageSize || 10),
      limit: pagination?.pageSize || 10,
      sortField: sortField,
      sortOrder: sortOrder,
      requestBody: filters,
    })

    const data = response[resource] || response || []

    return {
      data: data,
      total: data.length,
    }
  },

  getOne: async ({ resource, id }: GetOneParams) => {
    const { service, methodName } = getServiceAndMethod(resource, "getOne")

    const data = await service[methodName]({
      [`${resource.slice(0, -1)}Id`]: id,
    })

    return { data }
  },

  create: async ({ resource, variables }: CreateParams) => {
    const { service, methodName } = getServiceAndMethod(resource, "create")

    const data = await service[methodName]({
      requestBody: variables,
    })

    return { data }
  },

  update: async ({ resource, id, variables }: UpdateParams) => {
    const { service, methodName } = getServiceAndMethod(resource, "update")

    const data = await service[methodName]({
      [`${resource.slice(0, -1)}Id`]: id,
      requestBody: variables,
    })

    return { data }
  },

  deleteOne: async ({ resource, id }: DeleteOneParams) => {
    const { service, methodName } = getServiceAndMethod(resource, "deleteOne")

    const data = await service[methodName]({
     [`${resource.slice(0, -1)}Id`]: id,
    })

    return { data }
  },
}

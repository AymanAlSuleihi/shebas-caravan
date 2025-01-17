import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteOneParams, BaseRecord, CreateResponse, UpdateResponse, DeleteOneResponse, GetOneResponse, GetListResponse } from "@refinedev/core"
import { CategoriesService, CustomersService, OrdersService, ProductsService } from "../client"

const serviceMap: Record<string, CategoriesService | CustomersService | OrdersService | ProductsService> = {
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

const singularResourceMap: Record<string, string> = {
  categories: "category",
  customers: "customer",
  orders: "order",
  products: "product",
}

const getServiceAndMethod = (resource: string, action: string) => {
  const service = serviceMap[resource]
  if (!service) {
    throw new Error(`No service found for resource: ${resource}`)
  }

  const methodName = methodMap[resource]?.[action]
  if (!methodName || typeof (service as Record<string, any>)[methodName] !== "function") {
      throw new Error(`Method ${action} not found for resource: ${resource}`)
  }

  return { service, methodName }
}

export const dataProvider: DataProvider = {
  getApiUrl: () => {
    return `${import.meta.env.VITE_SERVER_HOST}/api/v1`
  },

  getList: async <TData extends BaseRecord = {}> ({ resource, pagination, filters, sort }: GetListParams): Promise<GetListResponse<TData>> => {
    const { service, methodName } = getServiceAndMethod(resource, "getList")

    const sortField = sort?.[0]?.field
    const sortOrder = sort?.[0]?.order === "desc" ? "desc" : "asc"

    const response = await (service as Record<string, Function>)[methodName]({
      skip: ((pagination?.current ?? 1) - 1) * (pagination?.pageSize || 10),
      limit: pagination?.pageSize || 10,
      sortField: sortField,
      sortOrder: sortOrder,
      requestBody: filters,
    })

    const data = response[resource] || response || []

    return {
      data: data,
      total: response.count,
    }
  },

  getOne: async <TData extends BaseRecord = {}>({ resource, id }: GetOneParams): Promise<GetOneResponse<TData>> => {
    const { service, methodName } = getServiceAndMethod(resource, "getOne")

    const singularResource = singularResourceMap[resource] || resource.slice(0, -1)

    const data = await (service as Record<string, Function>)[methodName]({
      [`${singularResource}Id`]: id,
    })

    return { data }
  },

  create: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({ resource, variables }: CreateParams<TVariables>): Promise<CreateResponse<TData>> => {
    const { service, methodName } = getServiceAndMethod(resource, "create")

    const data = await (service as Record<string, Function>)[methodName]({
      requestBody: variables,
    })

    return { data: data as TData }
  },

  update: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({ resource, id, variables }: UpdateParams<TVariables>): Promise<UpdateResponse<TData>> => {
    const { service, methodName } = getServiceAndMethod(resource, "update")

    const singularResource = singularResourceMap[resource] || resource.slice(0, -1)

    const data = await (service as Record<string, Function>)[methodName]({
      [`${singularResource}Id`]: id,
      requestBody: variables,
    })

    return { data: data as TData }
  },

  deleteOne: async <TData extends BaseRecord = BaseRecord, TVariables = {}>({ resource, id }: DeleteOneParams<TVariables>): Promise<DeleteOneResponse<TData>> => {
    const { service, methodName } = getServiceAndMethod(resource, "deleteOne")

    const singularResource = singularResourceMap[resource] || resource.slice(0, -1)

    const data = await (service as Record<string, Function>)[methodName]({
      [`${singularResource}Id`]: id,
    })

    return { data: data as TData }
  },
}

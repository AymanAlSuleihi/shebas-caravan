import { createBrowserRouter } from 'react-router-dom'

import App from '../App.tsx'
import Cart from '../views/Cart.tsx'
import Category from '../views/Category.tsx'
import Checkout from '../views/Checkout.tsx'
import Contact from '../views/Contact.tsx'
import Care from '../views/Care.tsx'
import Delivery from '../views/Delivery.tsx'
import Terms from '../views/Terms.tsx'
import Privacy from '../views/Privacy.tsx'
import Home from '../views/Home.tsx'
import OrderComplete from '../views/OrderComplete.tsx'
import About from '../views/About.tsx'
import Tools from '../views/Tools.tsx'
import Product from '../views/Product.tsx'
import Categories from '../views/Categories.tsx'
import TreasuresAncient from '../views/TreasuresAncient.tsx'
import TreasuresTraditional from '../views/TreasuresTraditional.tsx'
import Login from '../views/Admin/Login.tsx'
import Admin from '../views/Admin/Admin.tsx'
import CustomerList from '../views/Admin/Customers/CustomerList.tsx'
import OrderList from '../views/Admin/Orders/OrderList.tsx'
import ProductList from '../views/Admin/Products/ProductList.tsx'
import CategoryList from '../views/Admin/Categories/CategoryList.tsx'
import CartList from '../views/Admin/Carts/CartList.tsx'
import OrderView from '../views/Admin/Orders/OrderView.tsx'
import ProductEdit from '../views/Admin/Products/ProductEdit.tsx'
import ProductCreate from '../views/Admin/Products/ProductCreate.tsx'
import CustomerCreate from '../views/Admin/Customers/CustomerCreate.tsx'
import CustomerEdit from '../views/Admin/Customers/CustomerEdit.tsx'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/treasures',
        element: <Categories />,
      },
      {
        path: '/treasures/ancient',
        element: <TreasuresAncient />,
      },
      {
        path: '/treasures/traditional',
        element: <TreasuresTraditional />,
      },
      {
        path: '/tools',
        element: <Tools />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/delivery',
        element: <Delivery />,
      },
      {
        path: '/care',
        element: <Care />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/treasure/:urlKey',
        element: <Product />,
      },
      {
        path: '/treasures/:urlKey',
        element: <Category />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/order-success',
        element: <OrderComplete />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/admin/customers',
        element: <CustomerList />,
      },
      {
        path: '/admin/customers/:customerId/edit',
        element: <CustomerEdit />,
      },
      {
        path: '/admin/customers/create',
        element: <CustomerCreate />,
      },
      {
        path: '/admin/orders',
        element: <OrderList />,
      },
      {
        path: '/admin/orders/:orderId',
        element: <OrderView />,
      },
      // {
      //   path: '/admin/orders/:orderId/edit',
      //   element: <OrderEdit />,
      // },
      {
        path: '/admin/products',
        element: <ProductList />,
      },
      {
        path: '/admin/products/:productId/edit',
        element: <ProductEdit />,
      },
      {
        path: '/admin/products/create',
        element: <ProductCreate />,
      },
      {
        path: '/admin/categories',
        element: <CategoryList />,
      },
      {
        path: '/admin/carts',
        element: <CartList />,
      },
    ]
  }
])
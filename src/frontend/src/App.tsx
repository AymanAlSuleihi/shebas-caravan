import React from 'react'
import { Outlet } from 'react-router-dom'
import { Refine } from '@refinedev/core'

import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ShoppingCartProvider } from './context/shoppingCartContext'
import { dataProvider } from './providers/DataProvider'
import ScrollToTop from './components/ScrollToTop'

const App: React.FC = () => {
  return (
    <>
      <Refine dataProvider={dataProvider}>
        <ShoppingCartProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <ScrollToTop />
            <Outlet />
            <Footer />
          </div>
        </ShoppingCartProvider>
      </Refine>
    </>
  )
}

export default App
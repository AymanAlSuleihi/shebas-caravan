import React from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { ShoppingCartProvider } from './context/shoppingCartContext'

const App: React.FC = () => {
  return (
    <>
      <ShoppingCartProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </ShoppingCartProvider>
    </>
  )
}

export default App
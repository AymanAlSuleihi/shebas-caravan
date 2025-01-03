import React from "react"
import { Outlet } from "react-router-dom"
import { Refine } from "@refinedev/core"

import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext"
import { dataProvider } from "./providers/DataProvider"
import ScrollToTop from "./components/ScrollToTop"
import { CurrencyProvider } from "./contexts/CurrencyContext"
import { DarkModeProvider } from "./contexts/DarkModeContext"

const App: React.FC = () => {
  return (
    <>
      <Refine dataProvider={dataProvider}>
        <DarkModeProvider>
          <CurrencyProvider>
            <ShoppingCartProvider>
              <div className="flex flex-col min-h-screen bg-gray-50">
                <Navbar />
                <ScrollToTop />
                <Outlet />
                <Footer />
              </div>
            </ShoppingCartProvider>
          </CurrencyProvider>
        </DarkModeProvider>
      </Refine>
    </>
  )
}

export default App
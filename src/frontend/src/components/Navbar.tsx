import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useShoppingCart } from "../contexts/ShoppingCartContext"
import { CurrencySelector } from "./CurrencySelector"
import Logo from "./Logo"
import { useDarkMode } from "../contexts/DarkModeContext"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { IconButton, Tooltip } from "@material-tailwind/react"

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalQuantity } = useShoppingCart()
  const totalQuantity = getTotalQuantity()
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const toggleNav = () => setIsOpen(!isOpen)

  return (
    <>
      <nav className={`sticky top-0 z-50 ${isDarkMode ? "bg-gray-900 border-gray-700 shadow-gray-800" : "bg-gray-50 border-gray-200 shadow-gray-100"} border-b`}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-4">
          <Logo />
          <div className="flex">
            <Link to="/cart" onClick={() => setIsOpen(false)} className={`block px-2 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded md:hidden`}>
              <Tooltip content="Cart" className="bg-black/90">
                <div className="flex group scale-[85%]">
                  <div className={`relative block shadow-crescent h-9 w-9 bg-transparent border-gray-800 rounded-full -translate-y-3 md:group-hover:border-gray-700`}>
                    <div className={`absolute flex rounded-full ${isDarkMode ? "bg-gray-200 md:group-hover:bg-gray-400": "bg-gray-800 md:group-hover:bg-gray-700"} h-4 w-4 translate-x-[10px] translate-y-4 items-center justify-center`}>
                      <span className={`text-xs ${isDarkMode ? "text-gray-900": "text-gray-200"}`}>{totalQuantity > 0 && totalQuantity}</span>
                    </div>
                  </div>
                </div>
              </Tooltip>
            </Link>
            <button data-collapse-toggle="navbar-default" type="button" onClick={toggleNav} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded md:hidden focus:outline-none" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
          </div>
          <div className={`navbar-menu ${isOpen ? "is-active w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"}`} id="navbar-default">
            <ul className={`font-semibold flex flex-col p-4 md:p-0 mt-4 border-t ${isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"} items-center md:flex-row md:space-x-4 lg:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0`}>
              <li className="block md:hidden lg:block">
                <Link to="/" onClick={() => setIsOpen(false)} className={`block py-2 px-3 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0`} aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/treasures" onClick={() => setIsOpen(false)} className={`block py-2 px-3 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0`}>Treasures</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsOpen(false)} className={`block py-2 px-3 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0`}>About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsOpen(false)} className={`block py-2 px-3 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0`}>Contact</Link>
              </li>
              <li className="hidden md:block">
                <Link to="/cart" onClick={() => setIsOpen(false)} className={`block py-2 px-3 ${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0`}>
                  <Tooltip content="Cart" className="bg-black/90">
                    <div className="flex group scale-[85%]">
                      {isOpen &&
                        <span className="block md:hidden -translate-x-1">Cart</span>
                      }
                      <div className={isOpen ?
                        "relative block shadow-crescent h-9 w-9 bg-transparent border-gray-800 rounded-full -translate-y-4 translate-x-1 md:group-hover:border-gray-700"
                        : `relative block shadow-crescent h-9 w-9 bg-transparent border-gray-800 rounded-full -translate-y-3 md:group-hover:border-gray-700`}>
                        <div className={`absolute flex rounded-full ${isDarkMode ? "bg-gray-200 md:group-hover:bg-gray-400": "bg-gray-800 md:group-hover:bg-gray-700"} h-4 w-4 translate-x-[10px] translate-y-4 items-center justify-center`}>
                          <span className={`text-xs ${isDarkMode ? "text-gray-900": "text-gray-200"}`}>{totalQuantity > 0 && totalQuantity}</span>
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </Link>
              </li>
              <li className="-translate-y-1 md:translate-y-0 md:!ml-2">
                <CurrencySelector />
              </li>
              <li className="!ml-0">
                <IconButton
                  onClick={() => {
                    toggleDarkMode()
                    setIsOpen(false)
                  }}
                  className={`${isDarkMode ? "text-gray-200 md:hover:text-gray-400" : "text-gray-800 md:hover:text-gray-700"} !max-w-48 w-32 md:w-10 rounded`}
                  variant="text"
                >
                  <div className="flex items-center">
                    {isDarkMode ? 
                      <>
                        <div className={`mr-2 visible md:hidden whitespace-nowrap`}>Light Mode</div>
                        <SunIcon className="w-5 h-5" />
                      </>
                      : 
                      <>
                        <div className={`mr-2 visible md:hidden whitespace-nowrap`}>Dark Mode</div>
                        <MoonIcon className="w-5 h-5" />
                      </>
                    }
                  </div>
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
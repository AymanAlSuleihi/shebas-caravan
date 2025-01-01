import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/shoppingCartContext'
import { CurrencySelector } from './CurrencySelector'
import Logo from './Logo'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { getTotalQuantity } = useShoppingCart()
  const totalQuantity = getTotalQuantity()

  const toggleNav = () => setIsOpen(!isOpen)


  return (
    <nav className="sticky top-0 z-50 bg-gray-50 border-gray-200 border-b shadow-sm shadow-gray-100">
      <div className="opacity flex max-w h-auto bg-amber-300 text-center">
        <div className="mx-auto my-1 font-semibold">
          Development in progress. Orders will not be honoured.
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <button data-collapse-toggle="navbar-default" type="button" onClick={toggleNav} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className={`navbar-menu ${isOpen ? "is-active w-full md:block md:w-auto" : "hidden w-full md:block md:w-auto"}`} id="navbar-default">
          <ul className="font-semibold flex flex-col p-4 md:p-0 mt-4 border-t border-gray-200 rounded bg-gray-50 items-center md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="hidden lg:block">
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="/treasures" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">Treasures</Link>
            </li>
            <li className="hidden lg:block">
              <Link to="/tools" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">Tools</Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">Contact</Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setIsOpen(false)} className="block py-2 px-3 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0">
                <div className="flex group">
                  {isOpen &&
                    <span className="-translate-x-1">Cart</span>
                  }
                  <div className={isOpen ?
                    "relative block shadow-crescent h-9 w-9 bg-transparent border-gray-800 rounded-full -translate-y-4 translate-x-1 md:group-hover:border-gray-700"
                    : "relative block shadow-crescent h-9 w-9 bg-transparent border-gray-800 rounded-full -translate-y-3 md:group-hover:border-gray-700"}>
                    <div className="absolute flex rounded-full bg-gray-800 h-4 w-4 translate-x-[10px] translate-y-4 items-center justify-center md:group-hover:bg-gray-700">
                      <span className="text-xs text-gray-200">{totalQuantity > 0 && totalQuantity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
            <li className="!ml-2">
              <CurrencySelector />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-gray-200">
      <div className="flex w-full items-center">
        <div className="flex-1 border-b mr-4"></div>
        <img className="h-3" src="/yemenite_motif_short_1.svg"></img>
        <img className="h-3" src="/yemenite_motif_short_1.svg"></img>
        <img className="h-3" src="/yemenite_motif_short_1.svg"></img>
        <img className="h-3" src="/yemenite_motif_short_1.svg"></img>
        <img className="h-3" src="/yemenite_lama.svg"></img>
        <div className="flex-1 border-b ml-4"></div>
      </div>
      <div className="max-w-7xl mx-auto pb-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center pt-2 pb-1">
          <div className="flex-1 text-center sm:text-left py-2">
            <p className="text-gray-800 text-sm whitespace-nowrap">London, UK</p>
          </div>
          <div className="flex-grow text-center sm:py-2">
            <ul className="inline-flex flex-wrap text-center justify-center">
              <li><Link to="/about" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">About</Link></li>
              <li><Link to="/contact" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">Contact</Link></li>
              <li><Link to="/care" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">Care</Link></li>
              <li><Link to="/delivery" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">Delivery</Link></li>
              <li><Link to="/terms" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">Terms</Link></li>
              <li><Link to="/privacy" className="text-sm font-semi mx-2 text-gray-800 whitespace-nowrap hover:underline">Privacy</Link></li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center sm:justify-end py-2">
            <a
              href="https://www.instagram.com/shebascaravan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-700 transition flex items-center translate-y-[1px]"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-800 text-sm">
            © {new Date().getFullYear()} Sheba's Caravan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
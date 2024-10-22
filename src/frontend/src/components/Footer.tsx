import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-gray-200 border-t">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-gray-800">
          © {new Date().getFullYear()} Sheba's Caravan. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
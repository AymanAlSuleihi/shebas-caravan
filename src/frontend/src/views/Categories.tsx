import React from 'react'
import { Link } from 'react-router-dom'

const Categories: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <h2 className="my-5 font-semibold text-2xl mb-4">Treasures</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/treasures/pendants">
            <div className="bg-white border aspect-square w-48 relative rounded">
              <img src="crescent_amulet_1.png" className=""></img>
              <div className="text-center font-semibold">Pendants</div>
            </div>
          </Link>
          <Link to="/treasures/rings">
            <div className="bg-white border aspect-square w-48 relative rounded">
              <img src="ring_1.png" className=""></img>
              <div className="text-center font-semibold">Rings</div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Categories
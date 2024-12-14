import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto pt-2 px-0 lg:px-8">
        <div className="relative overflow-hidden h-72">
          <img 
            src="/banner_2.png" 
            alt="Sheba's Caravan Banner" 
            className="w-full h-full scale-125 object-cover object-[-36rem_-4px] md:object-[right_-4px] lg:object-[right-4px]"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl text-center font-semibold text-gray-200 text-shadow-sm shadow-black">Sheba's Caravan</h1>
            <p className="font-semibold text-center mt-4 text-gray-300 text-shadow-sm shadow-black">
              Handcrafted jewellery rooted in Ancient South Arabian and Yemenite traditions.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
        <div className="mt-3 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-center font-semibold text-2xl mb-4">Treasures</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link to="/treasures/pendants">
              <div className="bg-white border aspect-square w-48 relative rounded hover:scale-[1.03] transition-transform">
                <img src="crescent_amulet_1.png" className=""></img>
                <div className="text-center font-semibold">Pendants</div>
              </div>
            </Link>
            <Link to="/treasures/rings">
              <div className="bg-white border aspect-square w-48 relative rounded hover:scale-[1.03] transition-transform">
                <img src="ring_1.png" className=""></img>
                <div className="text-center font-semibold">Rings</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
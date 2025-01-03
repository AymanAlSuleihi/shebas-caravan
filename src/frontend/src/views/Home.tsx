import React from "react"
import { Link } from "react-router-dom"
import Featured from "../components/Featured"
import { useDarkMode } from "../contexts/DarkModeContext"

const Home: React.FC = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto pt-2 px-0 lg:px-8 space-y-14">
        <section>
          <div className="relative overflow-hidden h-72">
            <img 
              src="/public/banners/banner.png" 
              alt="Sheba's Caravan Banner" 
              className="w-full h-full scale-125 object-cover object-[-36rem_-4px] md:object-[right_-4px] lg:object-[right-4px]"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl text-center font-semibold text-gray-200 text-shadow-sm shadow-black">Sheba's Caravan</h1>
            <p className="font-semibold text-center mt-4 text-gray-300 text-shadow-sm shadow-black">
                Handcrafted jewellery rooted in Ancient South Arabian and Yemenite tradition.
              </p>
            </div>
          </div>
        </section>
        <section>
          <Featured />
        </section>
        <section>
          <h2 className={`text-center font-semibold text-2xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Reviving Ancient Craft</h2>
          <p className={`text-center max-w-2xl mx-auto mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Every creation embodies ancient South Arabian artistry, meticulously recreated for the modern world. Our designs honor traditional Yemenite craftsmanship while bringing timeless beauty to contemporary lives.
          </p>
          <div className="text-center">
            <Link to="/about" className={`inline-block font-semibold hover:underline ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>
              Learn More →
            </Link>
          </div>
        </section>
      </div>
      {/* <div className="max-w-7xl mx-auto pb-6 sm:px-6 lg:px-8">
        <div className="mt-3 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-center font-semibold text-2xl mb-4">Treasures</h2>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link to="/treasures/pendants">
              <div className="bg-white border aspect-square w-48 relative rounded hover:scale-[1.03] transition-transform">
                <ProgressiveImage
                  thumbnailSrc={`/public/categories/Pendants/thumbnails/pendants_thumbnail.png`}
                  hdSrc={`/public/categories/Pendants/pendants.png`}
                  alt="Pendants"
                  spinner={false}
                />
                <div className="text-center font-semibold">Pendants</div>
              </div>
            </Link>
            <Link to="/treasures/rings">
              <div className="bg-white border aspect-square w-48 relative rounded hover:scale-[1.03] transition-transform">
                <ProgressiveImage
                  thumbnailSrc={`/public/categories/Rings/thumbnails/rings_thumbnail.png`}
                  hdSrc={`/public/categories/Rings/rings.png`}
                  alt="Rings"
                  spinner={false}
                />
                <div className="text-center font-semibold">Rings</div>
              </div>
            </Link>
          </div>
        </div>
      </div> */}
    </main>
  )
}

export default Home
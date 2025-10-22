import React from "react"
import Featured from "../components/Featured"
import { useDarkMode } from "../contexts/DarkModeContext"
import { MapIcon, DocumentTextIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Button } from "@material-tailwind/react"
import MetaTags from "../components/MetaTags"
import { getDefaultMetaTags, getStoreSchema } from "../utils/metaTags"

const Home: React.FC = () => {
  const { isDarkMode } = useDarkMode()

  return (
    <>
      <MetaTags 
        data={getDefaultMetaTags()} 
        structuredData={getStoreSchema()}
      />
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
          <div className="flex w-full items-center mb-12">
            <div className={`flex-1 h-px ${isDarkMode ? "bg-gray-200" : "bg-gray-200"}`}></div>
          </div>

          <div className="text-center mb-12 px-4">
            <div className="flex justify-center mb-6">
              <img 
                src="/hudhud_logo.png" 
                alt="Hudhud Logo" 
                className={`h-28 w-auto rounded ${isDarkMode ? "bg-white" : "shadow-lg"}`}
              />
            </div>
            <h2 className={`font-semibold text-2xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
              Explore Ancient Heritage with Hudhud
            </h2>
            <p className={`text-md max-w-3xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Journey through the ancient inscriptions and civilisations that inspire our craft. 
              Our digital archaeological platform reveals the rich heritage behind every handcrafted piece.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 px-4">
            <div className="text-center group">
              <div className={`w-20 h-20 mx-auto mb-4 rounded flex items-center justify-center transition-all group-hover:scale-105 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <MapIcon className={`w-10 h-10 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <h3 className={`font-medium text-lg mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Interactive Maps</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Explore archaeological sites across ancient Arabia
              </p>
            </div>
            
            <div className="text-center group">
              <div className={`w-20 h-20 mx-auto mb-4 rounded flex items-center justify-center transition-all group-hover:scale-105 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <DocumentTextIcon className={`w-10 h-10 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <h3 className={`font-medium text-lg mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Ancient Inscriptions</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Browse thousands of pre-Islamic Arabian texts
              </p>
            </div>
            
            <div className="text-center group">
              <div className={`w-20 h-20 mx-auto mb-4 rounded flex items-center justify-center transition-all group-hover:scale-105 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <MagnifyingGlassIcon className={`w-10 h-10 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
              </div>
              <h3 className={`font-medium text-lg mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Smart Discovery</h3>
              <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Uncover connections across time and culture
              </p>
            </div>
          </div>

          <div className="text-center px-4 mb-12">
            <h3 className={`font-medium text-xl mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>Timeless Artistry</h3>
            <p className={`max-w-2xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Each piece we create draws from the Ancient South Arabian traditions you can explore in Hudhud. 
              Our jewellery honors age-old Yemenite craftsmanship, bringing sacred patterns and motifs into the modern world.
            </p>
          </div>
          
          <div className="text-center px-4">
            <Button
              variant="outlined"
              ripple={false}
              className={`px-8 py-3 rounded ${isDarkMode ? "border-gray-600 text-gray-200" : "border-gray-400 text-gray-900"}`}
              onClick={() => window.open("https://hudhud.shebascaravan.com", "_blank")}
            >
              Visit Hudhud
            </Button>
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
    </>
  )
}

export default Home
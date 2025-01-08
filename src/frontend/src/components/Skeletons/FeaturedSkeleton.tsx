import React from "react"
import { useDarkMode } from "../../contexts/DarkModeContext"


const FeaturedSkeleton: React.FC = () => {
  const { isDarkMode } = useDarkMode()
  const count = 3

  const randomWidth = () => {
    const widths = ["w-24", "w-28", "w-32", "w-36", "w-40"]
    return widths[Math.floor(Math.random() * widths.length)]
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <div className="grid col-span-1" key={index}>
            <div className={`border relative rounded hover:scale-[1.03] transition-transform ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"}`}>
              <div className={`w-full aspect-square ${isDarkMode ? "bg-gray-800/20": "bg-gray-200"} animate-pulse rounded`}></div>
              <div className="p-2">
                <div className={`h-5 ${randomWidth()} mx-auto ${isDarkMode ? "bg-gray-800/40": "bg-gray-200"} animate-pulse rounded mt-2`}></div>
                <div className={`h-5 w-16 mx-auto ${isDarkMode ? "bg-gray-800/40": "bg-gray-200"} animate-pulse rounded my-1`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturedSkeleton
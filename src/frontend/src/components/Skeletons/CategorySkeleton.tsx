import React from 'react'

const CategorySkeleton: React.FC<{ showFilters?: boolean }> = ({ showFilters = false }) => {
  const count = 12

  const randomWidth = () => {
    const widths = ['w-24', 'w-28', 'w-32', 'w-36', 'w-40']
    return widths[Math.floor(Math.random() * widths.length)]
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center mt-5 mb-4">
          <div className="h-8 w-36 bg-gray-200 animate-pulse rounded mb-4"></div>
          {showFilters && (
            <div className="flex space-x-2">
              <div className="h-8 w-36 bg-gray-200 animate-pulse rounded mb-4 hidden sm:block"></div>
              <div className="h-8 w-36 bg-gray-200 animate-pulse rounded mb-4 hidden sm:block"></div>
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded mb-4 hidden sm:block"></div>
              <div className="h-8 w-9 bg-gray-200 animate-pulse rounded mb-4 hidden sm:block"></div>
              <div className="h-8 w-20 sm:w-9 bg-gray-200 animate-pulse rounded mb-4"></div>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: count }).map((_, index) => (
            <div className="grid col-span-1" key={index}>
              <div className="bg-gray-50 border relative rounded hover:scale-[1.03] transition-transform">
                <div className="w-full aspect-square bg-gray-200 animate-pulse rounded"></div>
                <div className={`h-5 ${randomWidth()} mx-auto bg-gray-200 animate-pulse rounded mt-2`}></div>
                <div className="h-5 w-10 mx-auto bg-gray-200 animate-pulse rounded my-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default CategorySkeleton

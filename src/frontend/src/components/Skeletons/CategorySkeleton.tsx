import React from 'react'

const CategorySkeleton: React.FC = () => {
  const count = 12

  const randomWidth = () => {
    const widths = ['w-24', 'w-28', 'w-32', 'w-36', 'w-40']
    return widths[Math.floor(Math.random() * widths.length)]
  }

  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="h-8 w-36 bg-gray-200 animate-pulse rounded mt-5 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: count }).map((_, index) => (
            <div className="grid col-span-1">
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


  return (
    <main className="flex-grow bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="md:flex">


          <div className="w-full md:w-3/5">
            <div className="aspect-square w-full bg-gray-200 animate-pulse rounded"></div>
            <div className="flex pt-3 space-x-1">
              <div className="h-16 w-16 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-16 w-16 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-16 w-16 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-16 w-16 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>

          <div className="w-full md:w-2/5 md:ml-5">
            <div className="flex my-4 space-x-10 pb-2 border-b border-gray-300">
              <div className="h-7 w-3/4 bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-7 w-1/4 bg-gray-200 animate-pulse rounded"></div>
            </div>

            <section className="mb-6">
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse mb-2 rounded"></div>
            </section>

            <section className="mb-6">
              <div className="h-4 w-3/12 bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-2/12 bg-gray-200 animate-pulse mb-2 rounded"></div>
              <div className="h-4 w-3/12 bg-gray-200 animate-pulse mb-2 rounded"></div>
            </section>

            <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CategorySkeleton

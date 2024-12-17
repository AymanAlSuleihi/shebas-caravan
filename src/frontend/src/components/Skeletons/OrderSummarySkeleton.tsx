import React from 'react'

type OrderSummarySkeletonProps = {
  itemCount: number
}

const OrderSummarySkeleton: React.FC<OrderSummarySkeletonProps> = ({ itemCount }: OrderSummarySkeletonProps) => {
  return (
    <div className="w-full">
      <div className="border-t w-full">
        <ul className="w-full">
          {Array.from({ length: itemCount }).map((_, index) => (
            <li key={index} className="py-4 border-b">
              <div className="flex animate-pulse">
                <div className="w-1/6 min-w-28">
                  <div className="h-28 w-28 bg-gray-200 rounded"></div>
                </div>
                <div className="flex flex-col md:flex-row w-4/6">
                  <div className="md:w-1/2 md:mr-10 my-auto">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  </div>
                  <div className="flex items-center md:w-1/2 mt-4 md:mt-0">
                    <div className="h-5 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row w-1/6 items-center my-auto">
                  <div className="h-5 w-20 bg-gray-200 rounded ml-auto mb-auto"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col max-w-[432px] ml-auto mt-5">
        <div className="flex place-content-between mb-2 animate-pulse">
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-10 bg-gray-200 rounded"></div>
        </div>
        <div className="flex place-content-between mb-2 animate-pulse">
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-10 bg-gray-200 rounded"></div>
        </div>
        <div className="flex place-content-between mb-2 animate-pulse">
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
          <div className="h-5 w-10 bg-gray-200 rounded"></div>
        </div>
        <div className="flex place-content-between border-t pt-2 animate-pulse">
          <div className="h-5 w-28 bg-gray-200 rounded"></div>
          <div className="h-5 w-14 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummarySkeleton
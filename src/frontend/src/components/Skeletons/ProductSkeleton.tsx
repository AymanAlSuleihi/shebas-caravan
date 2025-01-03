import React, { useState } from "react"
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react"
import { useDarkMode } from "../../contexts/DarkModeContext"

const ProductSkeleton: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const { isDarkMode } = useDarkMode()

  const tabsData = [
    {
      label: 
      <>
        <div className={`h-5 w-16 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
      </>,
      value: 0,
      desc: 
      <>
        <section className="my-4">
          <div className={`h-5 w-2/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-1/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-5 w-4/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-3/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-5 w-4/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-6/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-4 w-8/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
      </>
    },
    {
      label: 
      <>
        <div className={`h-5 w-20 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
      </>,
      value: 1,
      desc: 
      <>
        <section className="my-4">
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-3/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-5 w-4/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-2/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-5 w-4/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-10/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
        <section className="my-4">
          <div className={`h-5 w-4/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
          <div className={`h-4 w-6/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
        </section>
      </>
    },
  ]

  return (
    <main className={`flex-grow ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="md:flex">
          <div className="w-full md:w-3/5">
            <div className={`aspect-square w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
            <div className="flex pt-3 space-x-1">
              <div className={`h-16 w-16 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
              <div className={`h-16 w-16 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
              <div className={`h-16 w-16 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
              <div className={`h-16 w-16 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
            </div>
          </div>

          <div className="w-full md:w-2/5 md:ml-5">
            <div className={`flex my-4 space-x-10 pb-2 border-b ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}>
              <div className={`h-7 w-3/4 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-7 w-1/4 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>
            </div>

            <section className="mb-6">
              <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-1/3 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
            </section>

            <section className="mb-6">
              <div className={`h-4 w-3/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-2/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
              <div className={`h-4 w-3/12 ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse mb-2 rounded`}></div>
            </section>

            <div className={`h-10 w-full ${isDarkMode ? "bg-gray-800/40" : "bg-gray-200"} animate-pulse rounded`}></div>

            <div className="mt-5">
              <Tabs value={selectedTab}>
                <TabsHeader
                  className={`rounded-none border-b bg-transparent p-0 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                  indicatorProps={{
                    className:
                      `bg-transparent border-b shadow-none rounded-none ${isDarkMode ? "border-gray-700" : "border-gray-300"}`,
                  }}
                >
                  {tabsData.map(({ label, value }) => (
                    <Tab key={value} value={value} onClick={() => setSelectedTab(value)}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {tabsData.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductSkeleton

import React from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react"

interface Tab {
  label: string | JSX.Element
  value: number
  desc: string | JSX.Element
}

interface TabsSectionProps {
  tabsData: Tab[]
}

const TabsSection: React.FC<TabsSectionProps> = ( {tabsData} ) => {
  const [activeTab, setActiveTab] = React.useState<number>(0)

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b border-gray-400 shadow-none rounded-none",
        }}
      >
        {tabsData.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
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
  )
}

export default TabsSection
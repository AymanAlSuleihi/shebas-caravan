import React, { useState } from "react"
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react"
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  SunIcon,
  MoonIcon,
  CubeIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/solid"
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

import useAuth from "../../utils/auth"
import { NavLink } from "react-router-dom"
import { useDarkMode } from "../../contexts/DarkModeContext"

interface SidebarProps {
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const { logout } = useAuth()
  const handleLogout = async () => logout()

  return (
    <div className={`fixed top-0 left-0 z-40 h-full ${isDarkMode ? "bg-gray-900" : "bg-white"} transition-colors duration-300 w-14 flex flex-col items-center`}>
      <IconButton variant="text" size="lg" onClick={openDrawer} className={`${isDarkMode ? "text-gray-200" : "text-gray-800"} transition-colors duration-300 mt-2`}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        transition={{
          type: "spring",
          duration: 0.5,
        }}
        overlay={false}
        className={`${isDarkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}
      >
        <Card
          color="transparent"
          shadow={false}
          className={`h-[calc(100vh-2rem)] w-full p-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
        >
          <div className="mb-2 flex items-center gap-2 p-4">
            <Typography
              variant="h4"
              className={`text-[26px] text-center mb-1 py-[3px] border-y-2 ${
                isDarkMode ? "border-gray-200 text-gray-200" : "border-blue-gray-900 text-gray-800"
              } h-8 leading-7 transition-colors duration-300`}
            >
                  𐩪
            </Typography>
            <Typography variant="h5" className={`text-center ${isDarkMode ? "text-gray-200" : "text-gray-800"} transition-colors duration-300`}>
              Sheba Commerce
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />}
              label="Search"
              className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
              labelProps={{
                className: `${isDarkMode ? "text-gray-400" : "text-gray-600"}`
              }}
            />
          </div>
          <List className={`${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
            <List className="p-0">
              <NavLink to="/admin">
                <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
                <ListItemPrefix>
                  <PresentationChartBarIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                </ListItemPrefix>
                  Dashboard
                </ListItem>
              </NavLink>
              <NavLink to="/admin/customers">
                <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <ListItemPrefix>
                    <UserCircleIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                  </ListItemPrefix>
                  Customers
                </ListItem>
              </NavLink>
              <NavLink to="/admin/orders">
                <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
                <ListItemPrefix>
                  <ShoppingBagIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                </ListItemPrefix>
                  Orders
                </ListItem>
              </NavLink>
              <NavLink to="/admin/products">
                <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <ListItemPrefix>
                    <CubeIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                  </ListItemPrefix>
                  Products
                </ListItem>
              </NavLink>
              <NavLink to="/admin/categories">
                <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
                  <ListItemPrefix>
                    <BuildingStorefrontIcon className={`h-5 w-5 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`} />
                  </ListItemPrefix>
                  Categories
                </ListItem>
              </NavLink>
            </List>
            <hr className={`my-2 ${isDarkMode ? "border-gray-700" : "border-blue-gray-50"}`} />
            <ListItem onClick={toggleDarkMode} className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100 focus:bg-gray-900 focus:text-gray-200" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-800"}`}>
              <ListItemPrefix>
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </ListItemPrefix>
              {isDarkMode ? "Lightmode" : "Darkmode"}
            </ListItem>
            <ListItem className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={handleLogout} className={`transition-colors duration-300 ${isDarkMode ? "text-gray-200 hover:bg-gray-800 hover:text-gray-100" : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"}`}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  )
}

export default Sidebar
import React, { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Refine } from "@refinedev/core"
import { isLoggedIn } from "../../utils/auth"
import Sidebar from "../../components/Admin/Sidebar"
import { dataProvider } from "../../providers/DataProvider"
import { DarkModeProvider, useDarkMode } from "../../contexts/DarkModeContext"

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/admin/login")
    }
    setLoading(false)
  }, [])

  if (loading) {
    return null
  }

  return (
    <DarkModeProvider>
      <Refine dataProvider={dataProvider}>
        <div className="flex flex-col min-h-screen">
          <AdminContent isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        </div>
      </Refine>
    </DarkModeProvider>
  )
}

const AdminContent: React.FC<{ isDrawerOpen: boolean, setIsDrawerOpen: (open: boolean) => void }> = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const { isDarkMode } = useDarkMode()

  return (
    <div className={`flex flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <Sidebar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <div className={`flex-1 transition-all duration-200 ${isDrawerOpen ? 'ml-[300px]' : 'ml-14'}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
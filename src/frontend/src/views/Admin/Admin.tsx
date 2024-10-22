import React, { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { isLoggedIn } from "../../utils/auth"
import Sidebar from "../../components/Admin/Sidebar"
import { Footer } from "../../components/Footer"

const Admin: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Admin
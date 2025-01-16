import { useNavigate } from "react-router-dom"
import { LoginService, type Body_login_login_access_token as AccessToken } from "../client"

const isLoggedIn = () => {
  return localStorage.getItem("access_token") !== null
}

const useAuth = () => {
  const navigate = useNavigate()

  const login = async (data: AccessToken) => {
    const response = await LoginService.loginLoginAccessToken({
      formData: data,
    })
    localStorage.setItem("access_token", response.access_token)
    navigate("/admin")
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    navigate("/admin/login")
  }

  return {
    login,
    logout,
  }
}

export { isLoggedIn }
export default useAuth
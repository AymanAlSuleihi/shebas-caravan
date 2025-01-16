import React, { useState, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import { type Body_login_login_access_token as AccessToken } from "../../client"
import { Button, Input } from "@material-tailwind/react"
import { useNavigate } from "react-router-dom"
import useAuth, { isLoggedIn } from "../../utils/auth"

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<AccessToken>()
  const { login } = useAuth()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin")
    }
    setLoading(false)
  }, [])

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    console.log(data)
    login(data)
  }

  if (loading) {
    return null
  }

  return (
    <main className="flex-grow bg-gray-50 h-screen">
      <div className="max-w-lg mx-auto py-6 px-5 sm:px-6 lg:px-8">
        <div className="rounded border mt-24 p-10 bg-gray-100">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="font-semibold">Username</p>
              <Input
                {...register("username")}
                type="text"
                className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[80px]" }}
                required
              />
            </div>
            <div className="pt-2">
            <p className="font-semibold">Password</p>
              <Input
                {...register("password")}
                type="password"
                className="!border !border-gray-300 bg-white text-gray-900 rounded shadow-sm shadow-gray-900/5 ring-2 ring-transparent placeholder:text-gray-500 focus:!border-gray-500 focus:!border-t-gray-500 focus:ring-gray-900/10"
                labelProps={{
                  className: "hidden",
                }}
                containerProps={{ className: "min-w-[80px]" }}
                required
              />
            </div>
            <div>
              <button id="submit">
                <Button
                  variant="outlined"
                  ripple={false}
                  className="rounded border-gray-500 mt-5"
                  >Login</Button>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Login
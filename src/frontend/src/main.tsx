import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'

import { Router } from './router/Routes.tsx'
import './index.css'
import { OpenAPI } from './client'

OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || ""
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={Router} />
    </ThemeProvider>
  </React.StrictMode>
)
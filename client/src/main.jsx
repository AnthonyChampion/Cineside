import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import TopRated from './pages/TopRated.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <TopRated />,
        path: "/top_TMDB",
      },
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <HomePage />,
        path: "/",
      },
      {
        element: <HomePage />,
        path: "/",
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
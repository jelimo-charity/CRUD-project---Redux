
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Dashboard from './dashboard/Dashboard'
import About from './pages/About'
function App() {
  const router = createBrowserRouter([{
    
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
      path: "/about",
      element: <About />,
      errorElement: <Error />
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <Error />
    },
  
  ]);

  return (
    <>
    <RouterProvider router= {router} />
    </>
  )
}

export default App

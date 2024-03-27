import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import MasterLayout from './layouts/MasterLayout';
import AuthContextProvider, { authContext } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import { useContext, useEffect } from 'react';


let router = createBrowserRouter([
  {
    path: '', element: <MasterLayout />, children: [
      { index: true, element: <LoginPage /> },
      { path: 'dashboard', element: <ProtectedRoutes> <DashboardPage /> </ProtectedRoutes> },
    ]
  },
  { path: '*', element: <NotFoundPage /> }
])

function App() {

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  )
}

export default App

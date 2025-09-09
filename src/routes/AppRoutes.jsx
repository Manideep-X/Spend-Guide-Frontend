import { Navigate, Route, Routes } from 'react-router-dom'
import Expense from '../features/category/Expense'
import Income from '../features/category/Income'
import Signup from '../features/auth/Signup'
import Signin from '../features/auth/Signin'
import Home from '../features/dashboard/Home'
import Category from '../features/category/Category'
import Filter from '../features/filter/Filter'
import { useContext } from 'react'
import { AppContext } from '../context/AppContextProvidor'
import Loading from '../layout/Loading'
import Dashboard from '../features/dashboard/Dashboard'

const AppRoutes = () => {
  const { user, loader } = useContext(AppContext);

  if (loader) return <Loading />

  return (
    <Routes>

      {/* Auth routes */}
      <Route path='/signin' element={
        !localStorage.getItem("token") ? <Signin /> : <Navigate to='/dashboard' replace />
      } />
      <Route path='/signup' element={
        !localStorage.getItem("token") ? <Signup /> : <Navigate to='/dashboard' replace />
      } />

      {/* Need to check if the token exists before accessing these routes */}

      {/* These routes can be accessed inside home component */}
        <Route element={
          localStorage.getItem("token") && user ? <Home /> : <Navigate to='/signin' replace />
        } >

          {/* Category routes */}
          <Route path='/category' element={
            localStorage.getItem("token") && user ? <Category /> : <Navigate to='/signin' replace />
          } />
          <Route path='/income' element={
            localStorage.getItem("token") && user ? <Income /> : <Navigate to='/signin' replace />
          } />
          <Route path='/expense' element={
            localStorage.getItem("token") && user ? <Expense /> : <Navigate to='/signin' replace />
          } />

          {/* Filtering routes */}
          <Route path='/filter' element={
            localStorage.getItem("token") && user ? <Filter /> : <Navigate to='/signin' replace />
          } />

          {/* Dashboard routes */}
          <Route path='/dashboard' element={
            user ? <Dashboard /> : <Navigate to='/signin' replace />
          } />
        
        </Route>
  

      {/* Default routing */}
      <Route path='*' element={<Navigate to='/signin' replace />} />

    </Routes>
  )
}

export default AppRoutes
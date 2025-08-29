import { Navigate, Route, Routes } from 'react-router-dom'
import Expense from '../features/category/Expense'
import Income from '../features/category/Income'
import Signup from '../features/auth/Signup'
import Signin from '../features/auth/Signin'
import Home from '../features/dashboard/Home'
import Category from '../features/category/Category'
import Filter from '../features/filter/Filter'

const AppRoutes = () => {

  return (
    <Routes>

      {/* Auth routes */}
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />

      {/* Need to check if the token exists before accessing these routes */}
        {/* Category routes */}
        <Route path='/category' element={
          localStorage.getItem("token") ? <Category /> : <Navigate to='/signin' replace />
        } />
        <Route path='/income' element={
          localStorage.getItem("token") ? <Income /> : <Navigate to='/signin' replace />
        } />
        <Route path='/expense' element={
          localStorage.getItem("token") ? <Expense /> : <Navigate to='/signin' replace />
        } />
        
        {/* Filtering routes */}
        <Route path='/filter' element={
          localStorage.getItem("token") ? <Filter /> : <Navigate to='/signin' replace />
        } />
  
        {/* Dashboard routes */}
        <Route path='/dashboard' element={
          localStorage.getItem("token") ? <Home /> : <Navigate to='/signin' replace />
        } />

      {/* Default routing */}
      <Route path='*' element={<Navigate to='/signin' replace />} />

    </Routes>
  )
}

export default AppRoutes
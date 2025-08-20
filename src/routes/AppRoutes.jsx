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

      {/* Category routes */}
      <Route path='/category' element={<Category />} />
      <Route path='/income' element={<Income />} />
      <Route path='/expense' element={<Expense />} />
      
      {/* Filtering routes */}
      <Route path='/filter' element={<Filter />} />

      {/* Dashboard routes */}
      <Route path='/dashboard' element={<Home />} />

      {/* Default routing */}
      <Route path='*' element={<Navigate to='/signin' replace />} />

    </Routes>
  )
}

export default AppRoutes
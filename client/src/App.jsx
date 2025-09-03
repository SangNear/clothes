
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth-view/layout'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin/dashboard'
import AdminFeatures from './pages/admin/features'
import AdminProduct from './pages/admin/products'
import AdminOrders from './pages/admin/orders'
import HomePage from './pages/shop/home'
import ShopCheckout from './pages/shop/checkout'
import ShopListing from './pages/shop/listing'
import ShopAccount from './pages/shop/account'
import ShopLayout from './components/shop-view/layout'
import CheckAuth from './components/common/checkAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/authSlice'
import NotFoundPage from './pages/not-found'
import PageReturn from './pages/shop/paypal-return'

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <div>Loading</div>
  return (
    <Routes>
      <Route path='/' element={
        <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>

        </CheckAuth>
      }>

      </Route>
      <Route path='/auth' element={
        <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>}>
        <Route path='login' element={<AuthLogin />} />
        <Route path='register' element={<AuthRegister />} />
      </Route>


      <Route path='/admin' element={
        <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>}
      >
        <Route path='dashboard' element={<AdminDashboard />}></Route>
        <Route path='features' element={<AdminFeatures />}></Route>
        <Route path='products' element={<AdminProduct />}></Route>
        <Route path='orders' element={<AdminOrders />}></Route>
      </Route>



      <Route path='/shop' element={
        <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>
          <ShopLayout />
        </CheckAuth>}
      >
        <Route path='home' element={<HomePage />}></Route>
        <Route path='checkout' element={<ShopCheckout />}></Route>
        <Route path='listing' element={<ShopListing />}></Route>
        <Route path='account' element={<ShopAccount />}></Route>
        <Route path='paypal-return' element={<PageReturn />}></Route>
      </Route>

      <Route path='*' element={<NotFoundPage />}></Route>


    </Routes>
  )
}

export default App

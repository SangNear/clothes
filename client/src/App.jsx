import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'
import CheckAuth from './components/common/checkAuth'

// Lazy imports
const AuthLayout = lazy(() => import('./components/auth-view/layout'))
const AuthLogin = lazy(() => import('./pages/auth/login'))
const AuthRegister = lazy(() => import('./pages/auth/register'))
const AdminLayout = lazy(() => import('./components/admin-view/layout'))
const AdminDashboard = lazy(() => import('./pages/admin/dashboard'))
const AdminFeatures = lazy(() => import('./pages/admin/features'))
const AdminProduct = lazy(() => import('./pages/admin/products'))
const AdminOrders = lazy(() => import('./pages/admin/orders'))
const ShopLayout = lazy(() => import('./components/shop-view/layout'))
const HomePage = lazy(() => import('./pages/shop/home'))
const ShopCheckout = lazy(() => import('./pages/shop/checkout'))
const ShopListing = lazy(() => import('./pages/shop/listing'))
const ShopAccount = lazy(() => import('./pages/shop/account'))
const PaypalSuccess = lazy(() => import('./pages/shop/paypal-success'))
const PaypalReturn = lazy(() => import('./pages/shop/paypal-return'))
const NotFoundPage = lazy(() => import('./pages/not-found'))

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (isLoading) return <div>Loading...</div>

  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path='/' element={
          <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>
            {/* Có thể render homepage hoặc redirect */}
          </CheckAuth>
        } />

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
          </CheckAuth>}>
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='features' element={<AdminFeatures />} />
          <Route path='products' element={<AdminProduct />} />
          <Route path='orders' element={<AdminOrders />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isLoading={isLoading} isAuthenticated={isAuthenticated} user={user}>
            <ShopLayout />
          </CheckAuth>}>
          <Route path='home' element={<HomePage />} />
          <Route path='checkout' element={<ShopCheckout />} />
          <Route path='listing' element={<ShopListing />} />
          <Route path='account' element={<ShopAccount />} />
          <Route path='paypal-return' element={<PaypalReturn />} />
          <Route path='payment-success' element={<PaypalSuccess />} />
        </Route>

        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App

import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='min-h-screen w-full flex '>
      <div className='hidden bg-black flex-1 lg:flex items-center justify-center '>
        <div className='max-w-md space-y-6 text-center'>
          <h1 className='text-white text-4xl font-extrabold tracking-tight'>Welcome to Ecommerce Shopping</h1>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center bg-white '>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
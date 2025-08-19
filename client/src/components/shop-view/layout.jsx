import React from 'react'
import ShopHeader from './header'
import { Outlet } from 'react-router-dom'

const ShopLayout = () => {
    return (
        <div className='flex flex-col bg-white '>
            <ShopHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShopLayout
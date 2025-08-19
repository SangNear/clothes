import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'

const AdminLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false)
    return (
        <div className='flex min-h-screen w-full'>
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className='flex flex-col flex-1 '>
                <AdminHeader open={openSidebar} setOpen={setOpenSidebar} />
                <main className='flex-1 flex flex-col gap-2 bg-amber-50 p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
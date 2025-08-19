import { ChartLine, icons } from 'lucide-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Bolt, LayoutDashboard, NotebookPen, Package } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '../ui/sheet'

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package />
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <NotebookPen />
  },
  {
    id: "features",
    label: "Features",
    path: "/admin/features",
    icon: <Bolt />
  }
]
function MenuSidebar({ setOpen }) {
  const location = useLocation()
  const { pathname } = location

  return (
    <div className='flex flex-col items-center  py-6 gap-2 '>
      {adminSidebarMenuItems.map((item) => {
        1
        return (
          <Link to={item.path} onClick={() => setOpen(false)} key={item.id} className={`flex py-4 mr-auto gap-2 ${item.path === pathname ? "text-black" : "text-gray-300 hover:text-black transition-all"} cursor-pointer w-full`}>
            {item.icon}
            <span className='font-medium text-sm'>{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate()
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className='w-64'>

          
          <div className='flex flex-col h-full'>
            <SheetTitle className='px-2 py-6 flex items-center border-b '>
              <ChartLine />
              <p className=' font-bold text-xl'>Admin Dashboard</p>
            </SheetTitle>
            <SheetDescription className='hidden'></SheetDescription>
            <div className='flex flex-1 px-4'>
              <MenuSidebar setOpen={setOpen} />
            </div>
          </div>

        </SheetContent>
      </Sheet>
      <nav className='w-64 border-r bg-background p-6 hidden lg:block' >
        <div className='flex items-center justify-center gap-2 cursor-pointer' onClick={() => navigate("/admin/dashboard")}>
          <ChartLine />
          <h2 className=' font-bold text-xl'>Admin Dashboard</h2>
        </div>
        <MenuSidebar setOpen={setOpen} />
      </nav>
    </>

  )
}

export default AdminSidebar
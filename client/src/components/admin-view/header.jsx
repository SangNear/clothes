import { AlignJustify, LogOut } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { loginFormControl } from '@/config'
import { logOutUser } from '@/store/authSlice'

const AdminHeader = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logOutUser())
  }
  return (
    <header className='flex items-center justify-center border-b px-4 py-2'>
      <Button onClick={() => setOpen(!open)} className='lg:hidden max-sm:block'>
        <AlignJustify />
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button onClick={handleLogout} className="inline-flex px-4 py-2 text-sm shadow gap-2 font-medium">
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  )
}


export default AdminHeader
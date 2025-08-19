import CommonForm from '@/components/common/form'
import { loginFormControl } from '@/config'
import { loginUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
const initialFormData = {
  email: '',
  password: ''
}
const AuthLogin = () => {
  const [formData, setFormData] = useState(initialFormData)
  const dispatch = useDispatch()

  

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(formData)).then((data) => {
      console.log("check data:", data);
      
      if (data && data.payload?.success) {
        toast.success(data.payload.message)
      }
      else {
        toast.error("Mật khẩu hoặc Email chưa hợp lệ")
      }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Sign in to your account </h1>
        <p className='text-sm text-gray-500'>don't have an account?
          <Link to="/auth/register" className='hover:underline'> Create an account</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Login"
      />
    </div>
  )
}

export default AuthLogin
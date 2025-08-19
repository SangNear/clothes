import CommonForm from '@/components/common/form'
import { registerFormControl } from '@/config'
import { registerUser } from '@/store/authSlice'
import React, { use, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "sonner"
const initialFormData = {
  username: '',
  email: '',
  password: ''
}

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialFormData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

   
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(formData)).then((data) => {
      if (data.payload.success) {
        toast.success(data.payload.message)
        navigate('/auth/login')
      }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Create a new account </h1>
        <p className='text-sm text-gray-500'>Already have a account
          <Link to="/auth/login" className='hover:underline'> Login</Link>
        </p>

      </div>
      <CommonForm
        formControls={registerFormControl}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Register"
      />
    </div>
  )
}

export default AuthRegister
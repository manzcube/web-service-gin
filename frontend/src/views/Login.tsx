// Lib and Hooks
import React, { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../features/auth/userSlice'

// Components
import Box from '../components/Box'

// Utils
import { checkData } from '../utils/utils'
import { onChange } from '../utils/utils'
import LoginForm from '../components/LoginForm'

// Memo
const MemoizedLoginForm = memo(LoginForm)

const Login = () => {
  console.log("LOGIN IS RENDERED")

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const handleChange = onChange(setFormData)


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const checkedData = checkData(formData)
    if (checkedData.isValid) {
      dispatch(setUser(formData.email))
      navigate("/")
      return 
    }  
    return alert(checkedData.msg)
  }
  return (
    <div className='Login'>
      <MemoizedLoginForm 
        onChange={handleChange} 
        formData={formData}
        onSubmit={onSubmit} />
      <p>GIN</p>
    </div>
  )
}

export default Login
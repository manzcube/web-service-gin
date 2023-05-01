import React from 'react'
import Box from '../Box'
import { LoginFormProps } from '../../features/api/types'

const LoginForm = ({onSubmit, onChange, formData, msg}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit} className='form'>
        <h1>Sign In</h1>
        <span>{msg}</span>
        <Box onChange={onChange} placeholder='Your Email' name='email' value={formData.email} />
        <Box onChange={onChange} placeholder='Your Password' name='password' value={formData.password} />
        <button className='login-button'>submit</button>
    </form>  )
}

export default LoginForm
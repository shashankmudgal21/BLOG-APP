import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import {Link} from 'react-router-dom'
export default function SignUp() {
  return (
    <div className='mt-20 min-h-screen '>
      <div className='flex p-3 flex-col max-w-3xl md:flex-row mx-auto gap-10 md:items-center'>
        <div className='flex-1'>
        <Link to = '/' className='font-bold  dark:text-white text-4xl'>
            <span className=' text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>Shashank's</span>
            Blog
        </Link>
        <p className='mt-5 text-sm'>This is a demo project you can signup with your email and password and with your google</p>
        </div>
        <div className='flex-1'>
            <form className='flex flex-col gap-3'>
              <div>
              <Label value = "Your username"></Label>
              <TextInput type = "text" placeholder = "Username" id='Username'/>
              </div>
              <div>
              <Label value = "Your Email"></Label>
              <TextInput type = "email" placeholder = "Email" id = "Email"/>
              </div>
              <div>
              <Label value = "Your Password"></Label>
              <TextInput type = "password" placeholder = "Password" id = "Password"/>
              </div>
              <Button gradientDuoTone={'purpleToPink'} type='submit'>Sign Up</Button>
            </form>
            <div className='flex text-sm mt-3 gap-2'>
            <span className=''>Have an account? </span>
            <Link to = '/sign-in'>sign-in</Link>
            </div>
          
        </div>
      </div>
    </div>
  )
}

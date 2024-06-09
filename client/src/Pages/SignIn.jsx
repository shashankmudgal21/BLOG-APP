import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';
// import { Spinner } from 'flowbite-react';
export default function SignIn() {
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const dispatch = useDispatch()
  const {loading,error:errorMessage} = useSelector((state)=>state.user)
  const navigate = useNavigate();
  const handleChange = (e) =>{
      setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(formData.email == '' || formData.password == ''){
      dispatch(signInFailure("Please fill out all the field"))
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in",{
        method:"POST",
        headers:{
          "Content-Type":"Application/json",
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json();
      if(data.success == false)
      {
        dispatch(signInFailure(data.message))
        return;
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
        
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='mt-20 min-h-screen '>
      <div className='flex p-3 flex-col max-w-3xl md:flex-row mx-auto gap-10 md:items-center'>
        <div className='flex-1'>
        <Link to = '/' className='font-bold  dark:text-white text-4xl'>
            <span className=' text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg'>Shashank's</span>
            Blog
        </Link>
        <p className='mt-5 text-sm'>This is a demo project you can signin with your email and password and with your google</p>
        </div>
        <div className='flex-1'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <div>
              <Label value = "Your Email"></Label>
              <TextInput type = "email" placeholder = "Email" id = "email" onChange={handleChange}/>
              </div>
              <div>
              <Label value = "Your Password"></Label>
              <TextInput type = "password" placeholder = "Password" id = "password" onChange={handleChange}/>
              </div>
              <Button gradientDuoTone={'purpleToPink'} type='submit' disabled = {loading}>
                {loading?<>
                  <Spinner size={'sm'}/>
                   <span className='pl-3'> Loading....</span>
                </>
                :"Sign in"}
              </Button>
              <Oauth></Oauth>
            </form>
            <div className='flex text-sm mt-3 gap-2'>
            <span className=''>Don't have an account? </span>
            <Link to = '/sign-up'>sign-up</Link>
            
            </div>
            {
              errorMessage && (
                <Alert className='mt-5' color={'failure'}>
                 { errorMessage}
                </Alert>
              )
            }

        </div>
      </div>
    </div>
  )
}

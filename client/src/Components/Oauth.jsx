import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';
import {signInSuccess,signInFailure,signInStart} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async() =>{
          const provider = new GoogleAuthProvider();
          try {

            const result = await signInWithPopup(auth,provider);
            dispatch(signInStart());
            const res = await fetch('/api/auth/googleSignIn',{
              method:"POST",
              headers:{
                "Content-Type":"Application/json",
              },
              body:JSON.stringify({
                name:result.user.displayName,
                email:result.user.email,
                googlePhotoUrl:result.user.photoUrl
              })
            })
            const data = await res.json();
            if(res.ok){
               dispatch(signInSuccess(data));
               navigate('/')
            }
            else{
              dispatch(signInFailure(data));
            }
          // if(data.success === false){
          //   dispatch(signInFailure(data));
          // }
          } catch (error) {
            console.log(error)
            dispatch(signInFailure(error.message));
          }
    }
  return (
    <div>
      <Button className='w-full'  type='button' gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className='mr-3 w-6 h-6'/>
      Sign in with google
      </Button>
    </div>
  )
}

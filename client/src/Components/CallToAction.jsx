import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='p-3 gap-2 text-center flex flex-col sm:flex-row justify-center items-center border border-teal-500 rounded-tl-3xl rounded-br-3xl'>
      <div className='flex-1 justify-center flex flex-col'>
        <h1 className='text-center text-3xl'>Want to learn more about javscript</h1>
        <p className='text-center my-2'>checkout these resources with 100 javscript projects</p>
        <Button gradientDuoTone={'purpleToPink'}>Learn More</Button>
      </div>
      <div className='flex-1 justify-center flex flex-col p-7'>
        <img src="https://th.bing.com/th/id/OIP.U16Sxl3a_xpV8R3xDGgMdQAAAA?rs=1&pid=ImgDetMain" alt="" />
      </div>
    </div>
  )
}

export default CallToAction

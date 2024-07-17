import React from 'react'
import CallToAction from '../Components/CallToAction'
export default function Projects() {
  return (
    <div className='max-w-2xl mx-auto p-3 text-center min-h-screen flex flex-col justify-center'>
      <div className='flex flex-col gap-6 p-6'>

      <h1 className='text-3xl text-center font-semibold my-2'>My project</h1>
      <p className='text-md text-slate-500 my-2'>
      Build fun and engaging projects while learning HTML, CSS, and JavaScript!
      </p>
      <CallToAction/>
      </div>
    </div>
  )
}

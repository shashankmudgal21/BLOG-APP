import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className='p-3 min-h-screen max-w-3xl mx-auto'>
        <h1 className='text-semibold text-3xl text-center my-4'>Create post</h1>
        <form className='flex flex-col  gap-4'>
            <div className='flex flex-col sm:flex-row gap-3'>
                <TextInput placeholder='Title' className='flex-1' required/>
                <Select required>
                    <option value="uncategorized">Select a category</option>
                    <option value="javascript">Javascript</option>
                    <option value="react">React</option>
                    <option value="next">Next</option>
                </Select>
            </div>
            <div className='flex flex-row gap-4 justify-between items-center border-4 border-dotted p-3 border-teal-500'>
                <FileInput type = "file" accept='images/*'/>
                <Button gradientDuoTone={'purpleToPink'} outline>Upload Image</Button>
            </div>
            <ReactQuill theme="snow" className='h-72 mb-10' required />
            <Button type='submit' gradientDuoTone={'purpleToPink'} outline> Publish</Button>
        </form>
    </div>
  )
}

import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Spinner } from 'flowbite-react';
import  {getStorage, getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import {app} from '../firebase'

export default function CreatePost() {
    const [files,setFiles] = useState(null);
    const [imageProgress,setImageProgress] = useState(null)
    const [imageError,setImageError] = useState(null)
    const [formData,setFormData] = useState({});
    console.log(formData)
    const handleUploadImage = async()=>{
        if(!files){
            setImageError("select a image")
            return};
        try {
            setImageError(null)
            const storage = getStorage(app);
            const fileName = new Date()+files
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,files);
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageProgress(progress.toFixed(0));
                },
                (error) => {
                    // Handle unsuccessful uploads
                    setImageError("Image is not uploaded")
                    setImageProgress(null)
                }, 
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      setImageProgress(null)
                      setFormData({...formData,image:downloadURL})
                    });
                }
            )
        } catch (error) {
            setImageError(error.message)
        }
    }
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
                <FileInput type = "file" accept='images/*' onChange={(e)=>setFiles(e.target.files[0])}/>
                <Button gradientDuoTone={'purpleToPink'} outline onClick={handleUploadImage}>
                    {imageProgress ? <Spinner/> : "Upload"}
                </Button>
            </div>
            {imageError && <Alert color={'failure'}>{imageError}</Alert>}
            {formData.image && <img className='w-full h-72 object-cover' src={formData.image}/>}
            <ReactQuill theme="snow" className='h-72 mb-10' required />
            <Button type='submit' gradientDuoTone={'purpleToPink'} outline> Publish</Button>
        </form>
    </div>
  )
}

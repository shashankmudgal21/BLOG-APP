import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFailure } from "../redux/user/userSlice";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [formData,setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [fileUploadProgress, setFileUploadProgress] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [userSuccess,setUserSuccess] = useState(false)
  const [updateUserError,setUpdateUserError] = useState(null);
  const filePickerRef = useRef();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file))
    }
  };
  useEffect(() => {
    if(imageFile)
    uploadImage();
  }, [imageFile]);
  
  const uploadImage =  () => {
    setFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setFileUploadError("File cant be uploaded (2MB file is allowed)");
        setFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData,profilePicture:downloadURL});
        });
      }
    );
  };
  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    setUserSuccess(false)
    setUpdateUserError(null)
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser.rest._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      console.log(data)
      if(res.ok){
        setUserSuccess(true)
        dispatch(updateSuccess(data))
      }
      else{
        setUpdateUserError(data.message)
        dispatch(updateFailure("User can't be updated"))
      }
    } catch (error) {
      dispatch(updateFailure(error.message))
      setUpdateUserError(error.message)
    }
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl my-3">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={filePickerRef}
          hidden
        />
        
        <div
          className="h-32 w-32 self-center cursor-pointer relative"
          onClick={() => filePickerRef.current.click()}
        >
          {fileUploadProgress && <CircularProgressbar strokeWidth={5}  value={fileUploadProgress} text={`${fileUploadProgress}%`}
          styles={{
            root:{
              width:"100%",
              height:"100%",
              position:"absolute",
              // top:0,
              // left:0,
            },
            path: {
              // Path color
              stroke: `rgba(62, 152, 199, ${fileUploadProgress / 100})`,
             
            },
          }}
          />}
          <img
            src={imageFileUrl || currentUser?.rest?.profilePicture}
            alt=""
            className={`w-full h-full rounded-full border-8 border-[lightgray] ${fileUploadProgress && fileUploadProgress<100 && "opacity-60"}`}
          />
        </div>
        {fileUploadError && <Alert color={'failure'}>
          {fileUploadError}
          </Alert>}
        <TextInput
          type="text"
          id="username"
          defaultValue={currentUser?.rest?.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          defaultValue={currentUser?.rest?.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="password"
          defaultValue={"**********"}
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"} outline>
          Update Account
        </Button>
        <div className="flex justify-between">
          <span className="text-red-500 cursor-pointer">Delete Account</span>
          <span className="text-red-500 cursor-pointer">Sign Out</span>
        </div>
      </form>
      {userSuccess && <Alert className="mt-3" color={"success"}>
        User updated Succesfully
        </Alert>}
      {updateUserError && <Alert className="mt-3" color={"failure"}>
        {updateUserError}
        </Alert>}
    </div>
  );
}

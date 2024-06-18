import React, { useEffect, useState } from 'react'
import moment from 'moment'
const Comment = ({comment}) => {
    const [user,setUser] = useState(null);
    console.log(user)
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if(res.ok){

                    setUser(data);
                }
                else{
                    console.log(data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    },[comment?.userId])
  return (
    <div className='flex p-4 border-b items-center gap-2 text-sm'>
        <div className='flex-shrink-0'>
            <img className='w-10 rounded-full h-10' src={user?.profilePicture} alt="" />
        </div>
        <div className='flex-1 items-center flex-col gap-1'>
            <span className='font-bold truncate text-sm mr-1'>{user?`@${user?.username}`:"Anonyms user"}</span>
            <span>{moment(comment.createdAt).fromNow()}</span>
            <p>{comment.content}</p>
        </div>
        
    </div>
  )
}

export default Comment

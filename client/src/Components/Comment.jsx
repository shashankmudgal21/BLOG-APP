import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
const Comment = ({ comment, onLike,onEdit,onDelete }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment?.userId]);
  console.log(editedComment);
  const handleEdit = async () => {
    setIsEdit(true);
  };
  const handleSave = async()=>{
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"Application/json",
        },
        body:JSON.stringify({content:editedComment})
      })
      const data = await res.json();
      if(res.ok){
        setIsEdit(false);
        onEdit(comment,editedComment)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex p-4 border-b items-center gap-2 text-sm">
      <div className="flex-shrink-0">
        <img
          className="w-10 rounded-full h-10"
          src={user?.profilePicture}
          alt=""
        />
      </div>
      <div className="flex-1 items-center flex-col gap-2 ">
        <div className="my-1">
          <span className="font-bold truncate text-sm mr-1">
            {user ? `@${user?.username}` : "Anonyms user"}
          </span>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>
        {isEdit ? (
          <>
            <Textarea
              className="p-3 mb-2"
              rows={3}
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button onClick={handleSave} gradientDuoTone={'purpleToPink'} outline>Save</Button>
              <Button onClick={()=>setIsEdit(false)} gradientDuoTone={'purpleToPink'} outline>Cancel</Button>
            </div>
          </>
        ) : (
          <>
            <div className="my-2">
              <p>{comment.content}</p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t text-xs dark:border-gray-700 max-w-fit">
              <button
                onClick={() => onLike(comment._id)}
                type="button"
                className={`mt-1 text-gray-400 text-sm hover:text-blue-500 ${
                  comment.likes.includes(currentUser?.rest._id) &&
                  " !text-blue-500"
                }`}
              >
                <FaThumbsUp />
              </button>
              {comment.likes.length > 0 && <p>{comment.likes?.length} Likes</p>}
              {currentUser &&
                (currentUser.rest._id === comment.userId ||
                  currentUser.rest.isAdmin) && (
                    <>
                    <p
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500 text-sm cursor-pointer"
                  >
                    Edit
                  </p>
                  <p
                    onClick={()=>onDelete(comment._id)}
                    className="text-gray-400 hover:text-blue-500 text-sm cursor-pointer"
                  >
                    Delete
                  </p>
                    </>
                  
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;

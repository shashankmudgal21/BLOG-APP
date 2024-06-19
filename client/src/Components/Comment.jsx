import React, { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
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
        <div className="my-2">
          <p>{comment.content}</p>
        </div>
        <div className="flex items-center gap-2 pt-2 border-t text-xs dark:border-gray-700 max-w-fit">
          <button
            onClick={() => onLike(comment._id)}
            type="button"
            className={`mt-1 text-gray-400 text-sm hover:text-blue-500 ${
              comment.likes.includes(currentUser?.rest._id) && " !text-blue-500"
            }`}
          >
            <FaThumbsUp />
          </button>
          {comment.likes.length > 0 && <p>{comment.likes?.length} Likes</p>}
        </div>
      </div>
    </div>
  );
};

export default Comment;

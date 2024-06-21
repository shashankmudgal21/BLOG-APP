import { Alert, Button, Modal, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [commentToDelete,setCommentToDelete] = useState(null)
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setCommentError(null);
      const res = await fetch("/api/comment/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: currentUser?.rest._id,
          postId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentData([data, ...commentData]);
      } else {
        setCommentError(data.message);
      }
    } catch (error) {
      console.log(error);
      setCommentError(error);
    }
  };
  useEffect(() => {
    const getComment = async () => {
      try {
        const res = await fetch(`/api/comment/getComment/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setCommentData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComment();
  }, [postId]);
  const handleLike = async (commentId) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      if (res.ok) {
        const data = await res.json();
        setCommentData(
          commentData?.map((c) =>
            c._id === commentId
              ? {
                  ...c,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : c
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (comment, editedComment) => {
    setCommentData(
      commentData.map((c) =>
        c._id === comment._id ? { ...c, content: editedComment } : c
      )
    );
  };
  const handleCommentDelete = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setCommentData((prev) => prev.filter((c) => c._id !== commentToDelete));
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as :</p>
          <img
            className="h-5 rounded-full w-5 object-cover"
            src={currentUser?.rest.profilePicture}
            alt=""
          />
          <Link to={`/dashboard?tab=profile`}>
            @{currentUser?.rest.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment
          <Link to={"/sign-in"}> Sign In</Link>
        </div>
      )}
      {currentUser && (
        <div>
          <form
            onSubmit={submitHandler}
            className="border border-teal-500 p-3 rounded-lg"
          >
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment ..."
              maxLength={200}
              rows={3}
            />
            <div className="flex justify-between items-center mt-5">
              <p className="text-xs text-gray-500">
                {200 - comment.length} is remaining
              </p>
              <Button type="submit" gradientDuoTone={"purpleToPink"} outline>
                {" "}
                Submit
              </Button>
            </div>
          </form>
          {commentError && (
            <Alert className="my-3" color={"failure"}>
              {" "}
              {commentError}
            </Alert>
          )}
        </div>
      )}
      {commentData.length === 0 ? (
        <p className="my-5 text-sm">No comment yet</p>
      ) : (
        <>
          <div className="my-5 flex items-center gap-2 text-sm px-2">
            Comments
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              {commentData?.length}
            </div>
          </div>
          <div>
            {commentData?.map((c) => (
              <Comment
                key={c._id}
                comment={c}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setOpenModal(true);
                  setCommentToDelete(commentId)
                }}
              />
            ))}
          </div>
        </>
      )}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleCommentDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;

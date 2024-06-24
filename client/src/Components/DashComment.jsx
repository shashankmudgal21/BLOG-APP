import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const DashComment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [commentId, setCommentId] = useState("");
  console.log(comment)
  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(
        `/api/comment/getComment`
      );
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setComment(data.comments);
        if (data.comments.length < 9) setShowMore(false);
      }
    };
    if (currentUser?.rest.isAdmin) getComment();
  }, [currentUser?.rest._id]);
  const loadMore = async () => {
    const startIndex = comment.length;
    try {
      const res = await fetch(
        `/api/comment/getComment?startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data.comments);
      if (res.ok) {
        setComment((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComment((prev) => prev.filter((comment) => comment._id !== commentId));
        console.log(comment)
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 md:mx-auto table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table >
        <Table.Head>
          <Table.HeadCell>Updated At</Table.HeadCell>
          <Table.HeadCell>Comment Content</Table.HeadCell>
          <Table.HeadCell>No of likes</Table.HeadCell>
          <Table.HeadCell>PostId</Table.HeadCell>
          <Table.HeadCell>UserId</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {currentUser?.rest.isAdmin && comment?.length > 0 ? (
          comment.map((comment) => (
            <Table.Body className="divide-y" key={comment._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                    {comment.content}
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {comment.numberOfLikes}
                </Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setCommentId(comment._id);
                      setOpenModal(true);
                    }}
                    className="font-semibold text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        ) : (
          <p>No comments yet</p>
        )}
      </Table>
      {showMore && (
        <button
          onClick={loadMore}
          className="font-semibold text-teal-500 self-center w-full py-7 "
        >
          Show More
        </button>
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
            <h3
              className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this Comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
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

export default DashComment;

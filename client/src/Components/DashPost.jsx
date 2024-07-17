import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPost = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [postId, setPostId] = useState("");
  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(
        `/api/post/getAllPost?userId=${currentUser.rest._id}`
      );
      const data = await res.json();
      if (res.ok) {
        setPost(data.posts);
        if (data.posts.length < 9) setShowMore(false);
      }
    };
    if (currentUser?.rest.isAdmin) getPost();
  }, [currentUser?.rest._id]);
  const loadMore = async () => {
    const startIndex = posts.length;
    try {
      const res = await fetch(
        `/api/post/getAllPost?userId=${currentUser.rest._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/post/delete/${postId}/${currentUser?.rest._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setPost((prev) => prev.filter((post) => post._id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-3 md:mx-auto table-auto overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <Table>
        <Table.Head>
          <Table.HeadCell>Updated At</Table.HeadCell>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {currentUser?.rest.isAdmin && posts?.length > 0 ? (
          posts.map((post) => (
            <Table.Body className="divide-y" key={post._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt=""
                      className="h-10 w-20 object-cover"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {post.title}
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setPostId(post._id);
                      setOpenModal(true);
                    }}
                    className="font-semibold text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/update-post/${post._id}`}>
                    <span className="hover:underline font-semibold text-teal-500">
                      Edit
                    </span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))
        ) : (
          <p>Post are not available</p>
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
              onClick={handleDelete}
              className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this blog?
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

export default DashPost;

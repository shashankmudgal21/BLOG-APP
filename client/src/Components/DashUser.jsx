import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const DashUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setusers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(
        `/api/user/getUser`
      );
      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setusers(data.userWithoutPassword);
        if (data.userWithoutPassword.length < 9) setShowMore(false);
      }
    };
    if (currentUser?.rest.isAdmin) getUser();
  }, [currentUser?.rest._id]);
  const loadMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getUser?startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data.userWithoutPassword);
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.userWithoutPassword]);
        if (data.userWithoutPassword.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setOpenModal(false);
    try {
      const res = await fetch(
        `/api/user/delete/${userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        console.log(data)
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
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        {currentUser?.rest.isAdmin && users?.length > 0 ? (
          users.map((user) => (
            <Table.Body className="divide-y" key={user._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                <Table.Cell>
                  {new Date(user.updatedAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt=""
                      className="rounded-full h-10 w-10 object-cover"
                    />
                </Table.Cell>
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.isAdmin ? <FaCheck className="text-green-500"/> : <ImCross className="text-red-500"/>}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setUserId(user._id);
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
          <p>Users are not available</p>
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

export default DashUser;

import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import {
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashComp = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [lastMonthUser, setLastMonthUser] = useState(0);
  const [totalPost, setTotalPost] = useState(0);
  const [lastMonthPost, setLastMonthPost] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [lastMonthComment, setLastMonthComment] = useState(0);
  const [totalLike, setTotalLike] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user/getUser?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.userWithoutPassword);
          setTotalUser(data.totalUser);
          setLastMonthUser(data.lastmonthUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getAllPost?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPost(data.totalPost);
          setLastMonthPost(data.lastMonthPost);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComment = async () => {
      try {
        const res = await fetch(`/api/comment/getComment?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComment(data.totalComment);
          setLastMonthComment(data.lastMonthsComment);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.rest.isAdmin) {
      fetchUser();
      fetchPost();
      fetchComment();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex  items-center justify-between">
            <div className="flex flex-col">
              <h1 className="uppercase">Total users</h1>
              <p className="text-2xl">{totalUser}</p>
              <div className="flex gap-2 text-sm">
                <span className="flex text-green-500 items-center">
                  {lastMonthUser}
                  <HiArrowNarrowUp />
                </span>
                <div className="text-gray-500">Last Months</div>
              </div>
            </div>
            <HiOutlineUserGroup className="bg-teal-500 text-white p-3 rounded-full text-5xl" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-col">
              <h1 className="uppercase">Total Comments</h1>
              <p className="text-2xl">{totalComment}</p>
              <div className="flex gap-2 text-sm">
                <span className="flex text-green-500 items-center">
                  {lastMonthComment}
                  <HiArrowNarrowUp />
                </span>
                <div className="text-gray-500">Last Months</div>
              </div>
            </div>
            <FaRegCommentDots className="bg-teal-500 text-white p-3 rounded-full text-5xl" />
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-col">
              <h1 className="uppercase">Total posts</h1>
              <p className="text-2xl">{totalPost}</p>
              <div className="flex gap-2 text-sm">
                <span className="flex text-green-500 items-center">
                  {lastMonthPost}
                  <HiArrowNarrowUp />
                </span>
                <div className="text-gray-500">Last Months</div>
              </div>
            </div>
            <HiDocumentText className="bg-teal-500 text-white p-3 rounded-full text-5xl" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4  py-3 mx-auto justify-center">
        <div className="flex w-full md:w-auto flex-col shadow-md dark:bg-slate-800 rounded-md p-2">
          <div className="p-3 flex  gap-2 text-sm font-semibold justify-between">
            <h1 className="text-center p-2">Recent User</h1>
            <Button gradientDuoTone={"purpleToPink"}>
              <Link to={`/dashboard?tab=users`}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                    <Table.Cell>
                      <img
                        className="w-10 h-10 rounded-full"
                        src={user.profilePicture}
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex w-full shadow-md  md:w-auto py-3 flex-col  dark:bg-slate-800 rounded-md p-2 ">
          <div className="p-3  flex items-center gap-2 text-sm font-semibold justify-between">
            <h1 className="text-center">Recent Comment</h1>
            <Button gradientDuoTone={"purpleToPink"}>
              <Link to={`/dashboard?tab=comments`}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                    <Table.Cell>
                      <p className="w-96 line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex w-full md:w-auto py-3 flex-col mx-auto shadow-md dark:bg-slate-800 rounded-md p-2">
          <div className="p-3  flex items-center gap-2 text-sm font-semibold justify-between">
            <h1 className="text-center">Recent Post</h1>
            <Button gradientDuoTone={"purpleToPink"}>
              <Link to={`/dashboard?tab=posts`}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-700">
                    <Table.Cell>
                      <img
                        className="w-14 h-10 rounded-full"
                        src={post.image}
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell>{post.title}</Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashComp;

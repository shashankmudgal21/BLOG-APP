import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../Components/CallToAction";
import CommentSection from "../Components/CommentSection";
import PostCard from "../Components/PostCard";
const PostPage = () => {
  const { postSlug } = useParams();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentpost, setRecentpost] = useState([]);
//   console.log(recentpost)
//   console.log(posts);
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getAllPost?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setError(null);
          setPosts(data.posts[0]);
        } else {
          setLoading(false);
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    };
    getPost();
  }, [postSlug]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/post/getAllPost?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentpost(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={"xl"} />
      </div>
    );
  return (
    <main className="min-h-screen flex flex-col max-w-6xl mx-auto">
      <h1 className="text-3xl text-center font-serif mt-10 p-3 lg:text-4xl max-w-2xl mx-auto">
        {posts?.title}
      </h1>
      <Link
        to={`/search?category=${posts?.category}`}
        className="self-center mt-5"
      >
        <Button color={"gray"} pill size={"xs"}>
          {posts?.category}
        </Button>
      </Link>
      <img
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
        src={posts?.image}
        alt=""
      />
      <div className="flex max-w-2xl justify-between mt-5 font-bold p-3 border-b border-slate-700 mx-auto w-full text-sm">
        <span>{new Date(posts?.createdAt).toDateString()}</span>
        <span>{(posts?.content.length / 100).toFixed(0)} min read</span>
      </div>
      <div
        className="max-w-2xl mx-auto p-3 post-content"
        dangerouslySetInnerHTML={{ __html: posts && posts?.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <div className="max-w-3xl mx-auto w-full">
        <CommentSection postId={posts?._id} />
      </div>
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 justify-center mt-5">{recentpost && recentpost.map((post) => (<PostCard post = {post} />))}</div>
      </div>
    </main>
  );
};

export default PostPage;

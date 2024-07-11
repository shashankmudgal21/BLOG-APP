import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../Components/CallToAction.jsx";
import PostCard from "../Components/PostCard.jsx";
export default function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getAllPost`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-20 px-3 mx-auto max-w-6xl">
        <h1 className="text-center text-3xl md:text-6xl font-semibold">
          Welcome to my blog
        </h1>
        <p className="text-center text-gray-500 text-xs sm:text-sm">
          Here you'll find a variety of articles and doucmentation on topics
          such as web development, software engineering, and programming
          languages.
        </p>
        <Link
          className="text-center text-teal-500 font-bold hover:underline"
          to={`/search`}
        >
          View All Post
        </Link>
      </div>
      <div className="p-3 max-w-6xl mx-auto">
        <CallToAction />
      </div>
      <div className="py-7 max-w-6xl  p-3 mx-auto  ">
        {posts && (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl text-center py-4 font-semibold">
              Recent Posts
            </h1>
            <div className="flex flex-wrap gap-4">

            {posts.map((p) => (
              <div key = {p._id} className="">
                <PostCard   post={p} />
              </div>
            ))}
            </div>
          </div>
        )}
      </div>
      <div className="my-5 flex items-center justify-center">

         <Link className="text-lg font-semibold text-sky-500 hover:underline" to={'/search'}>View All Post</Link>
      </div>
     
    </div>
  );
}

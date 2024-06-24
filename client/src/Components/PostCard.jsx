import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ post }) => {
  return (
    <div className="group relative border border-teal-500 hover:border-2 w-full h-[350px] overflow-hidden rounded-lg sm:w-[350px] transition-all">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt=""
          className="h-[250px] w-full object-cover group-hover:h-[200px] transition-all duration-30 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-xl font-semibold line-clamp-2">{post.title}</p>
        <span className="italic text-sm">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 bottom-[-200px] group-hover:bottom-0 absolute text-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white text-center py-2 left-0 right-0 rounded-md"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostCard;

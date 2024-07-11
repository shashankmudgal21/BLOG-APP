import { Button, Select, TextInput } from "flowbite-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";

const Search = () => {
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState(false);
  // console.log(sideBarData);
  console.log(sideBarData);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    const sort = urlParams.get("sort");
    const category = urlParams.get("category");
    if (searchTerm) {
      setSideBarData({ ...sideBarData, searchTerm, sort, category });
    }
    const fetchPost = async () => {
      setLoading(true);
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getAllPost?${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setPosts(data.posts);
          setError(null);
        } else {
          setLoading(false);
          setError(data);
        }

        if (data.posts.length === 9) setShowMore(true);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchPost();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const handleShowMore = async () => {
    try {
      const numberOfPosts = posts.length;
      const startIndex = numsberOfPost;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getAllPost?${searchQuery}`);
      if (!res.ok) return;
      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) setShowMore(true);
        else setShowMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border md:min-h-screen md:border-r border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Search Term</label>
            <TextInput
              placeholder="search ..."
              id="searchTerm"
              value={sideBarData.searchTerm}
              onChange={(e) =>
                setSideBarData({ ...sideBarData, searchTerm: e.target.value })
              }
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort</label>
            <Select
              id="sort"
              value={sideBarData.sort}
              onChange={(e) =>
                setSideBarData({
                  ...sideBarData,
                  sort: e.target.value || "asc",
                })
              }
              type="text"
            >
              <option value={"asc"}>Latest</option>
              <option value={"desc"}>Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Category</label>
            <Select
              id="category"
              value={sideBarData.category}
              onChange={(e) =>
                setSideBarData({ ...sideBarData, category: e.target.value })
              }
              type="text"
            >
              <option value={"uncategorized"}>Uncategorized</option>
              <option value={"react"}>React</option>
              <option value={"next"}>Next</option>
              <option value={"vite"}>Vite</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone={"purpleToPink"}>
            Apply filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl mt-5 sm:border-b border-gray-500 p-3">
          Post Results
        </h1>
        <div className="flex flex-wrap p-7">
          {!loading && posts.length === 0 && (
            <div className="text-xl text-gray-500">No post found</div>
          )}
          {!loading &&
            posts.length > 0 &&
            posts.map((p) => (
              <div className="p-3">
                <PostCard post={p} />
              </div>
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 p-7 hover:underline"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

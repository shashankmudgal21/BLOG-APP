import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { FaRegCommentDots, FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
export default function DashSide() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newTab = urlParams.get("tab");
    setTab(newTab);
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar
      className="w-full md:min-w-56 flex flex-col gap-3"
      aria-label="Default sidebar example"
    >
      <Sidebar.Items >
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaRegUser}
              label={currentUser?.rest.isAdmin ? "Admin" :"User"}
              labelColor="dark"
              as="button"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser?.rest.isAdmin && (
            <Link to={"/dashboard?tab=posts"}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                labelColor="dark"
                as="button"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.rest.isAdmin && (
            <Link to={"/dashboard?tab=users"}>
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                labelColor="dark"
                as="button"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.rest.isAdmin && (
            <Link to={"/dashboard?tab=comments"}>
              <Sidebar.Item
                active={tab === "comment"}
                icon={FaRegCommentDots}
                labelColor="dark"
                as="button"
              >
                Comments
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item
            href="#"
            icon={FaArrowRight}
            className={"cursor-pointer"}
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

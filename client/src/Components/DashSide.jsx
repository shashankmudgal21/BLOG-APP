import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
export default function DashSide() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  const dispatch = useDispatch()
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
    <Sidebar className="w-full md:min-w-56" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active = {tab === 'profile'}
              icon={FaRegUser}
              label={"User"}
              labelColor="dark"
              as = "button"
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            href="#"
            icon={FaArrowRight}
            className={"cursor-pointer"}
            onClick = {handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

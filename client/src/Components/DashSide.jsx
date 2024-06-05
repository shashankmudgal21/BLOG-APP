import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { FaRegUser } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
export default function DashSide() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newTab = urlParams.get("tab");
    setTab(newTab);
  }, [location.search]);
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
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            href="#"
            icon={FaArrowRight}
            className={"cursor-pointer"}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSide from "../Components/DashSide";
import DashProfile from "../Components/DashProfile";
export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState(null);
  console.log(tab);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const newTab = urlParams.get("tab");
    setTab(newTab);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="min-w-56">
        <DashSide />
      </div>

      {tab === "profile" && <DashProfile />}
    </div>
  );
}

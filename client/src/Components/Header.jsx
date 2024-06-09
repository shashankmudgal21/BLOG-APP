import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaMoon,FaSun } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
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
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="font-semibold self-center text-sm sm:text-xl whitespace-nowrap dark:text-white"
        >
          <span className=" text-white px-2 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
            Shashank's
          </span>
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search.."
            rightIcon={CiSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h-10 lg:hidden" color={"gray"} pill>
          <CiSearch />
        </Button>
        <div className="flex gap-2 order-2">
          <Button className="w-12 h-10" color={"gray"} pill onClick={()=>dispatch(toggleTheme())}>;
            {theme === 'light'?<FaMoon />:<FaSun/>}
          </Button>
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar img={currentUser?.rest?.profilePicture} rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.rest?.username}</span>
                <span className="block truncate text-sm font-medium">
                {currentUser?.rest?.email}
                </span>
              </Dropdown.Header>
            
              <Dropdown.Header>
                <Link to={'/dashboard?tab=profile'} className="block text-sm">
                <Dropdown.Item >Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignOut} >sign out</Dropdown.Item>
             
              </Dropdown.Header>
            </Dropdown>
          ) : (
            <Link to={"/sign-in"}>
              <Button gradientDuoTone={"purpleToBlue"} color={"gray"} outline>
                Sign In
              </Button>
            </Link>
          )}
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"} as={"div"}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
        <Navbar.Toggle></Navbar.Toggle>
      </Navbar>
    </div>
  );
}

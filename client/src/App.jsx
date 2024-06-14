import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Projects from "./Pages/Projects";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import OnlyAdminPrivateRoute from "./Components/OnlyAdminPrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/sign-in" element={<SignIn />}></Route>
        <Route exact path="/sign-up" element={<SignUp />}></Route>
        <Route exact path="/projects" element={<Projects />}></Route>
        <Route element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route exact path="/create-post" element={<CreatePost />}></Route>
          <Route exact path="/update-post/:postId" element={<UpdatePost />}></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Projects from './Pages/Projects'
import Dashboard from './Pages/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/about" element = {<About/>}></Route>
        <Route exact path = "/sign-in" element = {<SignIn/>}></Route>
        <Route exact path = "/sign-up" element = {<SignUp/>}></Route>
        <Route exact path = "/projects" element = {<Projects/>}></Route>
        <Route exact path = "/dashboard" element = {<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

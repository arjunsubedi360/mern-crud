import React from 'react';
import {Route,Switch} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/navbar"; 
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import SignUp from "./components/signup";
import Contact from "./components/contact";
import Errorpage from "./components/error";

// import { NavLink } from "react-router-dom";

const App = () => {
  return (
   <>
     <Navbar/>
<Switch>
     <Route exact path="/">
          <Home/>
     </Route>

     <Route path="/about">
          <About/>
     </Route>

     <Route path="/contact">
          <Contact/>
     </Route>

     <Route path="/login">
          <Login/>
     </Route>
     <Route path="/signup">
          <SignUp/>
     </Route>
     
     <Route>
          <Errorpage/>
     </Route>
</Switch>
   </>
  )
}

export default App
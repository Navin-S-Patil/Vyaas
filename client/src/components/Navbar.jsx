import logo from "../images/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

  const [userlog, setuserlog] = useState("Login");

  return (
    <div className="Center_row">
      <Link to="/"><img src={logo} alt="logo" id="logo" className="logo" /></Link>
      <input type="search" placeholder="Search" id="search" className="searchBox"/>
      <button className="loginRegister loginButton">Login / Register</button>

    </div>
  );
}

export default Navbar;

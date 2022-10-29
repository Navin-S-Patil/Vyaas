import logo from "../images/logo.png";
import React, { useState } from "react";

function Navbar() {

  const [userlog, setuserlog] = useState("Login");

  return (
    <div className="Center_row">
      <img src={logo} alt="logo" id="logo" className="logo" />
      <input type="search" placeholder="Search" id="search" className="searchBox"/>
      <button className="loginRegister">Login / Register</button>

    </div>
  );
}

export default Navbar;

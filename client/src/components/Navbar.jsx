import React from "react";
import logo from "../images/logo.png";

function Navbar() {
  return (
    <div className="Center_row">
      <img src={logo} alt="logo" id="logo" className="logo" />
      <input type="search" placeholder="Search" id="search" className="searchBox"/>
      <button className="loginRegister">Login / Register</button>

    </div>
  );
}

export default Navbar;

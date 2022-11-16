import logo from "../images/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { loggedIn } from "../redux/loggedInRedux";
import { useSelector } from "react-redux";

function Navbar() {
  // const [userlog, setuserlog] = useState("Login");

  const user = useSelector((state) => state.loggedIn.loggedIn);

  function handleLogout() {
    localStorage.removeItem("persist:root");
    window.location.reload();
  }

  return (
    <div className="Center_row">
      <Link to="/">
        <img src={logo} alt="logo" id="logo" className="logo" />
      </Link>
      <input
        type="search"
        placeholder="Search"
        id="search"
        className="searchBox"
      />
      {user ? (
        <Link to="/login">
          <button className="loginRegister loginButton">
            Login / Register
          </button>
        </Link>
      ) : (
        <button className="loginRegister loginButton" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;

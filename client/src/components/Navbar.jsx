import logo from "../images/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loggedOut } from "../redux/userRedux";

function 
Navbar() {
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user.logg);

  // const userFName = useSelector((state) => state.user.userName);
  const userFName = null;

  const userId = useSelector((state) => state.user.currentUser);
  // fetch("http://localhost:5000/api/auth/userdata", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + userId,
  //     _id: userId,
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //     userFName = data.fName;
  //   });

  const [user, setuser] = useState(userInfo);

  function handleLogout() {
    dispatch(loggedOut());
    setuser(false);
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
        <button className="loginRegister loginButton" onClick={handleLogout}>
          {userFName} Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="loginRegister loginButton">
            Login / Register
          </button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;

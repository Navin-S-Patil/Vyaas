import logo from "../images/logo.png";
import React, { useEffect } from "react";
// import {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useLogoutMutation } from "../features/userApiSlice";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const buttonStyle = {
  backgroundColor: "#036AD1",
  color: "white",
  borderRadius: "0.5rem",
  padding: "0.6rem 2rem",
  fontSize: "1rem",
  fontWeight: "bolder",
  margin: "0 0.5rem",
};

function Navbar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [logoutApiCall] = useLogoutMutation();

  async function loggedOut() {
    handleClose();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }

    navigate("/");
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

      {user && (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          style={buttonStyle}
        >
          Ecash : {user.balance.toFixed(2)}
        </Button>
      )}

      {user === null ? (
        <Link to="/login">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={buttonStyle}
          >
            Login
          </Button>
        </Link>
      ) : (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={buttonStyle}
          >
            {user.fname}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link to="/user">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>
            <Link to="/portfolio">
              <MenuItem onClick={handleClose}>Portfolio</MenuItem>
            </Link>
            <MenuItem onClick={loggedOut}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
}

export default Navbar;

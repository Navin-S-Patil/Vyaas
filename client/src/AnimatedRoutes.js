import React from "react";

import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

//pages
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";
import Stock from "./pages/Stock";
import User from "./pages/User";
import Login from "./pages/Login";
import Notfound from "./pages/Notfound";

import { AnimatePresence } from "framer-motion";
import AboutUs from "./pages/AboutUs";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/stocks/:apiName" element={<Stock />} />
        {/* For now Temp */}
        {/* <Route path="/stocks/axis" element={<Stock />} /> */}
        {/*  */}
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

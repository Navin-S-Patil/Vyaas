import React from "react";

import "./App.css";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

//pages
import Portfolio from "./pages/Portfolio";
import Stocks from "./pages/Stocks";
import Stock from "./pages/Stock";
import Login from "./pages/Login";
import User from "./pages/User";
import Notfound from "./pages/Notfound";

import { AnimatePresence } from "framer-motion";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";

import PrivateRoutes from "./components/PrivateRoutes";

import LoadingScreen from "./components/LoadingScreen";

import { useSelector } from "react-redux";

function AnimatedRoutes() {

  const isLoading = useSelector((state) => state.stock.isLoading);
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/portfolio" element={<Portfolio />} />

          <Route path="/stocks" element={<Stocks />} />
          <Route path="/stocks/:apiName" element={<Stock />} />

          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

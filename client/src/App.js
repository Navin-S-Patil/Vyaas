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
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <Wrapper>
      <AnimatedRoutes/>
    </Wrapper>
  );
}

export default App;

import "./App.css";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from "./components/Loader";
// import {useSelector} from 'react-redux';
//pages

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
      <ToastContainer />
      <AnimatedRoutes />
    </Wrapper>
  );
}

export default App;

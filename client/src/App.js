import "./App.css";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

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
      <AnimatedRoutes />
    </Wrapper>
  );
}

export default App;

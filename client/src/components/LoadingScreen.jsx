import React from "react";
import styled from "styled-components";

const Loader = styled.div`
  border: 5px solid;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border-color: orange transparent transparent;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
      filter: hue-rotate(360deg);
    }
  }
`;

const LoadingScreen = () => {
  return <Loader />;
};

export default LoadingScreen;

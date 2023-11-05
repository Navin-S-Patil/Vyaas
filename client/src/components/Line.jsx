import React from "react";
import styled from "styled-components";

const Line = ({ min, max, curr }) => {
  const scaledValue = ((curr - min) / (max - min)) * 100;

  const StyledLine = styled.div`
    position: relative;
    width: 100%;
    height: 10px; /* Adjust the height for a thicker line */
    border-radius: 5px;
    background: #fff;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background: #4caf50;
      cursor: pointer;
    }
  `;

  const currMarkerStyle = {
    position: "absolute",
    left: `${scaledValue}%`,
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "20px",
    height: "20px",
    backgroundColor: "#0000FF",
    borderRadius: "50%",
  };

  return (
    // <div style={{ width: "100%" }}>
      <StyledLine>
        <div style={currMarkerStyle}></div>
      </StyledLine>
    // </div>
  );
};

export default Line;

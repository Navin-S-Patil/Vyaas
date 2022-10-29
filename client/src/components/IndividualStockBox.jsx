import React from "react";
import styled from "styled-components";
import facebook from "../images/facebook.png";

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 20%;
`;

const Logo = styled.img`
    width: 30%;
    height: 30%;
    object-fit: contain;
    margin-top: 1rem;
    margin-left: 2rem;
    border: 1px solid grey;
    border-radius: 5px;
`;

const StockName = styled.p`
    font-size: 1.5rem;
    font-weight: 1000;
    font-family: "Inter";
    font-style: normal;
    color: #000;
    margin: 1rem 2rem;
`;

const Price = styled.p`
    font-size: 1.5rem;
    font-weight: 1000;
    font-family: "Inter";
    font-style: normal;
    color: #000;
    margin: 0.5rem 2rem;
`;

const Profit  = styled.p`
    font-size: 1.5rem;
    font-weight: 1000;
    font-family: "Inter";
    font-style: normal;
    color: #000;
    margin: 0.5rem 2rem;
    margin-bottom: 1rem;
`;

function IndividualStockBox() {
  return <Container>
    <Logo src={facebook} alt="StockLogo" />
    <StockName>Facebook</StockName>
    <Price>₹80</Price>
    <Profit>+80</Profit>
  </Container>;
}

export default IndividualStockBox;

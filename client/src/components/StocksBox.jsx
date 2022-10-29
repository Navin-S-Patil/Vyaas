import React from "react";
import styled from "styled-components";
import IndividualStockBox from "./IndividualStockBox";

const Container = styled.div`
  color: none;
  background-color: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 5rem;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #000;
  align-items: center;
`;

function StocksBox() {
  return (
    <Container>
      <Heading>Stocks</Heading>
      <IndividualStockBox />
    </Container>
  );
}

export default StocksBox;

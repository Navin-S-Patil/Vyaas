import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 4px 16px 4px rgba(180, 180, 180, 0.86);
    transform: scale(1.05);
  }
`;

const Logo = styled.img`
  width: 4rem;
  height: 4rem;
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

const Profit = styled.p`
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #000;
  margin: 0.5rem 2rem;
  margin-bottom: 1rem;
`;

function IndividualStockBox(props) {
  let profit = props.profit;
  let price = props.price;

  return (
    <Container>
      <Logo src={`/images/stockLogos/${props.symbol}.png`} alt="StockLogo" />
      <StockName>{props.name}</StockName>
      <Price>₹{price}</Price>
      <Profit style={profit > 0 ? { color: "green" } : { color: "red" }}>
        {profit > 0 ? `+` : null}
        {profit.toFixed(2)}
      </Profit>
    </Container>
  );
}

export default IndividualStockBox;

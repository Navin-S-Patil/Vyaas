import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Line from "./Line";

const Container = styled.div``;

const Title = styled.h1`
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 1000;
  margin: 1.5rem 2rem;
  font-size: 2.5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 1rem;
  margin-bottom: 8rem;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #fff;
  text-align: center;
`;

const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 0.5rem;
  border-radius: 5px;
  background: #fff;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
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

function Performance(props) {
  const stocks = useSelector((state) => state.stock.stocks);
  const stock = stocks.get(props.symbol)[0];
  //find min max in the stocks historical data in the interval of 1 year
  const interval = 365;
  let min = stock.historicalData[0].price;
  let max = stock.historicalData[0].price;
  for (let i = 1; i < interval; i++) {
    if (stock.historicalData[i].price < min) {
      min = stock.historicalData[i].price;
    }
    if (stock.historicalData[i].price > max) {
      max = stock.historicalData[i].price;
    }
  }
  const value = stock.historicalData[0].price;
  // const scaledValue = ((value - min) / (max - min)) * 100;

  return (
    <Container>
      <Title>Performance</Title>
      <MainContainer>
        <SubContainer>
          Year’s Low <br /> {min.toFixed(2)}
        </SubContainer>
        {/* <Range type="range" /> */}
        <Line min={min} max={max} curr={value} />
        <SubContainer>
          Year’s High <br /> {max.toFixed(2)}
        </SubContainer>
      </MainContainer>
    </Container>
  );
}

export default Performance;

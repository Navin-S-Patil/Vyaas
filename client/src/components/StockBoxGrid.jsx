import React from "react";
import styled from "styled-components";
import IndividualStockBox from "./IndividualStockBox";
import { useState, useEffect } from "react";
import stocksInfo from "../data";

const Container = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
`;

const Box = styled.div`
  /* grid-template-columns: repeat(auto-fit,minmax(200px,1fr)); */
  /* width: 100%; */
`;

function StockBoxGrid() {
  // console.log(stocksInfo);

  const [stock, setStock] = useState({
    apiName : "AXISBANK"
  });

  const [stockData, setStockData] = useState({
    name: "Axis Bank",
    symbol: "AXISBANK",
    price: 0,
    profit: 0,
  });
  

  useEffect(() => {
    
    return () => {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock.apiName}.BSE&outputsize=full&apikey=374IRTQTIUTYVL9A`
      )
        .then((res) => res.json())
        .then((data) => {
          const price = data["Time Series (Daily)"]
          const stocks = price[Object.keys(price)[0]];
        });
        //   setStockData({
        //     ...stock,
        //     price: stocks["4. close"]
        // });
  }, []);

  function handleStock(info) {
    setStock(() => {
      // stock.apiName = info;
    });
  }

  return (
    <Container>
      {stocksInfo.map((item) => {

        {/* handleStock(item.apiName); */}

        return (
          <Box>
            <IndividualStockBox
              key={item.id}
              name={item.name}
              symbol={item.symbol}
              price={stocks["4. close"]}
            />
          </Box>
        );
      })}
      
    </Container>
  );
}

export default StockBoxGrid;

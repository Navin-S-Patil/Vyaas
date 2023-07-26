import React from "react";
import styled from "styled-components";
import IndividualStockBox from "./IndividualStockBox";
import { useState, useEffect } from "react";
import stocksInfo from "../data";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
`;

const Box = styled.div`
  /* grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  width: 100%; */
`;

function StockBoxGrid() {

  const [stock, setStock] = useState("AXISBANK");

  const [stockData, setStockData] = useState({
    price: 0,
    profit: 0,
  });

  
  useEffect(() => {
    return () => {
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}.BSE&outputsize=full&apikey=374IRTQTIUTYVL9A`
      )
        .then((res) => res.json())
        .then((data) => {

          const price = data["Time Series (Daily)"];
          const dataStock = price[Object.keys(price)[0]];
          

          setStockData({
            ...stockData,
            price: dataStock["4. close"],
            profit: dataStock["4. close"] - price[Object.keys(price)[1]]["4. close"],
          });

          
        });
    };
  }, [stock]);


  return (
    <Container>
      {stocksInfo.map((item) => {
        
        return (
          <Box>
          <Link to={`/stocks/${item.apiName}`} style={{"textDecoration":"none"}} >
            <IndividualStockBox
              key={item.id}
              name={item.name}
              symbol={item.symbol}
              price={item.price}
              profit={item.profit}
            />
            </Link>
          </Box>
        );
      })}
    </Container>
  );
}

export default StockBoxGrid;

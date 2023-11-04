import React from "react";
import styled from "styled-components";
import IndividualStockBox from "./IndividualStockBox";
import { useState, useEffect } from "react";
// import stocksInfo from "../data";
import list from "../utils/stockData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

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
  const [stock, setStock] = useState(useSelector((state) => state.stock));

  return (
    <Container>
      {list.map((item, index) => {
        const name = stock.get(item)[0].companyName;
        const symbol = stock.get(item)[0].symbol;
        const price = stock.get(item)[0].historicalData[0].price;
        const profit = price - stock.get(item)[0].historicalData[1].price;

        return (
          <Box key={index}>
            <Link to={`/stocks/${item}`} style={{ textDecoration: "none" }}>
              <IndividualStockBox
                name={name}
                symbol={symbol}
                price={price}
                profit={profit}
              />
            </Link>
          </Box>
        );
      })}
    </Container>
  );
}

export default StockBoxGrid;
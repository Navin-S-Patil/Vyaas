import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

function Graph(props) {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock() {
    const API_KEY = "F7R9X5Z4BDSDRHHR";
    const StockSymbol = "axisbank.BSE";
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=full&apikey=${API_KEY}`
      )
      .then((response) => {
        const data = response.data["Time Series (Daily)"];
        // console.log(data)

        for (var key in data) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(parseFloat(data[key]["1. open"]));
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }

  return (
    <Container>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{ width: 1200, height: 500, title: "Axis Bank" }}
      />
    </Container>
  );
}

export default Graph;

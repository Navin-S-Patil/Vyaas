import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { Line } from 'react-chartjs-2';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;


function Graph() {
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = "374IRTQTIUTYVL9A";
    let StockSymbol = "axisbank.bse";
    // let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=axisbank.BSE&outputsize=full&apikey=${API_KEY}`;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }


        setstockChartXValues(stockChartXValuesFunction);
        setstockChartYValues(stockChartYValuesFunction);

       
      });
  }

  return (
    <Container>
      {/* <h1>Stock Market</h1> */}
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
        layout={{ width: 720, height: 440, title: "Axis Bank" }}
      />
    </Container>
  );
}

export default Graph;

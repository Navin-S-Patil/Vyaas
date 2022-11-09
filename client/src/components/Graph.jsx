import React, { useEffect } from "react";
import Plot from "react-plotly.js";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

function Graph() {
  const [stockChartXValues, setstockChartXValues] = useState([]);
  const [stockChartYValues, setstockChartYValues] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  function fetchStock() {
    // const pointerToThis = this;
    // console.log(pointerToThis);
    const API_KEY = "374IRTQTIUTYVL9A";
    let StockSymbol = "axisbank.bse";
    // let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=axisbank.BSE&outputsize=full&apikey=${API_KEY}`;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        setstockChartXValues(...stockChartXValues,stockChartXValuesFunction);
        setstockChartYValues(...stockChartYValues,stockChartYValuesFunction);
      });
  }

  // other data visulation graph
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: [{x: stockChartXValues}, {y: stockChartYValues}],
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
      
  //   ],
  // };

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
        layout={{ width: 1200, height: 500, title: "Axis Bank" }}
      />
      {/* <Line data={data} /> */}
    </Container>
  );
}

export default Graph;

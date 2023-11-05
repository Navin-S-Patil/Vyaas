import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

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
  margin: 0 auto;
`;



const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: left;
`;

const Logo = styled.img`
  width: 4.5rem;
  height: 4.5rem;
  object-fit: contain;
  margin-top: 1rem;
  margin-left: 2rem;
  /* border: 1px solid grey; */
  border-radius: 5px;
  background-color: #fff;
  padding: 0.5rem;
`;

const StockName = styled.p`
  font-size: 1.8rem;
  font-weight: 1000;
  font-family: "Inter";
  font-style: normal;
  color: #fff;
  margin: 1rem 2rem;
`;

function WrokignGraph(props) {
  const [stockData, setStockData] = useState();
  const [labels, setLabels] = useState();
  const [selectedRange, setSelectedRange] = useState("1week");
  const [boundary, setBoundary] = useState({ min: 0, max: 0 });

  const stocks = useSelector((state) => state.stock);
  const individualStock = stocks.get(props.symbol);

  useEffect(() => {
    const dataFetch = async () => {
      setStockData(individualStock[0]);

      let startDate = new Date();

      // Adjust start date based on the selected range
      switch (selectedRange) {
        case "1week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "1month":
          startDate.setMonth(startDate.getMonth() - 1);
          break;
        case "1year":
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        default:
          break;
      }

      setLabels(
        individualStock[0].historicalData
          .filter((item) => new Date(item.date) > startDate)
          .map((item) => {
            setBoundary((prev) => {
              if (prev.min === 0) {
                return {
                  min: item.price,
                  max: item.price,
                };
              }
              if (prev.min > item.price) {
                return {
                  ...prev,
                  min: item.price,
                };
              }
              if (prev.max < item.price) {
                return {
                  ...prev,
                  max: item.price,
                };
              }
              return prev;
            });
            return item.date.split("T")[0].split("-").reverse().join("-");
          })
      );
    };

    dataFetch();
  }, [selectedRange, individualStock]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: individualStock[0].companyName,
        data: stockData
          ? stockData.historicalData.map((item) => item.price)
          : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        max: boundary.max + 100,
        min: boundary.min - 100,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div>
      <SubContainer>
        <Logo src={`/images/stockLogos/${props.symbol}.png`} />
        <StockName>{individualStock[0].companyName}</StockName>
      </SubContainer>
      <Container>
        <Line options={options} data={data} />
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleRangeChange("1week")}>7D</IconButton>
          <IconButton onClick={() => handleRangeChange("1month")}>
            1M
          </IconButton>
          <IconButton onClick={() => handleRangeChange("1year")}>1Y</IconButton>
        </Stack>
      </Container>
    </div>
  );
}

export default WrokignGraph;

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const Timepass2 = () => {
  const [stockData, setStockData] = useState();
  const [labels, setLabels] = useState();
  const [selectedRange, setSelectedRange] = useState("1week");
  const [boundary, setboundary] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stocks/", {
          headers: {
            "Content-Type": "application/json",
            key: process.env.REACT_APP_KEY,
            symbol: "TCS.BSE",
          },
        });

        const data = response.data[0];
        setStockData(data);

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
          data.historicalData
            .filter((item) => new Date(item.date) > startDate)
            .map((item) => {
              setboundary((prev) => {
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    dataFetch();
  }, [selectedRange]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const data = {
    labels,
    datasets: [
      {
        label: "TCS",
        data: stockData
          ? stockData.historicalData.map((item) => item.price)
          : [],
        // data : [1,2,3,4,5,6,7,8,9,10],
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
      <div>
        <button onClick={() => handleRangeChange("1week")}>1 Week</button>
        <button onClick={() => handleRangeChange("1month")}>1 Month</button>
        <button onClick={() => handleRangeChange("1year")}>1 Year</button>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Timepass2;

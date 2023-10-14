import React from "react";
// import { Line } from 'react-chartjs-2';
// import LineChart from 'react-linechart';
// import '../node_modules/react-linechart/dist/styles.css';
// import { MDBContainer } from "mdbreact";
// import { Line } from "react-chartjs-2";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    };
  }

  componentDidMount() {
    this.fetchStock();
  }
  fetchStock() {
    const pointertoThis = this;
    // console.log(pointertoThis);
    const API_KEY = "QX592D9EY21SBAMB";
    let StockSymbol = "MSFT";
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${StockSymbol}&interval=5min&apikey=${API_KEY}`;
    let stockChartXValuesfunction = [];
    let stockChartYValuesfunction = [];
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var key in data["Time Series (5min)"]) {
          stockChartXValuesfunction.push(key);
          stockChartYValuesfunction.push(
            data["Time Series (5min)"][key]["2. high"]
          );
        }

        // console.log(stockChartXValuesfunction);
        // console.log(stockChartYValuesfunction)
        pointertoThis.setState({
          stockChartXValues: stockChartXValuesfunction,
          stockChartYValues: stockChartYValuesfunction
        });
      });
  }

  render() {
    // const data = {
    //     datasets: [{
    //         label: 'Low Price',
    //         data: [this.state.stockChartXValues, this.state.stockChartYValues],
    //         fill: false,
    //         borderColor: 'rgba(0,0,0,1)',
    //         tension: 0.1
    //   }]
    // };
    // const config = {
    //     type: 'line',
    //     data: data,
    //   };
    // const data = {
    //     labels: ["Sunday", "Monday", "Tuesday",
    //       "Wednesday", "Thursday", "Friday", "Saturday"],
    //     datasets: [
    //       {
    //         label: "Hours Studied in Geeksforgeeks",
    //         data: [2, 5, 7, 9, 7, 6, 4],
    //         fill: true,
    //         backgroundColor: "rgba(6, 156,51, .3)",
    //         borderColor: "#02b844",
    //       }
    //     ]
    //   }
    // var i =0
    // const pdata = [{
    //     name: this.state.stockChartXValues.slice(i,i+1),
    //     student: this.state.stockChartYValues.slice(i,i+1)
    // }];

    const data = [];

    // const rand = 0;
    for (let i = 0; i < this.state.stockChartYValues.length; i++) {
      let d = {
        open: this.state.stockChartYValues[i],
        student: this.state.stockChartXValues[i]
        // value: { x: Math.random() * (rand + 50) + 100 }
      };

      data.push(d);
    }
    const divstyle={
        backgroundColor: "black",
        width: "100%",
    }
    return (
      <div style={divstyle}>
        {/* <h1>Stock Market</h1> */}
        {/* <MDBContainer>
                    <Line data={data} />
                    </MDBContainer> */}
        {/* <Line 
                   data={data} 
                   config={config}
                    /> */}
        <ResponsiveContainer minWidth="80%" aspect={3} minHeight="80%">
          {
            <LineChart data={data} margin={{ top: 20, left: 15 }}>
              <CartesianGrid/>
              <XAxis dataKey="student" interval={"preserveStartEnd"} />
              <YAxis type="number" domain={[('dataMin', 'dataMax')]}/>
              {/* <Legend verticalAlign="top"/> */}
              <Tooltip cursor={{ stroke: '#28ffbf', strokeWidth: 1 }} />
              <Line type="line" dataKey="open" stroke="#ffc75f" dot={false} strokeWidth="2" />
            </LineChart>
          }
        </ResponsiveContainer>
        
      </div>
    );
  }
}

export default Stock;

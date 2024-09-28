import React from "react";
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
import { formatter } from "../routes/formatter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartSmoke = (props) => {
  const data = props.data.slice(-5);
  const labels = data.map((item) => formatter(item.time));
  const smokeData = data.map((item) => item.smoke);

  const chartData = {
    labels,
    datasets: [
      
      {
        label: "Smoke",
        data: smokeData,
        borderColor: "rgba(255, 99, 132, 1)", // Màu đỏ
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Màu nền đỏ nhạt
        fill: false,
        yAxisID: 'y-left',
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "LineChart",
        font: {
            size: 24,
            color: '#363949',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      'y-left': {
        type: 'linear',
        position: 'left',
        title: {
          display: true,
          text: 'Smoke',
        },
      },
      
      
    },
  };

  return (
    <div className="line_chart"
      style={{
        width: "900px",
        height: "450px",
        backgroundColor: "#f6f6f9",
        padding: "0px 20px",
        borderRadius: "20px",
        flow : 1,
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChartSmoke;
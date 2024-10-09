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

const LineChart = (props) => {
  const data = props.data.slice(-5);
  const labels = data.map((item) => formatter(item.time));
  const temData = data.map((item) => item.temperature);
  const humidData = data.map((item) => item.humidity);
  const lightData = data.map((item) => item.light);
  const smokeData = data.map((item) => item.smoke);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
        yAxisID: 'y-left',
        tension: 0.3, // Độ cong của đường
      },
      {
        label: "Humidity (%)",
        data: humidData,
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
        yAxisID: 'y-left',
        tension: 0.3, // Độ cong của đường
      },
      {
        label: "Light (lux)",
        data: lightData,
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        fill: false,
        yAxisID: 'y-right',
        tension: 0.3, // Độ cong của đường
      },
      {
        label: "Gió (%)",
        data: smokeData,
        borderColor: "rgba(255, 99, 132, 1)", // Màu đỏ
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Màu nền đỏ nhạt
        fill: false,
        yAxisID: 'y-left',
        tension: 0.3, // Độ cong của đường
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
          text: 'Temperature (°C)   /   Humidity (%)  /  Gió(%)',
        },
      },
      'y-right': {
        type: 'linear',
        position: 'right',
        title: {
          display: true,
          text: 'Light (lux)',
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
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

export default LineChart;
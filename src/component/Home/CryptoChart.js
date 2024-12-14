import React, { useEffect, useState } from "react";
import '../styles/CryptoChart.css'
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

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Move fetchCryptoData function outside the component
const fetchCryptoData = (coinId, setChartData, setLoading) => {
  const prices = [
    [1631824800000, 48000],
    [1631911200000, 48500],
    [1631997600000, 49000],
    [1632084000000, 49500],
    [1632170400000, 50000],
    [1632256800000, 51000],
    [1632343200000, 52000],
    [1632429600000, 53000],
    [1632516000000, 54000],
    [1632602400000, 55000],
  ];

  const labels = prices.map(([timestamp]) =>
    new Date(timestamp).toLocaleDateString()
  );
  const data = prices.map(([_, price]) => price);

  setChartData({
    labels: labels,
    datasets: [
      {
        label: `${coinId.charAt(0).toUpperCase() + coinId.slice(1)} Price`,
        data: data,
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        fill: true,
      },
    ],
  });

  setLoading(false);
};

function CryptoChart({ coinId = "bitcoin", currency = "usd", days = 30 }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading before fetching data
    fetchCryptoData(coinId, setChartData, setLoading); // Fetch data with function
  }, [coinId, currency, days]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-chart">
      <h2 className="text-2xl font-semibold text-white mb-4">
        {coinId.charAt(0).toUpperCase() + coinId.slice(1)} Price Chart
      </h2>
      <div className="chart-container bg-gray-800 p-4 rounded-lg">
        {chartData ? (
          <Line data={chartData} options={{ responsive: true }} />
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
}

export default CryptoChart;

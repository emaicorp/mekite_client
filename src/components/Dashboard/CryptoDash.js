import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function CryptoDash() {
  const [cryptoData, setCryptoData] = useState([]);
  const [chartData, setChartData] = useState({});

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: true,
          },
        }
      );

      setCryptoData(response.data);
      generateChartData(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const generateChartData = (coin) => {
    setChartData({
      labels: Array.from({ length: coin.sparkline_in_7d.price.length }, (_, i) => i),
      datasets: [
        {
          label: `${coin.name} - 24h Price`,
          data: coin.sparkline_in_7d.price,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          pointRadius: 0,
        },
      ],
    });
  };

  useEffect(() => {
    fetchCryptoData();
  }, [fetchCryptoData]);

  return (
    <>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Crypto Dashboard</h1>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Market Cap</th>
              <th className="p-2 border">Volume (24h)</th>
              <th className="p-2 border">24h Chart</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((coin, index) => (
              <tr key={coin.id} className="hover:bg-gray-50">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border flex items-center space-x-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.name}</span>
                </td>
                <td className="p-2 border">${coin.current_price.toLocaleString()}</td>
                <td className="p-2 border">${coin.market_cap.toLocaleString()}</td>
                <td className="p-2 border">${coin.total_volume.toLocaleString()}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => generateChartData(coin)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm"
                  >
                    View Chart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Chart Section */}
      <div className="mt-8">
        {chartData?.datasets && (
          <>
            <h2 className="text-2xl font-semibold mb-4">24h Price Chart</h2>
            <Line data={chartData} />
          </>
        )}
      </div>
    </div>

    {/* <Balance /> */}
    </>
  );
}

export default CryptoDash;

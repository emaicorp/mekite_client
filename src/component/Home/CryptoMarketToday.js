import React, { useEffect, useState } from "react";
import GetStarted from "./GetStarted";

const CryptoMarketToday = () => {
  const [hotList, setHotList] = useState([]);
  const [newCoins, setNewCoins] = useState([]);
  const [topGainers, setTopGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the data from CoinGecko API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hot List: Coins sorted by volume
        const hotListResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=5&page=1"
        );
        const hotListData = await hotListResponse.json();
        setHotList(hotListData);

        // New Coins: Recently added coins
        const newCoinsResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/list?include_platform=false"
        );
        const newCoinsData = await newCoinsResponse.json();
        setNewCoins(newCoinsData.slice(0, 5)); // Show top 5 recently added coins

        // Top Gainers: Coins sorted by price percentage change in 24h
        const topGainersResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=percent_change_24h_desc&per_page=5&page=1"
        );
        const topGainersData = await topGainersResponse.json();
        setTopGainers(topGainersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-xl text-black">Loading...</p>;

  return (
    <>
      <div className="bg-white text-black py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center mb-8">Crypto Market Today</h1>

          {/* Hot List of Coins */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-center mb-4">Hot List of Coins</h2>
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Coin</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Volume</th>
                </tr>
              </thead>
              <tbody>
                {hotList.map((coin) => (
                  <tr key={coin.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4" />
                      {coin.name}
                    </td>
                    <td className="py-3 px-4">${coin.current_price.toFixed(2)}</td>
                    <td className="py-3 px-4">${coin.total_volume.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* New Coins */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-center mb-4">New Coins</h2>
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Coin</th>
                </tr>
              </thead>
              <tbody>
                {newCoins.map((coin) => (
                  <tr key={coin.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4">{coin.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Top Gainers */}
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">Top Gainers</h2>
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Coin</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {topGainers.map((coin) => (
                  <tr key={coin.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-4 flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-4" />
                      {coin.name}
                    </td>
                    <td className="py-3 px-4">${coin.current_price.toFixed(2)}</td>
                    <td
                      className={`py-3 px-4 ${
                        coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <GetStarted />
    </>
  );
};

export default CryptoMarketToday;

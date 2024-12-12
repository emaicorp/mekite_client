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

  if (loading) return <p className="text-center text-xl text-white">Loading...</p>;

  return (
    <>
        <div className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-8">Crypto Market Today</h1>

        {/* Hot List of Coins */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Hot List of Coins</h2>
          <div className="space-y-4">
            {hotList.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-4" />
                  <span className="font-semibold">{coin.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${coin.current_price.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Volume: ${coin.total_volume.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Coins */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">New Coins</h2>
          <div className="space-y-4">
            {newCoins.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
                <span className="font-semibold">{coin.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Gainers */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-4">Top Gainers</h2>
          <div className="space-y-4">
            {topGainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 mr-4" />
                  <span className="font-semibold">{coin.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${coin.current_price.toFixed(2)}</p>
                  <p
                    className={`text-sm ${
                      coin.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <GetStarted />
    </>
  );
};

export default CryptoMarketToday;

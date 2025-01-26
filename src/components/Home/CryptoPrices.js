import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Home.css';

function CryptoPrices() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Fetch coin data from CoinGecko API
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc", // Sort by market cap
              per_page: 20, // Adjust number of coins to display (e.g., 20 coins)
              page: 1,
            }
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="overflow-hidden w-full bg-gray-100 py-4">
      <div className="whitespace-nowrap animate-marquee">
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="inline-block mx-6 py-3 px-6 bg-gray-800 text-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={coin.image}
              alt={coin.name}
              className="w-12 h-12 inline mr-3"
            />
            <span className="text-lg font-semibold">{coin.name}: ${coin.current_price.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CryptoPrices;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyBitcoinCritox from './BuyBitcoinCritox';

function CryptoPopularity() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching cryptocurrency data
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd', // You can change the currency (e.g., 'eur')
            order: 'market_cap_desc', // Sort by market cap descending
            per_page: 5, // Limit to top 5 cryptocurrencies
            page: 1,
            sparkline: false, // Do not include sparkline data
          },
        });
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white to-blue-800 p-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12">
          Top 5 Cryptocurrencies by Market Cap
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cryptoData.map((crypto) => (
            <div
              key={crypto.id}
              className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center text-white mb-2">{crypto.name}</h3>
              <p className="text-center text-lg text-gray-300 mb-2">Price: ${crypto.current_price.toLocaleString()}</p>
              <p className="text-center text-lg text-gray-300 mb-2">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="text-center text-lg text-gray-300 mb-2">24h Volume: ${crypto.total_volume.toLocaleString()}</p>
              <p className="text-center text-lg text-gray-300">Rank: #{crypto.market_cap_rank}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900 py-12 px-6 text-white">
        <BuyBitcoinCritox />
      </div>
    </>
  );
}

export default CryptoPopularity;

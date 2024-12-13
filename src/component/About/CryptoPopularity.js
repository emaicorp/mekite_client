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
    return <p>Loading...</p>;
  }

  return (
    <>
         <div className="crypto-popularity-section bg-black p-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Top 5 Cryptocurrencies by Market Cap</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cryptoData.map((crypto) => (
          <div key={crypto.id} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-16 h-16 mx-auto mb-4 rounded-full"
            />
            <h3 className="text-2xl font-semibold mb-2 text-center">{crypto.name}</h3>
            <p className="text-center mb-2">Price: ${crypto.current_price.toLocaleString()}</p>
            <p className="text-center mb-2">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
            <p className="text-center mb-2">24h Volume: ${crypto.total_volume.toLocaleString()}</p>
            <p className="text-center mb-2">Rank: #{crypto.market_cap_rank}</p>
          </div>
        ))}
      </div>
    </div>

    <BuyBitcoinCritox />
    </>
  );
}

export default CryptoPopularity;

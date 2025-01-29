import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { RiExchangeDollarLine, RiLineChartLine, RiTimeLine } from 'react-icons/ri';
import BuyBitcoinCritox from './BuyBitcoinCritox';

function CryptoPopularity() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 6,
            page: 1,
            sparkline: false,
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

  const features = [
    {
      icon: RiExchangeDollarLine,
      title: "Real-Time Trading",
      description: "Execute trades instantly with our advanced matching engine"
    },
    {
      icon: RiLineChartLine,
      title: "Market Analysis",
      description: "Access comprehensive charts and technical indicators"
    },
    {
      icon: RiTimeLine,
      title: "24/7 Markets",
      description: "Trade your favorite cryptocurrencies anytime, anywhere"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Popular Cryptocurrencies
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Track and trade the most popular cryptocurrencies on our platform. Get real-time prices, market cap, and trading volume data.
          </p>
        </motion.div>

        {/* Crypto Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {cryptoData.map((crypto, index) => (
            <motion.div
              key={crypto.id}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                <div className="relative bg-[#1a2234] rounded-2xl p-6 group-hover:bg-[#1f2943] transition-colors duration-300">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">{crypto.name}</h3>
                      <p className="text-gray-400">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Price</span>
                      <span className="text-white font-medium">${crypto.current_price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Market Cap</span>
                      <span className="text-white font-medium">${crypto.market_cap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">24h Change</span>
                      <span className={`font-medium ${
                        crypto.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                <div className="relative bg-[#1a2234] rounded-2xl p-6 text-center group-hover:bg-[#1f2943] transition-colors duration-300">
                  <feature.icon className="text-3xl text-indigo-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Buy Bitcoin Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <BuyBitcoinCritox />
        </motion.div>
      </div>
    </div>
  );
}

export default CryptoPopularity;

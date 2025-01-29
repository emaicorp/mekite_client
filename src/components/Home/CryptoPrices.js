import React, { useEffect, useState } from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { FaBitcoin } from "react-icons/fa";
import { SiLitecoin, SiDogecoin } from "react-icons/si";
import { FaEthereum } from "react-icons/fa";
import { motion } from "framer-motion";

function CryptoPrices() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    const targetSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'DOGEUSDT', 'LTCUSDT'];
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredData = data
        .filter(item => targetSymbols.includes(item.s))
        .map(item => ({
          symbol: item.s.replace('USDT', ''),
          price: parseFloat(item.c).toFixed(2),
          change: parseFloat(item.P).toFixed(2),
          volume: parseFloat(item.v).toFixed(2),
        }));
      
      setCoins(filteredData);
      setLoading(false);
    };

    return () => socket.close();
  }, []);

  const getIcon = (symbol) => {
    switch (symbol) {
      case 'BTC':
        return <FaBitcoin className="text-[#F7931A]" />;
      case 'ETH':
        return <FaEthereum className="text-[#627EEA]" />;
      case 'LTC':
        return <SiLitecoin className="text-[#345D9D]" />;
      case 'DOGE':
        return <SiDogecoin className="text-[#C2A633]" />;
      default:
        return null;
    }
  };

  const CryptoCard = ({ coin }) => (
    <div className="flex-shrink-0 p-4 bg-[#111827] rounded-xl hover:bg-gray-800/50 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-3">
        <div className="p-2 bg-white/5 rounded-lg">
          {getIcon(coin.symbol)}
        </div>
        <div>
          <h3 className="text-white font-medium">{coin.symbol}</h3>
          <p className="text-sm text-gray-400">USDT</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-xl font-bold text-white">
          ${parseFloat(coin.price).toLocaleString()}
        </div>
        <div className={`flex items-center text-sm ${
          parseFloat(coin.change) >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {parseFloat(coin.change) >= 0 ? (
            <RiArrowUpSFill className="text-lg" />
          ) : (
            <RiArrowDownSFill className="text-lg" />
          )}
          {Math.abs(coin.change)}%
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="w-full bg-[#111827] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
            <div className="bg-[#1a2234] rounded-2xl p-6">
              <div className="animate-pulse flex space-x-6 overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="flex-shrink-0 w-48 h-24 bg-gray-800 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111827] py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
          <div className="bg-[#1a2234] rounded-2xl p-6 overflow-hidden">
            <motion.div 
              className="flex space-x-6"
              animate={{
                x: [0, -100 * coins.length],
              }}
              transition={{
                x: {
                  duration: 20 * coins.length,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* First set of cards */}
              {coins.map((coin, index) => (
                <CryptoCard key={`${coin.symbol}-1`} coin={coin} />
              ))}
              {/* Duplicate set for seamless loop */}
              {coins.map((coin, index) => (
                <CryptoCard key={`${coin.symbol}-2`} coin={coin} />
              ))}
              {/* Third set for extra smoothness */}
              {coins.map((coin, index) => (
                <CryptoCard key={`${coin.symbol}-3`} coin={coin} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoPrices;

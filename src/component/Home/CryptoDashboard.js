import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TryCrypto from './TryCrypto';

// Crypto Dashboard Component
const CryptoDashboard = () => {
  // States for holding data
  const [topGainers, setTopGainers] = useState([]);
  const [hotList, setHotList] = useState([]);
  const [newCoins, setNewCoins] = useState([]);
  const [stakingOpportunities, setStakingOpportunities] = useState([]);

  // Fetch data (simulated)
  useEffect(() => {
    fetchTopGainers();
    fetchHotList();
    fetchNewCoins();
    fetchStakingOpportunities();
  }, []);

  // Simulated API calls (mock data)
  const fetchTopGainers = async () => {
    // Example data
    setTopGainers([
      { name: 'Bitcoin', price: 60000, change: 5.2 },
      { name: 'Ethereum', price: 4500, change: 3.1 },
      { name: 'Binance Coin', price: 500, change: 7.4 },
    ]);
  };

  const fetchHotList = async () => {
    // Example data
    setHotList([
      { name: 'Dogecoin', volume: '1.5B' },
      { name: 'Shiba Inu', volume: '1.2B' },
      { name: 'Solana', volume: '900M' },
    ]);
  };

  const fetchNewCoins = async () => {
    // Example data
    setNewCoins([
      { name: 'CryptoX', launchDate: '2023-11-12' },
      { name: 'BlockChainY', launchDate: '2023-10-15' },
    ]);
  };

  const fetchStakingOpportunities = async () => {
    // Example data
    setStakingOpportunities([
      { coin: 'Ethereum', rate: '4.5%' },
      { coin: 'Cardano', rate: '3.0%' },
      { coin: 'Polkadot', rate: '6.0%' },
    ]);
  };

  return (
    <>
        <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Crypto Dashboard</h1>

      {/* Top Gainers Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Top Gainers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topGainers.map((coin, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{coin.name}</h3>
              <p className="text-gray-400">Price: ${coin.price}</p>
              <p className={`text-lg ${coin.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {coin.change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {coin.change}%
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hot List Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hot List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotList.map((coin, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{coin.name}</h3>
              <p className="text-gray-400">Volume: {coin.volume}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Coins Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">New Coins</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newCoins.map((coin, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{coin.name}</h3>
              <p className="text-gray-400">Launch Date: {coin.launchDate}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Staking Opportunities Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Staking Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stakingOpportunities.map((coin, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{coin.coin}</h3>
              <p className="text-gray-400">Staking Rate: {coin.rate}</p>
            </div>
          ))}
        </div>
      </section>
    </div>

    <TryCrypto />
    </>
  );
};

export default CryptoDashboard;

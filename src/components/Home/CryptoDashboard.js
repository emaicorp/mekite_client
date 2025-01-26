import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TryCrypto from './TryCrypto';

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
      <div className="bg-white text-gray-900 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Crypto Dashboard</h1>

        {/* Top Gainers Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Top Gainers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {topGainers.map((coin, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">{coin.name}</h3>
                <p className="text-gray-600">Price: ${coin.price}</p>
                <p className={`text-lg ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {coin.change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {coin.change}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Hot List Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Hot List</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {hotList.map((coin, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">{coin.name}</h3>
                <p className="text-gray-600">Volume: {coin.volume}</p>
              </div>
            ))}
          </div>
        </section>

        {/* New Coins Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">New Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {newCoins.map((coin, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">{coin.name}</h3>
                <p className="text-gray-600">Launch Date: {coin.launchDate}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Staking Opportunities Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Staking Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {stakingOpportunities.map((coin, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-300">
                <h3 className="text-xl font-semibold text-gray-900">{coin.coin}</h3>
                <p className="text-gray-600">Staking Rate: {coin.rate}</p>
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

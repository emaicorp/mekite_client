import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowDown, FaCoins, FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa'; 
import Sidebar from './Sidebar';
import CryptoDash from './CryptoDash';

function Dashboard() {
  const [userDetails, setUserDetails] = useState(null); 

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    console.log('Stored User Details:', storedUserDetails); // Debugging line
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);
  
  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
        <span className="text-white text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <section className="bg-gray-500 text-white p-10 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <FaCoins className="text-4xl text-yellow-500" />
            <h2 className="text-2xl tracking-wider">hi {userDetails.username} you're welcome to ourCrypto Investment Dashboard</h2>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300">Account Settings</button>
        </div>

        {/* Account Overview */}
        <h2 className="text-4xl font-semibold text-center mb-12">Account Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Available Balance */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-6">
              <FaWallet className="text-3xl text-white" />
              <div>
                <p className="text-sm text-gray-200">Available Balance</p>
                <p className="text-2xl font-semibold">{`$${userDetails.availableBalance}`}</p>
              </div>
            </div>
          </div>
          
          {/* Total Withdrawals */}
          <div className="bg-gradient-to-r from-red-500 to-yellow-500 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-6">
              <FaArrowDown className="text-3xl text-white" />
              <div>
                <p className="text-sm text-gray-200">Total Withdrawals</p>
                <p className="text-2xl font-semibold">{`$${userDetails.totalWithdrawals}`}</p>
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-6">
              <FaCoins className="text-3xl text-white" />
              <div>
                <p className="text-sm text-gray-200">Total Earnings</p>
                <p className="text-2xl font-semibold">{`$${userDetails.totalEarnings}`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Information */}
        <section className="mt-12 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">User Information</h3>
          <div className="space-y-4">
            <h3 className="text-xl"><b>Full Name:</b> {userDetails.fullName}</h3>
            <h3 className="text-xl"><b>Email:</b> {userDetails.email}</h3>
            <h3 className="text-xl"><b>User ID:</b> {userDetails.id}</h3> {/* Added User ID */}
            <h3 className="text-xl"><b>Balance:</b> {`$${userDetails.availableBalance}`}</h3>
          </div>
        </section>

        {/* Balance in All Currencies */}
        <section className="mt-12 bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-lg shadow-lg">
  <h3 className="text-2xl font-semibold mb-6">Balance in All Currencies</h3>
  <div className="space-y-6">
    <div className="flex items-center space-x-6">
      <FaDollarSign className="text-3xl text-yellow-400" />
      <p className="text-xl"><b>Total Earnings:</b> {`$${userDetails.totalEarnings || 0}`}</p>
    </div>
    <div className="flex items-center space-x-6">
      <FaBitcoin className="text-3xl text-yellow-500" />
      <p className="text-xl"><b>Bitcoin:</b> {userDetails.bitcoinAvailable || 'N/A'}</p>
    </div>
    <div className="flex items-center space-x-6">
      <FaEthereum className="text-3xl text-indigo-500" />
      <p className="text-xl"><b>Ethereum:</b> {userDetails.ethereumAvailable || 'N/A'}</p>
    </div>
    <div className="flex items-center space-x-6">
      <FaDollarSign className="text-3xl text-teal-400" />
      <p className="text-xl"><b>USDT:</b> {userDetails.usdtAvailable || 'N/A'}</p>
    </div>
  </div>
</section>


      </section>

      <CryptoDash />
    </>
  );
}

export default Dashboard;

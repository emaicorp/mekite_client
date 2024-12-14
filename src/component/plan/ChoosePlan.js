import React, { useState } from "react";
import InvestmentPlans from "./InvestmentPlans";

function ChoosePlan() {
  const [isMonthly, setIsMonthly] = useState(true); // State to toggle between Monthly and Yearly plans

  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Choose Your Investment Plan
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Trading cryptocurrencies offers convenience and flexibility. Take advantage of the opportunities available in the cryptocurrency market and start your investment journey today.
          </p>

          {/* Toggle for Monthly/Yearly Plans */}
          <div className="flex justify-center space-x-4 mb-12">
            <button
              onClick={() => setIsMonthly(true)}
              className={`py-2 px-6 rounded-lg font-semibold transition duration-300 transform ${
                isMonthly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`py-2 px-6 rounded-lg font-semibold transition duration-300 transform ${
                !isMonthly ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500`}
            >
              Yearly
            </button>
          </div>

          {/* Cryptocurrency Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Ethereum Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-center mb-4">Ethereum</h3>
              <p className="text-center text-lg text-gray-600 mb-6">ETH</p>
              <div className="mb-4">
                <p className="text-gray-600">1 Ethereum equals:</p>
                <p className="text-xl font-bold text-gray-800">$258.43</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Volume (24h):</p>
                <p className="text-xl font-bold text-gray-800">$9,758,550,000 USD</p>
              </div>
              <div className="mb-6">
                <p className="text-gray-600">Circulating Supply:</p>
                <p className="text-xl font-bold text-gray-800">17,014,062 ETH</p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Buy Now
              </button>
            </div>

            {/* Bitcoin Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-center mb-4">Bitcoin</h3>
              <p className="text-center text-lg text-gray-600 mb-6">BTC</p>
              <div className="mb-4">
                <p className="text-gray-600">1 Bitcoin equals:</p>
                <p className="text-xl font-bold text-gray-800">$498.43</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Volume (24h):</p>
                <p className="text-xl font-bold text-gray-800">$9,758,550,000 USD</p>
              </div>
              <div className="mb-6">
                <p className="text-gray-600">Circulating Supply:</p>
                <p className="text-xl font-bold text-gray-800">17,014,062 BTC</p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Buy Now
              </button>
            </div>

            {/* Dash Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
              <h3 className="text-2xl font-semibold text-center mb-4">Dash</h3>
              <p className="text-center text-lg text-gray-600 mb-6">DASH</p>
              <div className="mb-4">
                <p className="text-gray-600">1 Dash equals:</p>
                <p className="text-xl font-bold text-gray-800">$158.43</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-600">Volume (24h):</p>
                <p className="text-xl font-bold text-gray-800">$9,758,550,000 USD</p>
              </div>
              <div className="mb-6">
                <p className="text-gray-600">Circulating Supply:</p>
                <p className="text-xl font-bold text-gray-800">17,014,062 Dash</p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <InvestmentPlans />
    </>
  );
}

export default ChoosePlan;

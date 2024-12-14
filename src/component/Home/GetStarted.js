import React from "react";
import CryptoDashboard from "./CryptoDashboard";

const GetStarted = () => {
  return (
    <>
      <div className="bg-white text-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h1 className="text-3xl font-bold text-center text-black mb-10">
            How To Get Started
          </h1>

          {/* Step 1: Create Account */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
              <h2 className="text-2xl font-semibold text-black mb-4">01. Create Account</h2>
              <p className="text-gray-600 mb-4">
                Sign up for Bit<span className="text-yellow-500 font-semibold">flux</span>capital to create your profile and begin your crypto journey.
              </p>
              <p className="inline-block bg-yellow-500 text-black py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300">
                Register Now
              </p>
            </div>
          </div>

          {/* Step 2: Verify Identity */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
              <h2 className="text-2xl font-semibold text-black mb-4">02. Verify Your Identity</h2>
              <p className="text-gray-600 mb-4">
                Complete the verification process in minutes to secure your account and unlock full platform access.
              </p>
              <p className="inline-block bg-green-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-400 transition duration-300">
                Create Your Account First
              </p>
            </div>
          </div>

          {/* Step 3: Buy or Deposit Crypto */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
              <h2 className="text-2xl font-semibold text-black mb-4">03. Buy or Deposit Crypto</h2>
              <p className="text-gray-600 mb-4">
                Add funds to your account to access a wide range of crypto services. Make sure your identity is verified first.
              </p>
              <p className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-400 transition duration-300">
                Verify Your Identity First
              </p>
            </div>
          </div>

          {/* Step 4: Start Your Journey */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-8 md:space-y-0 md:space-x-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full text-center">
              <h2 className="text-2xl font-semibold text-black mb-4">04. Start Your Journey</h2>
              <p className="text-gray-600 mb-4">
                Explore a world of crypto opportunities and services within the platform. You're now ready to dive into the crypto ecosystem.
              </p>
              <p className="inline-block bg-purple-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-purple-400 transition duration-300">
                Buy or Deposit Crypto First
              </p>
            </div>
          </div>
        </div>
      </div>

      <CryptoDashboard />
    </>
  );
};

export default GetStarted;

import React from "react";
import CryptoDashboard from "./CryptoDashboard";

const GetStarted = () => {
  return (
    <>
    <div className="bg-gradient-to-r from-black via-green-600 to-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <h1 className="text-3xl font-bold text-white text-center mb-10">How To Get Started</h1>

        {/* Step 1: Create Account */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">01. Create Account</h2>
            <p className="text-gray-400 mb-4">
              Sign in to  Bit<span className="text-yellow-500 italic">flux</span>capital to register a new profile. The first step to begin your crypto journey is to create an account.
            </p>
            <p
              className="inline-block bg-yellow-500 text-black py-2 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Register Now
            </p>
          </div>
        </div>

        {/* Step 2: Verify Identity */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">02. Verify Your Identity</h2>
            <p className="text-gray-400 mb-4">
              Spend less than five minutes completing the verification process to ensure the security of your account.
            </p>
            <p
              className="inline-block bg-green-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-400 transition duration-300"
            >
              Create Your Account First
            </p>
          </div>
        </div>

        {/* Step 3: Buy or Deposit Crypto */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">03. Buy or Deposit Crypto</h2>
            <p className="text-gray-400 mb-4">
              Add funds to your Critox account to access a wide range of crypto services. Make sure you’ve completed verification first.
            </p>
            <p
              className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-400 transition duration-300"
            >
              Verify Your Identity First
            </p>
          </div>
        </div>

        {/* Step 4: Start Your Journey */}
        <div className="flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">04. Start Your Journey</h2>
            <p className="text-gray-400 mb-4">
              Explore crypto opportunities within the Critox ecosystem. Now that you have funds and identity verification, you’re all set.
            </p>
            <p
              className="inline-block bg-purple-500 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-purple-400 transition duration-300"
            >
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

import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Sponsors from './Sponsors';
import RecentTransactions from './RecentTransactions';

function TryCrypto() {
  return (
    <>
      <section className="bg-white text-black py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center space-x-0 md:space-x-8">
          {/* Left Section with Image */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img
              src="https://softivuslab.com/html/critox/dist/assets/images/try.png"
              alt="Try Crypto"
              className="w-full rounded-lg"
            />
          </div>

          {/* Right Section with Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Try Our Crypto at Bitfluxcapital, Bitfluxcapital Exchange Now
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start trading to get up to 11,200 USDT in rewards!
            </p>

            {/* Login Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login</h2>
              <p className="text-sm text-gray-500 mb-4">
                Sign Up and Claim 500 USDT token + 200 USDT coupon + 7500 USDT Futures Trial Fund
              </p>
              <Link
                to="/login"
                className="inline-block bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RecentTransactions />
      <Sponsors />
      <Footer />
    </>
  );
}

export default TryCrypto;

import React from 'react';
import { FaRegUser, FaSearch, FaHandshake } from 'react-icons/fa';
import FAQSection from './FAQSection';

function BuyBitcoinCritox() {
  return (
   <>
    <section className=" bg-gradient-to-r from-black via-green-600 to-black text-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-black mb-6">
          How to Buy Bitcoin on Bitfluxcapital
        </h2>
        <p className="text-lg text-white mb-12">
          It's easy and secure. Follow these simple steps and you'll be buying Bitcoin in just 5 minutes.
        </p>
        
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
            <FaRegUser className="text-4xl text-green-500 mx-auto" />
          </div>
          <div className="md:w-3/4">
            <h3 className="text-2xl font-semibold text-black mb-3">Step 1: Register</h3>
            <p className="text-lg text-white">
              Create an account on Bitfluxcapital with instant sign-up and get your free Bitcoin wallet. It's quick, easy, and free!
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
            <FaSearch className="text-4xl text-blue-500 mx-auto" />
          </div>
          <div className="md:w-3/4">
            <h3 className="text-2xl font-semibold text-black mb-3">Step 2: Search Offers</h3>
            <p className="text-lg text-white">
              Use the search bar to find the best offers. You can filter by price, payment method, and more to narrow down the perfect offer for you.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center mb-12">
          <div className="flex-shrink-0 mb-4 md:mb-0 md:w-1/4">
            <FaHandshake className="text-4xl text-orange-500 mx-auto" />
          </div>
          <div className="md:w-3/4">
            <h3 className="text-2xl font-semibold text-black mb-3">Step 3: Start a Trade</h3>
            <p className="text-lg text-white">
              Once you find the right offer, check the terms, and then start the trade. Begin chatting with the seller to finalize the details and get started on your Bitcoin purchase.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <a
            href="/register"
            className="inline-block px-8 py-3 bg-yellow-500 text-white text-xl font-semibold rounded-lg hover:bg-yellow-200"
          >
            Start Buying Bitcoin Now!
          </a>
        </div>
      </div>
    </section>

    <FAQSection />
   </>
  );
}

export default BuyBitcoinCritox;

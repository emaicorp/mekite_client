import React from 'react'
import { animate } from "motion";
import Carousel from './Carousel';

function Receive() {
    const animateElements = () => {
        animate(
          ".fade-in",
          { opacity: [0, 1], y: [50, 0] },
          { duration: 1, easing: "ease-out" }
        );
      };
    
      React.useEffect(() => {
        animateElements();
      }, []);
  return (
    <>
        <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 fade-in">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h4 className="text-3xl font-bold">
            Receive up to <span className="text-green-400">15%</span>
          </h4>
          <p className="text-xl">in annual crypto rewards</p>
          <p className="text-gray-300">
            Earn rewards by holding cryptocurrencies in your account.
            Effortlessly.
          </p>
          <img
            src="https://softivuslab.com/html/critox/dist/assets/images/globe-2.png"
            alt="_world"
            className="w-40 h-40 mx-auto mt-6"
          />
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Row */}
          <div className="flex items-start bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mr-4">
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/trade.png"
                alt="_key"
                className="w-16 h-16"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Trade Algorithm</h2>
              <p className="text-gray-400">
                Your assets. On your terms. At your fingertips.
              </p>
            </div>
          </div>
          <div className="flex items-start bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mr-4">
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/spot.png"
                alt="_key"
                className="w-16 h-16"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Spot Trading</h2>
              <p className="text-gray-400">
                Dive into deep liquidity, and trade like a pro.
              </p>
            </div>
          </div>

          {/* Second Row */}
          <div className="flex items-start bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mr-4">
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/bitcoin-2.png"
                alt="_key"
                className="w-16 h-16"
              />
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/support.png"
                alt="_set"
                className="w-16 h-16 mt-2"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">24/7 Support</h2>
              <p className="text-gray-400">
                Count on us for round-the-clock support, help whenever you need
                it.
              </p>
            </div>
          </div>
          <div className="flex items-start bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="mr-4">
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/trusted.png"
                alt="_key"
                className="w-16 h-16"
              />
              <img
                src="https://softivuslab.com/html/critox/dist/assets/images/coins.png"
                alt="_key"
                className="w-16 h-16 mt-2"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">Trusted & Secure</h2>
              <p className="text-gray-400">
                Your assets. On your terms. At your fingertips.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Carousel />
    </>
  )
}

export default Receive
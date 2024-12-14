import React from 'react';
import { animate } from 'motion';
import Carousel from './Carousel';

function Receive() {
  const animateElements = () => {
    animate('.fade-in', { opacity: [0, 1], y: [50, 0] }, { duration: 1, easing: 'ease-out' });
  };

  React.useEffect(() => {
    animateElements();
  }, []);

  return (
    <>
      <section className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 fade-in">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h4 className="text-3xl font-semibold text-gray-800">
              Earn up to <span className="text-yellow-500">15%</span> Annual Crypto Rewards
            </h4>
            <p className="text-xl text-gray-600">
              Earn rewards effortlessly by holding cryptocurrencies in your account. Grow your assets with no hassle.
            </p>
            <img
              src="https://softivuslab.com/html/critox/dist/assets/images/globe-2.png"
              alt="World Globe"
              className="w-40 h-40 mx-auto mt-6"
            />
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="mr-4">
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/trade.png"
                  alt="Trade Algorithm"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Trade Algorithm</h2>
                <p className="text-gray-500">
                  Manage your assets easily and trade on your terms with our cutting-edge algorithm.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="mr-4">
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/spot.png"
                  alt="Spot Trading"
                  className="w-16 h-16"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Spot Trading</h2>
                <p className="text-gray-500">
                  Dive into liquidity pools and trade like a pro with our user-friendly platform.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="mr-4">
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/bitcoin-2.png"
                  alt="24/7 Support"
                  className="w-16 h-16"
                />
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/support.png"
                  alt="Support"
                  className="w-16 h-16 mt-2"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">24/7 Support</h2>
                <p className="text-gray-500">
                  Our team is here around the clock to help with any issues or questions you have.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
              <div className="mr-4">
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/trusted.png"
                  alt="Trusted & Secure"
                  className="w-16 h-16"
                />
                <img
                  src="https://softivuslab.com/html/critox/dist/assets/images/coins.png"
                  alt="Secure"
                  className="w-16 h-16 mt-2"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Trusted & Secure</h2>
                <p className="text-gray-500">
                  Your assets are safe with us. We use the highest standards of security to protect your investments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Carousel />
    </>
  );
}

export default Receive;

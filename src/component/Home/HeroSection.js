import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { FaShieldAlt, FaSearchDollar } from 'react-icons/fa';
import Receive from './Receive';

const HeroSection = () => {
  const textRef = useRef(null);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);

  useEffect(() => {
    // Animate the text content
    animate(textRef.current, { opacity: [0, 1], x: [-50, 0] }, { duration: 1 });

    // Animate the icons
    animate(iconRef1.current, { opacity: [0, 1], y: [50, 0] }, { duration: 1, delay: 0.5 });
    animate(iconRef2.current, { opacity: [0, 1], y: [50, 0] }, { duration: 1, delay: 0.8 });
  }, []);

  return (
    <>
         <section className="bg-gradient-to-r from-black via-green-600 to-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0">
        {/* Text Content */}
        <div
          className="w-full md:w-1/2 space-y-6"
          ref={textRef} // Reference for animation
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Your Next Crypto Opportunity
          </h1>
          <p className="text-lg md:text-xl mt-4">
            Our comprehensive cybersecurity platform, driven by artificial intelligence, not only safeguards your organization but also provides actionable insights for growth.
          </p>
          <div className="mt-8 space-x-4">
            <button className="bg-green-600 hidden text-white py-2 px-6 rounded-full hover:bg-green-700 transition-all">
              Learn More
            </button>
            <button className="bg-white hidden text-green-600 py-2 px-6 rounded-full hover:bg-gray-200 transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Icon Section */}
        <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Icon 1 */}
          <div
            className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
            ref={iconRef1} // Reference for animation
          >
            <div className="text-green-400 text-4xl">
              <FaShieldAlt />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI-Driven Security</h3>
              <p className="text-sm text-gray-300">Protect your assets with cutting-edge AI technology.</p>
            </div>
          </div>

          {/* Icon 2 */}
          <div
            className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
            ref={iconRef2} // Reference for animation
          >
            <div className="text-green-400 text-4xl">
              <FaSearchDollar />
            </div>
            <div>
              <h3 className="text-xl font-bold">Opportunity Insights</h3>
              <p className="text-sm text-gray-300">Identify profitable investments effortlessly.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Receive />
    </>
  );
};

export default HeroSection;

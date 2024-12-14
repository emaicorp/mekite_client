import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { FaShieldAlt, FaSearchDollar } from 'react-icons/fa';
import Receive from './Receive';

const HeroSection = () => {
  const textRef = useRef(null);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Animate the text content
    animate(textRef.current, { opacity: [0, 1], x: [-50, 0] }, { duration: 1 });

    // Animate the icons
    animate(iconRef1.current, { opacity: [0, 1], y: [50, 0] }, { duration: 1, delay: 0.5 });
    animate(iconRef2.current, { opacity: [0, 1], y: [50, 0] }, { duration: 1, delay: 0.8 });
  }, []);

  const handleLearnMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <section className="bg-white text-black py-24">
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
              {showMore && (
                <span>
                  {' '}
                  With enhanced tools and detailed reports, you can make informed decisions, minimize risks, and maximize your investment potential. Our AI-driven algorithms ensure you're always a step ahead in the dynamic world of cryptocurrency.
                </span>
              )}
            </p>
            <div className="mt-8 space-x-4">
              <button
                className="bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-300 transition-all"
                onClick={handleLearnMore}
              >
                {showMore ? 'Show Less' : 'Learn More'}
              </button>
              <button className="bg-yellow-600 text-white py-2 px-6 rounded-full hover:bg-yellow-300 transition-all">
                Get Started
              </button>
            </div>
          </div>

          {/* Icon Section */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Icon 1 */}
            <div
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              ref={iconRef1} // Reference for animation
            >
              <div className="text-yellow-600 text-4xl">
                <FaShieldAlt />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI-Driven Security</h3>
                <p className="text-sm text-gray-700">Protect your assets with cutting-edge AI technology.</p>
              </div>
            </div>

            {/* Icon 2 */}
            <div
              className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              ref={iconRef2} // Reference for animation
            >
              <div className="text-yellow-600 text-4xl">
                <FaSearchDollar />
              </div>
              <div>
                <h3 className="text-xl font-bold">Opportunity Insights</h3>
                <p className="text-sm text-gray-700">Identify profitable investments effortlessly.</p>
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

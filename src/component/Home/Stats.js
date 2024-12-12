import React from 'react';
import CountUp from 'react-countup';
import HeroSection from '../Home/HeroSection';

const Stats = () => {
  return (
    <>
        <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Countries Covered */}
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              <CountUp start={0} end={20} duration={3} suffix="+" />
            </h2>
            <p className="text-lg mt-2">Countries Covered</p>
          </div>

          {/* Global Investors */}
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              <CountUp start={0} end={30} duration={3} decimals={1} suffix=" Million" />
            </h2>
            <p className="text-lg mt-2">Global Investors</p>
          </div>

          {/* Coins */}
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              <CountUp start={0} end={70} duration={3} suffix="+" />
            </h2>
            <p className="text-lg mt-2">Coins</p>
          </div>

          {/* 24h Trading Volume */}
          <div>
            <h2 className="text-3xl font-bold text-green-400">
              $<CountUp start={0} end={1.036} duration={3} decimals={3} suffix=" Billion" />
            </h2>
            <p className="text-lg mt-2">24h Trading Volume</p>
          </div>
        </div>
      </div>
    </section>

    <HeroSection />
    </>
  );
};

export default Stats;

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
// import HeroSection from './HeroSection';
// import RecentTransactions from './RecentTransactions';

const stats = [
  {
    value: 50000,
    label: 'Active Users',
    prefix: '+',
    suffix: ''
  },
  {
    value: 1000000000,
    label: 'Total Volume',
    prefix: '$',
    suffix: ''
  },
  {
    value: 99.9,
    label: 'Uptime',
    prefix: '',
    suffix: '%'
  },
  {
    value: 150,
    label: 'Countries',
    prefix: '',
    suffix: '+'
  }
];

const Stats = () => {
  return (
    <>
       <section className="bg-white text-black py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
        {/* Title Section */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transforming the World of Crypto Investments
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join our growing community of investors and experience cutting-edge financial growth.
        </motion.p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                <span className="text-blue-600">{stat.prefix}</span>
                <CountUp 
                  end={stat.value} 
                  duration={2.5} 
                  separator="," 
                  decimal="."
                  decimals={stat.value % 1 !== 0 ? 1 : 0}
                />
                <span className="text-blue-600">{stat.suffix}</span>
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    {/* <RecentTransactions /> */}
    {/* <HeroSection /> */}
    </>
  );
};

export default Stats;

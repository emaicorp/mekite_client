import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import HeroSection from '../Home/HeroSection';
import RecentTransactions from './RecentTransactions';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Countries Covered */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-5xl font-extrabold text-yellow-500">
              <CountUp start={0} end={20} duration={3} suffix="+" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700">Countries Covered</p>
          </motion.div>

          {/* Global Investors */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-5xl font-extrabold text-yellow-500">
              <CountUp start={0} end={30} duration={3} decimals={1} suffix="M" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700">Global Investors</p>
          </motion.div>

          {/* Coins */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-5xl font-extrabold text-yellow-500">
              <CountUp start={0} end={70} duration={3} suffix="+" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700">Coins</p>
          </motion.div>

          {/* 24h Trading Volume */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-5xl font-extrabold text-yellow-500">
              $<CountUp start={0} end={1.036} duration={3} decimals={3} suffix="B" />
            </h3>
            <p className="text-lg md:text-xl text-gray-700">24h Trading Volume</p>
          </motion.div>
        </div>
      </div>
    </section>
    <RecentTransactions />
    <HeroSection />
    </>
  );
};

export default Stats;

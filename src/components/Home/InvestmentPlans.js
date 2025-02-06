import React from 'react';
import { motion } from 'framer-motion';
import { FaBitcoin, FaChartLine, FaRocket } from 'react-icons/fa';
import Investment from '../Dashboard/Investment';



function InvestmentPlans() {
  return (
    <section className="py-20 bg-gradient-to-b from-black/50 to-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Investment Plans
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect investment plan tailored to your goals
          </p>
        </motion.div>

          <Investment />
      </div>
    </section>
  );
}

export default InvestmentPlans; 
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Start Your Investment Journey Today
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands of investors who are already benefiting from our AI-powered trading strategies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/10 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction; 
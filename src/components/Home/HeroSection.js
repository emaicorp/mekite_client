import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBitcoin, FaEthereum, FaChartLine, FaUserShield } from 'react-icons/fa';
import { SiSolana, SiCardano, SiRipple, SiDogecoin } from 'react-icons/si';

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background - lowest z-index */}
      <div className="absolute inset-0 -z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Floating elements - middle z-index */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content - highest z-index */}
      <div className="container mx-auto px-4 z-20 py-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              The Future of Investment
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Experience AI-powered trading strategies and blockchain technology for maximum returns
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Start Investing
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-blue-500">$2.5B+</div>
                <div className="text-gray-400">Trading Volume</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 rounded-lg p-4 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-purple-500">50K+</div>
                <div className="text-gray-400">Active Traders</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative  h-full flex justify-center items-center"
          >
            {/* Floating Icons - remove z-0 to allow some icons to go behind cards */}
            <div className="absolute inset-0">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-10 left-20 z-20"
              >
                <FaBitcoin className="text-6xl text-yellow-500 opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-1/4 right-10 -z-10"
              >
                <FaEthereum className="text-6xl text-blue-500 opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute top-20 right-32 z-20"
              >
                <SiSolana className="text-5xl text-green-400 opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 25, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute bottom-20 left-16 -z-10"
              >
                <SiCardano className="text-5xl text-blue-400 opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, -15, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute bottom-32 right-20 z-0"
              >
                <SiRipple className="text-5xl text-purple-400 opacity-80" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  x: [0, 15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute bottom-10 right-28 -z-10"
              >
                <SiDogecoin className="text-5xl text-yellow-400 opacity-80" />
              </motion.div>
            </div>

            {/* Feature Cards - update z-index to ensure proper layering */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
              >
                <FaChartLine className="text-4xl text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI Trading</h3>
                <p className="text-gray-400">Advanced algorithms for optimal trades</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/5 rounded-lg p-6 backdrop-blur-sm"
              >
                <FaUserShield className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Secure</h3>
                <p className="text-gray-400">Bank-grade security protocols</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

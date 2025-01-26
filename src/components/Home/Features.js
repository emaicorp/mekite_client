import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaShieldAlt, FaGlobe } from 'react-icons/fa';

const features = [
  {
    icon: <FaRobot className="text-4xl" />,
    title: 'AI-Powered Trading',
    description: 'Advanced algorithms analyze market trends for optimal trading decisions'
  },
  {
    icon: <FaChartLine className="text-4xl" />,
    title: 'Real-Time Analytics',
    description: 'Track your investments with comprehensive real-time data visualization'
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: 'Bank-Grade Security',
    description: 'Your investments are protected with military-grade encryption'
  },
  {
    icon: <FaGlobe className="text-4xl" />,
    title: 'Global Access',
    description: 'Trade and invest from anywhere in the world, 24/7'
  }
];

function Features() {
  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Why Choose BitfluxCapital
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of investment technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 p-6 rounded-2xl backdrop-blur-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features; 
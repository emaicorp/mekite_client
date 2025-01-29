import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutvid from '../../vid/aboutVid.mp4';
import { RiTeamLine, RiRocketLine, RiShieldStarLine } from 'react-icons/ri';

function Us() {
  const [isExpanded, setIsExpanded] = useState(false);

  const stats = [
    { icon: RiTeamLine, value: "150+", label: "Countries Supported" },
    { icon: RiRocketLine, value: "$5B+", label: "Trading Volume" },
    { icon: RiShieldStarLine, value: "1M+", label: "Active Users" }
  ];

  return (
    <div className="relative bg-[#111827]">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          className="absolute top-0 left-0 w-full h-full object-cover opacity-20" 
          autoPlay 
          loop 
          muted 
        >
          <source src={aboutvid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111827] via-[#111827]/90 to-[#111827]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About BitfluxCapital
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="relative bg-[#1a2234] rounded-2xl p-6 text-center group-hover:bg-[#1f2943] transition-colors duration-300">
                    <stat.icon className="text-3xl text-indigo-500 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="bg-[#1a2234] rounded-2xl p-8 md:p-12">
                <div className="prose prose-lg prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-6">
                    BitfluxCapital is a cutting-edge online investment platform built by a team of seasoned traders and cryptocurrency experts. Specializing in crypto trading across multiple exchanges and Bitcoin mining, our platform adds value through innovation and expertise.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Our company is rapidly growing, expanding its trading operations, enhancing mining techniques, and welcoming top-tier traders and miners to the team. At BitfluxCapital, we are dedicated to educating, securing, and empowering individuals worldwide to capitalize on the opportunities within the cryptocurrency industry.
                  </p>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-gray-300 leading-relaxed"
                      >
                        Join us today and start earning passive income effortlessly by leveraging our proven expertise in Bitcoin mining and crypto trading. We continue to expand globally and ensure security, transparency, and profitability for all our users.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Us;

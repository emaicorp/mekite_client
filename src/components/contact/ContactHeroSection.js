import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../layout/Navbar';
import ContactSection from './ContactSection';
import { RiCustomerService2Line } from 'react-icons/ri';

function ContactHeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="relative min-h-screen bg-[#111827] flex items-center justify-center py-32 px-4 overflow-hidden">
        {/* Background Gradient Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 bg-[#111827] opacity-90"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* Content Container */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10 container mx-auto"
        >
          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            {/* Icon */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <RiCustomerService2Line className="text-4xl text-indigo-400" />
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-center text-white mb-6"
            >
              Get in Touch with Our Team
            </motion.h1>

            {/* Description */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6 text-center"
            >
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Have questions about our platform or need assistance? Our dedicated support team is here to help you 24/7.
              </p>

              {/* Stats/Info Cards */}
              <motion.div 
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              >
                {/* Response Time Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  <div className="bg-[#1a2234] rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-2"> 5 min</h3>
                    <p className="text-gray-400">Average Response Time</p>
                  </div>
                </motion.div>

                {/* Support Hours Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  <div className="bg-[#1a2234] rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
                    <p className="text-gray-400">Support Available</p>
                  </div>
                </motion.div>

                {/* Satisfaction Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
                >
                  <div className="bg-[#1a2234] rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">99%</h3>
                    <p className="text-gray-400">Customer Satisfaction</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTA Button */}
              <motion.div 
                variants={itemVariants}
                className="mt-12"
              >
                <a 
                  href="#contact-section" 
                  className="inline-block py-4 px-8 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  Contact Support
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          />
        </div>
      </section>

      <div id="contact-section">
        <ContactSection />
      </div>
    </>
  );
}

export default ContactHeroSection;

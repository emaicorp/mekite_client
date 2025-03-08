import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiCustomerService2Line, 
  RiMailLine, 
  RiMapPin2Line,
  RiPhoneLine 
} from 'react-icons/ri';
import GetInTouch from './GetInTouch';

function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
      <section className="min-h-screen bg-[#111827] py-16">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our team is here to help you with any questions about our platform
              </p>
            </motion.div>

            {/* Contact Cards Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Chat Support Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden"
              >
                <div className="relative bg-[#1a2234] rounded-2xl p-6 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <RiCustomerService2Line size={24} className="text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Live Support</h3>
                    </div>
                    <p className="text-gray-400 mb-6">
                      Get instant help from our support team 24/7
                    </p>
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity">
                      Start Chat
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="relative bg-[#1a2234] rounded-2xl p-6 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <RiMailLine size={24} className="text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Email Us</h3>
                    </div>
                    <p className="text-gray-400 mb-6">
                      Send us an email at bitfluxcapital@gmail.com
                    </p>
                    <a 
                      href="mailto:bitfluxcapital@gmail.com"
                      className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity text-center"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Location Card */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
              >
                <div className="relative bg-[#1a2234] rounded-2xl p-6 h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                  <div className="relative">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <RiMapPin2Line size={24} className="text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">Visit Us</h3>
                    </div>
                    <p className="text-gray-400 mb-6">
                      Our office is located in Sydney, Australia
                    </p>
                    <a
                      href="https://www.google.com/maps?q=Sydney,Australia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity text-center"
                    >
                      View Location
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Hours */}
            <motion.div 
              variants={itemVariants}
              className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden"
            >
              <div className="relative bg-[#1a2234] rounded-2xl p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                      <RiPhoneLine size={24} className="text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Contact Hours</p>
                      <p className="text-gray-400">Mon-Fri from 8am to 5pm</p>
                    </div>
                  </div>
                  <a 
                    href="tel:+61485976232"
                    className="text-white hover:text-indigo-400 transition-colors"
                  >
                    +61 485 976 232
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div 
              variants={itemVariants}
              className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden"
            >
              <div className="relative bg-[#1a2234] rounded-2xl p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
                <div className="relative">
                  <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
                  <div className="w-full h-[400px] rounded-xl overflow-hidden">
                    <iframe
                      title="Australia Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13222.523593008153!2d151.2071148!3d-33.8688199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae2f98cfd9b7%3A0x5b3f733c1baf62d4!2sSydney%2C%20Australia!5e0!3m2!1sen!2sau!4v1692569461728!5m2!1sen!2sau"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* <GetInTouch /> */}
    </>
  );
}

export default ContactSection;

import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiUserAddLine, 
  RiSearchLine, 
  RiExchangeLine,
  RiShieldCheckLine,
  RiWalletLine,
  RiCustomerService2Line 
} from 'react-icons/ri';
import FAQSection from './FAQSection';

function BuyBitcoinCritox() {
  const steps = [
    {
      icon: RiUserAddLine,
      title: "Create Account",
      description: "Sign up in minutes with our streamlined verification process",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: RiWalletLine,
      title: "Fund Your Account",
      description: "Deposit funds using multiple payment methods",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: RiExchangeLine,
      title: "Start Trading",
      description: "Buy and sell crypto with just a few clicks",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const features = [
    {
      icon: RiShieldCheckLine,
      title: "Secure Storage",
      description: "Your assets are protected by industry-leading security protocols"
    },
    {
      icon: RiSearchLine,
      title: "Advanced Trading Tools",
      description: "Access professional trading features and real-time market data"
    },
    {
      icon: RiCustomerService2Line,
      title: "24/7 Support",
      description: "Get help anytime from our dedicated support team"
    }
  ];

  return (
    <>
      <section className="bg-[#111827] py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Trading in Minutes
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join millions of users worldwide trading cryptocurrencies on our secure and user-friendly platform.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                <div className={`relative p-[1px] rounded-2xl bg-gradient-to-r ${step.color}`}>
                  <div className="relative bg-[#1a2234] rounded-2xl p-8 text-center h-full group-hover:bg-[#1f2943] transition-colors duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 mb-6">
                      <step.icon className="text-3xl text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                    <feature.icon className="text-2xl text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="inline-block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <a
                href="/register"
                className="relative inline-flex items-center px-8 py-4 bg-[#1a2234] rounded-full text-white font-medium group-hover:bg-[#1f2943] transition-all"
              >
                <RiUserAddLine className="mr-2" />
                Create Free Account
              </a>
            </div>
            <p className="mt-4 text-gray-400">
              Join over 1 million users trading on BitfluxCapital
            </p>
          </motion.div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}

export default BuyBitcoinCritox;

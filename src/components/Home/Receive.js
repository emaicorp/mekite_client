import React from 'react';
import { motion } from 'framer-motion';

function Receive() {
  const features = [
    {
      title: "Trade Algorithm",
      description: "Advanced AI-powered trading algorithms that adapt to market conditions in real-time for optimal performance.",
      icon: "https://softivuslab.com/html/critox/dist/assets/images/trade.png",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Spot Trading",
      description: "Access deep liquidity pools and execute trades instantly with our professional-grade spot trading platform.",
      icon: "https://softivuslab.com/html/critox/dist/assets/images/spot.png",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "24/7 Support",
      description: "Our dedicated team of experts is available around the clock to assist you with any questions or concerns.",
      icon: "https://softivuslab.com/html/critox/dist/assets/images/support.png",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade security protocols and regular audits ensure your assets are protected at all times.",
      icon: "https://softivuslab.com/html/critox/dist/assets/images/trusted.png",
      gradient: "from-orange-500 to-yellow-500"
    }
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Earn up to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">15%</span> Annual Crypto Rewards
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of crypto trading with our advanced platform. Grow your assets effortlessly with industry-leading tools and security.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-xl -z-10"
                   style={{
                     background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                     '--tw-gradient-from': feature.gradient.split(' ')[1],
                     '--tw-gradient-to': feature.gradient.split(' ')[3]
                   }}
              />
              <div className="relative flex items-start space-x-6 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.gradient} p-0.5`}>
                    <div className="w-full h-full bg-gray-900 rounded-[7px] flex items-center justify-center">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Receive;
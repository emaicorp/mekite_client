import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiRocketLine, 
  RiShieldStarLine, 
  RiLineChartLine,
  RiTeamLine,
  RiExchangeDollarLine,
  RiTimeLine
} from "react-icons/ri";
import Us from './Us';

function Steady() {
  const features = [
    {
      icon: RiRocketLine,
      title: "Fast Execution",
      description: "Experience lightning-fast trade executions and instant deposits with our cutting-edge platform infrastructure."
    },
    {
      icon: RiShieldStarLine,
      title: "Bank-Grade Security",
      description: "Your assets are protected by state-of-the-art security measures, including multi-signature cold storage and 24/7 monitoring."
    },
    {
      icon: RiLineChartLine,
      title: "Advanced Analytics",
      description: "Access comprehensive market analysis tools and real-time data to make informed investment decisions."
    },
    {
      icon: RiTeamLine,
      title: "Expert Support",
      description: "Our dedicated team of trading specialists provides round-the-clock support to help you navigate the market."
    },
    {
      icon: RiExchangeDollarLine,
      title: "Competitive Rates",
      description: "Enjoy some of the most competitive trading fees in the industry, with special rates for high-volume traders."
    },
    {
      icon: RiTimeLine,
      title: "24/7 Trading",
      description: "Trade cryptocurrencies anytime, anywhere with our always-on platform and mobile applications."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
      <section className="bg-[#111827] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose BitfluxCapital
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-400 text-lg">
                Experience the next generation of crypto trading with our advanced platform
                and comprehensive suite of features.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="relative bg-[#1a2234] rounded-2xl p-6 h-full group-hover:bg-[#1f2943] transition-colors duration-300">
                    <div className="flex flex-col h-full">
                      <div className="p-3 bg-indigo-500/10 rounded-xl w-fit mb-6">
                        <feature.icon className="text-2xl text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 flex-grow">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <button className="relative px-8 py-3 bg-[#1a2234] rounded-full text-white font-medium group-hover:bg-[#1f2943] transition-all">
                Start Trading Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Us />
    </>
  );
}

export default Steady;
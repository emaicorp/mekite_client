import React from 'react';
import { motion } from 'framer-motion';
import { FaBitcoin, FaChartLine, FaRocket } from 'react-icons/fa';

const plans = [
  {
    icon: <FaBitcoin className="text-5xl text-yellow-500" />,
    name: 'Starter Plan',
    price: '$500',
    duration: '30 days',
    returns: '15-20%',
    features: [
      'AI-powered trading signals',
      'Basic portfolio management',
      'Email support',
      'Daily market updates'
    ]
  },
  {
    icon: <FaChartLine className="text-5xl text-blue-500" />,
    name: 'Professional',
    price: '$2,500',
    duration: '30 days',
    returns: '25-35%',
    features: [
      'Advanced AI trading algorithms',
      'Full portfolio management',
      '24/7 priority support',
      'Real-time market alerts',
      'Risk management tools'
    ]
  },
  {
    icon: <FaRocket className="text-5xl text-purple-500" />,
    name: 'Enterprise',
    price: '$10,000',
    duration: '30 days',
    returns: '40-60%',
    features: [
      'Custom AI trading strategies',
      'Dedicated account manager',
      'VIP support channel',
      'Advanced analytics dashboard',
      'Priority withdrawal processing'
    ]
  }
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl backdrop-blur-lg p-8 hover:bg-white/10 transition-all duration-300 border border-gray-700"
            >
              <div className="text-center mb-6">{plan.icon}</div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400"> / {plan.duration}</span>
                <div className="text-blue-400 font-semibold mt-2">
                  Returns: {plan.returns}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default InvestmentPlans; 
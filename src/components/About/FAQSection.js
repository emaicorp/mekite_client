import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import Footer from '../Home/Footer';

function FAQSection() {
  const [openQuestions, setOpenQuestions] = useState({});

  const faqs = [
    {
      question: "What is Bitcoin?",
      answer: "Bitcoin is a decentralized digital currency without a central bank or single administrator. It can be sent from user to user on the peer-to-peer Bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography."
    },
    {
      question: "Can I start trading with just $1?",
      answer: "Yes, you can start trading with just $1. Many cryptocurrency exchanges, including Bitfluxcapital, allow you to trade small amounts of Bitcoin, allowing anyone to start with a minimal investment."
    },
    {
      question: "Is Bitfluxcapital a safe cryptocurrency exchange?",
      answer: "Yes, Bitfluxcapital is a safe and secure cryptocurrency exchange platform. It implements industry-standard encryption and security measures, such as two-factor authentication (2FA), to ensure the safety of users' funds and data."
    },
    {
      question: "Is there an exchange limit between fiat and crypto?",
      answer: "Yes, there may be exchange limits between fiat and crypto, depending on the platform and your verification level. Typically, exchanges have lower limits for unverified accounts and higher limits for verified users."
    },
    {
      question: "What are the fees for trading Bitcoin on Bitfluxcapital?",
      answer: "Bitfluxcapital charges a small fee on trades, which varies depending on the type of transaction and market conditions. You can always find the fee structure on the platform's FAQ or trading pages."
    },
    {
      question: "Can I withdraw Bitcoin to my own wallet?",
      answer: "Yes, you can withdraw your Bitcoin to your personal wallet. Bitfluxcapital supports external wallet withdrawals for Bitcoin and other cryptocurrencies. Simply provide your wallet address during the withdrawal process."
    }
  ];

  const toggleAnswer = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
              Frequently Asked Questions
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions about cryptocurrency trading and our platform.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="relative bg-[#1a2234] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleAnswer(index)}
                      className="w-full p-6 text-left flex items-center justify-between group-hover:bg-[#1f2943] transition-colors duration-300"
                    >
                      <span className="text-xl font-semibold text-white">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openQuestions[index] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RiArrowDownSLine className="text-2xl text-indigo-400" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {openQuestions[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6">
                            <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 mb-4"></div>
                            <p className="text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Support CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6">
              Still have questions? We're here to help.
            </p>
            <div className="inline-block relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <a
                href="/contact"
                className="relative inline-flex items-center px-8 py-4 bg-[#1a2234] rounded-full text-white font-medium group-hover:bg-[#1f2943] transition-all"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default FAQSection;

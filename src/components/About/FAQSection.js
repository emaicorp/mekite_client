import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from '../Home/Footer';

function FAQSection() {
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleAnswer = (index) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
        <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
        
        {/* Question 1 */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(1)}
          >
            <h3 className="text-xl font-semibold text-gray-800">What is Bitcoin?</h3>
            {openQuestions[1] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[1] && (
            <p className="mt-4 text-lg text-gray-600">
              Bitcoin is a decentralized digital currency without a central bank or single administrator. It can be sent from user to user on the peer-to-peer Bitcoin network without the need for intermediaries. Transactions are verified by network nodes through cryptography.
            </p>
          )}
        </div>

        {/* Question 2 */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(2)}
          >
            <h3 className="text-xl font-semibold text-gray-800">Can I start trading with just $1?</h3>
            {openQuestions[2] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[2] && (
            <p className="mt-4 text-lg text-gray-600">
              Yes, you can start trading with just $1. Many cryptocurrency exchanges, including Bitfluxcapital, allow you to trade small amounts of Bitcoin, allowing anyone to start with a minimal investment.
            </p>
          )}
        </div>

        {/* Question 3 */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(3)}
          >
            <h3 className="text-xl font-semibold text-gray-800">Is Bitfluxcapital a safe cryptocurrency exchange?</h3>
            {openQuestions[3] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[3] && (
            <p className="mt-4 text-lg text-gray-600">
              Yes, Bitfluxcapital is a safe and secure cryptocurrency exchange platform. It implements industry-standard encryption and security measures, such as two-factor authentication (2FA), to ensure the safety of users' funds and data.
            </p>
          )}
        </div>

        {/* Question 4 */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(4)}
          >
            <h3 className="text-xl font-semibold text-gray-800">Is there an exchange limit between fiat and crypto?</h3>
            {openQuestions[4] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[4] && (
            <p className="mt-4 text-lg text-gray-600">
              Yes, there may be exchange limits between fiat and crypto, depending on the platform and your verification level. Typically, exchanges have lower limits for unverified accounts and higher limits for verified users.
            </p>
          )}
        </div>

        {/* Add More Questions */}
        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(5)}
          >
            <h3 className="text-xl font-semibold text-gray-800">What are the fees for trading Bitcoin on Bitfluxcapital?</h3>
            {openQuestions[5] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[5] && (
            <p className="mt-4 text-lg text-gray-600">
              Bitfluxcapital charges a small fee on trades, which varies depending on the type of transaction and market conditions. You can always find the fee structure on the platform’s FAQ or trading pages.
            </p>
          )}
        </div>

        <div className="mb-6">
          <div
            className="flex items-center justify-between cursor-pointer bg-gray-200 p-4 rounded-lg"
            onClick={() => toggleAnswer(6)}
          >
            <h3 className="text-xl font-semibold text-gray-800">Can I withdraw Bitcoin to my own wallet?</h3>
            {openQuestions[6] ? (
              <FaChevronUp className="text-xl text-gray-600" />
            ) : (
              <FaChevronDown className="text-xl text-gray-600" />
            )}
          </div>
          {openQuestions[6] && (
            <p className="mt-4 text-lg text-gray-600">
              Yes, you can withdraw your Bitcoin to your personal wallet. Bitfluxcapital supports external wallet withdrawals for Bitcoin and other cryptocurrencies. Simply provide your wallet address during the withdrawal process.
            </p>
          )}
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}

export default FAQSection;

import React from "react";
import { FaInfoCircle, FaUser, FaLock, FaGavel, FaCogs, FaCoins, FaExclamationTriangle, FaBalanceScale, FaSyncAlt } from "react-icons/fa";
import Navbar from "../../nav/Navbar";
import Footer from "../Home/Footer";

function TermsAndConditions() {
  const terms = [
    {
      icon: <FaInfoCircle className="text-blue-500 text-3xl" />,
      title: "Introduction",
      content:
        "Welcome to Bitfluxcapital. By accessing or using our website and services ('Services'), you agree to comply with and be bound by these Terms & Conditions ('Terms'). Please read them carefully. If you do not agree with these Terms, you must not use our Services.",
    },
    {
      icon: <FaUser className="text-green-500 text-3xl" />,
      title: "Eligibility",
      content:
        "To use our Services, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using our Services, you represent and warrant that you meet these requirements.",
    },
    {
      icon: <FaLock className="text-yellow-500 text-3xl" />,
      title: "Account Registration",
      content: `To access certain features of our Services, you may need to create an account. You agree to:
- Provide accurate, current, and complete information during the registration process.
- Maintain and promptly update your account information.
- Keep your password secure and confidential.
- Notify us immediately of any unauthorized use of your account or any other security breach.`,
    },
    {
      icon: <FaGavel className="text-red-500 text-3xl" />,
      title: "Use of Services",
      content:
        "You agree to use our Services for lawful purposes only. You are prohibited from using our Services to engage in any activity that violates applicable laws, interferes with or disrupts performance, or attempts unauthorized access.",
    },
    {
      icon: <FaCogs className="text-indigo-500 text-3xl" />,
      title: "Intellectual Property",
      content:
        "All content, trademarks, logos, and intellectual property on our website are the property of Bitfluxcapital or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use our Services for personal, non-commercial purposes.",
    },
    {
      icon: <FaCoins className="text-orange-500 text-3xl" />,
      title: "Transactions and Fees",
      content: `Transactions conducted on our platform are subject to our transaction policies. Fees for certain transactions or services are available on our website and may change over time.`,
    },
    {
      icon: <FaExclamationTriangle className="text-red-600 text-3xl" />,
      title: "Risk Disclosure",
      content:
        "Investing in cryptocurrencies involves significant risk, including the potential loss of your entire investment. Prices are volatile and subject to market fluctuations. You accept these risks by using our Services.",
    },
    {
      icon: <FaBalanceScale className="text-gray-500 text-3xl" />,
      title: "Limitation of Liability",
      content:
        "To the maximum extent permitted by law, Bitfluxcapital shall not be liable for any damages arising out of your use of our Services, including but not limited to loss of profits, data, or goodwill.",
    },
    {
      icon: <FaSyncAlt className="text-teal-500 text-3xl" />,
      title: "Changes to Terms",
      content:
        "We may update these Terms from time to time. Changes will be posted on this page, and the revised Terms will take effect immediately. It is your responsibility to review these Terms periodically.",
    },
  ];

  return (
    <>
    <Navbar />
        <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Terms & Conditions
        </h1>
        <div className="space-y-10">
          {terms.map((term, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-md"
            >
              <div>{term.icon}</div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {term.title}
                </h2>
                <p className="text-gray-600">{term.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}

export default TermsAndConditions;

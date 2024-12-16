import React, { useState } from "react";
import { FaHeadset, FaEnvelope, FaPhoneAlt, FaShieldAlt, FaQuestionCircle, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Link } from "react-router";

function SupportPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle opening message modal
  const openMessage = (title) => {
    const messages = {
      "24/7 Customer Support":
        "Our team is always available to assist you. Reach out to us anytime for a seamless experience.\n\nEmail: bitfluxcapital@gmail.com\nPhone: ++61 485 976 232",
      "Email Support":
        "Send us an email at bitfluxcapital@gmail.com. We'll respond promptly to address your concerns.",
      "Call Us":
        "Speak directly to our support team for immediate assistance. \n\nPhone: +61 485 976 232",
      "Secure Transactions":
        "Your investments are safe with us. Our end-to-end encryption ensures secure transactions.\n\nFor more details, contact our support team.",
    };

    setMessageContent(messages[title] || "Contact our team for assistance.");
    setShowMessage(true);
  };

  // Support sections data
  const supportSections = [
    {
      id: 1,
      icon: <FaHeadset className="text-4xl text-blue-600" />,
      title: "24/7 Customer Support",
      description: "Our team is available 24/7 to assist you with any issues or inquiries regarding your investments.",
    },
    {
      id: 2,
      icon: <FaEnvelope className="text-4xl text-green-600" />,
      title: "Email Support",
      description: "Reach out to us at bitfluxcapital@gmail.com, and we’ll get back to you as soon as possible.",
    },
    {
      id: 3,
      icon: <FaPhoneAlt className="text-4xl text-purple-600" />,
      title: "Call Us",
      description: "Need immediate assistance? Call our toll-free number at +61 485 976 232.",
    },
    {
      id: 4,
      icon: <FaShieldAlt className="text-4xl text-yellow-600" />,
      title: "Secure Transactions",
      description: "We ensure that all your transactions are secure with end-to-end encryption.",
    },
    {
      id: 5,
      icon: <FaQuestionCircle className="text-4xl text-red-600" />,
      title: "FAQs",
      description: "Have questions? Visit our FAQ section to find answers to the most commonly asked questions.",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Section */}
      <section className="bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Support Center</h1>
          <p className="text-lg text-gray-600 mt-2">
            We’re here to help you with all your cryptocurrency investment needs.
          </p>
        </div>

        {/* Support Containers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {supportSections.map((section) => (
            <div
              key={section.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300"
            >
              {/* Icon */}
              <div className="mb-4">{section.icon}</div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">{section.title}</h2>

              {/* Description */}
              <p className="text-gray-600 mb-4">{section.description}</p>

              {/* Button */}
              {section.id === 5 ? (
                <Link
                  href="/terms"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  Visit FAQs
                </Link>
              ) : (
                <button
                  onClick={() => openMessage(section.title)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-all duration-300"
                >
                  Contact Us
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Modal for Message */}
        {showMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowMessage(false)}
              >
                <FaTimes className="text-2xl" />
              </button>
              <h2 className="text-xl font-bold mb-4 text-gray-800">We're Here for You!</h2>
              <p className="text-gray-600 whitespace-pre-line">{messageContent}</p>
              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 w-full"
                onClick={() => setShowMessage(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default SupportPage;

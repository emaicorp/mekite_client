import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";

function ReferralLink() {
  const [userDetails, setUserDetails] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(userDetails.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "copied" message after 2 seconds
  };

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
        <span className="text-white text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <section className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Referral</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl">
          <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <FaHandHoldingDollar className="text-green-500 mr-2" />
            Referral Commission:{" "}
            <span className="text-gray-900 font-bold ml-2">
              ${userDetails.totalEarnings}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-lg font-semibold text-gray-700 flex-grow">
              Referral Link:
              <span className="block text-gray-900 font-mono mt-2">
                {userDetails.referralLink}
              </span>
            </p>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-full p-3"
              title="Copy Referral Link"
            >
              <FiCopy size={20} />
            </button>
          </div>
          {copied && (
            <p className="text-green-600 text-sm mt-2">
              Referral link copied to clipboard!
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default ReferralLink;

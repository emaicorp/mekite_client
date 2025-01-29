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
    setTimeout(() => setCopied(false), 2000);
  };

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111827]">
        <div className="w-16 h-16 relative">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
          <div className="w-12 h-12 absolute top-2 left-2 rounded-full border-4 border-purple-500 border-t-transparent animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-10 p-4 sm:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <FaHandHoldingDollar className="text-xl sm:text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Referral</p>
                <h1 className="text-white text-lg sm:text-xl font-medium">Your Referral Link</h1>
              </div>
            </div>
          </div>

          {/* Referral Card */}
          <div className="relative max-w-2xl mx-auto">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-8">
                <div className="space-y-6">
                  {/* Commission Section */}
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-400 mb-2 flex items-center">
                      <FaHandHoldingDollar className="text-green-500 mr-2" />
                      Referral Commission
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white">
                      ${userDetails.totalEarnings}
                    </p>
                  </div>

                  {/* Referral Link Section */}
                  <div>
                    <p className="text-base sm:text-lg font-semibold text-gray-400 mb-2">
                      Referral Link
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                      <p className="text-white font-mono flex-grow break-all text-sm sm:text-base">
                        {userDetails.referralLink}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 p-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-all duration-300 w-full sm:w-auto"
                        title="Copy Referral Link"
                      >
                        <FiCopy className="text-indigo-500 mx-auto sm:mx-0" size={20} />
                      </button>
                    </div>
                    {copied && (
                      <p className="text-green-400 text-sm mt-2">
                        Referral link copied to clipboard!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferralLink;

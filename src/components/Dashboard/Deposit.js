import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { IoWalletOutline } from "react-icons/io5";
import { FaBitcoin, FaEthereum, FaClipboard } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import Investment from "./Investment";

const plans = [
  {
    name: "Starter Plan",
    rate: "6% Daily for 3 Days",
    details: {
      INVESTMENT: "$50 - $999",
      duration: "3 Days",
      REFERRAL: "10%",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw", "Daily Withdrawals"],
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    name: "Premium Plan",
    rate: "10% Daily for 5 Days",
    details: {
      INVESTMENT: "$1,000 - $4,999",
      duration: "5 Days",
      REFERRAL: "10%",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw", "Daily Withdrawals"],
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    name: "Professional Plan",
    rate: "15% Daily for 5 Days",
    details: {
      INVESTMENT: "$5,000 - Unlimited",
      duration: "5 Days",
      REFERRAL: "10%",
    },
    features: ["All payment systems", "Customer Support", "Automated Withdraw", "Daily Withdrawals"],
    gradient: "from-purple-500 to-pink-500"
  },
];

function Deposit() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    package: "",
    paymentMethod: "",
    amount: "",
  });
  const [message, setMessage] = useState("");
  const [planDetails, setPlanDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.package || !formData.paymentMethod || !formData.amount) {
      setMessage("Please fill in all required fields.");
      return;
    }
    
    const selectedPlan = plans.find(plan => plan.name === formData.package);
    setPlanDetails(selectedPlan);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMessage('Wallet address copied!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#111827]">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-6 sm:mt-10 p-4 sm:p-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <IoWalletOutline className="text-xl sm:text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Investment</p>
                <h1 className="text-white text-lg sm:text-xl font-medium">Deposit Funds</h1>
              </div>
            </div>
          </div>

          {/* Investment Plans */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {plans.map((plan, index) => (
              <div key={index} className="relative">
                <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-white">{plan.name}</h3>
                      <div className={`p-2 sm:p-3 bg-gradient-to-r ${plan.gradient} rounded-xl bg-opacity-10`}>
                        <span className="text-sm sm:text-base text-white font-bold">{plan.rate.split(" ")[0]}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-400 text-sm">Investment Range</p>
                        <p className="text-white text-sm sm:text-base">{plan.details.INVESTMENT}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Duration</p>
                        <p className="text-white text-sm sm:text-base">{plan.details.duration}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Referral Bonus</p>
                        <p className="text-white text-sm sm:text-base">{plan.details.REFERRAL}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
          <Investment />

      
          {/* Investment Summary Modal */}
          {planDetails && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="relative w-full max-w-2xl">
                <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
                  <div className="relative bg-[#1a2234] rounded-2xl p-4 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Investment Summary</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm">Selected Package</p>
                          <p className="text-white text-lg">{formData.package}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Amount</p>
                          <p className="text-white text-lg">${formData.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Payment Method</p>
                          <p className="text-white text-lg">{formData.paymentMethod}</p>
                        </div>
                      </div>

                      <div className="border-t border-gray-800 pt-6">
                        <p className="text-gray-400 text-sm mb-2">Wallet Address</p>
                        <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-xl">
                          <p className="text-white font-mono flex-grow break-all">
                            TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq
                          </p>
                          <button
                            onClick={() => copyToClipboard("TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq")}
                            className="flex-shrink-0 p-3 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-all duration-300"
                          >
                            <FaClipboard className="text-indigo-500" size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setPlanDetails(null)}
                          className="px-4 sm:px-6 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all text-sm sm:text-base"
                        >
                          Close
                        </button>
                        <button
                          onClick={() => setPlanDetails(null)}
                          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all text-sm sm:text-base"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Deposit;

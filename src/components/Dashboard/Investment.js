import React from "react";
import { IoRocketOutline } from "react-icons/io5";
import { FaChartLine, FaClock, FaUsers, FaPercentage } from "react-icons/fa";
// import Footer from "../Home/Footer";

function Investment() {
  const plans = [
    {
      name: "Starter Plan",
      investment: "6% Daily for 3 day(s)",
      min: "50.00",
      max: "1,999.00",
      profit: "6%",
      referralBonus: "12%",
      duration: "Daily for 3 day(s)",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      name: "Crypto Plan",
      investment: "8% Daily for 2 day(s)",
      min: "500.00",
      max: "1,999.00",
      profit: "8%",
      referralBonus: "12%",
      duration: "Daily for 2 day(s)",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      name: "Advanced Plan",
      investment: "15% Daily for 3 day(s)",
      min: "2,000.00",
      max: "3,999.00",
      profit: "15%",
      referralBonus: "12%",
      duration: "Daily for 3 day(s)",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Pay Plan",
      investment: "30% AFTER 24 Hour(s)",
      min: "1,000.00",
      max: "1,999.00",
      profit: "30%",
      referralBonus: "12%",
      duration: "24 Hour(s)",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Premium Plan",
      investment: "35% Daily for 4 day(s)",
      min: "5,000.00",
      max: "Unlimited",
      profit: "35%",
      referralBonus: "12%",
      duration: "Daily for 4 day(s)",
      gradient: "from-rose-500 to-orange-500"
    },
  ];

  return (
    <div className="p-8 mt-10">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <IoRocketOutline className="text-2xl text-indigo-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Investment</p>
            <h1 className="text-white text-xl font-medium">Available Plans</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div key={index} className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200`}></div>
            <div className="relative bg-[#1a2234] border border-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className={`p-3 bg-gradient-to-r ${plan.gradient} rounded-xl bg-opacity-10`}>
                  <FaChartLine className="text-xl text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaPercentage className="text-indigo-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Profit Rate</p>
                    <p className="text-white">{plan.profit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-indigo-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Duration</p>
                    <p className="text-white">{plan.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaUsers className="text-indigo-400" />
                  <div>
                    <p className="text-gray-400 text-sm">Referral Bonus</p>
                    <p className="text-white">{plan.referralBonus}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm mb-2">Investment Range</p>
                  <p className="text-white">
                    ${plan.min} - {plan.max === "Unlimited" ? plan.max : `$${plan.max}`}
                  </p>
                </div>
              </div>

              <button className={`mt-6 w-full py-3 px-6 bg-gradient-to-r ${plan.gradient} text-white font-medium rounded-xl hover:opacity-90 transition duration-300`}>
                Choose Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Investment;

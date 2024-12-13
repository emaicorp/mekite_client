import React from "react";
import Footer from "../Home/Footer";

function InvestmentPlans() {
  const plans = [
    {
      name: "Starter Plan",
      investment: "6% Daily for 3 day(s)",
      min: "USD 50.00",
      max: "USD 1,999.00",
      profit: "6%",
      referralBonus: "12%",
      duration: "Daily for 3 day(s)",
    },
    {
      name: "Crypto Plan",
      investment: "8% Daily for 2 day(s)",
      min: "USD 500.00",
      max: "USD 1,999.00",
      profit: "8%",
      referralBonus: "12%",
      duration: "Daily for 2 day(s)",
    },
    {
      name: "Advanced Plan",
      investment: "15% Daily for 3 day(s)",
      min: "USD 2,000.00",
      max: "USD 3,999.00",
      profit: "15%",
      referralBonus: "12%",
      duration: "Daily for 3 day(s)",
    },
    {
      name: "Pay Plan",
      investment: "30% AFTER 24 Hour(s)",
      min: "USD 1,000.00",
      max: "USD 1,999.00",
      profit: "30%",
      referralBonus: "12%",
      duration: "24 Hour(s)",
    },
    {
      name: "Premium Plan",
      investment: "35% Daily for 4 day(s)",
      min: "USD 5,000.00",
      max: "Unlimited",
      profit: "35%",
      referralBonus: "12%",
      duration: "Daily for 4 day(s)",
    },
  ];

  return (
    <>
        <section className="bg-black text-white py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-6">Investment Plans</h2>
        <p className="text-center text-gray-400 mb-12">
          We understand the needs of our customers very much that our investment plans 
          cover the widest range of benefits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-center mb-4">
                {plan.name}
              </h3>
              <p className="text-center text-lg text-gray-400 mb-6">
                {plan.investment}
              </p>
              <div className="text-gray-300 space-y-2 mb-6">
                <p>
                  <span className="font-bold">Min:</span> {plan.min}
                </p>
                <p>
                  <span className="font-bold">Max:</span> {plan.max}
                </p>
                <p>
                  <span className="font-bold">Profit:</span> {plan.profit}
                </p>
                <p>
                  <span className="font-bold">Referral Bonus:</span> {plan.referralBonus}
                </p>
                <p>
                  <span className="font-bold">Duration:</span> {plan.duration}
                </p>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
    </>
  );
}

export default InvestmentPlans;

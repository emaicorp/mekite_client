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
      <section className="bg-white text-black py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-bold text-black text-center mb-6">Investment Plans</h2>
          <p className="text-center text-gray-800 mb-12">
            We understand the needs of our customers and our investment plans
            cover the widest range of benefits to suit everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white border-solid p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <h3 className="text-2xl font-semibold text-center mb-4 text-yellow-600">
                  {plan.name}
                </h3>
                <p className="text-center text-lg text-black mb-6">
                  {plan.investment}
                </p>
                <div className="text-gray-800 space-y-3 mb-6">
                  <p>
                    <span className="font-bold text-gray-800">Min:</span> {plan.min}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Max:</span> {plan.max}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Profit:</span> {plan.profit}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Referral Bonus:</span> {plan.referralBonus}
                  </p>
                  <p>
                    <span className="font-bold text-gray-800">Duration:</span> {plan.duration}
                  </p>
                </div>
                <button className="w-full hidden py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg hover:bg-gradient-to-l transition duration-300">
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

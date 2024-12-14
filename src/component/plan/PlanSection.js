import React from "react";
import Navbar from "../../nav/Navbar";
import ChoosePlan from "./ChoosePlan";

function PlanSection() {
  const planImages = {
    Basic: "https://i.pinimg.com/236x/47/52/68/4752687befca364522f98a1b5296ec1e.jpg",
    Pro: "https://i.pinimg.com/236x/32/a8/52/32a852c15e138827a6c13213505e75f2.jpg",
    Enterprise: "https://i.pinimg.com/236x/b4/9d/d1/b49dd13be55650be4ccb1c7e158b9868.jpg",
  };

  return (
    <>
      <Navbar />
      <section className="bg-black py-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <h2 className="text-4xl font-bold text-center text-white mb-8">
            Choose the Perfect Plan
          </h2>
          <p className="text-center text-gray-300 mb-12">
            Select a plan that suits your needs. Whether you're just starting out or looking for advanced features, we have something for everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plan Cards */}
            {["Basic", "Pro", "Enterprise"].map((plan) => (
              <div key={plan} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
                <img
                  src={planImages[plan]}  // Use the correct image URL from the planImages object
                  alt={`${plan} Plan`}
                  className="w-64 h-auto rounded-t-lg mb-4 mx-auto"  // Adjusted size with max width of 16rem (w-64) and auto height
                />
                <h3 className="text-2xl font-semibold mb-4 text-center">{plan} Plan</h3>
                <p className="text-center text-gray-600 mb-4">
                  {plan === "Basic" ? "Perfect for individuals or small teams starting out." : 
                   plan === "Pro" ? "Ideal for growing businesses that need advanced features." : 
                   "Designed for enterprises that need complete solutions."}
                </p>
                <ul className="text-gray-600 mb-6">
                  <li>✔ Core features access</li>
                  <li>✔ {plan === "Pro" ? "Advanced analytics & Custom integrations" : "Basic analytics & Support"}</li>
                  <li>✔ {plan === "Enterprise" ? "Dedicated account manager & 24/7 support" : "Email or Priority support"}</li>
                </ul>
                <p className="text-xl font-bold mb-4 text-center">
                  {plan === "Basic" ? "$10/month" : plan === "Pro" ? "$30/month" : "$100/month"}
                </p>
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 w-full">
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChoosePlan />
    </>
  );
}

export default PlanSection;

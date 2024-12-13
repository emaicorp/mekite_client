import React from "react";
import Navbar from "../../nav/Navbar";
import ChoosePlan from "./ChoosePlan";

function PlanSection() {
  return (
    <>
    <Navbar />
        <section className="bg-black py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Choose the Perfect Plan
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Select a plan that suits your needs. Whether you're just starting out
          or looking for advanced features, we have something for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src="https://i.pinimg.com/236x/d3/51/3e/d3513e996804607a8e10a63df6c80598.jpg" // Replace with an image for "Basic Plan"
              alt="Basic Plan"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-4">Basic Plan</h3>
            <p className="text-gray-600 mb-4">
              Perfect for individuals or small teams starting out.
            </p>
            <ul className="text-gray-600 mb-6">
              <li>✔ Access to core features</li>
              <li>✔ Basic analytics</li>
              <li>✔ Email support</li>
            </ul>
            <p className="text-xl font-bold mb-4">$10/month</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
              Select Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src="https://via.placeholder.com/150" // Replace with an image for "Pro Plan"
              alt="Pro Plan"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-4">Pro Plan</h3>
            <p className="text-gray-600 mb-4">
              Ideal for growing businesses that need advanced features.
            </p>
            <ul className="text-gray-600 mb-6">
              <li>✔ Advanced analytics</li>
              <li>✔ Custom integrations</li>
              <li>✔ Priority support</li>
            </ul>
            <p className="text-xl font-bold mb-4">$30/month</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
              Select Plan
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <img
              src="https://via.placeholder.com/150" // Replace with an image for "Enterprise Plan"
              alt="Enterprise Plan"
              className="w-full rounded-t-lg mb-4"
            />
            <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
            <p className="text-gray-600 mb-4">
              Designed for enterprises that need complete solutions.
            </p>
            <ul className="text-gray-600 mb-6">
              <li>✔ Unlimited access to all features</li>
              <li>✔ Dedicated account manager</li>
              <li>✔ 24/7 support</li>
            </ul>
            <p className="text-xl font-bold mb-4">$100/month</p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300">
              Select Plan
            </button>
          </div>
        </div>
      </div>
    </section>

    <ChoosePlan />
    </>
  );
}

export default PlanSection;

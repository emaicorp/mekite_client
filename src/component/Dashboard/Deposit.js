import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { FaClipboard } from 'react-icons/fa'; // Importing a clipboard icon

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
  },
];

function Deposit() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [investmentDetails, setInvestmentDetails] = useState(null);

  const handlePlanSelection = (plan) => setSelectedPlan(plan);

  const closePlanDetails = () => setSelectedPlan(null);

  const handleInvestmentSuccess = (details) => {
    setInvestmentDetails(details);
  };

  return (
    <>
      <Sidebar />
      <section className="bg-gray-100 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} onClick={() => handlePlanSelection(plan)} />
          ))}
        </div>

        {selectedPlan && (
          <PlanDetailsModal plan={selectedPlan} onClose={closePlanDetails} />
        )}

        <InvestForm onSuccess={handleInvestmentSuccess} />
        {investmentDetails && <InvestmentSummary details={investmentDetails} />}
      </section>
    </>
  );
}

function PlanCard({ plan, onClick }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <header className="border-b pb-4">
        <h2 className="font-bold text-purple-700">{plan.name}</h2>
        <p className="font-bold text-green-600">{plan.rate}</p>
      </header>
      <PlanDetails details={plan.details} />
      <PlanFeatures features={plan.features} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onClick}
      >
        View Details
      </button>
    </div>
  );
}

function PlanDetails({ details }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Plan Details</h3>
      <p><strong>Minimum:</strong> {details.INVESTMENT}</p>
      <p><strong>Referral:</strong> {details.REFERRAL}</p>
      <p><strong>Duration:</strong> {details.duration}</p>
    </div>
  );
}

function PlanFeatures({ features }) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Features</h3>
      <ul className="list-disc pl-6">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

function PlanDetailsModal({ plan, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{plan.name}</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            X
          </button>
        </header>
        <PlanDetails details={plan.details} />
        <PlanFeatures features={plan.features} />
      </div>
    </div>
  );
}

function InvestForm({ onSuccess }) {
  const [userId, setUserId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [planDetails, setPlanDetails] = useState(null); // Store details of the selected plan

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) setUserId(storedUser.id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPackage || !paymentMethod || !amount) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const selectedPlan = plans.find((plan) => plan.name === selectedPackage); // Get selected plan details

    if (!selectedPlan) {
      setMessage("Selected package is invalid.");
      return;
    }

    // Validation for amount according to the selected plan
    if (amount < selectedPlan.minAmount || amount > selectedPlan.maxAmount) {
      setMessage(`Amount should be between $${selectedPlan.minAmount} and $${selectedPlan.maxAmount}`);
      return;
    }

    try {
      const response = await fetch("https://mekite-btc.onrender.com/api/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json", "user-id": userId },
        body: JSON.stringify({ userId, selectedPackage, paymentMethod, amount }),
      });

      const data = await response.json();
      if (response.ok) {
        onSuccess({ selectedPackage, paymentMethod, amount, details: selectedPlan.details });
        setPlanDetails(selectedPlan); // Set the plan details for summary
        setMessage("Investment successful!");
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Try again later.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setMessage('Wallet address copied!');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Invest Form</h1>
      {message && <p className="text-red-500">{message}</p>}
      <div>
        <label className="block font-semibold mb-2">Select Package</label>
        <select
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select a package --</option>
          {plans.map((plan, index) => (
            <option key={index} value={plan.name}>
              {plan.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-2">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="">-- Select a payment method --</option>
          <option value="bitcoin">bitcoin</option>
          <option value="ethereum">ethereumPendingthereum</option>
          <option value="usdt">usdt</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-2">Investment Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
        Invest Now
      </button>

      {planDetails && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="border-b p-4 text-center bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">Investment Summary</h2>
      </div>

      {/* Scrollable Content */}
      <div className="p-6 overflow-auto flex-1">
        {/* Package Details */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Package Details</h3>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-medium text-gray-600">Package:</td>
                <td>{planDetails.name}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600">Amount:</td>
                <td>${amount}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600">Payment Method:</td>
                <td>{paymentMethod}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600">Rate:</td>
                <td>{planDetails.rate}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Plan Breakdown */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Plan Breakdown</h3>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="font-medium text-gray-600">Investment Range:</td>
                <td>{planDetails.details.INVESTMENT}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600">Duration:</td>
                <td>{planDetails.details.duration}</td>
              </tr>
              <tr>
                <td className="font-medium text-gray-600">Referral:</td>
                <td>{planDetails.details.REFERRAL}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Features Section */}
        <div className="border p-4 rounded-lg bg-gray-50 mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Features</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {planDetails.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Wallet Section */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Wallet Address</h3>
          <div className="flex items-center">
            <input
              type="text"
              value="TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq"
              readOnly
              className="border p-2 rounded w-full text-gray-700"
            />
            <button
              type="button"
              onClick={() => copyToClipboard("TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq")}
              className="ml-4 text-blue-500 hover:text-blue-700"
            >
              <FaClipboard size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="border-t p-4 flex justify-center bg-gray-100">
        <button
          type="button"
          onClick={() => setPlanDetails(null)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mx-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setPlanDetails(null)}
          className="bg-blue-500 text-white  hidden py-2 px-4 rounded hover:bg-blue-700 mx-2"
        >
          Invest Again
        </button>
      </div>
    </div>
  </div>
)}
    </form>
  );
}

function InvestmentSummary({ details }) {
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold">Investment Summary</h2>
      <p><strong>Package:</strong> {details.selectedPackage}</p>
      <p><strong>Amount:</strong> ${details.amount}</p>
      <p><strong>Payment Method:</strong> {details.paymentMethod}</p>
    </div>
  );
}

export default Deposit;

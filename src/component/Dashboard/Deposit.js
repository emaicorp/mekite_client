import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Investment from "../Dashboard/Investment";
import { FaCopy } from "react-icons/fa"; // Importing a copy icon from react-icons
import FundAccount from "./FundAccount";

function Deposit() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [modalData, setModalData] = useState(null);
  const [dailyInterest, setDailyInterest] = useState(0);
  const [storedDeposits, setStoredDeposits] = useState([]);
  const [currentDay, setCurrentDay] = useState(0); // Tracks day for interest calculation
  const [intervalId, setIntervalId] = useState(null);
  const [copied, setCopied] = useState(false); // State to handle copied status

  // Plans data
  const plans = [
    { name: "Starter Plan", min: 50, max: 1999, profit: 6 },
    { name: "Crypto Plan", min: 500, max: 1999, profit: 8 },
    { name: "Advanced Plan", min: 2000, max: 3999, profit: 15 },
    { name: "Pay Plan", min: 1000, max: 1999, profit: 30 },
    { name: "Premium Plan", min: 5000, max: "Unlimited", profit: 35 },
  ];

  // Fetch stored data on component mount
  useEffect(() => {
    const deposits = JSON.parse(localStorage.getItem("deposits")) || [];
    setStoredDeposits(deposits);
  }, []);

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const plan = plans.find((p) => p.name === selectedPlan);
  
    if (plan) {
      const modalContent = {
        plan: selectedPlan,
        price,
        paymentMethod,
        profitPercentage: plan.profit, // Keep the plan's profit percentage
        insurance: true,
      };
  
      saveToLocalStorage(modalContent);
      calculateInterest(modalContent.profitPercentage, price);
      setModalData(modalContent);
      setStoredDeposits((prev) => [...prev, modalContent]);
    } else {
      alert("Please select a valid plan!");
    }
  };
  
  // Save data to local storage
  const saveToLocalStorage = (data) => {
    const storedData = JSON.parse(localStorage.getItem("deposits")) || [];
    storedData.push(data);
    localStorage.setItem("deposits", JSON.stringify(storedData));
  };

  // Calculate interest increasing by 3% daily for 3 days
  const calculateInterest = (initialProfit, amount) => {
    clearInterval(intervalId); // Clear any previous interval
    let profitPercentage = initialProfit;
    let totalProfit = 0;
    let day = 1;

    const newIntervalId = setInterval(() => {
      if (day <= 3) {
        const dailyIncrease = (profitPercentage / 100) * amount;
        totalProfit += dailyIncrease;
        profitPercentage += 3; // Increment profit by 3% each day

        console.log(`Day ${day}: Interest = ${dailyIncrease.toFixed(2)} | Total Profit = ${totalProfit.toFixed(2)}`);
        localStorage.setItem("dailyProfit", totalProfit.toFixed(2));
        setDailyInterest(totalProfit);
        setCurrentDay(day);

        day++;
      } else {
        clearInterval(newIntervalId);
      }
    }, 1000); // Simulates 1 second as 1 day

    setIntervalId(newIntervalId);
  };

  // Reset all stored data
  const handleReset = () => {
    clearInterval(intervalId);
    setDailyInterest(0);
    setCurrentDay(0);
    setStoredDeposits([]);
    setModalData(null);
    localStorage.removeItem("deposits");
    localStorage.removeItem("dailyProfit");
    alert("All data has been reset!");
  };

  // Copy wallet address to clipboard and show notification
  const copyToClipboard = () => {
    const walletAddress = "TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq"; // This is the wallet address
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset the copied status after 2 seconds
      })
      .catch(() => alert("Failed to copy!"));
  };

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Investment />
      <FundAccount />
      <section className="p-4">
        <h1 className="text-2xl font-bold mb-4">Make Deposit</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Choose Plan:</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select a Plan</option>
              {plans.map((plan) => (
                <option key={plan.name} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Deposit Amount:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter amount"
              className="border p-2 w-full"
              required
            />
          </div>

          <div>
            <label>Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border p-2 w-full"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Bitcoin">Bitcoin</option>
              <option value="USDT">USDT</option>
              <option value="Ethereum">Ethereum</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded ml-4"
          >
            Reset
          </button>
        </form>

        {/* Display Modal Data */}
        {modalData && (
          <div className="mt-4 border p-4 bg-gray-100 rounded">
            <h2 className="text-xl font-bold">Plan Summary</h2>
            <div className="text-center bg-white shadow-lg rounded-md p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Payment Wallet:
              </h2>
              <p
                className="text-[0.7rem] font-mono text-blue-600 bg-gray-100 p-2 rounded-md tracking-wide"
              >
                TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq
              </p>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-blue-500 ml-2"
              >
                <FaCopy size={16} />
              </button>
              {copied && <span className="ml-2 text-green-500">Copied!</span>}
            </div>
            <p>Plan: {modalData.plan}</p>
            <p>Deposit Amount: ${modalData.price}</p>
            <p>Payment Method: {modalData.paymentMethod}</p>
            <p>Profit Percentage: {modalData.profitPercentage}%</p>
            <p>Insurance: {modalData.insurance ? "✅" : "❌"}</p>
            <p>Daily Interest Total: ${dailyInterest.toFixed(2)}</p>
            <p>Current Day: {currentDay} / 3</p>
          </div>
        )}

        {/* Display Stored Deposits */}
        {storedDeposits.length > 0 && (
          <div className="mt-6 border p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-2">Stored Deposits</h2>
            <div className="text-center bg-white shadow-lg rounded-md p-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                Payment Wallet:
              </h2>
              <p
                className="text-[0.7rem] font-mono text-blue-600 bg-gray-100 p-2 rounded-md tracking-wide"
              >
                TS9rwoJP5CvB6efsprtWXJfngutq7Knhmq
              </p>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-blue-500 ml-2"
              >
                <FaCopy size={16} />
              </button>
              {copied && <span className="ml-2 text-green-500">Copied!</span>}
            </div>
            {storedDeposits.map((data, index) => (
              <div key={index} className="mb-2 p-2 border-b">
                <p>Plan: {data.plan}</p>
                <p>Amount: ${data.price}</p>
                <p>Payment Method: {data.paymentMethod}</p>
                <p>Profit Percentage: {data.profitPercentage}%</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Deposit;

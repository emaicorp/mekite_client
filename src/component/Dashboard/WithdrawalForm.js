import React, { useState, useEffect } from "react";
import { FaBitcoin } from "react-icons/fa6";
import { FaEthereum } from "react-icons/fa";
import { FaOctopusDeploy } from "react-icons/fa";
import Sidebar from "./Sidebar";
import WithdrawalReasons from "./WithdrawalReasons"

function WithdrawalForm() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500">
        <span className="text-white text-2xl font-semibold">Loading...</span>
      </div>
    );
  }

  const bitcoinAvailable = userDetails?.bitcoinAvailable || 0;
  const bitcoinPending = userDetails?.bitcoinPending || 0;
  const ethereumAvailable = userDetails?.ethereumAvailable || 0;
  const ethereumPending = userDetails?.ethereumPending || 0;
  const usdtAvailable = userDetails?.usdtAvailable || 0;
  const usdtPending = userDetails?.usdtPending || 0;

  return (
    <>
    <Sidebar />
      <section className="p-6">
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="border border-gray-300 px-4 py-2">Processing</th>
            <th className="border border-gray-300 px-4 py-2">Available</th>
            <th className="border border-gray-300 px-4 py-2">Pending</th>
            <th className="border border-gray-300 px-4 py-2">Account</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
              <FaBitcoin className="text-yellow-500" />
              Bitcoin
            </td>
            <td className="border border-gray-300 px-4 py-2">{bitcoinAvailable}</td>
            <td className="border border-gray-300 px-4 py-2">{bitcoinPending}</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">not set</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
              <FaEthereum className="text-blue-500" />
              Ethereum
            </td>
            <td className="border border-gray-300 px-4 py-2">{ethereumAvailable}</td>
            <td className="border border-gray-300 px-4 py-2">{ethereumPending}</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">not set</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex items-center gap-2">
              <FaOctopusDeploy className="text-green-500" />
              USDT
            </td>
            <td className="border border-gray-300 px-4 py-2">{usdtAvailable}</td>
            <td className="border border-gray-300 px-4 py-2">{usdtPending}</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-500 italic">not set</td>
          </tr>
        </tbody>
      </table>
    </section>

    <WithdrawalReasons />
    </>
  );
}

export default WithdrawalForm;

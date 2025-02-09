import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  RiCloseLine,
  RiBitCoinLine,
  RiCoinFill,
  RiFileCopyLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { QRCodeSVG } from "qrcode.react";
import toast from "react-hot-toast";
import api from "../../utils/axios";
import useUserData from "../../hooks/useUserData";

const DepositForm = ({ plan, onClose }) => {
  const [amount, setAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userDetails } = useUserData();
console.log("Deposite UserData" , userDetails)
  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      const response = await api.get("wallet");
      if (response.data.success) {
        setWallets(response.data.data);
      }
    } catch (err) {
      setError("Failed to fetch wallet addresses");
      toast.error("Failed to fetch wallet addresses");
    }
  };

  const getCurrencyIcon = (currency) => {
    switch (currency.toLowerCase()) {
      case "bitcoin":
        return <RiBitCoinLine className="text-[#F7931A]" />;
      case "ethereum":
        return <RiMoneyDollarCircleLine className="text-[#627EEA]" />;
      case "usdt":
        return <RiCoinFill className="text-[#26A17B]" />;
      default:
        return <RiCoinFill className="text-gray-400" />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Wallet address copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsingBalance = selectedWallet === "balance";

    // Balance validation
    if (isUsingBalance && amount > userDetails?.activeDeposit) {
      setError("Insufficient balance in active deposit");
      toast.error("Insufficient balance in active deposit");
      return;
    }
    // Validate amount is within plan range
    if (amount < plan.minAmount || amount > plan.maxAmount) {
      setError(
        `Amount must be between $${plan.minAmount} and $${plan.maxAmount}`
      );
      toast.error(
        `Amount must be between $${plan.minAmount} and $${plan.maxAmount}`
      );
      return;
    }

    if (!selectedWallet) {
      setError("Please select a payment method");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("investments", {
        selectedPackage: plan.name,
        paymentMethod: isUsingBalance ? "balance" : selectedWallet?.currency,
        amount: parseFloat(amount),
      });

      if (response.data.success) {
        toast.success(
          response.data.message || "Deposit initiated successfully!"
        );
        onClose();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl my-8"
      >
        <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
          <div
            className="relative bg-[#1a2234] rounded-2xl p-6 max-h-[85vh] overflow-y-auto 
            scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-500 hover:scrollbar-thumb-purple-400"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <RiCloseLine size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">Make a Deposit</h2>
              <p className="text-gray-400">Selected Plan: {plan.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">
                  Amount (${plan.minAmount} - ${plan.maxAmount})
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`Enter amount between $${plan.minAmount} - $${plan.maxAmount}`}
                  className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  required
                  min={plan.minAmount}
                  max={plan.maxAmount}
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedWallet("balance")}
                    className={`p-4 rounded-xl border ${
                      selectedWallet === "balance"
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-gray-800 hover:border-indigo-500/50"
                    } transition-all flex items-center gap-3`}
                    disabled={userDetails?.activeDeposit < plan.minAmount}
                  >
                    <RiCoinFill className="text-purple-400" />
                    <span className="text-white">Active Deposit</span>
                    <span className="text-sm text-gray-400 ml-auto">
                      ${userDetails?.activeDeposit?.toFixed(2)} Available
                    </span>
                  </button>
                  {wallets.map((wallet) => (
                    <button
                      key={wallet._id}
                      type="button"
                      onClick={() => setSelectedWallet(wallet)}
                      className={`p-4 rounded-xl border ${
                        selectedWallet?._id === wallet._id
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-gray-800 hover:border-indigo-500/50"
                      } transition-all flex items-center gap-3`}
                    >
                      {getCurrencyIcon(wallet.currency)}
                      <span className="text-white capitalize">
                        {wallet.currency}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedWallet && selectedWallet !== "balance" && (
                <div className="p-4 rounded-xl bg-[#111827] border border-gray-800">
                  <div className="flex justify-center mb-4">
                    <QRCodeSVG
                      value={selectedWallet.address}
                      size={160}
                      bgColor="#111827"
                      fgColor="#fff"
                      level="L"
                      includeMargin={false}
                    />
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-[#1a2234] rounded-lg">
                    <p className="text-white font-mono text-sm flex-1 break-all">
                      {selectedWallet.address}
                    </p>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(selectedWallet.address)}
                      className="p-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <RiFileCopyLine size={20} />
                    </button>
                  </div>
                </div>
              )}
              {selectedWallet === "balance" && (
                <div className="p-4 rounded-xl bg-[#111827] border border-gray-800">
                  <div className="text-center text-purple-400 mb-4">
                    <RiCoinFill className="text-3xl mx-auto" />
                    <p className="mt-2">Using Active Deposit Balance</p>
                  </div>
                  <div className="text-center text-gray-300">
                    Available: ${userDetails?.activeDeposit?.toFixed(2)}
                  </div>
                </div>
              )}
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <div className="flex justify-end gap-4 sticky bottom-0 pt-4 bg-[#1a2234]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !selectedWallet}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Deposit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DepositForm;

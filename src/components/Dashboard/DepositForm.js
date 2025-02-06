import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiCloseLine, 
  RiCoinFill,
  RiCoinLine,
  RiMoneyDollarCircleLine 
} from 'react-icons/ri';
import api from '../../utils/axios';
import toast from 'react-hot-toast';

const DepositForm = ({ plan, onClose }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bitcoin');
  const [transactionHash, setTransactionHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 for amount, 2 for transaction hash

  const currencies = [
    { id: 'bitcoin', name: 'Bitcoin', icon: RiCoinFill },
    { id: 'ethereum', name: 'Ethereum', icon: RiCoinLine },
    { id: 'usdt', name: 'USDT', icon: RiMoneyDollarCircleLine },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      if (amount < plan.minAmount || amount > plan.maxAmount) {
        setError(`Amount must be between $${plan.minAmount} and $${plan.maxAmount}`);
        toast.error(`Amount must be between $${plan.minAmount} and $${plan.maxAmount}`);
        return;
      }
      setStep(2);
      setError('');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.post('investments', {
        selectedPackage: plan.name,
        paymentMethod,
        amount: parseFloat(amount),
        transactionHash
      });

      if (response.data.success) {
        toast.success('Deposit submitted successfully!');
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 m-4"
      >
        <div className="relative bg-[#1a2234] rounded-2xl p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-800 rounded-lg transition-all"
          >
            <RiCloseLine className="text-gray-400 text-xl" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-1">{plan.name}</h2>
          <p className="text-gray-400 mb-6">
            {step === 1 ? 'Select amount and payment method' : 'Enter transaction details'}
          </p>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div>
                  <label className="block text-gray-400 mb-2">Amount (USD)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`$${plan.minAmount} - $${plan.maxAmount}`}
                    className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-2">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-4">
                    {currencies.map(({ id, name, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPaymentMethod(id)}
                        className={`p-4 rounded-xl border ${
                          paymentMethod === id 
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400' 
                            : 'border-gray-800 hover:border-gray-700 text-gray-400'
                        } transition-all flex flex-col items-center gap-2`}
                      >
                        <Icon className="text-2xl" />
                        <span className="text-sm">{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-gray-400 mb-2">Transaction Hash</label>
                <input
                  type="text"
                  value={transactionHash}
                  onChange={(e) => setTransactionHash(e.target.value)}
                  placeholder="Enter your transaction hash"
                  className="w-full bg-[#111827] text-white px-4 py-3 rounded-xl border border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                  required
                />
                <p className="mt-2 text-sm text-gray-400">
                  Please enter the transaction hash from your {paymentMethod} transfer
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Processing...' : step === 1 ? 'Continue' : 'Submit Deposit'}
            </button>

            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 px-6 bg-transparent text-gray-400 hover:text-white transition-all"
              >
                Back to Amount
              </button>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default DepositForm; 
import React, { useState, useEffect } from 'react';
import useUserData from '../../hooks/useUserData';
import { IoPersonOutline } from "react-icons/io5";
import Sidebar from './Sidebar';
import LoadingSpinner from "../common/LoadingSpinner"
import api from '../../utils/axios';
import toast from 'react-hot-toast';


function Profile() {
  const { userDetails, setUserDetails , loading } = useUserData();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    country: '',
    walletAddresses: {
      bitcoin: '',
      ethereum: '',
      usdt: '',
    },
    password: '',
    recoveryQuestion: '',
    recoveryAnswer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (userDetails) {
      setFormData({
        fullName: userDetails.fullName || '',
        walletAddresses: {
          bitcoin: userDetails.bitcoinWallet || '',
          ethereum: userDetails.ethereumWallet || '',
          usdt: userDetails.usdtWallet || '',
        },
        password: '', // Password should not be pre-filled for security reasons
        recoveryQuestion: userDetails.recoveryQuestion || '',
        recoveryAnswer: userDetails.recoveryAnswer || '',
      });
    }
  }, [userDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.walletAddresses) {
      setFormData(prevData => ({
        ...prevData,
        walletAddresses: {
          ...prevData.walletAddresses,
          [name]: value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSaving(true);
    try {
      const response = await api.patch(
        'users/update-profile',
        formData);
      setUserDetails(response.data.data);
      toast.success('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      toast.error('Unable to update profile. Please try again later.');
      setTimeout(() => setError(''), 3000);
    }
    setIsSaving(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-screen bg-[#111827]">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="mt-10 p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl">
                <IoPersonOutline className="text-2xl text-indigo-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Account</p>
                <h1 className="text-white text-xl font-medium">Profile Settings</h1>
              </div>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <div className="p-[1px] relative rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500">
              <div className="relative bg-[#1a2234] rounded-2xl p-8">
                {success && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                    {error}
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Bitcoin Wallet Address</label>
                    <input
                      type="text"
                      name="bitcoin"
                      value={formData.walletAddresses.bitcoin}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your Bitcoin wallet address"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Ethereum Wallet Address</label>
                    <input
                      type="text"
                      name="ethereum"
                      value={formData.walletAddresses.ethereum}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your Ethereum wallet address"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">USDT Wallet Address</label>
                    <input
                      type="text"
                      name="usdt"
                      value={formData.walletAddresses.usdt}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your USDT wallet address"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter new password (leave empty to keep current)"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Security Question</label>
                    <input
                      type="text"
                      name="recoveryQuestion"
                      value={formData.recoveryQuestion}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your security question"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Security Answer</label>
                    <input
                      type="text"
                      name="recoveryAnswer"
                      value={formData.recoveryAnswer}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your security answer"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Update Profile'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

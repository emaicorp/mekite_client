import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserDetails } from '../Dashboard/localStorageUtils';
import Sidebar from './Sidebar';

function Profile() {
  const [userActivity, setUserActivity] = useState(null);
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('userWallets')) || {};
    return {
      bitcoinWallet: storedData.bitcoinWallet || '',
      ethereumWallet: storedData.ethereumWallet || '',
      usdtWallet: storedData.usdtWallet || '',
      username: storedData.username || '',
    };
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserActivity = async () => {
      const userDetails = getUserDetails();

      if (!userDetails) {
        setError('User is not logged in');
        return;
      }

      try {
        const response = await axios.get(
          'https://mekite-btc.onrender.com/api/profile/activity',
          {
            headers: {
              Authorization: `Bearer ${userDetails.token}`,
              'user-id': userDetails.userId,
            },
          }
        );

        const activity = response.data.activity;
        setUserActivity(activity);
        setFormData((prevData) => ({
          ...prevData,
          bitcoinWallet: activity.bitcoinWallet || '',
          ethereumWallet: activity.ethereumWallet || '',
          usdtWallet: activity.usdtWallet || '',
          username: activity.username || '',
        }));
      } catch (err) {
        console.error('Error fetching user activity:', err);
        setError('Unable to fetch user activity. Please try again later.');
      }
    };

    fetchUserActivity();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const userDetails = getUserDetails();

    if (!userDetails) {
      setError('User is not logged in');
      return;
    }

    try {
      const response = await axios.put(
        'https://mekite-crypto.onrender.com/api/profile/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${userDetails.token}`,
            'user-id': userDetails.userId,
          },
        }
      );

      // Update local storage and user activity
      localStorage.setItem('userWallets', JSON.stringify(formData));
      setUserActivity((prevActivity) => ({
        ...prevActivity,
        ...response.data.userDetails,
      }));

      setSuccess('Profile updated successfully and saved permanently.');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Unable to update profile. Please try again later.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!userActivity) {
    return <div className="text-center mt-4">Loading user activity...</div>;
  }

  return (
    <>
    <Sidebar />
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">User Profile</h2>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-700 mb-2">Activity Details</h3>
        <p><span className="font-semibold">Username:</span> {userActivity.username || 'N/A'}</p>
        <p><span className="font-semibold">Email:</span> {userActivity.email || 'N/A'}</p>
        <p><span className="font-semibold">Last Seen:</span> {userActivity.lastSeen ? new Date(userActivity.lastSeen).toLocaleString() : 'N/A'}</p>
      </div>

      <form onSubmit={handleFormSubmit} className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-700 mb-4">Update Wallets</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bitcoin Wallet</label>
          <input
            type="text"
            name="bitcoinWallet"
            value={formData.bitcoinWallet}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ethereum Wallet</label>
          <input
            type="text"
            name="ethereumWallet"
            value={formData.ethereumWallet}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">USDT Wallet</label>
          <input
            type="text"
            name="usdtWallet"
            value={formData.usdtWallet}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Update Profile
        </button>
      </form>

      {success && <div className="text-green-600 mt-4 text-center">{success}</div>}
      {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
    </div>
    </>
  );
}

export default Profile;

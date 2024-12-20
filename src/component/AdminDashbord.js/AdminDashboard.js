import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideBard";
import AdminMessages from "./AdminMessages";
import WalletDetails from "./WalletDetails";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sidebar toggle
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://mekite-crypto.onrender.com/api/users/admin/users");
        setUsers(response.data.data); // Store the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://mekite-crypto.onrender.com/api/users/admin/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user");
    }
  };

  // Check if user is active based on some criteria
  const isActive = (user) => {
    return user.balance.usdt > 0 || user.balance.ethereum > 0 || user.balance.bitcoin > 0;
  };

  // Handle carousel navigation
  const nextUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  const prevUser = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
  };

  const currentUser = users[currentIndex];

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="admin-dashboard p-6 md:p-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Admin Dashboard</h1>

        {/* Total number of users */}
        <p className="mt-4 text-lg font-semibold text-gray-600">Total Users: {users.length}</p>

        <div className="mt-6 space-y-6">
          {users.length > 0 && currentUser && (
            <div className="carousel-container relative bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              {/* User Details Card */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    {currentUser.fullname}
                    {/* Show green dot if user is active */}
                    {isActive(currentUser) && <span className="text-green-500 ml-2 text-xl">●</span>}
                  </h2>
                  <div className="flex gap-4">
                    <button
                      onClick={prevUser}
                      className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={nextUser}
                      className="bg-gray-200 text-gray-600 p-2 rounded-full hover:bg-gray-300"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700"><strong>Username:</strong> {currentUser.username}</p>
                <p className="text-gray-700"><strong>Email:</strong> {currentUser.email}</p>
                <p className="text-gray-700"><strong>Total Earnings:</strong> {currentUser.totalEarnings}</p>
                <p className="text-gray-700"><strong>Referral Link:</strong> <a href={currentUser.referralLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{currentUser.referralLink}</a></p>
                <p className="text-gray-700"><strong>Wallet Address:</strong> {currentUser.walletAddress}</p>
                <p className="text-gray-700"><strong>Wallets:</strong> USDT: {currentUser.wallets.usdt}, Ethereum: {currentUser.wallets.ethereum}, Bitcoin: {currentUser.wallets.bitcoin}</p>
                <p className="text-gray-700"><strong>Balance:</strong> USDT: {currentUser.balance.usdt}, Ethereum: {currentUser.balance.ethereum}, Bitcoin: {currentUser.balance.bitcoin}</p>
                <p className="text-gray-700"><strong>Security Question:</strong> {currentUser.security.secretQuestion}</p>

                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleDelete(currentUser._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdminMessages />
      <WalletDetails />
    </>
  );
}

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideBard";
import AdminMessages from "./AdminMessages";
import WalletDetails from "./WalletDetails";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  
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
    // Example: user is active if they have a positive balance in any of the wallets
    return user.balance.usdt > 0 || user.balance.ethereum > 0 || user.balance.bitcoin > 0;
  };

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="admin-dashboard p-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>

        {/* Total number of users */}
        <p className="mt-4 text-lg font-semibold">Total Users: {users.length}</p>

        <div className="mt-6 space-y-6">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {user.fullname} 
                  {/* Show green dot if user is active */}
                  {isActive(user) && <span className="text-green-500 ml-2 text-xl">●</span>}
                </h2>
              </div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Total Earnings:</strong> {user.totalEarnings}</p>
              <p><strong>Referral Link:</strong> <a href={user.referralLink} target="_blank" rel="noopener noreferrer">{user.referralLink}</a></p>
              <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
              <p><strong>Wallets:</strong> USDT: {user.wallets.usdt}, Ethereum: {user.wallets.ethereum}, Bitcoin: {user.wallets.bitcoin}</p>
              <p><strong>Balance:</strong> USDT: {user.balance.usdt}, Ethereum: {user.balance.ethereum}, Bitcoin: {user.balance.bitcoin}</p>
              <p><strong>Security Question:</strong> {user.security.secretQuestion}</p>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>

      <AdminMessages />
      <WalletDetails />
    </>
  );
}

export default AdminDashboard;

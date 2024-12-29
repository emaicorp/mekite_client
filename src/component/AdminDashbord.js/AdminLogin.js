import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBard from './SideBard';

function AdminLogin() {
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mekite-btc.onrender.com/api/all-users');
        if (response.data.users) {
          setUsers(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setMessage('Error fetching users');
      }
    };
    fetchUsers();
  }, []);

  const handleActionSubmit = async () => {
    if (!action || !userId) {
      setMessage('Please provide both action and user ID');
      return;
    }

    try {
      const response = await axios.post('https://mekite-btc.onrender.com/api/admin/manage-user', {
        action,
        userId
      });

      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error managing user:', error);
      setMessage('Error managing user');
    }
  };

  // Copy user ID to clipboard
  const handleCopyUserId = (id) => {
    navigator.clipboard.writeText(id).then(() => {
      setMessage('User ID copied to clipboard!');
    }).catch((error) => {
      console.error('Error copying user ID:', error);
      setMessage('Failed to copy user ID');
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SideBard />
      <div className="flex-grow p-8 bg-white shadow-lg rounded-lg mx-4 my-8">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin Dashboard</h2>

        {/* Show a list of users */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h3>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
              <div className="flex-1 text-lg text-gray-700">
                {user.name} ({user.email})
              </div>
              <button 
                className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition-all"
                onClick={() => handleCopyUserId(user._id)}
              >
                Copy ID
              </button>
            </li>
          ))}
        </ul>

        {/* Manage User Action */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Manage User</h3>

          <div className="mb-4">
            <label className="block text-gray-700">Action:</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              value={action} 
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="">Select Action</option>
              <option value="verify-email">Verify Email</option>
              <option value="disable-account">Disable Account</option>
              <option value="suspend-account">Suspend Account</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">User ID:</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
            />
          </div>

          <button 
            onClick={handleActionSubmit} 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit Action
          </button>

          {/* Display messages */}
          {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

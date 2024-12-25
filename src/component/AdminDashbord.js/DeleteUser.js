import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DeleteUser() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  
  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://mekite-crypto.onrender.com/api/all-users');
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

  // Handle Delete User
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`https://mekite-crypto.onrender.com/api/users/${userId}`);
      if (response.data.success) {
        setMessage(response.data.message);
        // Remove deleted user from the list
        setUsers(users.filter(user => user._id !== userId));
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Error deleting user');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin Dashboard</h2>

      {/* Display all users */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">All Users</h3>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all">
            <div className="flex-1 text-lg text-gray-700">
              {user.name} ({user.email})
            </div>
            <button 
              className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all"
              onClick={() => handleDeleteUser(user._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Display messages */}
      {message && <p className="mt-4 text-center text-lg text-green-500">{message}</p>}
    </div>
  );
}

export default DeleteUser;

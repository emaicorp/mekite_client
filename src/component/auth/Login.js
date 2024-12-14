import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageStyle, setMessageStyle] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in based on token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, the user is already logged in, so navigate to the dashboard
      navigate('/dashboard');
    }
  }, [navigate]);

  // Handling form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageStyle('');

    try {
      const response = await axios.post('https://mekite-crypto.onrender.com/api/users/login', formData);

      // Check if the login was successful
      if (response.data.style === 'success') {
        // Store the JWT token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage(response.data.message);
        setMessageStyle(response.data.style);

        // Redirect to the dashboard after a brief delay
        setTimeout(() => {
          navigate('/dashboard'); // Adjust according to your routing
        }, 1500);
      } else {
        setMessage(response.data.message);
        setMessageStyle(response.data.style);
      }
    } catch (err) {
      // Handle error
      setMessage(err.response?.data?.message || 'An error occurred. Please try again.');
      setMessageStyle('error');
    } finally {
      setLoading(false);
    }
  };

//   // Handle user logout
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login'); // Redirect to the login page
//   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <label className="block mb-2">
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        <label className="block mb-2">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        <button
          type="submit"
          className={`w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${loading && 'opacity-50 cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>

        {message && (
          <p className={`mt-4 ${messageStyle === 'error' ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Create an account with us
          </span>
        </p>
      </form>

      {/* Logout Button, shown when the user is logged in */}
      {/* {localStorage.getItem('token') && (
        <button
          onClick={handleLogout}
          className="mt-4 w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      )} */}
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!username || !password) {
        setError('Both username and password are required');
        setLoading(false);
        return;
    }

    try {
        const response = await axios.post('https://mekite-btc.onrender.com/api/login', { username, password });

        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userDetails', JSON.stringify(response.data.userDetails));
        }

        // Redirect based on user role
        if (response.data.userDetails.role === 'admin') {
            navigate('/admin-dashboard'); // Navigate to admin dashboard
        } else {
            navigate('/dashboard'); // Navigate to user dashboard
        }
    } catch (err) {
        console.error('Error during login:', err);
        setError('Invalid credentials, please try again');
    }
    setLoading(false);
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Login to Your Account</h2>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <label className="inline-flex items-center text-sm text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-medium shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p>
            Create a new account?{' '}
            <button
              onClick={() => navigate('/register')} // Navigate to register page
              className="text-blue-500 hover:text-blue-400"
            >
              Register
            </button>
          </p>
          <p>
            Or{' '}
            <button
              onClick={() => navigate('/')} // Navigate to home page
              className="text-blue-500 hover:text-blue-400"
            >
              Go Back to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

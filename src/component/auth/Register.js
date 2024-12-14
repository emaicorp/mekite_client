import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    wallets: { bitcoin: '', ethereum: '', usdt: '' }, // Default wallet structure
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  const navigate = useNavigate(); // For navigating to another page

  // Predefined Secret Questions
  const secretQuestions = [
    "What is your pet's name?",
    "What is your mother's maiden name?",
    "What was the name of your first school?",
    "What is your favorite book?",
    "What is your dream job?",
    "What is your favorite movie?",
    "What is the name of your hometown?",
    "What is your favorite food?",
    "Who is your childhood hero?",
    "What was the make of your first car?",
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle wallet fields separately
    if (name in formData.wallets) {
      setFormData({
        ...formData,
        wallets: {
          ...formData.wallets,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true); // Start loading state

    try {
      const response = await axios.post(
        'https://mekite-crypto.onrender.com/api/users/register',
        formData
      );
      setMessage(response.data.message);
      setIsLoading(false); // Stop loading state
      setTimeout(() => {
        // Navigate to login page after successful registration
        navigate('/login');
      }, 2000); // Wait 2 seconds before redirecting
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        {/* Fullname */}
        <label className="block mb-2">
          Full Name
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* Username */}
        <label className="block mb-2">
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* Email */}
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

        {/* Password */}
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

        {/* Secret Question Dropdown */}
        <label className="block mb-2">
          Secret Question
          <select
            name="secretQuestion"
            value={formData.secretQuestion}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">-- Select a Secret Question --</option>
            {secretQuestions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
        </label>

        {/* Secret Answer */}
        <label className="block mb-2">
          Secret Answer
          <input
            type="text"
            name="secretAnswer"
            value={formData.secretAnswer}
            onChange={handleChange}
            required
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* Optional Wallet Inputs */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Optional Wallets</h3>

        {/* Bitcoin */}
        <label className="block mb-2">
          Bitcoin Wallet Address
          <input
            type="text"
            name="bitcoin"
            value={formData.wallets.bitcoin}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* Ethereum */}
        <label className="block mb-2">
          Ethereum Wallet Address
          <input
            type="text"
            name="ethereum"
            value={formData.wallets.ethereum}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* USDT */}
        <label className="block mb-2">
          USDT Wallet Address
          <input
            type="text"
            name="usdt"
            value={formData.wallets.usdt}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {/* Message Display */}
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Go back to home and login prompt */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
          <p className="text-gray-600 mt-2">Don't have an account? Create an account with us today!</p>
          <Link to="/" className="text-blue-500 mt-4 block">Go back to Home</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

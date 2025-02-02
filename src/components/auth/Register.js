import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
  import Navbar from '../layout/Navbar';

function Register() {
  const navigate = useNavigate();
  const [upline, setUpline] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    email: '',
    recoveryQuestion: '',
    recoveryAnswer: '',
    agreedToTerms: false,
    referredBy: '',
    bitcoinWallet: '',
    ethereumWallet: '',
    usdtWallet: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mekite-btc.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage('Registration successful. Redirecting to login...');
        setUpline(data.upline || 'N/A');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setResponseMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred while registering. Please try again.');
    }
  };

  return (
    <>
      {/* <Navbar /> */}

      <div className="min-h-screen bg-black py-16 ">
        <h4 className="text-transparent bg-clip-text hover:from-blue-600 hover:to-purple-600 transition-all bg-gradient-to-r from-blue-500 to-purple-500 px-4 cursor-pointer text-2xl font-bold underline w-fit" onClick={() => navigate('/')}>BitfluxCapital</h4>
        <div className="max-w-2xl mx-auto px-4 mt-10">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>
            
            {responseMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                responseMessage.includes('successful') 
                  ? 'bg-green-500/10 border border-green-500 text-green-500'
                  : 'bg-red-500/10 border border-red-500 text-red-500'
              }`}>
                <p className="text-sm">{responseMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  placeholder="Create a strong password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Recovery Question</label>
                <select
                  name="recoveryQuestion"
                  value={formData.recoveryQuestion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                >
                  <option value="" disabled>Select a question</option>
                  <option value="What is your favorite color?">What is your favorite color?</option>
                  <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                  <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                  {/* Add more security questions as needed */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Recovery Answer</label>
                <input
                  type="text"
                  name="recoveryAnswer"
                  value={formData.recoveryAnswer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  placeholder="Enter your answer"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 border border-gray-700 rounded bg-gray-800/50 text-purple-600 focus:ring-purple-500"
                  required
                />
                <label className="ml-2 text-sm text-gray-300">
                  I agree to the Terms and Conditions
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Create Account
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>

            {upline && (
              <p className="mt-4 text-center text-sm text-gray-400">
                Your upline is: <span className="text-purple-500">{upline}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

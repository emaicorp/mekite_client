import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
  // import Navbar from '../layout/Navbar';
  import axios from 'axios';
  import toast from 'react-hot-toast';
function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [upline, setUpline] = useState(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      setFormData(prev => ({
        ...prev,
        referredBy: ref
      }));
    }
  }, [location]);

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
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      // Add form validation
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      if (!formData.agreedToTerms) {
        toast.error("You must agree to the Terms and Conditions");
        return;
      }
      console.dir(formData, {depth: null});
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/register`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data.success) {
        toast.success("Registration Successful");
        setResponseMessage('Registration successful. Redirecting to login...');
        console.dir(response.data, {depth: null});
        setUpline(response.data.upline || 'N/A');
        // setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(response.data.message || "Registration Failed");
        setResponseMessage(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message || "An error occurred while registering. Please try again.";
      toast.error(errorMessage);
      setResponseMessage(errorMessage);
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'} 
                  text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 
                  focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
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

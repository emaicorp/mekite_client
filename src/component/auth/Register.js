import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../nav/Navbar';

function Register() {
  const navigate = useNavigate();
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
    console.log('Submitting form with data:', formData); // Debug log

    try {
      const response = await fetch('https://mekite-btc.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log('Response Data:', data); // Debug log

      if (response.ok) {
        setResponseMessage('Registration successful. Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000); // Adds a short delay for UX
      } else {
        setResponseMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error); // Debug log
      setResponseMessage('An error occurred while registering. Please try again.');
    }
  };

  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 text-white shadow-lg rounded-lg w-full max-w-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recovery Question</label>
              <select
                name="recoveryQuestion"
                value={formData.recoveryQuestion}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a question</option>
                <option value="What is your favorite color?">What is your favorite color?</option>
                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                <option value="What is the name of your favorite teacher?">What is the name of your favorite teacher?</option>
                <option value="What is the name of the street you grew up on?">What is the name of the street you grew up on?</option>
<option value="What was your childhood nickname?">What was your childhood nickname?</option>
<option value="What is the name of your first school?">What is the name of your first school?</option>
<option value="What is the title of your favorite book?">What is the title of your favorite book?</option>
<option value="What is your favorite food?">What is your favorite food?</option>
<option value="What city were you born in?">What city were you born in?</option>
<option value="What was the make and model of your first car?">What was the make and model of your first car?</option>
<option value="What is the name of your favorite childhood friend?">What is the name of your favorite childhood friend?</option>
<option value="What was the name of the first company you worked for?">What was the name of the first company you worked for?</option>
<option value="What is the name of your favorite sports team?">What is the name of your favorite sports team?</option>
<option value="What is the name of your favorite vacation destination?">What is the name of your favorite vacation destination?</option>
<option value="Who is your favorite musician or band?">Who is your favorite musician or band?</option>
<option value="What is the first concert you attended?">What is the first concert you attended?</option>
<option value="What is your father's middle name?">What is your father's middle name?</option>
<option value="What is your oldest sibling's middle name?">What is your oldest sibling's middle name?</option>
<option value="What is the name of the first person you kissed?">What is the name of the first person you kissed?</option>
<option value="What was the first movie you saw in a theater?">What was the first movie you saw in a theater?</option>
<option value="What was your dream job as a child?">What was your dream job as a child?</option>
<option value="What is your favorite holiday tradition?">What is your favorite holiday tradition?</option>
<option value="What is the name of your first love?">What is the name of your first love?</option>

              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Recovery Answer</label>
              <input
                type="text"
                name="recoveryAnswer"
                value={formData.recoveryAnswer}
                onChange={handleChange}
                className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleChange}
                className="w-5 h-5 bg-gray-700 text-blue-500 border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              <label className="ml-2 text-sm">I agree to the Terms and Conditions</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Register
            </button>
          </form>
          {responseMessage && (
            <p className="mt-4 text-center text-sm text-green-400">{responseMessage}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;

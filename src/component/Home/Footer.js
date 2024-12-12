import React, { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="hover:underline">
                  Buy Crypto
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Sell Crypto
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Swap
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Coin Market
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Earn
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <input
              type="email"
              placeholder="Enter Your Email..."
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="mt-3 bg-yellow-400 text-gray-800 py-2 px-4 rounded-lg w-full hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <p className="text-sm">
              Welcome to CritoX, your gateway to the world of Web3 trading! Our
              user-friendly platform empowers you to explore a wide range of
              popular cryptocurrencies.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>Copyright @ 2011 Bitfluxcapital | Designed By Professionals</p>
        </div>
      </div>

      
      {/* Sticky Chat Icon */}
      <div
        className="fixed bottom-16 right-4 bg-yellow-400 p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-500 transition"
        onClick={handleChatOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"
          />
        </svg>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-16 right-4 bg-white w-96 h-96 shadow-xl rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Chat with us</h3>
            {/* Cancel Button */}
            <button
              onClick={handleChatClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat Message Area */}
          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <img
              src="https://via.placeholder.com/150"
              alt="Chat with us"
              className="w-32 h-32 object-cover rounded-full"
            />
            <p className="text-center text-gray-600 text-sm">
              You can start chatting with our support team here. Ask us anything!
            </p>
          </div>

          {/* Message Input Area */}
          <div className="mt-8">
            <textarea
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
            ></textarea>
            <button
              className="w-full mt-2 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
              onClick={() => alert("Message sent!")}
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;

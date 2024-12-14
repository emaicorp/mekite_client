import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import { FiMessageCircle } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import CryptoPrices from "./CryptoPrices";

function Footer() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = () => setIsChatOpen(false);
  const handleEmojiClick = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.emoji);
    setShowEmoji(false);
  };

  return (
    <>
      <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link to="/" className="hover:underline">Buy Crypto</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Sell Crypto</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Swap</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Coin Market</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Earn</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Blog</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">Contact Us</Link>
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

      {/* Message Icon for Chat */}
      <div
        className="fixed bottom-16 right-4 bg-yellow-400 p-4 rounded-full cursor-pointer shadow-lg hover:bg-yellow-500 transition"
        onClick={handleChatOpen}
      >
      <FiMessageCircle className="text-white text-3xl" />
</div>

{isChatOpen && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex flex-col items-center justify-center p-4 z-50">
    {/* Chat Header */}
    <div className="w-full flex justify-between items-center bg-gray-900 text-white p-4 rounded-t-lg">
      <div className="flex items-center space-x-3">
        <img
          src="https://via.placeholder.com/40"
          alt="User Icon"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">Support Agent</p>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>
      <button
        onClick={handleChatClose}
        className="text-gray-500 hover:text-gray-700"
      >
        <MdCancel className="text-white text-3xl" />
      </button>
    </div>

    {/* Chat Messages Area */}
    <div className="flex flex-col items-center justify-center space-y-4 mt-8 w-full max-w-xl">
      <div className="bg-white w-full p-4 rounded-lg shadow-md text-gray-700">
        <p>Welcome! How can we assist you today?</p>
      </div>
    </div>

    {/* Message Input Area */}
    <div className="mt-8 w-full flex justify-center">
      <div className="relative flex items-center w-full max-w-xl bg-white p-2 rounded-md shadow-md">
        {/* Emoji Picker Toggle */}
        <button
          onClick={() => setShowEmoji(!showEmoji)}
          className="text-2xl text-gray-500 hover:text-gray-700"
        >
          😀
        </button>

        {/* Message Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mx-2 p-2 h-10 resize-none border text-black border-gray-300 rounded-md focus:outline-none"
          rows="1"
        ></textarea>

        {/* Send Button */}
        <button
          onClick={() => alert("Message sent!")}
          className="text-yellow-400 text-3xl hover:text-yellow-500 transition"
        >
          <IoSend />
        </button>

        {/* Emoji Picker */}
        {showEmoji && (
          <div className="absolute bottom-12 left-0 bg-white p-2 rounded-md shadow-lg z-10">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </footer>

    <CryptoPrices />
    </>
  );
}

export default Footer;

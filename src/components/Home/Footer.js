import React from "react";
import { Link } from "react-router-dom";

function Footer() {
 

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
              Welcome to Bitfluxcapital, your gateway to the world of Web3 trading! Our
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

    </footer>
    </>
  );
}

export default Footer;

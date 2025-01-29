import React from "react";
import { Link } from "react-router-dom";
import LanguageSelector from '../LanguageSelector';

function Footer() {
 

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img 
                src="/logo.png" 
                alt="Bitfluxcapital" 
                className="h-16 w-16"
              />
            </Link>
            <div className="mt-6">
              <LanguageSelector 
                buttonStyle="p-2 bg-gray-800 text-white rounded" 
                selectStyle="bg-gray-800 text-white rounded px-3 py-1 outline-none focus:ring-2 focus:ring-[#00df9a]"
              />
            </div>
            <p className="text-sm text-gray-400">
              Copyright ©2024 All rights reserved | Bitfluxcapital
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-[#00df9a] font-bold mb-6 uppercase">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-[#00df9a]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-300 hover:text-[#00df9a]">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-[#00df9a]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-300 hover:text-[#00df9a]">
                  Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-[#00df9a] font-bold mb-6 uppercase">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/buy-crypto" className="text-gray-300 hover:text-[#00df9a]">
                  Buy Crypto Here
                </Link>
              </li>
              <li>
                <Link to="/certificate" className="text-gray-300 hover:text-[#00df9a]">
                  Certificate
                </Link>
              </li>
              <li>
                <Link to="/whitepaper" className="text-gray-300 hover:text-[#00df9a]">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-[#00df9a] font-bold mb-6 uppercase">Contact Us</h3>
            <ul className="space-y-4">
              <li className="text-gray-300">
                <span className="font-semibold">Email:</span><br />
                <a 
                  href="mailto:admin@bitfluxcapital.com" 
                  className="hover:text-[#00df9a]"
                >
                  admin@bitfluxcapital.com
                </a>
              </li>
              <li className="text-gray-300">
                <span className="font-semibold">Address:</span><br />
                4651 Westport Dr<br />
                Mechanicsburg, PA,<br />
                17055-4843 United States
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

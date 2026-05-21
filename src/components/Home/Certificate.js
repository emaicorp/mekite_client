import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Footer from "./Footer";

function Certificate() {

  return (
    <div className="bg-black text-white min-h-screen pt-20 pb-16">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#00df9a]">Certificate</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Bitfluxcapital is a registered and certified financial trading platform, 
            fully compliant with UK regulations and international standards.
          </p>
        </div>

        {/* Certificate Display */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-[#00df9a] shadow-2xl mb-12">
          <img 
            src="/certixficate.jpg" 
            alt="Bitfluxcapital Certificate of Registration" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Certificate Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Registration Information */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 hover:border-[#00df9a] transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#00df9a] mb-6 flex items-center">
              <span className="text-3xl mr-3">✓</span>
              Registration Details
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Company Name</p>
                  <p>Bitfluxcapital Limited</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Company Number</p>
                  <p>6647065</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Registered Office</p>
                  <p>1 Malmesbury Road, Cheadle Hulme, Cheadle, Greater Manchester, England, SK8 7QH</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Registration Authority</p>
                  <p>Companies House, United Kingdom</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Compliance Information */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-700 hover:border-[#00df9a] transition-all duration-300">
            <h2 className="text-2xl font-bold text-[#00df9a] mb-6 flex items-center">
              <span className="text-3xl mr-3">🛡️</span>
              Compliance & Standards
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">UK FCA Regulated</p>
                  <p>Fully compliant with UK Financial Conduct Authority standards</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">AML/KYC Compliance</p>
                  <p>Anti-Money Laundering and Know Your Customer procedures implemented</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Data Protection</p>
                  <p>GDPR compliant with secure data handling practices</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#00df9a] mr-3 font-bold">•</span>
                <div>
                  <p className="font-semibold text-white">Security Standards</p>
                  <p>ISO 27001 information security management certified</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Verification Section */}
        {/* <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 md:p-12 border border-[#00df9a] mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00df9a] mb-6 text-center">
            Verify Our Certificate
          </h2>
          <p className="text-gray-300 text-center mb-8">
            You can verify our registration directly with Companies House, the UK's official 
            register of companies. Click below to view our official certificate on their website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://find-and-update.company-information.service.gov.uk/company/6647065"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#00df9a] text-black font-bold rounded-lg hover:bg-white transition-all duration-300 text-center"
            >
              View Certificate on Companies House
            </a>
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-[#00df9a] text-[#00df9a] font-bold rounded-lg hover:bg-[#00df9a] hover:text-black transition-all duration-300 text-center"
            >
              Learn More About Us
            </Link>
          </div>
        </div> */}

        {/* Trust Section */}
        <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Why <span className="text-[#00df9a]">Trust</span> Bitfluxcapital?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl text-[#00df9a] mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-white mb-3">Regulated & Licensed</h3>
              <p className="text-gray-300">
                Operating under UK law with full compliance to regulatory requirements 
                and transparent business practices.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-[#00df9a] mb-4">🔒</div>
              <h3 className="text-xl font-bold text-white mb-3">Secure Transactions</h3>
              <p className="text-gray-300">
                Advanced encryption and multi-layer security protocols protect all 
                transactions and user information.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl text-[#00df9a] mb-4">📊</div>
              <h3 className="text-xl font-bold text-white mb-3">Transparent Reporting</h3>
              <p className="text-gray-300">
                Regular audits and transparent financial reporting ensure accountability 
                and trust with our clients.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6 text-sm">
            Registered and verified under Companies House • Company Number: 6647065
          </p>
          {/* <p className="text-gray-500 text-xs">
            © {year} Bitfluxcapital. All rights reserved. This certificate validates 
            our commitment to regulatory compliance and financial integrity.
          </p> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Certificate;

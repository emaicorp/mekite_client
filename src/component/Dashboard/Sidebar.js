import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const navLinks = (
    <>
      <NavLink to="/dashboard" className="hover:text-gray-300 capitalize">Dashboard</NavLink>
      <NavLink to="/profile" className="hover:text-gray-300 capitalize">Profile</NavLink>
      <NavLink to="/deposit-list" className="hover:text-gray-300 capitalize">Deposit List</NavLink>
      <NavLink to="/referral" className="hover:text-gray-300 capitalize">Referral Panel</NavLink>
      <NavLink to="/transactions" className="hover:text-gray-300 capitalize">Withdrawal</NavLink>
      <NavLink to="/deposit" className="hover:text-gray-300 capitalize">Deposit</NavLink>
      <Link to="/logout" className="text-gray-300 hover:text-white">Logout</Link>
    </>
  );

  return (
    <>
      <header className="bg-black text-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks}
            </div>

            {/* User Info */}
            {userDetails && (
              <div className="hidden md:flex items-center space-x-4">
                <CgProfile
                  src={userDetails.profileImage || 'default-avatar.jpg'}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-white">{userDetails.username}</span>
                <span className="text-sm text-gray-300">{userDetails.email}</span>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={handleMenuToggle} className="text-white">
                {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
              </button>
            </div>
          </div>

          {/* Mobile Sliding Menu */}
          <div
            className={`fixed inset-0 bg-black text-white z-40 transform transition-transform duration-300 ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex justify-between items-center p-4">
              
              <button onClick={handleMenuToggle} className="text-white">
                <FaTimes size={30} />
              </button>
            </div>
            <div className="flex flex-col space-y-6 px-6 mt-12">
              {navLinks}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Sidebar;

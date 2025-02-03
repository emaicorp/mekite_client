import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiMenuLine, 
  RiCloseLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiSafeLine,
  RiGiftLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiArrowRightSLine,
  RiStackLine
} from "react-icons/ri";
// Add this at the top of your file with other imports

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);


      
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Retrieve admin data from state or localStorage
  const storedAdmin = JSON.parse(localStorage.getItem("adminData"));
  const admin = location.state?.admin || storedAdmin;

  const menuItems = [
    {
      path: "/admin-dashboard",
      name: "Clients",
      icon: RiUserLine
    },
    {
      path: "/fund",
      name: "Fund Clients",
      icon: RiMoneyDollarCircleLine
    },
    {
      path: "/deposit-approval",
      name: "Approve Deposit",
      icon: RiSafeLine
    },
    {
      path: "/bonus",
      name: "Bonuses",
      icon: RiGiftLine
    },
    {
      path: "/investment-plans",
      name: "Investment Plans",
      icon: RiStackLine
    },
    {
      path: "/admin-login",
      name: "Management",
      icon: RiSettings4Line
    },
    {
      path: "/approve",
      name: "Withdrawal",
      icon: RiMoneyDollarCircleLine
    }
  ];

  const sidebarContent = (

    <div className="flex flex-col h-full">
      {/* Admin Profile */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {admin?.fullname?.[0] || "A"}
            </span>
          </div>
          <div>
            <h3 className="text-white font-semibold">
              {admin?.fullname || "Admin"}
            </h3>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
              ${location.pathname === item.path 
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
                : "text-gray-400 hover:bg-[#1f2943] hover:text-white"}`}
          >
            <item.icon className="text-xl" />
            <span>{item.name}</span>
            <RiArrowRightSLine className={`ml-auto transition-transform duration-300
              ${location.pathname === item.path ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className=" flex-0 p-4 border-t border-gray-800">
        <Link
          to="/logout"
          onClick={() => setIsSidebarOpen(false)}
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1f2943] hover:text-white transition-all duration-300"
        >
          <RiLogoutBoxRLine className="text-xl" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1a2234] border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-white font-semibold">
            {admin?.fullname || "Admin"}'s Dashboard
          </h3>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? (
              <RiCloseLine className="text-2xl" />
            ) : (
              <RiMenuLine className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar - Updated with dynamic top position */}
      <div className={`hidden md:block fixed left-0 h-screen w-72 transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-[3.7rem]'
      }`}>
        <div className="h-full bg-[#1a2234] border-r border-gray-800">
          {sidebarContent}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={`md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#1a2234] shadow-xl ${
                isScrolled ? 'top-0' : 'top-[3.7rem]'
              }`}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiUserLine, 
  RiTeamLine,
  RiWalletLine,
  RiExchangeDollarLine,
  RiLogoutBoxLine,
  RiMenuFoldLine,
  RiMenuUnfoldLine
} from 'react-icons/ri';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: RiDashboardLine },
    { path: '/profile', name: 'Profile', icon: RiUserLine },
    { path: '/referral', name: 'Referral Panel', icon: RiTeamLine },
    { path: '/transactions', name: 'Withdrawal', icon: RiWalletLine },
    { path: '/deposit', name: 'Deposit', icon: RiExchangeDollarLine },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-30
        ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-24' : 'translate-x-0 w-72'}
        ${isScrolled ? 'top-0' : 'top-[3.7rem]'}
        transition-all duration-300 ease-in-out
      `}>
        <div className="h-full bg-[#1a2234] border-r border-gray-800">
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute ${isCollapsed ? 'md:-right-3 -right-8' : '-right-3'} top-8 z-50 bg-indigo-500 p-2 rounded-full text-white hover:bg-indigo-600 transition-colors shadow-lg md:flex`}
          >
            {isCollapsed ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
          </button>

          {/* Logo Section */}
          <div className="p-6 flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="min-w-[2.5rem] h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className={`
                text-white font-semibold text-xl 
                transition-all duration-300
                ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
                overflow-hidden whitespace-nowrap
              `}>
                BitFlux
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-indigo-500">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl mb-2 
                  transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-400 border border-indigo-500/20' 
                    : 'text-gray-400 hover:bg-indigo-500/5'
                  }
                `}
              >
                <item.icon className={`text-xl flex-shrink-0 ${
                  location.pathname === item.path ? 'text-indigo-400' : 'text-gray-400'
                }`} />
                <span className={`
                  transition-all duration-300
                  ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
                  overflow-hidden whitespace-nowrap
                `}>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>

          {/* User Profile Section */}
          {userDetails && (
            <div className="p-4 border-t border-gray-800">
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <RiUserLine className="text-white" />
                  </div>
                  <div className={`
                    overflow-hidden transition-all duration-300
                    ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}
                  `}>
                    <h4 className="text-white text-sm font-medium truncate">
                      {userDetails.username}
                    </h4>
                    <p className="text-gray-400 text-xs truncate">
                      {userDetails.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              <Link
                to="/logout"
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl mt-2
                  text-red-400 hover:bg-red-500/5 transition-all
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <RiLogoutBoxLine className="text-xl flex-shrink-0" />
                <span className={`
                  transition-all duration-300
                  ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}
                  overflow-hidden whitespace-nowrap
                `}>
                  Logout
                </span>
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Spacer div to maintain layout - only visible on desktop */}
      <div className={`hidden md:block flex-shrink-0 ${isCollapsed ? 'w-24' : 'w-72'}`} />
    </>
  );
}

export default Sidebar;

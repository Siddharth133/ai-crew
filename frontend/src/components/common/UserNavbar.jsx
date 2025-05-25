import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaUser, FaSignOutAlt, FaCog, FaTachometerAlt } from 'react-icons/fa';
import authService from '../../services/authService';

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const user = authService.getCurrentUser();

  const publicLinks = [
    { path: '/features', label: 'Features' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  function handleSignOut() {
    authService.logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  }

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#181C2A]/80 backdrop-blur-xl border-b border-white/10`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#181C2A]/95 to-[#181C2A]/80 -z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              AI-CREW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center space-x-1 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/5">
              {publicLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${isActive(path) ? 'text-white bg-white/10 shadow-sm' : 'text-purple-100 hover:text-white hover:bg-white/5'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
            {/* Auth Buttons or User Badge */}
            {!user ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-[15px] font-medium text-purple-100 hover:text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-[15px] font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A] relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                  <span className="relative">Sign up</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center ml-6">
                {/* Oval badge with credits and user menu */}
                <div className="relative flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-2 shadow-lg">
                  <span className="font-semibold text-white mr-3 flex items-center">
                    <FaUser className="w-4 h-4 mr-1 text-cyan-300" />
                    {user.name}
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-md mr-3">
                    Credits: {user.credits ?? 0}
                  </span>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex items-center text-purple-100 hover:text-white focus:outline-none"
                  >
                    <FaChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg py-1 z-50"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-purple-100 hover:bg-white/10 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaTachometerAlt className="w-4 h-4 mr-2" /> Dashboard
                        </Link>
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center px-4 py-2 text-purple-100 hover:bg-white/10 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaCog className="w-4 h-4 mr-2" /> Settings
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center px-4 py-2 text-purple-100 hover:bg-white/10 transition-colors"
                        >
                          <FaSignOutAlt className="w-4 h-4 mr-2" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsUserMenuOpen(false) || navigate('/login')}
            className="md:hidden p-2 text-purple-100 hover:text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]"
            aria-label="Toggle menu"
            style={{ display: !user ? 'block' : 'none' }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default UserNavbar; 
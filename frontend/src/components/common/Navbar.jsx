import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaSignOutAlt, FaCog, FaBars, FaTimes, FaTachometerAlt } from 'react-icons/fa';
import authService from '../../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const user = authService.getCurrentUser();

  // Public links (always visible)
  const publicLinks = [
    { path: '/agents', label: 'Agents' },
    { path: '/custom-agent', label: 'Custom Agent' },
    { path: '/support', label: 'Support' },
  ];

  // Customer links
  const customerLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/dashboard/settings', label: 'Settings', icon: FaCog },
    { label: 'Sign Out', action: () => handleSignOut(), icon: FaSignOutAlt },
  ];

  // Admin links
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Admin Dashboard', icon: FaTachometerAlt },
    { path: '/dashboard/settings', label: 'Settings', icon: FaCog },
    { label: 'Sign Out', action: () => handleSignOut(), icon: FaSignOutAlt },
  ];

  function handleSignOut() {
    authService.logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate('/login');
  }

  // Determine which links to show in the navbar
  let navLinks = publicLinks;
  let showUserMenu = false;
  let userMenuItems = [];

  if (user) {
    if (user.role === 'admin') {
      navLinks = publicLinks.concat([{ path: '/admin/dashboard', label: 'Admin Dashboard' }]);
      showUserMenu = true;
      userMenuItems = adminLinks;
    } else {
      navLinks = publicLinks.concat([{ path: '/dashboard', label: 'Dashboard' }]);
      showUserMenu = true;
      userMenuItems = customerLinks;
    }
  }

  return (
    <nav className="bg-[#181C2A]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 \
              bg-clip-text text-transparent">
              AI-CREW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-purple-100 hover:text-white transition-colors ${
                  location.pathname === link.path ? 'text-white font-medium' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {showUserMenu && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-purple-100 hover:text-white transition-colors"
                >
                  <span>{user.name}</span>
                  <FaUser className="w-4 h-4" />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-56 bg-white/5 backdrop-blur-xl border border-white/10 \
                        rounded-lg shadow-lg py-1 z-50"
                    >
                      {userMenuItems.map((item, index) => (
                        item.path ? (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-center px-4 py-2 text-purple-100 hover:bg-white/10 \
                              transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={item.action}
                            className="w-full flex items-center px-4 py-2 text-purple-100 hover:bg-white/10 \
                              transition-colors"
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </button>
                        )
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-purple-100 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                    font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] \
                    transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-purple-100 hover:text-white transition-colors"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#181C2A]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-3 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-purple-100 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {showUserMenu && user ? (
                userMenuItems.map((item, index) => (
                  item.path ? (
                    <Link
                      key={index}
                      to={item.path}
                      className="block text-purple-100 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left text-purple-100 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                ))
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-purple-100 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                      font-semibold text-center shadow-lg hover:shadow-xl hover:shadow-purple-500/25 \
                      hover:scale-[1.02] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 
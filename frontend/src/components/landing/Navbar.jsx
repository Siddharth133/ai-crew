import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Set background color on both html and body elements
    document.documentElement.style.backgroundColor = '#181C2A';
    document.body.style.backgroundColor = '#181C2A';
    
    // Prevent overscroll bounce effect
    document.body.style.overscrollBehavior = 'none';
    
    // Cleanup function
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
      document.body.style.overscrollBehavior = '';
    };
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#181C2A]/90 backdrop-blur-xl shadow-lg shadow-purple-500/5 border-b border-white/5'
          : 'bg-[#181C2A]/70 backdrop-blur-lg'
      }`}
    >
      {/* Navbar backdrop overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181C2A]/95 to-[#181C2A]/80 -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 
              bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              AI-CREW
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Links Container */}
            <div className="flex items-center space-x-1 px-3 py-2 rounded-full 
              bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg shadow-black/5">
              {[
                { path: '/features', label: 'Features' },
                { path: '/pricing', label: 'Pricing' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200
                    ${isActive(path)
                      ? 'text-white bg-white/10 shadow-sm'
                      : 'text-purple-100 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-[15px] font-medium text-purple-100 hover:text-white 
                  transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 
                  focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                  text-[15px] font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 
                  hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 
                  focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]
                  relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 
                  group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                <span className="relative">Sign up</span>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-purple-100 hover:text-white transition-colors
              rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
              focus:ring-offset-2 focus:ring-offset-[#181C2A]"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#181C2A]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="container mx-auto px-4 py-4 space-y-1">
              {[
                { path: '/features', label: 'Features' },
                { path: '/pricing', label: 'Pricing' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`block px-4 py-3 text-[15px] font-medium rounded-lg transition-all duration-200
                    ${isActive(path)
                      ? 'text-white bg-white/10'
                      : 'text-purple-100 hover:text-white hover:bg-white/5'
                    }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="pt-4 mt-4 space-y-3 border-t border-white/5">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-[15px] font-medium text-purple-100 
                    hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 
                    text-white rounded-lg text-center text-[15px] font-semibold shadow-lg 
                    hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all 
                    duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 
                    focus:ring-offset-2 focus:ring-offset-[#181C2A]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

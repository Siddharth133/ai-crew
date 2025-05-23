import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaDiscord,
  FaArrowRight
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#181C2A]">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                AI-Crew
              </span>
            </div>
            <p className="text-purple-200/80 text-sm leading-relaxed">
              Empowering businesses with intelligent AI agents. Transform your workflow with our cutting-edge automation solutions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: <FaTwitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
                { icon: <FaLinkedin className="w-5 h-5" />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com', label: 'GitHub' },
                { icon: <FaDiscord className="w-5 h-5" />, href: 'https://discord.com', label: 'Discord' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-white transition-colors duration-300
                    transform hover:scale-110 hover:rotate-3
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-full p-2
                    bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Features', href: '/features' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Documentation', href: '/docs' },
                { name: 'Support', href: '/support' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="text-purple-200 hover:text-white transition-colors duration-300
                      inline-flex items-center group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500
                        group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">
              Resources
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Case Studies', href: '/case-studies' },
                { name: 'API Reference', href: '/api' },
                { name: 'Community', href: '/community' },
                { name: 'Status', href: '/status' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.href}
                    className="text-purple-200 hover:text-white transition-colors duration-300
                      inline-flex items-center group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500
                        group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 tracking-wide">
              Stay Updated
            </h3>
            <p className="text-purple-200/80 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-purple-300/50
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                    transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500
                    text-white hover:from-purple-600 hover:to-pink-600
                    transition-all duration-300 transform hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  <FaArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-purple-300/60 text-xs">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-300/60 text-sm">
              © {currentYear} AI-Crew. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-purple-300/60 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Agents', href: '#agents' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Support', href: '#support' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaDiscord, href: 'https://discord.com', label: 'Discord' },
  ];

  return (
    <footer className="relative bg-[#0F172A] border-t-4 border-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI-Crew
            </h3>
            <p className="text-gray-400 text-sm">
              Empowering your workflow with intelligent AI agents. Automate tasks, boost productivity, and focus on what matters.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates, AI tips, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <p className="text-green-400 text-sm">Thanks for subscribing! 🎉</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AI-Crew. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
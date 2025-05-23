import React, { useEffect, useRef } from 'react';
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
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = footerRef.current?.querySelectorAll('.animate-on-scroll');
    sections?.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-[#181C2A] overflow-hidden">
      {/* Gradient divider with animation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent
        animate-gradient-shift" />
      
      {/* Background effects with subtle animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]
          animate-grid-shift" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="space-y-6 sm:space-y-8 animate-on-scroll opacity-0 translate-y-4">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-wide group">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent
                transition-all duration-500 group-hover:from-purple-500 group-hover:to-pink-600">
                AI-Crew
              </span>
            </div>
            <p className="text-purple-100 text-sm sm:text-base leading-relaxed
              transition-all duration-300 hover:text-white">
              Empowering businesses with intelligent AI agents. Transform your workflow with our cutting-edge automation solutions.
            </p>
            {/* Social Links with enhanced hover effects */}
            <div className="flex items-center gap-4 sm:gap-6">
              {[
                { icon: <FaTwitter className="w-6 h-6" />, href: 'https://twitter.com', label: 'Twitter' },
                { icon: <FaLinkedin className="w-6 h-6" />, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: <FaGithub className="w-6 h-6" />, href: 'https://github.com', label: 'GitHub' },
                { icon: <FaDiscord className="w-6 h-6" />, href: 'https://discord.com', label: 'Discord' }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-100 hover:text-white transition-all duration-300
                    transform hover:scale-110 hover:rotate-3 hover:shadow-lg hover:shadow-purple-500/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-full
                    p-3 sm:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm
                    min-w-[3rem] min-h-[3rem] flex items-center justify-center
                    group relative overflow-hidden"
                  aria-label={social.label}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0
                    group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links with hover animations */}
          <div className="mt-8 sm:mt-0 animate-on-scroll opacity-0 translate-y-4" style={{ animationDelay: '100ms' }}>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-6 tracking-wide
              transition-all duration-300 hover:text-purple-300">
              Quick Links
            </h3>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Features', href: '/features' },
                { name: 'Pricing', href: '/pricing' },
                { name: 'Documentation', href: '/docs' },
                { name: 'Support', href: '/support' }
              ].map((link, idx) => (
                <li key={idx} className="transform transition-all duration-300 hover:translate-x-1">
                  <Link
                    to={link.href}
                    className="text-purple-100 hover:text-white transition-all duration-300
                      inline-flex items-center group py-1"
                  >
                    <span className="relative text-base sm:text-lg">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500
                        group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources with hover animations */}
          <div className="mt-8 sm:mt-0 animate-on-scroll opacity-0 translate-y-4" style={{ animationDelay: '200ms' }}>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-6 tracking-wide
              transition-all duration-300 hover:text-purple-300">
              Resources
            </h3>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { name: 'Blog', href: '/blog' },
                { name: 'Case Studies', href: '/case-studies' },
                { name: 'API Reference', href: '/api' },
                { name: 'Community', href: '/community' },
                { name: 'Status', href: '/status' }
              ].map((link, idx) => (
                <li key={idx} className="transform transition-all duration-300 hover:translate-x-1">
                  <Link
                    to={link.href}
                    className="text-purple-100 hover:text-white transition-all duration-300
                      inline-flex items-center group py-1"
                  >
                    <span className="relative text-base sm:text-lg">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500
                        group-hover:w-full transition-all duration-500 ease-out" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter with enhanced interactions */}
          <div className="mt-8 sm:mt-0 animate-on-scroll opacity-0 translate-y-4" style={{ animationDelay: '300ms' }}>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-6 tracking-wide
              transition-all duration-300 hover:text-purple-300">
              Stay Updated
            </h3>
            <p className="text-purple-100 text-sm sm:text-base mb-6
              transition-all duration-300 hover:text-white">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-4 group">
              <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder-purple-200/70
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent
                    transition-all duration-300 text-base sm:text-lg
                    hover:bg-white/10 focus:bg-white/10"
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500
                    text-white hover:from-purple-600 hover:to-pink-600
                    transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    min-w-[3rem] min-h-[3rem] flex items-center justify-center
                    group relative overflow-hidden"
                  aria-label="Subscribe to newsletter"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0
                    group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500" />
                  <FaArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
              <p className="text-purple-200 text-sm transition-all duration-300 group-hover:text-white">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar with hover effects */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 animate-on-scroll opacity-0 translate-y-4"
          style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            <p className="text-purple-200 text-sm sm:text-base text-center sm:text-left
              transition-all duration-300 hover:text-white">
              © {currentYear} AI-Crew. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end items-center gap-6 sm:gap-8">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  to={link.href}
                  className="text-purple-200 hover:text-white text-sm sm:text-base transition-all duration-300
                    py-1 px-2 -mx-2 rounded-lg hover:bg-white/5 hover:shadow-lg hover:shadow-purple-500/10
                    transform hover:scale-105"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add required styles to your global CSS */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(1rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes grid-shift {
          0% { transform: translateY(0); }
          100% { transform: translateY(4rem); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .animate-grid-shift {
          animation: grid-shift 20s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer; 
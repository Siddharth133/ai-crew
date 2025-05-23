import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import WhatWeOffer from './WhatWeOffer';
import HowItBenefitsYou from './HowItBenefitsYou';
import FeaturedAgents from './FeaturedAgents';
import Testimonials from './Testimonials';
import Footer from '../common/Footer';
import ScrollAnimation from '../common/ScrollAnimation';
import { commonStyles, globalStyles } from '../../utils/animations';

// Add global styles
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

const LandingPage = () => {
  // Handle smooth scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#181C2A]">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] animate-grid-shift" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5" />
      </div>

      {/* Main content wrapper */}
      <div className="relative flex flex-col min-h-screen">
        {/* Navbar - ensure it's above the background */}
        <div className="relative z-50">
          <Navbar />
        </div>
        
        {/* Main content */}
        <main className="relative flex-grow z-10">
          {/* Hero Section */}
          <section className="relative">
            <HeroSection />
          </section>

          {/* Content sections with proper z-index */}
          <div className="relative z-20 bg-[#181C2A]">
            {/* What We Offer Section */}
            <ScrollAnimation
              className={commonStyles.container.section}
              stagger={true}
              delay={0.1}
            >
              <WhatWeOffer />
            </ScrollAnimation>

            {/* Featured Agents Section */}
            <ScrollAnimation
              className={commonStyles.container.section}
              stagger={true}
              delay={0.3}
            >
              <FeaturedAgents />
            </ScrollAnimation>

            {/* Testimonials Section */}
            <ScrollAnimation
              className={commonStyles.container.section}
              delay={0.4}
            >
              <Testimonials />
            </ScrollAnimation>
          </div>
        </main>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="relative z-20 mt-auto"
        >
          <Footer />
        </motion.div>
      </div>

      {/* Scroll to top button - ensure it's above everything */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500
          text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-[#181C2A]
          z-[100]"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default LandingPage;


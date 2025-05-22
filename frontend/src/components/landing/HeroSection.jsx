import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#181C2A] to-[#232946]">
      {/* Glowing radial background */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="w-[900px] h-[600px] bg-purple-600/40 rounded-full blur-3xl opacity-80 animate-pulse" style={{ filter: 'blur(120px)' }}></div>
      </div>
      {/* Subtle stars */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/30 rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Your AI-Powered
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Digital Workforce
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Deploy intelligent AI agents to automate tasks, enhance productivity, and transform your business operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/trip-planner"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 shadow-lg"
            >
              Try Now
            </Link>
            <button className="inline-flex items-center justify-center px-8 py-3 border border-purple-400 text-base font-medium rounded-full text-white hover:bg-purple-700/50 transition-colors duration-200 shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

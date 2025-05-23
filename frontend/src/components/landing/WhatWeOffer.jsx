import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRobot, 
  FaCode, 
  FaChartLine,
  FaBrain,
  FaMagic,
  FaRocket
} from 'react-icons/fa';

const offers = [
  {
    title: 'Ready-to-Use AI Agents',
    desc: 'Hire AI agents for writing, planning, analysis, and more. Instantly boost your productivity with specialized digital workers.',
    icon: <FaRobot className="w-8 h-8" />,
    gradient: 'from-blue-500 to-cyan-400',
    delay: 'delay-0'
  },
  {
    title: 'Custom AI Agents',
    desc: 'Request custom-built AI agents tailored to your unique business needs and workflows. Your imagination is the limit.',
    icon: <FaCode className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-500',
    delay: 'delay-100'
  },
  {
    title: 'Create, Host & Monetize',
    desc: 'Build, deploy, and earn from your own AI agents on our platform. Join the next wave of digital entrepreneurship.',
    icon: <FaRocket className="w-8 h-8" />,
    gradient: 'from-orange-500 to-pink-500',
    delay: 'delay-200'
  },
  {
    title: 'Advanced Analytics',
    desc: 'Get deep insights into your AI agents&apos; performance with comprehensive analytics and reporting tools.',
    icon: <FaChartLine className="w-8 h-8" />,
    gradient: 'from-green-500 to-emerald-400',
    delay: 'delay-300'
  },
  {
    title: 'Smart Automation',
    desc: 'Automate complex workflows with intelligent AI agents that learn and adapt to your business processes.',
    icon: <FaBrain className="w-8 h-8" />,
    gradient: 'from-indigo-500 to-purple-500',
    delay: 'delay-400'
  },
  {
    title: 'AI Magic Tools',
    desc: 'Access a suite of powerful AI tools for content creation, data analysis, and decision support.',
    icon: <FaMagic className="w-8 h-8" />,
    gradient: 'from-pink-500 to-rose-500',
    delay: 'delay-500'
  }
];

const WhatWeOffer = () => (
  <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#181C2A]/90 to-[#232946]/90">
    {/* Enhanced glow effects */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
      <div className="w-[800px] h-[400px] bg-purple-500/20 rounded-full blur-3xl opacity-60" style={{ filter: 'blur(80px)' }}></div>
      <div className="w-[600px] h-[300px] bg-blue-500/20 rounded-full blur-3xl opacity-40 absolute -top-20 -right-20" style={{ filter: 'blur(80px)' }}></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Agents</span> for Every Task
      </h2>
      <p className="text-purple-200 text-lg mb-16 max-w-2xl mx-auto">
        Discover our suite of intelligent AI agents designed to transform your workflow and boost productivity
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className={`group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 
              hover:bg-white/10 transition-all duration-500 ${offer.delay}
              hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10
              before:absolute before:inset-0 before:rounded-3xl before:p-[1px] 
              before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
              before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500`}
          >
            <div className="relative">
              {/* Icon with gradient background */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 
                bg-gradient-to-br ${offer.gradient} 
                group-hover:scale-110 transition-transform duration-500
                shadow-lg group-hover:shadow-xl`}
              >
                <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                  {offer.icon}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 text-left group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-500">
                {offer.title}
              </h3>
              <p className="text-purple-200 text-left leading-relaxed">
                {offer.desc}
              </p>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 
                group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/agents"
        className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 
          text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/25 
          hover:from-purple-600 hover:to-pink-600 transition-all duration-300
          transform hover:scale-105"
      >
        Explore All Agents
        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  </section>
);

export default WhatWeOffer; 
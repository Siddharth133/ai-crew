import React from 'react';
import { Link } from 'react-router-dom';

const offers = [
  {
    title: 'Ready-to-Use AI Agents',
    desc: 'Hire AI agents for writing, planning, analysis, and more. Instantly boost your productivity with specialized digital workers.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#a)"/><path d="M12 18h12M18 12v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    )
  },
  {
    title: 'Custom AI Agents',
    desc: 'Request custom-built AI agents tailored to your unique business needs and workflows. Your imagination is the limit.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="6" y="6" width="24" height="24" rx="8" fill="url(#b)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="b" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs></svg>
    )
  },
  {
    title: 'Create, Host & Monetize',
    desc: 'Build, deploy, and earn from your own AI agents on our platform. Join the next wave of digital entrepreneurship.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#c)"/><path d="M12 24l6-12 6 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    )
  }
];

const WhatWeOffer = () => (
  <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#181C2A]/90 to-[#232946]/90">
    {/* Glow effect */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
      <div className="w-[700px] h-[300px] bg-purple-500/20 rounded-full blur-3xl opacity-60" style={{ filter: 'blur(80px)' }}></div>
    </div>
    <div className="relative z-10 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
        Powerful <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Agents</span> for Every Task
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {offers.map((offer, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 4px 32px 0 rgba(124,58,237,0.10)' }}
          >
            <div className="mb-4">{offer.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              {offer.title}
            </h3>
            <p className="text-purple-100 text-base text-center">
              {offer.desc}
            </p>
          </div>
        ))}
      </div>
      <Link
        to="/agents"
        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
      >
        See All Agents
      </Link>
    </div>
  </section>
);

export default WhatWeOffer; 
import React from 'react';
import { Link } from 'react-router-dom';

const agents = [
  {
    name: 'Plagiarism Rewriter Agent',
    desc: 'Instantly rewrite any text to avoid plagiarism and improve originality. Perfect for students and professionals.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="6" y="6" width="24" height="24" rx="8" fill="url(#a)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="a" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#f472b6"/></linearGradient></defs></svg>
    ),
    link: '/agents/plagiarism-rewriter'
  },
  {
    name: 'Trip Planner Generator',
    desc: 'Plan your next adventure with AI-generated itineraries tailored to your interests, budget, and style.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#b)"/><path d="M12 24l6-12 6 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="b" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#f472b6"/></radialGradient></defs></svg>
    ),
    link: '/trip-planner'
  },
  {
    name: 'Resume Analyzer',
    desc: 'Get instant feedback and optimization tips for your resume. Stand out to recruiters with AI-powered analysis.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#c)"/><path d="M12 18h12M18 12v12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    ),
    link: '/agents/resume-analyzer'
  },
  {
    name: 'Market Research Bot',
    desc: 'Analyze trends, competitors, and opportunities in any industry with a single click.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="6" y="6" width="24" height="24" rx="8" fill="url(#d)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="d" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs></svg>
    ),
    link: '/agents/market-research'
  },
  {
    name: 'Content Summarizer',
    desc: 'Summarize articles, reports, or any long content into concise, easy-to-read summaries.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#e)"/><path d="M12 24l6-12 6 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="e" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    ),
    link: '/agents/content-summarizer'
  },
  {
    name: 'Email Reply Assistant',
    desc: 'Draft professional, context-aware email replies in seconds. Never miss a follow-up again.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="6" y="6" width="24" height="24" rx="8" fill="url(#f)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="f" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#f472b6"/></linearGradient></defs></svg>
    ),
    link: '/agents/email-reply-assistant'
  }
];

const FeaturedAgents = () => (
  <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#181C2A]/90 to-[#232946]/90">
    {/* Glow effect */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
      <div className="w-[700px] h-[300px] bg-purple-500/20 rounded-full blur-3xl opacity-60" style={{ filter: 'blur(80px)' }}></div>
    </div>
    <div className="relative z-10 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Featured Agents</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {agents.map((agent, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-purple-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 4px 32px 0 rgba(124,58,237,0.10)' }}
          >
            <div className="mb-4">{agent.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              {agent.name}
            </h3>
            <p className="text-purple-100 text-base text-center mb-6">
              {agent.desc}
            </p>
            <Link
              to={agent.link}
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-purple-600 hover:to-pink-600 transition"
            >
              Hire Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedAgents; 
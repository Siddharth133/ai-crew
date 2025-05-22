import React from 'react';

const benefits = [
  {
    title: 'Simplify Daily Tasks',
    desc: 'Automate repetitive work and focus on what matters most. Let AI handle the busywork for you.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#a)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    )
  },
  {
    title: 'Save Time with AI Pipelines',
    desc: 'Leverage pre-built AI workflows to get results faster. No setup, no hassle—just productivity.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><rect x="6" y="6" width="24" height="24" rx="8" fill="url(#b)"/><path d="M12 18h12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><linearGradient id="b" x1="6" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#a78bfa"/></linearGradient></defs></svg>
    )
  },
  {
    title: 'Flexible Plans',
    desc: 'Choose a plan that fits your needs and budget. Scale up or down anytime—no long-term contracts.',
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="url(#c)"/><path d="M12 24l6-12 6 12" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/><defs><radialGradient id="c" cx="0" cy="0" r="1" gradientTransform="matrix(0 16 -16 0 18 18)" gradientUnits="userSpaceOnUse"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#7c3aed"/></radialGradient></defs></svg>
    )
  }
];

const HowItBenefitsYou = () => (
  <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#232946]/90 to-[#181C2A]/90">
    {/* Glow effect */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
      <div className="w-[700px] h-[300px] bg-pink-500/20 rounded-full blur-3xl opacity-60" style={{ filter: 'blur(80px)' }}></div>
    </div>
    <div className="relative z-10 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
        How <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">It Benefits You</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-pink-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ boxShadow: '0 4px 32px 0 rgba(244,114,182,0.10)' }}
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2 text-center">
              {benefit.title}
            </h3>
            <p className="text-purple-100 text-base text-center">
              {benefit.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItBenefitsYou; 
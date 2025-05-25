import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const LandingPage = () => {
  const features = [
    {
      icon: FaRobot,
      title: 'AI-Powered Agents',
      description: 'Access a diverse team of specialized AI agents ready to handle your tasks with precision and efficiency.'
    },
    {
      icon: FaChartLine,
      title: 'Performance Analytics',
      description: 'Track and optimize your AI agents\' performance with detailed analytics and insights.'
    },
    {
      icon: FaUsers,
      title: 'Custom Solutions',
      description: 'Request custom AI agents tailored to your specific business needs and requirements.'
    },
    {
      icon: FaShieldAlt,
      title: 'Enterprise Security',
      description: 'Enterprise-grade security and compliance for all your AI operations and data.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your AI Workforce,
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 
                bg-clip-text text-transparent"> Ready to Work</span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Hire, manage, and scale your AI agents with ease. From customer service to data analysis,
              our platform provides the AI workforce you need to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/agents"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                  font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                  transition-all duration-300"
              >
                Browse Agents
              </Link>
              <Link
                to="/custom-agent"
                className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-lg
                  font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Request Custom Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#181C2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose AI-CREW?
            </h2>
            <p className="text-xl text-purple-100">
              The most comprehensive platform for managing your AI workforce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6
                  hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#181C2A] to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Scale Your Business with AI?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already leveraging AI-CREW to automate and optimize their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                  font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                  transition-all duration-300"
              >
                Get Started Free
              </Link>
              <Link
                to="/support"
                className="px-8 py-3 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-lg
                  font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 
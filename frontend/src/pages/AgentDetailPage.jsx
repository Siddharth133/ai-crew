import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRobot, FaChartLine, FaUsers, FaShieldAlt, FaStar, FaCheck, FaTimes } from 'react-icons/fa';

// Temporary mock data - replace with API call
const mockAgent = {
  id: 1,
  name: 'Customer Support Agent',
  description: 'Handles customer inquiries, support tickets, and provides 24/7 assistance.',
  longDescription: `Our Customer Support Agent is a specialized AI designed to handle customer inquiries 
    and support tickets with human-like understanding and efficiency. It can process multiple requests 
    simultaneously, maintain context across conversations, and escalate complex issues when necessary.`,
  category: 'Customer Service',
  rating: 4.8,
  tasksCompleted: 1250,
  price: 99,
  icon: FaUsers,
  tags: ['support', 'customer-service', '24/7'],
  features: [
    '24/7 customer support availability',
    'Multi-language support',
    'Ticket management and tracking',
    'Automated response generation',
    'Sentiment analysis',
    'Issue escalation handling',
    'Knowledge base integration',
    'Custom response templates'
  ],
  capabilities: [
    'Handle up to 1000 concurrent conversations',
    'Process and respond to inquiries in under 30 seconds',
    'Maintain conversation context across sessions',
    'Identify and escalate urgent issues',
    'Generate detailed support reports',
    'Integrate with popular CRM systems',
    'Learn from past interactions to improve responses',
    'Customize responses based on customer history'
  ],
  testimonials: [
    {
      name: 'Sarah Johnson',
      company: 'TechCorp Inc.',
      rating: 5,
      comment: 'This agent has transformed our customer support operations. Response times are down 60% and customer satisfaction is up!'
    },
    {
      name: 'Michael Chen',
      company: 'StartupX',
      rating: 4,
      comment: 'Great addition to our support team. Handles routine inquiries efficiently, allowing our human agents to focus on complex issues.'
    }
  ]
};

const AgentDetailPage = () => {
  const { agentId } = useParams();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isHiring, setIsHiring] = useState(false);

  // TODO: Replace with actual API call
  const agent = mockAgent;

  const handleHire = () => {
    setIsHiring(true);
    // TODO: Implement hiring logic
    setTimeout(() => setIsHiring(false), 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/agents"
            className="inline-flex items-center text-purple-300 hover:text-white transition-colors mb-6"
          >
            ← Back to Agents
          </Link>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <agent.icon className="w-16 h-16 text-purple-400" />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-yellow-400">
                      <FaStar className="mr-1" />
                      {agent.rating}
                    </div>
                    <span className="text-purple-200">
                      {agent.tasksCompleted.toLocaleString()} tasks completed
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xl text-purple-100 mb-6">{agent.longDescription}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/5 text-purple-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-80">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="text-3xl font-bold text-white mb-2">
                  ${agent.price}<span className="text-lg text-purple-200">/mo</span>
                </div>
                <button
                  onClick={handleHire}
                  disabled={isHiring}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                    font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                    transition-all duration-300 ${isHiring ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isHiring ? 'Processing...' : 'Hire Agent'}
                </button>
                <div className="mt-4 text-sm text-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-green-400" />
                    <span>Free trial for 14 days</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheck className="text-green-400" />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheck className="text-green-400" />
                    <span>24/7 support included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex space-x-8">
            {['overview', 'capabilities', 'testimonials'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 px-1 text-lg font-medium transition-colors ${
                  selectedTab === tab
                    ? 'text-white border-b-2 border-purple-500'
                    : 'text-purple-200 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="prose prose-invert max-w-none">
          {selectedTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {agent.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-purple-100">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Use Cases</h2>
                <div className="space-y-4">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Customer Support</h3>
                    <p className="text-purple-100">
                      Handle customer inquiries, support tickets, and provide 24/7 assistance
                      across multiple channels.
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Ticket Management</h3>
                    <p className="text-purple-100">
                      Automatically categorize, prioritize, and route support tickets
                      to the appropriate team members.
                    </p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Knowledge Base</h3>
                    <p className="text-purple-100">
                      Provide instant access to product documentation and frequently
                      asked questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'capabilities' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Technical Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {agent.capabilities.map((capability, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <FaCheck className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                        <span className="text-purple-100">{capability}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">Integration Options</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Zendesk', 'Intercom', 'Slack', 'Microsoft Teams', 'Discord', 'Custom API'].map((integration) => (
                    <div
                      key={integration}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 text-center"
                    >
                      <span className="text-purple-100">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'testimonials' && (
            <div className="space-y-6">
              {agent.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-purple-300">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-purple-200">{testimonial.company}</div>
                    </div>
                    <div className="ml-auto flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-purple-100">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage; 
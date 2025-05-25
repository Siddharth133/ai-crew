import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaRobot, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

// Temporary mock data - replace with API call
const mockAgents = [
  {
    id: 1,
    name: 'Customer Support Agent',
    description: 'Handles customer inquiries, support tickets, and provides 24/7 assistance.',
    category: 'Customer Service',
    rating: 4.8,
    tasksCompleted: 1250,
    price: 99,
    icon: FaUsers,
    tags: ['support', 'customer-service', '24/7']
  },
  {
    id: 2,
    name: 'Data Analysis Agent',
    description: 'Processes and analyzes large datasets to provide actionable insights.',
    category: 'Analytics',
    rating: 4.9,
    tasksCompleted: 850,
    price: 149,
    icon: FaChartLine,
    tags: ['analytics', 'data', 'insights']
  },
  {
    id: 3,
    name: 'Security Monitor',
    description: 'Monitors system security, detects threats, and implements preventive measures.',
    category: 'Security',
    rating: 4.7,
    tasksCompleted: 2100,
    price: 199,
    icon: FaShieldAlt,
    tags: ['security', 'monitoring', 'threat-detection']
  },
  {
    id: 4,
    name: 'Process Automation Agent',
    description: 'Automates repetitive tasks and workflows to improve efficiency.',
    category: 'Automation',
    rating: 4.6,
    tasksCompleted: 1500,
    price: 129,
    icon: FaRobot,
    tags: ['automation', 'workflow', 'efficiency']
  }
];

const categories = [
  'All',
  'Customer Service',
  'Analytics',
  'Security',
  'Automation',
  'Marketing',
  'Development'
];

const AgentCard = ({ agent }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6
      hover:bg-white/10 transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <agent.icon className="w-12 h-12 text-purple-400" />
      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
        ${agent.price}/mo
      </span>
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
    <p className="text-purple-100 mb-4">{agent.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {agent.tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 bg-white/5 text-purple-300 rounded-full text-xs"
        >
          {tag}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between text-sm text-purple-200 mb-4">
      <div className="flex items-center">
        <span className="text-yellow-400 mr-1">★</span>
        {agent.rating}
      </div>
      <div>{agent.tasksCompleted.toLocaleString()} tasks completed</div>
    </div>
    <Link
      to={`/agents/${agent.id}`}
      className="block w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
        font-semibold text-center shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
        transition-all duration-300"
    >
      View Details
    </Link>
  </motion.div>
);

const AgentCatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || agent.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Agent Catalog
          </h1>
          <p className="text-xl text-purple-100">
            Browse our collection of specialized AI agents ready to work for you
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl 
                border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Category Filter */}
          <div className={`mt-4 ${isFilterOpen ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-purple-100 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
            <p className="text-purple-100">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentCatalogPage; 
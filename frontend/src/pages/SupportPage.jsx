import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaQuestionCircle, FaTicketAlt, FaEnvelope, FaPhone, FaRobot, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const faqCategories = [
  {
    id: 'general',
    title: 'General',
    icon: FaQuestionCircle,
    questions: [
      {
        question: 'What is AI-CREW?',
        answer: 'AI-CREW is a platform that provides AI agents for various business needs. Our agents can handle tasks ranging from customer support to data analysis, helping businesses automate and optimize their operations.'
      },
      {
        question: 'How do I get started?',
        answer: 'Getting started is easy! Simply sign up for an account, browse our catalog of AI agents, and select the ones that best fit your needs. You can also request a custom agent if you have specific requirements.'
      },
      {
        question: 'What kind of support do you offer?',
        answer: 'We offer 24/7 support through multiple channels including email, phone, and our support portal. Our team is always ready to help with any questions or issues you may have.'
      }
    ]
  },
  {
    id: 'agents',
    title: 'AI Agents',
    icon: FaRobot,
    questions: [
      {
        question: 'How do AI agents work?',
        answer: 'Our AI agents are powered by advanced machine learning models that can understand and process natural language, analyze data, and perform specific tasks based on their training and capabilities.'
      },
      {
        question: 'Can I customize an agent?',
        answer: 'Yes! We offer both pre-built agents and custom agent development. You can request a custom agent through our platform, specifying your exact requirements and use cases.'
      },
      {
        question: 'How do I integrate agents with my systems?',
        answer: 'Our agents can be integrated through various methods including REST APIs, webhooks, and direct database connections. We provide detailed documentation and support for all integration options.'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Pricing',
    icon: FaChartLine,
    questions: [
      {
        question: 'What are your pricing plans?',
        answer: 'We offer flexible pricing plans based on the number of agents, usage volume, and specific features required. Contact our sales team for detailed pricing information.'
      },
      {
        question: 'Do you offer a free trial?',
        answer: 'Yes, we offer a 14-day free trial for all our agents. This allows you to test the agents in your environment before making a commitment.'
      },
      {
        question: 'How does billing work?',
        answer: 'We offer both monthly and annual billing options. You can choose the plan that best suits your needs and can upgrade or downgrade at any time.'
      }
    ]
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    icon: FaShieldAlt,
    questions: [
      {
        question: 'How secure is your platform?',
        answer: 'Security is our top priority. We implement industry-standard encryption, regular security audits, and strict access controls to ensure your data is always protected.'
      },
      {
        question: 'Do you comply with data protection regulations?',
        answer: 'Yes, we comply with major data protection regulations including GDPR, CCPA, and HIPAA. We regularly update our compliance measures to meet evolving standards.'
      },
      {
        question: 'How is my data handled?',
        answer: 'Your data is encrypted both in transit and at rest. We never share your data with third parties and maintain strict data handling protocols.'
      }
    ]
  }
];

const SupportPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  const handleQuestionToggle = (questionId) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement ticket submission
    console.log('Ticket submitted:', ticketForm);
  };

  const filteredFAQs = faqCategories
    .find(category => category.id === selectedCategory)
    ?.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Support Center
          </h1>
          <p className="text-xl text-purple-100">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search and Categories */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/5 text-purple-100 hover:bg-white/10'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => handleQuestionToggle(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <span className={`transform transition-transform ${
                    expandedQuestions.has(index) ? 'rotate-180' : ''
                  }`}>
                    ▼
                  </span>
                </button>
                {expandedQuestions.has(index) && (
                  <div className="px-6 py-4 border-t border-white/10">
                    <p className="text-purple-100">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 text-center">
            <FaEnvelope className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
            <p className="text-purple-100 mb-4">Get in touch with our support team</p>
            <a
              href="mailto:support@ai-crew.com"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              support@ai-crew.com
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 text-center">
            <FaPhone className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Phone Support</h3>
            <p className="text-purple-100 mb-4">Available 24/7 for urgent issues</p>
            <a
              href="tel:+1-800-AI-CREW"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              +1 (800) AI-CREW
            </a>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 text-center">
            <FaTicketAlt className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Support Portal</h3>
            <p className="text-purple-100 mb-4">Submit and track support tickets</p>
            <button
              onClick={() => document.getElementById('ticket-form').scrollIntoView({ behavior: 'smooth' })}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Submit a Ticket
            </button>
          </div>
        </div>

        {/* Support Ticket Form */}
        <div id="ticket-form" className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Submit a Support Ticket</h2>
          <form onSubmit={handleTicketSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Subject</label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Description</label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue..."
                rows={6}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                  text-white placeholder-purple-300 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Priority</label>
                <select
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                    text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select
                  value={ticketForm.category}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg
                    text-white focus:outline-none focus:border-purple-500"
                >
                  {faqCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-[1.02] 
                transition-all duration-300"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaRobot, 
  FaPenFancy, 
  FaChartBar,
  FaBrain,
  FaStar,
  FaQuoteLeft
} from 'react-icons/fa';

const featuredAgents = [
  {
    name: 'Content Creator Pro',
    role: 'AI Writing Assistant',
    description: 'Generate high-quality blog posts, social media content, and marketing copy with advanced AI.',
    icon: <FaPenFancy className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-teal-400',
    buttonGradient: 'from-emerald-500 to-teal-500',
    rating: 4.9,
    testimonial: "This AI writer has transformed our content strategy. It's like having a professional copywriter on demand!",
    author: "Sarah M., Marketing Director"
  },
  {
    name: 'Data Analyst AI',
    role: 'Business Intelligence',
    description: 'Transform complex data into actionable insights with automated analysis and visualization.',
    icon: <FaChartBar className="w-6 h-6" />,
    gradient: 'from-blue-500 to-indigo-500',
    buttonGradient: 'from-blue-500 to-indigo-600',
    rating: 4.8,
    testimonial: "Saves us hours of analysis time. The insights are spot-on and the visualizations are beautiful.",
    author: "Michael T., Data Scientist"
  },
  {
    name: 'Research Assistant',
    role: 'Knowledge Discovery',
    description: 'Accelerate your research with AI-powered literature review, summarization, and insight extraction.',
    icon: <FaBrain className="w-6 h-6" />,
    gradient: 'from-purple-500 to-pink-500',
    buttonGradient: 'from-purple-500 to-pink-600',
    rating: 4.9,
    testimonial: "An invaluable tool for my research. It finds relevant papers and summarizes them perfectly.",
    author: "Dr. James K., Research Lead"
  },
  {
    name: 'Task Automator',
    role: 'Workflow Automation',
    description: 'Automate repetitive tasks and streamline your workflow with intelligent process automation.',
    icon: <FaRobot className="w-6 h-6" />,
    gradient: 'from-orange-500 to-rose-500',
    buttonGradient: 'from-orange-500 to-rose-600',
    rating: 4.7,
    testimonial: "Cut our manual processing time by 70%. The automation is incredibly reliable.",
    author: "Lisa R., Operations Manager"
  }
];

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i <= rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    );
  }
  return <div className="flex gap-0.5">{stars}</div>;
};

const FeaturedAgents = () => (
  <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#232946]/90 to-[#181C2A]/90">
    {/* Background effects */}
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
      <div className="w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-3xl opacity-40" style={{ filter: 'blur(80px)' }}></div>
      <div className="w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-3xl opacity-30 absolute -bottom-20 -left-20" style={{ filter: 'blur(80px)' }}></div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">AI Agents</span>
        </h2>
        <p className="text-purple-200 text-lg max-w-2xl mx-auto">
          Meet our most popular AI agents, trusted by thousands of professionals worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredAgents.map((agent, idx) => (
          <div
            key={idx}
            className="group relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 
              hover:bg-white/10 transition-all duration-500 overflow-hidden"
          >
            {/* Agent Card Header */}
            <div className="p-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 
                bg-gradient-to-br ${agent.gradient} shadow-lg`}
              >
                <div className="text-white transform group-hover:scale-110 transition-transform duration-500">
                  {agent.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-1">{agent.name}</h3>
              <p className="text-purple-300 text-sm mb-3">{agent.role}</p>
              <p className="text-purple-200 text-sm mb-4">{agent.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={agent.rating} />
                <span className="text-purple-300 text-sm">{agent.rating}</span>
              </div>

              {/* Testimonial */}
              <div className="relative bg-white/5 rounded-xl p-4 mb-6">
                <FaQuoteLeft className="absolute -top-2 -left-2 w-4 h-4 text-purple-400/50" />
                <p className="text-purple-200 text-sm italic mb-2">"{agent.testimonial}"</p>
                <p className="text-purple-300 text-xs">— {agent.author}</p>
              </div>

              {/* Hire Button */}
              <Link
                to={`/agents/${agent.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`block w-full py-2.5 px-4 rounded-xl text-center text-white font-medium
                  bg-gradient-to-r ${agent.buttonGradient} shadow-lg
                  hover:shadow-xl hover:scale-[1.02] transition-all duration-300
                  transform hover:translate-y-[-2px]`}
              >
                Hire Now
              </Link>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-pink-500/0 
              group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/agents"
          className="inline-flex items-center px-6 py-2.5 rounded-full 
            bg-white/10 text-white font-medium text-sm
            hover:bg-white/20 transition-all duration-300
            border border-white/10 hover:border-white/20"
        >
          View All Agents
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default FeaturedAgents; 
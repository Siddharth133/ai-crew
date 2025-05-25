import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadialBarChart, RadialBar
} from 'recharts';
import {
  FaRobot, FaHistory, FaCreditCard, FaChartLine, FaTicketAlt,
  FaUsers, FaStar, FaPlus, FaBell, FaCog
} from 'react-icons/fa';
import authService from '../services/authService';

// Mock data - replace with API calls
const mockData = {
  creditBalance: {
    used: 750,
    total: 1000,
    dailyRefill: 100
  },
  usageStats: [
    { date: '2024-03-01', credits: 120 },
    { date: '2024-03-02', credits: 150 },
    { date: '2024-03-03', credits: 180 },
    { date: '2024-03-04', credits: 140 },
    { date: '2024-03-05', credits: 160 },
    { date: '2024-03-06', credits: 200 },
    { date: '2024-03-07', credits: 170 }
  ],
  activeAgents: [
    {
      id: 1,
      name: 'Customer Support Bot',
      status: 'active',
      tasksCompleted: 45,
      rating: 4.8,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Data Analysis Agent',
      status: 'idle',
      tasksCompleted: 23,
      rating: 4.9,
      lastActive: '1 day ago'
    }
  ],
  recentTasks: [
    {
      id: 1,
      agent: 'Customer Support Bot',
      task: 'Process customer inquiries',
      status: 'completed',
      date: '2024-03-07 14:30',
      credits: 20
    },
    {
      id: 2,
      agent: 'Data Analysis Agent',
      task: 'Generate monthly report',
      status: 'in_progress',
      date: '2024-03-07 15:45',
      credits: 35
    }
  ],
  recommendedAgents: [
    {
      id: 1,
      name: 'Marketing Assistant',
      description: 'Helps with social media and content creation',
      rating: 4.7,
      tasksCompleted: 156
    },
    {
      id: 2,
      name: 'Code Review Bot',
      description: 'Automated code review and suggestions',
      rating: 4.9,
      tasksCompleted: 89
    }
  ],
  supportTickets: [
    {
      id: 1,
      subject: 'Agent not responding',
      status: 'open',
      date: '2024-03-06',
      priority: 'high'
    },
    {
      id: 2,
      subject: 'Credit balance query',
      status: 'resolved',
      date: '2024-03-05',
      priority: 'medium'
    }
  ],
  referralStats: {
    totalReferrals: 8,
    activeReferrals: 5,
    earnedCredits: 400,
    pendingCredits: 100
  }
};

const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check authentication
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Get current user data
    const user = authService.getCurrentUser();
    if (user) {
      setUserData(user);
    }

    // TODO: Fetch real dashboard data from API
    // For now, we'll use mock data
  }, [navigate]);

  const creditData = [
    { name: 'Used', value: mockData.creditBalance.used },
    { name: 'Available', value: mockData.creditBalance.total - mockData.creditBalance.used }
  ];

  const referralData = [
    { name: 'Earned', value: mockData.referralStats.earnedCredits, fill: '#8B5CF6' },
    { name: 'Pending', value: mockData.referralStats.pendingCredits, fill: '#EC4899' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-purple-200">
              Welcome back, {userData?.name || 'User'}! Here's your activity overview
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => authService.logout()}
              className="px-4 py-2 text-purple-200 hover:text-white transition-colors"
            >
              Sign Out
            </button>
            <button className="p-2 text-purple-200 hover:text-white transition-colors">
              <FaBell className="w-6 h-6" />
            </button>
            <button className="p-2 text-purple-200 hover:text-white transition-colors">
              <FaCog className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credit Balance & Usage Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Credit Balance</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={creditData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {creditData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-4">
                  <p className="text-2xl font-bold text-white">
                    {mockData.creditBalance.used} / {mockData.creditBalance.total}
                  </p>
                  <p className="text-purple-200">Credits used</p>
                  <p className="text-sm text-purple-300 mt-2">
                    +{mockData.creditBalance.dailyRefill} credits daily
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Usage Stats</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.usageStats}>
                      <defs>
                        <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="date" stroke="#ffffff40" />
                      <YAxis stroke="#ffffff40" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181C2A',
                          border: '1px solid #ffffff10',
                          borderRadius: '8px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="credits"
                        stroke="#8B5CF6"
                        fillOpacity={1}
                        fill="url(#colorCredits)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Active Agents */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">My Agents</h3>
                <button
                  onClick={() => setShowNewTaskModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500
                    text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                    hover:scale-[1.02] transition-all duration-300"
                >
                  <FaPlus />
                  New Task
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockData.activeAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10
                      transition-colors cursor-pointer"
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-medium">{agent.name}</h4>
                        <p className="text-purple-200 text-sm mt-1">
                          {agent.tasksCompleted} tasks completed
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        agent.status === 'active'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-white">{agent.rating}</span>
                      </div>
                      <span className="text-purple-200 text-sm">
                        Last active: {agent.lastActive}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Tasks</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-purple-200 font-medium">Agent</th>
                      <th className="px-4 py-3 text-left text-purple-200 font-medium">Task</th>
                      <th className="px-4 py-3 text-left text-purple-200 font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-purple-200 font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-purple-200 font-medium">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.recentTasks.map((task) => (
                      <tr key={task.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-4 py-3 text-white">{task.agent}</td>
                        <td className="px-4 py-3 text-purple-100">{task.task}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            task.status === 'completed'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-purple-100">{task.date}</td>
                        <td className="px-4 py-3 text-white">{task.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Referral Progress */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Referral Progress</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="30%"
                    outerRadius="100%"
                    data={referralData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise={true}
                      dataKey="value"
                    />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {mockData.referralStats.totalReferrals}
                  </p>
                  <p className="text-purple-200">Total Referrals</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {mockData.referralStats.earnedCredits}
                  </p>
                  <p className="text-purple-200">Credits Earned</p>
                </div>
              </div>
            </div>

            {/* Recommended Agents */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recommended Agents</h3>
              <div className="space-y-4">
                {mockData.recommendedAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10
                      transition-colors cursor-pointer"
                  >
                    <h4 className="text-white font-medium">{agent.name}</h4>
                    <p className="text-purple-200 text-sm mt-1">{agent.description}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="text-white">{agent.rating}</span>
                      </div>
                      <span className="text-purple-200 text-sm">
                        {agent.tasksCompleted} tasks
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Requests */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Support Requests</h3>
              <div className="space-y-4">
                {mockData.supportTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-medium">{ticket.subject}</h4>
                        <p className="text-purple-200 text-sm mt-1">{ticket.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        ticket.status === 'open'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        ticket.priority === 'high'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {ticket.priority} priority
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181C2A] rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Task</h3>
            {/* Add task creation form here */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-purple-200 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500
                text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                hover:scale-[1.02] transition-all duration-300"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 
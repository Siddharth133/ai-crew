import React, { useState } from 'react';
import AdminNavbar from '../components/landing/AdminNavbar';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import {
  FaUsers, FaRobot, FaChartLine, FaTicketAlt, FaShieldAlt,
  FaExclamationTriangle, FaCheckCircle, FaStar, FaCog, FaBell
} from 'react-icons/fa';

// Mock data - replace with API calls
const mockData = {
  userStats: {
    totalUsers: 1250,
    activeUsers: 850,
    newUsers: 45,
    churnRate: 2.3
  },
  agentStats: {
    totalAgents: 25,
    activeAgents: 20,
    totalTasks: 12500,
    successRate: 98.5
  },
  revenueData: [
    { month: 'Jan', revenue: 25000, subscriptions: 120 },
    { month: 'Feb', revenue: 28000, subscriptions: 135 },
    { month: 'Mar', revenue: 32000, subscriptions: 150 },
    { month: 'Apr', revenue: 35000, subscriptions: 165 },
    { month: 'May', revenue: 38000, subscriptions: 180 },
    { month: 'Jun', revenue: 42000, subscriptions: 200 }
  ],
  agentUsage: [
    { name: 'Customer Support', usage: 35, rating: 4.8 },
    { name: 'Data Analysis', usage: 25, rating: 4.9 },
    { name: 'Content Creation', usage: 20, rating: 4.7 },
    { name: 'Code Review', usage: 15, rating: 4.6 },
    { name: 'Security Monitor', usage: 5, rating: 4.9 }
  ],
  creditFlow: [
    { date: '2024-03-01', consumed: 1200, refreshed: 1000 },
    { date: '2024-03-02', consumed: 1500, refreshed: 1000 },
    { date: '2024-03-03', consumed: 1800, refreshed: 1000 },
    { date: '2024-03-04', consumed: 1400, refreshed: 1000 },
    { date: '2024-03-05', consumed: 1600, refreshed: 1000 },
    { date: '2024-03-06', consumed: 2000, refreshed: 1000 },
    { date: '2024-03-07', consumed: 1700, refreshed: 1000 }
  ],
  supportTickets: {
    open: 12,
    resolved: 45,
    averageResponseTime: '2.5 hours',
    satisfaction: 4.7
  },
  systemHealth: {
    status: 'healthy',
    uptime: 99.99,
    activeErrors: 0,
    performance: 98,
    lastIncident: '2024-02-15'
  },
  recentFeedback: [
    {
      id: 1,
      user: 'John Doe',
      agent: 'Customer Support Bot',
      rating: 5,
      comment: 'Excellent response time and accuracy',
      date: '2024-03-07'
    },
    {
      id: 2,
      user: 'Jane Smith',
      agent: 'Data Analysis Agent',
      rating: 4,
      comment: 'Very helpful, but sometimes slow with large datasets',
      date: '2024-03-06'
    }
  ]
};

const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

const AdminDashboardPage = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [showSystemDetails, setShowSystemDetails] = useState(false);

  const agentPerformanceData = mockData.agentUsage.map(agent => ({
    subject: agent.name,
    usage: agent.usage,
    rating: agent.rating * 20, // Convert to percentage for radar chart
    fullMark: 100
  }));

  return (
    <>
      <AdminNavbar />
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-purple-200">Platform analytics and management</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-purple-200 hover:text-white transition-colors">
                <FaBell className="w-6 h-6" />
              </button>
              <button className="p-2 text-purple-200 hover:text-white transition-colors">
                <FaCog className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="flex justify-end mb-6">
            <div className="bg-white/5 rounded-lg p-1">
              {['day', 'week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-purple-500 text-white'
                      : 'text-purple-200 hover:text-white'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* User & Agent Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <FaUsers className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">User Statistics</h3>
                      <p className="text-purple-200">Platform user metrics</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-white">{mockData.userStats.totalUsers}</p>
                      <p className="text-purple-200">Total Users</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{mockData.userStats.activeUsers}</p>
                      <p className="text-purple-200">Active Users</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">+{mockData.userStats.newUsers}</p>
                      <p className="text-purple-200">New Users</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-400">{mockData.userStats.churnRate}%</p>
                      <p className="text-purple-200">Churn Rate</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <FaRobot className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Agent Statistics</h3>
                      <p className="text-purple-200">AI agent performance</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-white">{mockData.agentStats.totalAgents}</p>
                      <p className="text-purple-200">Total Agents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{mockData.agentStats.activeAgents}</p>
                      <p className="text-purple-200">Active Agents</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{mockData.agentStats.totalTasks}</p>
                      <p className="text-purple-200">Total Tasks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{mockData.agentStats.successRate}%</p>
                      <p className="text-purple-200">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue & Subscriptions */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue & Subscriptions</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                      <XAxis dataKey="month" stroke="#ffffff40" />
                      <YAxis yAxisId="left" stroke="#8B5CF6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#EC4899" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#181C2A',
                          border: '1px solid #ffffff10',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar
                        yAxisId="left"
                        dataKey="revenue"
                        fill="#8B5CF6"
                        name="Revenue ($)"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="subscriptions"
                        stroke="#EC4899"
                        name="Subscriptions"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Agent Performance */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Agent Performance</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={agentPerformanceData}>
                      <PolarGrid stroke="#ffffff10" />
                      <PolarAngleAxis dataKey="subject" stroke="#ffffff40" />
                      <PolarRadiusAxis stroke="#ffffff40" />
                      <Radar
                        name="Usage"
                        dataKey="usage"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Rating"
                        dataKey="rating"
                        stroke="#EC4899"
                        fill="#EC4899"
                        fillOpacity={0.6}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* System Health */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    mockData.systemHealth.status === 'healthy'
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                  }`}>
                    {mockData.systemHealth.status === 'healthy' ? (
                      <FaCheckCircle className="w-6 h-6 text-green-400" />
                    ) : (
                      <FaExclamationTriangle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">System Health</h3>
                    <p className="text-purple-200">Platform status and performance</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Uptime</span>
                    <span className="text-white font-medium">{mockData.systemHealth.uptime}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Active Errors</span>
                    <span className="text-white font-medium">{mockData.systemHealth.activeErrors}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Performance</span>
                    <span className="text-white font-medium">{mockData.systemHealth.performance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Last Incident</span>
                    <span className="text-white font-medium">{mockData.systemHealth.lastIncident}</span>
                  </div>
                  <button
                    onClick={() => setShowSystemDetails(true)}
                    className="w-full mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg
                      text-purple-200 hover:text-white transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Support Overview */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <FaTicketAlt className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Support Overview</h3>
                    <p className="text-purple-200">Ticket statistics and metrics</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">{mockData.supportTickets.open}</p>
                      <p className="text-purple-200">Open Tickets</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">{mockData.supportTickets.resolved}</p>
                      <p className="text-purple-200">Resolved</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Avg. Response Time</span>
                    <span className="text-white font-medium">{mockData.supportTickets.averageResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-200">Satisfaction</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-white font-medium">{mockData.supportTickets.satisfaction}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Feedback */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Feedback</h3>
                <div className="space-y-4">
                  {mockData.recentFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-white font-medium">{feedback.user}</h4>
                          <p className="text-purple-200 text-sm">{feedback.agent}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          <span className="text-white">{feedback.rating}</span>
                        </div>
                      </div>
                      <p className="text-purple-100 text-sm mt-2">{feedback.comment}</p>
                      <p className="text-purple-200 text-xs mt-2">{feedback.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Details Modal */}
      {showSystemDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181C2A] rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold text-white mb-4">System Details</h3>
            {/* Add detailed system information here */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Server Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-200">CPU Usage</span>
                      <span className="text-white">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Memory Usage</span>
                      <span className="text-white">62%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Disk Space</span>
                      <span className="text-white">78%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Network Status</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-purple-200">Response Time</span>
                      <span className="text-white">45ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Uptime</span>
                      <span className="text-white">99.99%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-200">Active Connections</span>
                      <span className="text-white">1,234</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowSystemDetails(false)}
                  className="px-4 py-2 text-purple-200 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardPage; 
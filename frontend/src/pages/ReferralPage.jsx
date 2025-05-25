import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaShare, FaGift, FaUsers, FaChartLine, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Mock data - replace with actual API calls
const mockReferralData = {
  referralCode: 'AICREW-1234',
  totalReferrals: 12,
  activeReferrals: 8,
  pendingReferrals: 2,
  completedReferrals: 2,
  totalEarnings: 240,
  pendingEarnings: 40,
  availableRewards: [
    { id: 1, name: '1 Month Free', requirements: '3 successful referrals', status: 'available' },
    { id: 2, name: 'Premium Support', requirements: '5 successful referrals', status: 'available' },
    { id: 3, name: 'Custom Agent', requirements: '10 successful referrals', status: 'locked' }
  ],
  referralHistory: [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      date: '2024-03-15',
      status: 'active',
      reward: '$20'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      date: '2024-03-10',
      status: 'completed',
      reward: '$20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      date: '2024-03-05',
      status: 'pending',
      reward: 'Pending'
    }
  ]
};

const ReferralPage = () => {
  const [referralData, setReferralData] = useState(mockReferralData);
  const [copied, setCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch actual referral data from API
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Join AI-CREW',
      text: `Join AI-CREW using my referral code ${referralData.referralCode} and get 1 month free!`,
      url: `https://ai-crew.com/join?ref=${referralData.referralCode}`
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setShareModalOpen(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Referral Code Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Your Referral Code</h3>
            <p className="text-purple-100">Share this code with friends and earn rewards!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-white">{referralData.referralCode}</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg
                text-white transition-colors"
            >
              <FaCopy />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500
                text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                hover:scale-[1.02] transition-all duration-300"
            >
              <FaShare />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <FaUsers className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-200">Total Referrals</p>
              <p className="text-2xl font-bold text-white">{referralData.totalReferrals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <FaCheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-purple-200">Active Referrals</p>
              <p className="text-2xl font-bold text-white">{referralData.activeReferrals}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <FaChartLine className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-purple-200">Total Earnings</p>
              <p className="text-2xl font-bold text-white">${referralData.totalEarnings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FaGift className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-purple-200">Pending Earnings</p>
              <p className="text-2xl font-bold text-white">${referralData.pendingEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Available Rewards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {referralData.availableRewards.map((reward) => (
            <div
              key={reward.id}
              className={`bg-white/5 backdrop-blur-xl border ${
                reward.status === 'locked' ? 'border-white/5' : 'border-white/10'
              } rounded-lg p-6`}
            >
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">{reward.name}</h4>
                {reward.status === 'locked' ? (
                  <span className="px-2 py-1 bg-white/5 text-purple-200 rounded-full text-sm">
                    Locked
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Available
                  </span>
                )}
              </div>
              <p className="text-purple-100 mb-4">{reward.requirements}</p>
              {reward.status === 'locked' ? (
                <button
                  disabled
                  className="w-full px-4 py-2 bg-white/5 text-purple-200 rounded-lg cursor-not-allowed"
                >
                  Locked
                </button>
              ) : (
                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500
                  text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25
                  hover:scale-[1.02] transition-all duration-300"
                >
                  Claim Reward
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-purple-200 font-medium">Name</th>
              <th className="px-6 py-4 text-left text-purple-200 font-medium">Email</th>
              <th className="px-6 py-4 text-left text-purple-200 font-medium">Date</th>
              <th className="px-6 py-4 text-left text-purple-200 font-medium">Status</th>
              <th className="px-6 py-4 text-left text-purple-200 font-medium">Reward</th>
            </tr>
          </thead>
          <tbody>
            {referralData.referralHistory.map((referral) => (
              <tr key={referral.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-6 py-4 text-white">{referral.name}</td>
                <td className="px-6 py-4 text-purple-100">{referral.email}</td>
                <td className="px-6 py-4 text-purple-100">{referral.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    referral.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : referral.status === 'active'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">{referral.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Referral Program
          </h1>
          <p className="text-xl text-purple-100">
            Invite friends to join AI-CREW and earn rewards for each successful referral
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex space-x-8">
            {['overview', 'history'].map((tab) => (
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

        {/* Content */}
        {selectedTab === 'overview' ? renderOverview() : renderHistory()}

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#181C2A] rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-semibold text-white mb-4">Share Your Referral Code</h3>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-purple-100 mb-2">Share this link:</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={`https://ai-crew.com/join?ref=${referralData.referralCode}`}
                      className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`https://ai-crew.com/join?ref=${referralData.referralCode}`);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShareModalOpen(false)}
                    className="px-4 py-2 text-purple-200 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralPage; 
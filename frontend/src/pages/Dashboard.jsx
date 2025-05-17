import React from 'react';
import AgentCard from '../components/common/AgentCard';

const AVAILABLE_AGENTS = [
    {
        id: 'trip-planner',
        title: 'Trip Planner',
        description: 'Plan your perfect trip with AI assistance. Get personalized itineraries and travel recommendations.',
        icon: '✈️',
        path: '/agents/trip-planner'
    },
    // Add more agents here as they are created
    // Example:
    // {
    //     id: 'content-writer',
    //     title: 'Content Writer',
    //     description: 'Generate engaging content for your blog, social media, or website.',
    //     icon: '✍️',
    //     path: '/agents/content-writer'
    // },
];

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    AI Agents Dashboard
                </h1>
                <p className="text-xl text-gray-600">
                    Select an agent to get started
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AVAILABLE_AGENTS.map((agent) => (
                    <AgentCard
                        key={agent.id}
                        title={agent.title}
                        description={agent.description}
                        icon={agent.icon}
                        path={agent.path}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard; 
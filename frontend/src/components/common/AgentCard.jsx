import React from 'react';
import { Link } from 'react-router-dom';

const AgentCard = ({ title, description, icon, path }) => {
    return (
        <Link 
            to={path}
            className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 transition-all"
        >
            <div className="flex items-center mb-4">
                {icon && <div className="text-3xl mr-3">{icon}</div>}
                <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                    {title}
                </h5>
            </div>
            <p className="font-normal text-gray-700">
                {description}
            </p>
        </Link>
    );
};

export default AgentCard; 
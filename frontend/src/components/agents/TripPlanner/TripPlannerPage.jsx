import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TripPlannerForm from './TripPlannerForm';

const TripPlannerPage = () => {
    const [tripPlan, setTripPlan] = useState(null);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <Link 
                    to="/" 
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                    ← Back to Agents
                </Link>
                <h1 className="text-3xl font-bold mt-4 mb-6">Trip Planner</h1>
            </div>

            {!tripPlan ? (
                <TripPlannerForm onPlanCreated={setTripPlan} />
            ) : (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">
                        Your Trip Plan
                    </h2>
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="prose max-w-none">
                            <pre className="whitespace-pre-wrap text-gray-600 font-sans">
                                {tripPlan.itinerary}
                            </pre>
                        </div>
                        <button
                            onClick={() => setTripPlan(null)}
                            className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Plan Another Trip
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TripPlannerPage; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TripPlannerPage from './components/agents/TripPlanner/TripPlannerPage';
import './App.css'

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/agents/trip-planner" element={<TripPlannerPage />} />
                    {/* Add more agent routes here as they are created */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage";
import TripPlannerPage from "./components/agents/TripPlanner/TripPlannerPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trip-planner" element={<TripPlannerPage />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;


// <Routes>
// <Route path="/" element={<Dashboard />} />
// <Route path="/agents/trip-planner" element={<TripPlannerPage />} />
// {/* Add more agent routes here as they are created */}
// </Routes>
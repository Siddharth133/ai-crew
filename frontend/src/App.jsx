import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import authService from "./services/authService";

// Auth Pages
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';

// Main Pages
import LandingPage from "./components/landing/LandingPage";
import AgentCatalogPage from "./pages/AgentCatalogPage";
import AgentDetailPage from "./pages/AgentDetailPage";
import CustomAgentPage from "./pages/CustomAgentPage";
import SupportPage from "./pages/SupportPage";
import ReferralPage from "./pages/ReferralPage";

// Dashboard Pages (Protected)
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !authService.isAdmin()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen bg-[#181C2A] flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ForgotPasswordPage />} />
              <Route path="/agents" element={
                <ProtectedRoute>
                  <AgentCatalogPage />
                </ProtectedRoute>
              } />
              <Route path="/agents/:id" element={
                <ProtectedRoute>
                  <AgentDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/custom-agent" element={
                <ProtectedRoute>
                  <CustomAgentPage />
                </ProtectedRoute>
              } />
              <Route path="/support" element={
                <ProtectedRoute>
                  <SupportPage />
                </ProtectedRoute>
              } />
              <Route path="/referral" element={
                <ProtectedRoute>
                  <ReferralPage />
                </ProtectedRoute>
              } />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnimatePresence>
    </Router>
  );
};

export default App;


// <Routes>
// <Route path="/" element={<Dashboard />} />
// <Route path="/agents/trip-planner" element={<TripPlannerPage />} />
// {/* Add more agent routes here as they are created */}
// </Routes>
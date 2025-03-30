import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import CodeEditor from './editor/editor.jsx';
import './App.css';
import SignUpPage from './pages/SIgnupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Navbar from './components/Navbar.jsx';
import DeveloperDashboard from './pages/DeveloperDashboard.jsx';
import AICodingChallengePage from './pages/Challenges.jsx';
import EnhancedCodeEditor from './pages/ChallengeEditor.jsx';
import AIEvaluationPage from './pages/Eval&ReportPage.jsx';
import DeveloperProfile from './pages/DeveloperProfile.jsx';
import LiveInterviewPage from './pages/LiveInterviewPage.jsx';
import RecruiterDashboard from './pages/RecruiterDashboard.jsx';
import CandidateAIReports from './pages/CandidateAIReport.jsx';
import LiveInterviewRecruiter from './pages/LiveInterviewRecruiter.jsx';
import RecruiterProfilePage from './pages/RecrutierProfilePage.jsx';
import ScheduleInterview from './pages/ScheduleInterview.jsx';
import RoomPage from './pages/RoomPage.jsx';

function App() {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {!hideNavbar && <Navbar />}
      <Routes>
        {/* Common Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Developer Routes */}
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
        <Route path="/challenges" element={<AICodingChallengePage />} />
        <Route path="/challenges-editor" element={<EnhancedCodeEditor />} />
        <Route path="/eval-report" element={<AIEvaluationPage />} />
        <Route path="/developer-profile" element={<DeveloperProfile />} />
        <Route path="/live-interview" element={<LiveInterviewPage />} />

        {/* Recruiter Routes */}
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/candidates" element={<CandidateAIReports />} />
        <Route path="/ai-reports" element={<CandidateAIReports />} />
        <Route path="/interview" element={<ScheduleInterview />} />
        <Route path="/recruiter-profile" element={<RecruiterProfilePage />} />
        <Route path="/schedule-interview" element={<ScheduleInterview />} />

        {/* Room Route */}
        <Route path="/room/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
}

export default App;
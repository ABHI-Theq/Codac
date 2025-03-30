import React, { useState } from 'react';
import { 
  User, ChevronLeft, Settings, Calendar, BarChart2, 
  CheckCircle, XCircle, Clock, RefreshCw, Download,
  Award, Zap, AlertCircle, Book, HelpCircle, Star
} from 'lucide-react';

const RecruiterProfilePage = () => {
  // Recruiter profile data
  const recruiter = {
    name: "Sarah Smith",
    company: "TechCorp Inc.",
    role: "Senior Technical Recruiter",
    interviewsConducted: 28,
    avgTimeToHire: "12 Days"
  };

  // Past interviews data
  const pastInterviews = [
    {
      id: 1,
      date: "March 28, 2025",
      candidate: "John Doe",
      aiScore: 94,
      decision: "Hired",
      followUp: "Pending",
      role: "Backend Developer"
    },
    {
      id: 2,
      date: "March 26, 2025",
      candidate: "Alice Green",
      aiScore: 85,
      decision: "Rejected",
      followUp: "Not Needed",
      role: "Frontend Engineer"
    },
    {
      id: 3,
      date: "March 22, 2025",
      candidate: "Bob White",
      aiScore: 90,
      decision: "Under Review",
      followUp: "Needs Second Interview",
      role: "AI Engineer"
    },
    {
      id: 4,
      date: "March 18, 2025",
      candidate: "Charlie Kim",
      aiScore: 82,
      decision: "Rejected",
      followUp: "Not Needed",
      role: "Full Stack Developer"
    }
  ];

  // Hiring analytics
  const analytics = {
    avgAiScore: 88,
    commonMistake: "Recursion handling issues",
    topSkillGap: "Algorithm optimization",
    plagiarismRate: 7,
    topPerformers: [
      "John Doe – 94% (Backend Developer)",
      "Bob White – 90% (AI Engineer)"
    ],
    improvements: [
      "Reduce time spent on initial screening by increasing AI automation for code evaluation",
      "Focus more on dynamic programming & system design interviews (candidates struggle here)",
      "Enhance hiring for real-world problem-solving rather than theoretical questions"
    ]
  };

  // Re-invite recommendations
  const reinviteRecommendations = [
    {
      candidate: "John Doe",
      reason: "Performed exceptionally well in the first round. Consider a final system design interview.",
      score: 94
    },
    {
      candidate: "Bob White",
      reason: "AI assessment suggests strong problem-solving but weaker debugging skills. A follow-up interview is recommended.",
      score: 90
    }
  ];

  // View report handler
  const viewReport = (candidateId) => {
    console.log(`Viewing report for candidate ${candidateId}`);
    // In a real app, this would open a detailed report modal
  };

  // Schedule follow-up handler
  const scheduleFollowUp = (candidateId) => {
    console.log(`Scheduling follow-up for candidate ${candidateId}`);
    // In a real app, this would open a scheduling modal
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-black/30 backdrop-blur-lg shadow-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-500">Codac</div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <ChevronLeft size={20} className="mr-1" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <User size={20} className="mr-1" />
                  <span>Candidates</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Calendar size={20} className="mr-1" />
                  <span>Live Interviews</span>
                </a>
              </nav>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">🏢 Recruiter | {recruiter.name}</span>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  {recruiter.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Recruiter Profile */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <User size={20} className="mr-2" />
                {recruiter.name}'s Hiring Profile
              </h2>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Company</p>
                  <p className="text-white font-medium">{recruiter.company}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-white font-medium">{recruiter.role}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Total Interviews Conducted</p>
                  <p className="text-white font-medium">{recruiter.interviewsConducted}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Average Time to Hire</p>
                  <p className="text-white font-medium">{recruiter.avgTimeToHire}</p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition">
                  Edit Profile
                </button>
                <button className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Generate AI Report
                </button>
              </div>
            </div>
          </div>

          {/* Middle Panel: Past Interviews */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Calendar size={20} className="mr-2" />
              Interview History & Reports
            </h2>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/30">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      AI Score
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Decision
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Follow-Up
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black/20 divide-y divide-gray-700">
                  {pastInterviews.map((interview) => (
                    <tr key={interview.id} className="hover:bg-gray-800/50 transition">
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-300">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1 text-gray-400" />
                          {interview.date}
                        </div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                        {interview.candidate}
                        <div className="text-xs text-gray-400">{interview.role}</div>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          interview.aiScore >= 90 ? 'bg-green-500/20 text-green-400' :
                          interview.aiScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {interview.aiScore}%
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {interview.decision === "Hired" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            Hired
                          </span>
                        ) : interview.decision === "Rejected" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            <XCircle size={12} className="mr-1" />
                            Rejected
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            <AlertCircle size={12} className="mr-1" />
                            Under Review
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {interview.followUp === "Pending" ? (
                          <span className="inline-flex items-center text-yellow-400">
                            <RefreshCw size={14} className="mr-1" />
                            Pending
                          </span>
                        ) : interview.followUp === "Needs Second Interview" ? (
                          <span className="inline-flex items-center text-blue-400">
                            <RefreshCw size={14} className="mr-1" />
                            Needs Follow-Up
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-gray-400">
                            <XCircle size={14} className="mr-1" />
                            Not Needed
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <button 
                          onClick={() => viewReport(interview.id)}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium mr-2"
                        >
                          View Report
                        </button>
                        {interview.followUp === "Needs Second Interview" && (
                          <button 
                            onClick={() => scheduleFollowUp(interview.id)}
                            className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-xs font-medium"
                          >
                            Schedule
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel: Hiring Analytics */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <BarChart2 size={20} className="mr-2" />
                AI Hiring Insights
              </h2>

              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <p className="text-xs text-gray-400">Avg AI Score</p>
                    <p className="text-xl font-medium text-white">{analytics.avgAiScore}%</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-md">
                    <p className="text-xs text-gray-400">Plagiarism Rate</p>
                    <p className="text-xl font-medium text-white">{analytics.plagiarismRate}%</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Common Mistakes</h3>
                  <p className="text-sm text-white">{analytics.commonMistake}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Top Skill Gap</h3>
                  <p className="text-sm text-white">{analytics.topSkillGap}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Top Performers</h3>
                  <ul className="text-sm text-white space-y-1">
                    {analytics.topPerformers.map((performer, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-1">•</span>
                        {performer}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">AI Suggested Improvements</h3>
                  <ul className="text-sm text-white space-y-2">
                    {analytics.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-400 mr-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Generate Full Report
                </button>
              </div>
            </div>

            {/* Re-invite Candidates */}
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <RefreshCw size={20} className="mr-2" />
                Re-Invite Top Candidates
              </h2>

              <div className="mt-4 space-y-4">
                {reinviteRecommendations.map((candidate, index) => (
                  <div key={index} className="border border-gray-700 rounded-md p-4 hover:border-blue-500/50 transition">
                    <h3 className="font-medium text-white">{candidate.candidate}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        candidate.score >= 90 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        AI Score: {candidate.score}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{candidate.reason}</p>
                    <button className="w-full mt-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition">
                      Re-Invite {candidate.candidate.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterProfilePage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Search, Filter, ChevronDown, ChevronUp, 
  CheckCircle, XCircle, AlertCircle, Clock, 
  Calendar, BarChart2, Zap, Download, 
  ChevronLeft, Settings, Book, HelpCircle, 
  Star, Rocket, Turtle, Gauge, Clock4
} from 'lucide-react';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  // State for filters
  const [sortBy, setSortBy] = useState('aiRank');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [aiScoreFilter, setAiScoreFilter] = useState(null);
  const [plagiarismFilter, setPlagiarismFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample candidate data
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      aiScore: 94,
      plagiarismRisk: "No Issues",
      codingSpeed: "Fast",
      status: "Available",
      skills: ["Python", "JavaScript"],
      breakdown: {
        correctness: 95,
        efficiency: 90,
        plagiarism: 0,
        problemSolving: 8.5,
        timeTaken: "7 minutes"
      }
    },
    {
      id: 2,
      name: "Alice Green",
      aiScore: 91,
      plagiarismRisk: "AI-Generated Code",
      codingSpeed: "Medium",
      status: "Rejected",
      skills: ["Java", "C++"],
      breakdown: {
        correctness: 88,
        efficiency: 85,
        plagiarism: 92,
        problemSolving: 7.2,
        timeTaken: "12 minutes"
      }
    },
    {
      id: 3,
      name: "Bob White",
      aiScore: 87,
      plagiarismRisk: "No Issues",
      codingSpeed: "Fast",
      status: "Available",
      skills: ["Python", "TypeScript"],
      breakdown: {
        correctness: 89,
        efficiency: 92,
        plagiarism: 0,
        problemSolving: 8.1,
        timeTaken: "8 minutes"
      }
    },
    {
      id: 4,
      name: "Charlie Kim",
      aiScore: 82,
      plagiarismRisk: "Partial AI Help",
      codingSpeed: "Slow",
      status: "Rejected",
      skills: ["JavaScript", "Java"],
      breakdown: {
        correctness: 85,
        efficiency: 78,
        plagiarism: 45,
        problemSolving: 6.5,
        timeTaken: "15 minutes"
      }
    }
  ];

  // Interview data
  const interviews = [
    {
      id: 1,
      candidate: "John Doe",
      role: "Backend Developer Interview",
      date: "March 30, 2025",
      time: "2:00 PM IST",
      status: "upcoming"
    },
    {
      id: 2,
      candidate: "Bob White",
      role: "AI Engineer Interview",
      date: "April 2, 2025",
      time: "4:00 PM IST",
      status: "upcoming"
    },
    {
      id: 3,
      candidate: "Alice Green",
      role: "Frontend Developer Interview",
      date: "March 28, 2025",
      time: "11:00 AM EST",
      status: "completed",
      result: "Rejected"
    },
    {
      id: 4,
      candidate: "Charlie Kim",
      role: "Full Stack Interview",
      date: "March 25, 2025",
      time: "3:30 PM GMT",
      status: "completed",
      result: "Under Review"
    }
  ];

  // AI insights
  const aiInsights = [
    "John Doe has performed better than 95% of candidates in data structures",
    "Bob White's code efficiency score is 92% (excellent problem-solving skills)",
    "Alice Green's submission has AI-generated content detected - High plagiarism risk"
  ];

  const aiPredictions = [
    "Candidate John Doe is a strong fit for the Backend Developer position!",
    "Charlie Kim struggled with recursion; consider asking follow-up questions"
  ];

  // Sort candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'aiRank') {
      return sortDirection === 'desc' ? b.aiScore - a.aiScore : a.aiScore - b.aiScore;
    } else if (sortBy === 'efficiency') {
      return sortDirection === 'desc' ? b.breakdown.efficiency - a.breakdown.efficiency : a.breakdown.efficiency - b.breakdown.efficiency;
    } else {
      // Plagiarism sort (simplified)
      const aPlagiarism = a.plagiarismRisk === "No Issues" ? 0 : a.plagiarismRisk === "Partial AI Help" ? 1 : 2;
      const bPlagiarism = b.plagiarismRisk === "No Issues" ? 0 : b.plagiarismRisk === "Partial AI Help" ? 1 : 2;
      return sortDirection === 'desc' ? bPlagiarism - aPlagiarism : aPlagiarism - bPlagiarism;
    }
  });

  // Filter candidates
  const filteredCandidates = sortedCandidates.filter(candidate => {
    // Search filter
    const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Skill filter
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => candidate.skills.includes(skill));
    
    // AI Score filter
    const matchesAiScore = !aiScoreFilter || 
                          (aiScoreFilter === 'above80' && candidate.aiScore >= 80) ||
                          (aiScoreFilter === '50to80' && candidate.aiScore >= 50 && candidate.aiScore < 80) ||
                          (aiScoreFilter === 'below50' && candidate.aiScore < 50);
    
    // Plagiarism filter
    const matchesPlagiarism = !plagiarismFilter || 
                             (plagiarismFilter === 'none' && candidate.plagiarismRisk === "No Issues") ||
                             (plagiarismFilter === 'aiDetected' && candidate.plagiarismRisk === "AI-Generated Code") ||
                             (plagiarismFilter === 'suspicious' && candidate.plagiarismRisk === "Partial AI Help");
    
    return matchesSearch && matchesSkills && matchesAiScore && matchesPlagiarism;
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  // Toggle skill selection
  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    );
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
                <a href="#" className="flex items-center text-blue-500">
                  <User size={20} className="mr-1" />
                  <span>Candidates</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <BarChart2 size={20} className="mr-1" />
                  <span>AI Reports</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Calendar size={20} className="mr-1" />
                  <span>Live Interviews</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Settings size={20} className="mr-1" />
                  <span>Profile</span>
                </a>
              </nav>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">🏢 Recruiter | Sarah Smith</span>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  SS
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Filters */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Search size={20} className="mr-2" />
                Find the Best Candidates
              </h2>
              
              {/* Search Bar */}
              <div className="mt-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by Name, Skill, or AI Score..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort By */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Sort By</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setSortBy('aiRank');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>AI Rank</span>
                    {sortBy === 'aiRank' ? (
                      sortDirection === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                    ) : <ChevronDown size={16} className="opacity-30" />}
                  </button>
                  <button 
                    onClick={() => {
                      setSortBy('efficiency');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>Efficiency Score</span>
                    {sortBy === 'efficiency' ? (
                      sortDirection === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                    ) : <ChevronDown size={16} className="opacity-30" />}
                  </button>
                  <button 
                    onClick={() => {
                      setSortBy('plagiarism');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>Plagiarism %</span>
                    {sortBy === 'plagiarism' ? (
                      sortDirection === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                    ) : <ChevronDown size={16} className="opacity-30" />}
                  </button>
                </div>
              </div>

              {/* Filter By Skills */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Filter By Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "JavaScript", "Java", "C++"].map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-md text-sm ${
                        selectedSkills.includes(skill)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter By AI Score */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Filter By AI Score</h3>
                <div className="space-y-2">
                  {[
                    { label: "Above 80%", value: "above80" },
                    { label: "50-80%", value: "50to80" },
                    { label: "Below 50%", value: "below50" }
                  ].map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setAiScoreFilter(aiScoreFilter === filter.value ? null : filter.value)}
                      className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                        aiScoreFilter === filter.value
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plagiarism Detection */}
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Plagiarism Detection</h3>
                <div className="space-y-2">
                  {[
                    { label: "No Plagiarism", value: "none", icon: <CheckCircle size={16} className="mr-2" /> },
                    { label: "AI-Detected Cheating", value: "aiDetected", icon: <XCircle size={16} className="mr-2" /> },
                    { label: "Suspicious Code", value: "suspicious", icon: <AlertCircle size={16} className="mr-2" /> }
                  ].map(filter => (
                    <button
                      key={filter.value}
                      onClick={() => setPlagiarismFilter(plagiarismFilter === filter.value ? null : filter.value)}
                      className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                        plagiarismFilter === filter.value
                          ? filter.value === 'none' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : filter.value === 'aiDetected'
                              ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                              : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {filter.icon}
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Panel: Candidate List */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white flex items-center">
              <BarChart2 size={20} className="mr-2" />
              AI-Generated Candidate Rankings
            </h2>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/30">
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      AI Score
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plagiarism Risk
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Coding Speed
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black/20 divide-y divide-gray-700">
                  {filteredCandidates.map((candidate, index) => (
                    <tr key={candidate.id} className="hover:bg-gray-800/50 transition">
                      <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {index + 1}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-white">
                        {candidate.name}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full ${
                          candidate.aiScore >= 90 ? 'bg-green-500/20 text-green-400' :
                          candidate.aiScore >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {candidate.aiScore}%
                        </span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {candidate.plagiarismRisk === "No Issues" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            No Issues
                          </span>
                        ) : candidate.plagiarismRisk === "AI-Generated Code" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            <XCircle size={12} className="mr-1" />
                            AI-Generated
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            <AlertCircle size={12} className="mr-1" />
                            Partial AI Help
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {candidate.codingSpeed === "Fast" ? (
                          <span className="inline-flex items-center text-green-400">
                            <Rocket size={14} className="mr-1" />
                            Fast
                          </span>
                        ) : candidate.codingSpeed === "Medium" ? (
                          <span className="inline-flex items-center text-yellow-400">
                            <Gauge size={14} className="mr-1" />
                            Medium
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-red-400">
                            <Turtle size={14} className="mr-1" />
                            Slow
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {candidate.status === "Available" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            <XCircle size={12} className="mr-1" />
                            Rejected
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {candidate.status === "Available" ? (
                          <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-medium transition">
                            Invite
                          </button>
                        ) : (
                          <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md text-xs font-medium transition">
                            View Report
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No candidates match your current filters
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Interviews & AI Insights */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Calendar size={20} className="mr-2" />
                Scheduled Interviews
              </h2>

              <div className="mt-4 space-y-4">
                {interviews.filter(i => i.status === "upcoming").map(interview => (
                  <div key={interview.id} className="border border-gray-700 rounded-md p-4 hover:border-blue-500/50 transition">
                    <h3 className="font-medium text-white">{interview.candidate}</h3>
                    <p className="text-sm text-blue-400">{interview.role}</p>
                    
                    <div className="mt-3 flex items-center text-sm text-gray-300">
                      <Clock size={14} className="mr-2 text-gray-400" />
                      {interview.date}, {interview.time}
                    </div>
                    
                    <button className="mt-3 w-full py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded text-sm font-medium transition">
                      View Details
                    </button>
                  </div>
                ))}

                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Past Interviews</h3>
                  <div className="space-y-2">
                    {interviews.filter(i => i.status === "completed").map(interview => (
                      <div key={interview.id} className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-md">
                        <div>
                          <p className="text-sm text-white">{interview.candidate}</p>
                          <p className="text-xs text-gray-400">{interview.result}</p>
                        </div>
                        <button className="text-xs text-blue-400 hover:text-blue-300">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium text-sm transition flex items-center justify-center"
                  onClick={() => navigate('/schedule-interview')}
                >
                  Schedule New Interview
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Zap size={20} className="mr-2" />
                AI-Powered Hiring Insights
              </h2>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Top Recommendations</h3>
                <div className="space-y-3">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="flex items-start">
                      {insight.includes("performed better") ? (
                        <CheckCircle size={16} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      ) : insight.includes("plagiarism risk") ? (
                        <XCircle size={16} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <Star size={16} className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm text-gray-300">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Hiring Predictions</h3>
                <div className="space-y-3">
                  {aiPredictions.map((prediction, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-300">
                        {prediction.includes("strong fit") ? (
                          <span className="text-green-400 mr-1">🔥</span>
                        ) : (
                          <span className="text-yellow-400 mr-1">⚠️</span>
                        )}
                        {prediction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md font-medium text-sm transition flex items-center justify-center">
                <Download size={16} className="mr-2" />
                Generate AI Report
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
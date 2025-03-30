import React, { useState } from 'react';
import { 
  User, Search, Filter, ChevronDown, ChevronUp, 
  CheckCircle, XCircle, AlertCircle, Clock, 
  BarChart2, Zap, Download, ChevronLeft, 
  Settings, Rocket, Turtle, Gauge, Star,
  Send, FileText, HelpCircle, Hash, Award,
  Calendar
} from 'lucide-react';

const CandidateAIReports = () => {
  // State for filters and selected candidate
  const [sortBy, setSortBy] = useState('aiScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [aiScoreFilter, setAiScoreFilter] = useState(null);
  const [plagiarismFilter, setPlagiarismFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Sample candidate data
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      aiScore: 94,
      efficiency: "Optimized",
      plagiarismRisk: "No Issues",
      problemSolvingSpeed: "Fast",
      status: "Available",
      skills: ["Python", "JavaScript"],
      breakdown: {
        correctness: 95,
        efficiency: "Optimized in O(n log n)",
        plagiarism: 10,
        problemSolving: 8.5,
        timeTaken: "7 minutes",
        originality: 95,
        aiGenerated: false,
        similarity: 12
      },
      strengths: [
        "92% efficiency score in array-based problems",
        "Consistent optimal solutions",
        "Excellent edge case handling"
      ],
      weaknesses: [
        "Could improve recursion implementation",
        "Documentation could be more detailed"
      ]
    },
    {
      id: 2,
      name: "Alice Green",
      aiScore: 91,
      efficiency: "Inefficient Loops",
      plagiarismRisk: "AI-Generated Code",
      problemSolvingSpeed: "Slow",
      status: "Rejected",
      skills: ["Java", "C++"],
      breakdown: {
        correctness: 88,
        efficiency: "O(n²) nested loops",
        plagiarism: 92,
        problemSolving: 6.2,
        timeTaken: "15 minutes",
        originality: 45,
        aiGenerated: true,
        similarity: 78
      },
      strengths: [
        "Good problem understanding",
        "Clean code structure"
      ],
      weaknesses: [
        "Struggles with nested loops in sorting",
        "AI-generated code detected",
        "Poor time complexity"
      ]
    },
    {
      id: 3,
      name: "Bob White",
      aiScore: 87,
      efficiency: "Good",
      plagiarismRisk: "No Issues",
      problemSolvingSpeed: "Fast",
      status: "Available",
      skills: ["Python", "TypeScript"],
      breakdown: {
        correctness: 89,
        efficiency: "O(n) with hash map",
        plagiarism: 0,
        problemSolving: 8.1,
        timeTaken: "8 minutes",
        originality: 98,
        aiGenerated: false,
        similarity: 5
      },
      strengths: [
        "Solved challenges 40% faster than average",
        "Excellent debugging skills",
        "Creative problem-solving"
      ],
      weaknesses: [
        "Could optimize space complexity",
        "Needs better variable naming"
      ]
    },
    {
      id: 4,
      name: "Charlie Kim",
      aiScore: 82,
      efficiency: "Needs Optimization",
      plagiarismRisk: "Partial AI Help",
      problemSolvingSpeed: "Medium",
      status: "Rejected",
      skills: ["JavaScript", "Java"],
      breakdown: {
        correctness: 85,
        efficiency: "Could be O(n) instead of O(n log n)",
        plagiarism: 45,
        problemSolving: 6.5,
        timeTaken: "12 minutes",
        originality: 72,
        aiGenerated: false,
        similarity: 32
      },
      strengths: [
        "Good communication in comments",
        "Solid foundational knowledge"
      ],
      weaknesses: [
        "Failed edge cases due to poor error handling",
        "Partial AI assistance detected",
        "Needs algorithm optimization"
      ]
    }
  ];

  // Sort candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === 'aiScore') {
      return sortDirection === 'desc' ? b.aiScore - a.aiScore : a.aiScore - b.aiScore;
    } else if (sortBy === 'efficiency') {
      // Simplified efficiency sorting
      const aEff = a.efficiency === "Optimized" ? 3 : a.efficiency === "Good" ? 2 : 1;
      const bEff = b.efficiency === "Optimized" ? 3 : b.efficiency === "Good" ? 2 : 1;
      return sortDirection === 'desc' ? bEff - aEff : aEff - bEff;
    } else if (sortBy === 'originality') {
      return sortDirection === 'desc' ? b.breakdown.originality - a.breakdown.originality : a.breakdown.originality - b.breakdown.originality;
    } else {
      // Speed sort
      const aSpeed = a.problemSolvingSpeed === "Fast" ? 3 : a.problemSolvingSpeed === "Medium" ? 2 : 1;
      const bSpeed = b.problemSolvingSpeed === "Fast" ? 3 : b.problemSolvingSpeed === "Medium" ? 2 : 1;
      return sortDirection === 'desc' ? bSpeed - aSpeed : aSpeed - bSpeed;
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
                             (plagiarismFilter === 'partialCopy' && candidate.plagiarismRisk === "Partial AI Help");
    
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

  // AI recommendations for the role
  const aiRecommendations = [
    "John Doe is a strong match for Backend Developer (AI Score: 94%)",
    "Charlie Kim needs additional screening for algorithmic thinking",
    "Bob White would excel in frontend-heavy roles with TypeScript"
  ];

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
                <a href="#" className="flex items-center text-blue-500">
                  <User size={20} className="mr-1" />
                  <span>Candidates</span>
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
                AI Performance Reports
              </h2>
              
              {/* Search Bar */}
              <div className="mt-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search by Candidate Name or Skill..."
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
                      setSortBy('aiScore');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>AI Score</span>
                    {sortBy === 'aiScore' ? (
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
                    <span>Efficiency</span>
                    {sortBy === 'efficiency' ? (
                      sortDirection === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                    ) : <ChevronDown size={16} className="opacity-30" />}
                  </button>
                  <button 
                    onClick={() => {
                      setSortBy('originality');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>Originality</span>
                    {sortBy === 'originality' ? (
                      sortDirection === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />
                    ) : <ChevronDown size={16} className="opacity-30" />}
                  </button>
                  <button 
                    onClick={() => {
                      setSortBy('speed');
                      toggleSortDirection();
                    }}
                    className="flex items-center justify-between w-full px-3 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md text-sm transition"
                  >
                    <span>Speed</span>
                    {sortBy === 'speed' ? (
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
                <h3 className="text-sm font-medium text-gray-400 mb-2">Filter By AI Evaluation</h3>
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
                    { label: "AI-Generated Code", value: "aiDetected", icon: <XCircle size={16} className="mr-2" /> },
                    { label: "Partial Copy", value: "partialCopy", icon: <AlertCircle size={16} className="mr-2" /> }
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
              <FileText size={20} className="mr-2" />
              AI-Generated Performance Reports
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
                      Code Efficiency
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plagiarism Risk
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Problem-Solving Speed
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
                    <tr 
                      key={candidate.id} 
                      className={`hover:bg-gray-800/50 transition ${selectedCandidate?.id === candidate.id ? 'bg-gray-800/70' : ''}`}
                      onClick={() => setSelectedCandidate(candidate)}
                    >
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
                        {candidate.efficiency === "Optimized" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle size={12} className="mr-1" />
                            Optimized
                          </span>
                        ) : candidate.efficiency === "Good" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                            Good
                          </span>
                        ) : candidate.efficiency === "Needs Optimization" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                            <AlertCircle size={12} className="mr-1" />
                            Needs Opt
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                            <XCircle size={12} className="mr-1" />
                            Inefficient
                          </span>
                        )}
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
                            Partial AI
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm">
                        {candidate.problemSolvingSpeed === "Fast" ? (
                          <span className="inline-flex items-center text-green-400">
                            <Rocket size={14} className="mr-1" />
                            Fast
                          </span>
                        ) : candidate.problemSolvingSpeed === "Medium" ? (
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
                        <button 
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs font-medium transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCandidate(candidate);
                          }}
                        >
                          View Report
                        </button>
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

          {/* Right Panel: Candidate Details & AI Insights */}
          <div className="space-y-6">
            {selectedCandidate ? (
              <>
                {/* Candidate Details */}
                <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <User size={20} className="mr-2" />
                    {selectedCandidate.name}'s AI Report
                  </h2>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">AI Score Breakdown</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 p-3 rounded-md">
                        <p className="text-xs text-gray-400">Code Correctness</p>
                        <p className="text-xl font-medium text-white">{selectedCandidate.breakdown.correctness}%</p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-md">
                        <p className="text-xs text-gray-400">Efficiency</p>
                        <p className="text-xl font-medium text-white">{selectedCandidate.breakdown.efficiency}</p>
                      </div>
                      <div className={`p-3 rounded-md ${
                        selectedCandidate.breakdown.plagiarism < 20 ? 'bg-green-500/10' :
                        selectedCandidate.breakdown.plagiarism < 50 ? 'bg-yellow-500/10' : 'bg-red-500/10'
                      }`}>
                        <p className="text-xs text-gray-400">Plagiarism Risk</p>
                        <p className="text-xl font-medium text-white">{selectedCandidate.breakdown.plagiarism}%</p>
                      </div>
                      <div className="bg-gray-800/50 p-3 rounded-md">
                        <p className="text-xs text-gray-400">Problem-Solving</p>
                        <p className="text-xl font-medium text-white">{selectedCandidate.breakdown.problemSolving}/10</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-400">Time Taken: <span className="text-white">{selectedCandidate.breakdown.timeTaken}</span></p>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition">
                        <Send size={16} className="inline mr-2" />
                        Shortlist
                      </button>
                      <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition">
                        <XCircle size={16} className="inline mr-2" />
                        Reject
                      </button>
                    </div>
                    <button className="w-full mt-2 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                      <Download size={16} className="mr-2" />
                      Generate PDF Report
                    </button>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
                  <h2 className="text-lg font-medium text-white flex items-center">
                    <Zap size={20} className="mr-2" />
                    AI-Powered Insights
                  </h2>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Candidate Strengths</h3>
                    <ul className="space-y-2">
                      {selectedCandidate.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-300">{strength}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Areas for Improvement</h3>
                    <ul className="space-y-2">
                      {selectedCandidate.weaknesses.map((weakness, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle size={16} className="text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-300">{weakness}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Plagiarism Detection</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Code Originality Score</span>
                        <span className="text-sm font-medium text-green-400">{selectedCandidate.breakdown.originality}% unique</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">AI-Generated Content</span>
                        <span className="text-sm font-medium text-red-400">
                          {selectedCandidate.breakdown.aiGenerated ? "Detected" : "Not Detected"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Similarity with Existing</span>
                        <span className="text-sm font-medium text-yellow-400">
                          {selectedCandidate.breakdown.similarity}% match
                        </span>
                      </div>
                      {selectedCandidate.breakdown.similarity < 20 ? (
                        <div className="mt-2 p-2 bg-green-500/10 rounded-md border border-green-500/30 text-sm text-green-400">
                          🎯 Your solution is original! Well done.
                        </div>
                      ) : (
                        <div className="mt-2 p-2 bg-yellow-500/10 rounded-md border border-yellow-500/30 text-sm text-yellow-400">
                          ⚠️ Significant similarity with existing solutions detected
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center">
                    <HelpCircle size={16} className="mr-2" />
                    Generate Interview Questions
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700 flex items-center justify-center h-64">
                <p className="text-gray-400">Select a candidate to view detailed AI report</p>
              </div>
            )}

            {/* AI Recommendations */}
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Award size={20} className="mr-2" />
                AI Hiring Recommendations
              </h2>

              <div className="mt-4 space-y-3">
                {aiRecommendations.map((recommendation, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md border ${
                      recommendation.includes("strong match") 
                        ? 'bg-green-500/10 border-green-500/30 text-green-400'
                        : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    }`}
                  >
                    <p className="text-sm">
                      {recommendation.includes("strong match") ? '🔥 ' : '⚠️ '}
                      {recommendation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Final Decision</h3>
                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-md text-sm font-medium transition">
                    Invite for Interview
                  </button>
                  <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md text-sm font-medium transition">
                    Reject with Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CandidateAIReports;
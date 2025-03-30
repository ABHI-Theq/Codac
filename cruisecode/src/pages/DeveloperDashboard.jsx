import React, { useState } from 'react';
import { User, Code, Award, BarChart, Calendar, Filter, Monitor, Star, HelpCircle, Book, Zap } from 'lucide-react';

const DeveloperDashboard = () => {
  const [activeChallenge, setActiveChallenge] = useState(null);

  // Sample data
  const challenges = [
    { id: 1, title: "Find the Smallest Missing Positive Integer", difficulty: "Medium", topic: "Arrays", aiScore: 4 },
    { id: 2, title: "Merge Two Sorted Linked Lists", difficulty: "Easy", topic: "Linked Lists", aiScore: 2 },
    { id: 3, title: "Maximum Sum Subarray", difficulty: "Medium", topic: "Arrays", aiScore: 3 },
    { id: 4, title: "Valid Parenthesis Checker", difficulty: "Easy", topic: "Stacks", aiScore: 2 },
    { id: 5, title: "Design LRU Cache", difficulty: "Hard", topic: "System Design", aiScore: 5 },
  ];

  const interviews = [
    {
      id: 1,
      company: "TechCorp Inc.",
      date: "March 30, 2025",
      time: "2:00 PM IST",
      status: "Waiting for Recruiter Approval"
    },
    {
      id: 2,
      company: "DevSolutions Ltd.",
      date: "April 5, 2025",
      time: "10:30 AM EST",
      status: "Confirmed"
    }
  ];

  const generateStars = (count) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={index < count ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
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
              <nav className="flex space-x-8">
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Code size={20} className="mr-1" />
                  <span>Editor</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Monitor size={20} className="mr-1" />
                  <span>Challenges</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <User size={20} className="mr-1" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <BarChart size={20} className="mr-1" />
                  <span>AI Reports</span>
                </a>
              </nav>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">👨‍💻 Developer | John Doe</span>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  JD
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel: Developer Progress & Skill Tracking */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white">Skill Progress</h2>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-400">Your Current Level: <span className="text-blue-500">Intermediate</span> 🏆</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full w-1/2"></div>
                </div>
                <div className="text-sm mt-2 text-gray-400">Challenges Solved: <strong>5 / 10 for Next Level</strong></div>
                <div className="mt-4 p-3 bg-blue-500/10 rounded-md">
                  <p className="text-sm text-blue-400"><span className="font-bold">💡 AI Tip:</span> Improve recursion skills for higher ranking.</p>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white">Leaderboard</h2>
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Award className="text-yellow-500 mr-2" size={20} />
                  <span className="text-gray-400">Your AI Skill Rank: <strong className="text-blue-500">#25</strong></span>
                </div>
                <div className="text-sm text-gray-400">🔥 Competing with <strong>3,000 developers</strong> globally.</div>
                <button className="mt-2 w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-md font-medium text-sm transition">
                  See Full Leaderboard
                </button>
              </div>
            </div>
          </div>

          {/* Middle Panel: Available AI-Generated Challenges */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Pick a Challenge & Start Solving 🚀</h2>

            <div className="flex space-x-2 mb-4">
              <div className="relative w-full">
                <div className="flex items-center">
                  <Filter size={16} className="absolute left-3 top-2.5 text-gray-400" />
                  <select className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md w-full text-sm text-gray-300">
                    <option>All Difficulties</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
              <div className="relative w-full">
                <select className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md w-full text-sm text-gray-300">
                  <option>All Topics</option>
                  <option>Arrays</option>
                  <option>Strings</option>
                  <option>Graphs</option>
                  <option>Recursion</option>
                  <option>System Design</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 mt-6">
              {challenges.map(challenge => (
                <div key={challenge.id} className="border border-gray-700 rounded-md p-4 hover:border-blue-500 hover:bg-blue-500/10 transition cursor-pointer">
                  <h3 className="font-medium text-white">{challenge.title}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="ml-2 text-gray-400">{challenge.topic}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-1">AI Score:</span>
                      <div className="flex">
                        {generateStars(challenge.aiScore)}
                      </div>
                    </div>
                  </div>
                  <button className="mt-3 w-full py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition">
                    Start Challenge
                  </button>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full py-2 border border-blue-500 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md font-medium text-sm transition flex items-center justify-center">
              <Zap size={16} className="mr-1" />
              Try a Random AI Challenge
            </button>
          </div>

          {/* Right Panel: Upcoming Interviews & Notifications */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white">📅 Your Upcoming Interviews</h2>

              <div className="mt-4 space-y-4">
                {interviews.map(interview => (
                  <div key={interview.id} className="border border-gray-700 rounded-md p-4">
                    <h3 className="font-medium text-white">Live Coding Interview with <span className="text-blue-500">{interview.company}</span></h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <div className="flex items-start">
                        <Calendar size={16} className="mr-2 text-gray-400 mt-0.5" />
                        <span className="text-gray-400"><strong>Date & Time:</strong> {interview.date}, {interview.time}</span>
                      </div>
                      <div className="flex items-start">
                        <Monitor size={16} className="mr-2 text-gray-400 mt-0.5" />
                        <span className="text-gray-400"><strong>Status:</strong> {interview.status}</span>
                      </div>
                    </div>
                    <button className="mt-3 w-full py-1.5 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded text-sm font-medium transition">
                      Interview Instructions
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white mb-4">Live AI Assistance</h2>
              <div className="space-y-3">
                <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium text-sm transition flex items-center justify-center">
                  <HelpCircle size={16} className="mr-2" />
                  Need help? Ask AI Mentor
                </button>
                <button className="w-full py-2.5 border border-gray-700 hover:bg-gray-800/50 text-gray-300 rounded-md font-medium text-sm transition flex items-center justify-center">
                  <Book size={16} className="mr-2" />
                  Browse Interview Tips
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
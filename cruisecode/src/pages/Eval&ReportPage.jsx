import React from 'react';
import { 
  Clock, Award, AlertTriangle, Lightbulb, 
  ArrowRight, RefreshCw, Code, MessageSquare, 
  User, BarChart, Monitor, Star, HelpCircle
} from 'lucide-react';

const AIEvaluationPage = () => {
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
                <a href="#" className="flex items-center text-blue-500">
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
          {/* Left Panel: Challenge Summary & Performance Breakdown */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Your AI Evaluation Report 📊</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-300">Challenge Name:</h3>
                <p className="text-white">Find the Smallest Missing Positive Integer</p>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">March 30, 2025 - 3:45 PM IST</span>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-300">Difficulty Level:</h3>
                <div className="flex text-yellow-400">
                  ⭐⭐⭐ <span className="ml-2 text-gray-300">Medium</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-300">Time Taken:</h3>
                <div className="flex items-center">
                  <span className="text-gray-300">⏳ 8 minutes 32 seconds</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-300">AI Performance Score:</h3>
                <div className="bg-gray-700 rounded-full h-2.5 w-full mt-1">
                  <div 
                    className="bg-blue-500 rounded-full h-2.5" 
                    style={{ width: '87%' }}
                  ></div>
                </div>
                <div className="text-right text-sm mt-1 text-gray-300">87 / 100</div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-300 mb-2">Test Case Results:</h3>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✅</span> <span className="text-gray-300">Test Case 1: Passed</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✅</span> <span className="text-gray-300">Test Case 2: Passed</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✅</span> <span className="text-gray-300">Test Case 3: Passed</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-red-400 mr-2">❌</span> <span className="text-gray-300">Test Case 4: Failed (Edge Case)</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-400 mr-2">✅</span> <span className="text-gray-300">Test Case 5: Passed</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-300 mb-2">AI Feedback Summary:</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="mr-2">🚀</span>
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Great job!</strong> You solved this problem faster than 80% of candidates.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">⚠️</span>
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Missed an edge case</strong> where all numbers are negative.
                    </span>
                  </li>
                  <li className="flex">
                    <span className="mr-2">💡</span>
                    <span className="text-sm text-gray-300">
                      <strong className="text-white">Next Step:</strong> Try implementing an <strong className="text-white">O(n) approach using a hash set instead of sorting.</strong>
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-2 pt-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </button>
                <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-2 px-4 rounded-md flex items-center justify-center transition">
                  <Code className="h-4 w-4 mr-2" />
                  View Optimized Solution
                </button>
                <button className="bg-gray-800/50 hover:bg-gray-800 text-gray-300 py-2 px-4 rounded-md flex items-center justify-center transition">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discuss in Community
                </button>
              </div>
            </div>
          </div>
          
          {/* Middle Panel: AI Code Quality & Efficiency Insights */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">Code Quality & Optimization Report 🔍</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-300 mb-2">AI-Generated Performance Insights:</h3>
                <ul className="space-y-2">
                  <li className="flex">
                    <Clock className="h-5 w-5 text-blue-400 mr-2" />
                    <div>
                      <strong className="text-white">Execution Time:</strong>
                      <p className="text-sm text-gray-400">
                        <code>O(n log n)</code> (AI suggests reducing sorting overhead)
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">🧠</span>
                    <div>
                      <strong className="text-white">Memory Usage:</strong>
                      <p className="text-sm text-gray-400">
                        <code>15MB</code> (Efficient use of in-place operations)
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">🔥</span>
                    <div>
                      <strong className="text-white">Efficiency Rank:</strong>
                      <p className="text-sm text-gray-400">
                        Better than 65% of developers
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-medium text-gray-300 mb-2">Plagiarism & AI-Generated Code Detection:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Code Originality Score:</span>
                    <span className="font-medium text-green-400">95% unique</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potential AI-Generated Code:</span>
                    <span className="font-medium text-green-400">No</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Similarity with Existing Solutions:</span>
                    <div>
                      <span className="font-medium text-green-400">12% match</span>
                      <span className="text-xs text-gray-500 ml-1">(Threshold: 20%)</span>
                    </div>
                  </div>
                  <div className="mt-2 text-green-400 font-medium flex items-center">
                    <span className="mr-2">🎯</span>
                    Your solution is original! Well done.
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <h3 className="font-medium text-gray-300 mb-2">AI-Suggested Improvements:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✅</span>
                    <span className="text-gray-300">
                      Consider using <strong className="text-white">bucket sorting</strong> for an O(n) time complexity.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">✅</span>
                    <span className="text-gray-300">
                      Use <strong className="text-white">early exits</strong> in loops to reduce redundant iterations.
                    </span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-500/10 p-4 rounded-md border border-blue-500/30">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-blue-400 mr-2" />
                  <h3 className="font-medium text-white">AI Optimization Insight</h3>
                </div>
                <p className="text-sm text-gray-300">
                  Your solution has potential for performance improvement. The current O(n log n) approach works well, but by using a hash set to track present values, you could achieve O(n) time complexity and handle the edge case of all negative numbers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Panel: Leaderboard & Global Ranking */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white mb-4">🏆 Global Leaderboard – See Where You Stand</h2>
            
            <div className="bg-blue-500/10 rounded-lg p-4 mb-6 flex items-center justify-between border border-blue-500/30">
              <div>
                <span className="text-sm text-blue-400">Your Rank</span>
                <h3 className="text-2xl font-bold text-white">#23</h3>
                <span className="text-xs text-gray-400">of 5000 Developers</span>
              </div>
              <Award className="h-12 w-12 text-blue-400" />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-300 mb-3">Top 5 Developers This Week:</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 px-3 bg-yellow-500/10 rounded-md border-l-4 border-yellow-500/50">
                  <div className="flex items-center">
                    <span className="font-bold text-yellow-500 mr-3">1️⃣</span>
                    <div>
                      <div className="font-semibold text-white">Alice 🚀</div>
                      <div className="text-xs text-gray-400">6 min 30 sec</div>
                    </div>
                  </div>
                  <div className="bg-yellow-500/20 text-yellow-400 rounded-full px-2 py-1 text-xs font-medium">
                    98
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-md border-l-4 border-gray-600">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-400 mr-3">2️⃣</span>
                    <div>
                      <div className="font-semibold text-white">Bob 🔥</div>
                      <div className="text-xs text-gray-400">7 min 10 sec</div>
                    </div>
                  </div>
                  <div className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs font-medium">
                    95
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-amber-500/10 rounded-md border-l-4 border-amber-500/50">
                  <div className="flex items-center">
                    <span className="font-bold text-amber-500 mr-3">3️⃣</span>
                    <div>
                      <div className="font-semibold text-white">Charlie 🎯</div>
                      <div className="text-xs text-gray-400">7 min 45 sec</div>
                    </div>
                  </div>
                  <div className="bg-amber-500/20 text-amber-400 rounded-full px-2 py-1 text-xs font-medium">
                    93
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-blue-500/10 rounded-md border-l-4 border-blue-500/50">
                  <div className="flex items-center">
                    <span className="font-bold text-blue-500 mr-3">4️⃣</span>
                    <div>
                      <div className="font-semibold text-white">You 👨‍💻</div>
                      <div className="text-xs text-gray-400">8 min 32 sec</div>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 text-blue-400 rounded-full px-2 py-1 text-xs font-medium">
                    87
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-2 px-3 bg-gray-800/50 rounded-md border-l-4 border-gray-600">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-400 mr-3">5️⃣</span>
                    <div>
                      <div className="font-semibold text-white">David 🏅</div>
                      <div className="text-xs text-gray-400">9 min 05 sec</div>
                    </div>
                  </div>
                  <div className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs font-medium">
                    85
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col space-y-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition">
                <Award className="h-4 w-4 mr-2" />
                Challenge Top Developers
              </button>
              <button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-2 px-4 rounded-md flex items-center justify-center transition">
                <Code className="h-4 w-4 mr-2" />
                View Best Submissions
              </button>
            </div>
            
            <div className="mt-6 bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-blue-400 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Pro Tip</h3>
                  <p className="text-sm text-blue-400">
                    The top performers typically implement O(n) solutions using hash sets. Try this approach to climb the leaderboard!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black/40 text-gray-400 py-4 px-6 text-center text-sm border-t border-gray-800">
        © 2025 Codac | All Rights Reserved | AI-Powered Coding Challenges Platform
      </footer>
    </div>
  );
};

export default AIEvaluationPage;
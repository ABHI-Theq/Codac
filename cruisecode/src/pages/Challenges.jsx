import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  ChevronLeft, Clock, ZapIcon, Save, RefreshCw, Play,
  CheckCircle, XCircle, AlertTriangle, Search, PauseCircle, 
  SkipForward, BookOpen, Code, Medal, User 
} from 'lucide-react';
import axios from 'axios';

const AICodingChallengePage = () => {
  const [timeRemaining, setTimeRemaining] = useState(1542); // 25:42 in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Timer countdown effect
  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  // Toggle timer pause/resume
  const toggleTimer = () => {
    setTimerActive((prev) => !prev);
  };

  // Start the challenge
  const startChallenge = () => {
    setChallengeStarted(true);
    setTimerActive(true);

    // Navigate to the editor with problem and test cases
    navigate('/challenges-editor', { state: { challengeData } });
  };

  // Generate AI Challenge
  const generateChallenge = async () => {
    if (!selectedTopic) {
      alert('Please select a topic.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5050/generate-challenge', { topic: selectedTopic });
      setChallengeData(response.data);
    } catch (error) {
      console.error('Error generating challenge:', error);
      alert('Failed to generate challenge. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black/50 backdrop-blur-md">
      {/* Top Navigation Bar */}
      <header className="bg-black/50 backdrop-blur-md shadow-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold text-blue-500">Codac</div>
            </div>
            <div className="flex items-center space-x-6">
              <nav className="flex space-x-8">
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <ChevronLeft size={18} className="mr-1" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Code size={20} className="mr-1" />
                  <span>Editor</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Medal size={20} className="mr-1" />
                  <span>Leaderboard</span>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel: Challenge Selection & AI Generation */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white">Select a Topic & AI Will Generate a Challenge 🎯</h2>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Choose a Coding Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full border border-gray-600 rounded-md px-3 py-2 text-gray-300 bg-gray-800"
                  >
                    <option value="">-- Select a Topic --</option>
                    <optgroup label="Data Structures">
                      <option>Arrays</option>
                      <option>Linked Lists</option>
                      <option>Graphs</option>
                      <option>Trees</option>
                    </optgroup>
                    <optgroup label="Algorithms">
                      <option>Sorting</option>
                      <option>Searching</option>
                      <option>Recursion</option>
                      <option>Dynamic Programming</option>
                    </optgroup>
                    <optgroup label="AI/ML Challenges">
                      <option>TensorFlow</option>
                      <option>PyTorch</option>
                    </optgroup>
                    <optgroup label="Blockchain/Web3">
                      <option>Solidity</option>
                      <option>Smart Contracts</option>
                    </optgroup>
                  </select>
                </div>
                
                <button
                  onClick={generateChallenge}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? 'Generating...' : (
                    <>
                      <ZapIcon size={16} className="mr-2" />
                      Generate AI Challenge
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Middle Panel: Coding Challenge Display */}
          <div className="lg:col-span-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg shadow overflow-hidden border border-gray-700">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white">Your AI-Generated Challenge 🏆</h2>
                
                {challengeData ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-300">{challengeData.problem}</h3>
                      <div className="bg-gray-800 p-3 rounded-md text-sm font-mono mt-2 text-gray-300">
                        <p><strong>Function Signature:</strong></p>
                        <p>{challengeData.function_signature}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-md p-4">
                      <h4 className="font-medium text-gray-300">Test Cases</h4>
                      <ul className="mt-2 space-y-2">
                        {challengeData.test_cases.map((test, index) => (
                          <li key={index} className="text-gray-400">
                            <strong>Input:</strong> {JSON.stringify(test.input)} | <strong>Expected Output:</strong> {JSON.stringify(test.expected)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Start Challenge Button */}
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={startChallenge}
                        className={`py-2 px-6 rounded-md text-sm font-medium flex items-center justify-center transition ${
                          challengeStarted
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        disabled={challengeStarted}
                      >
                        {challengeStarted ? 'Challenge Started' : 'Start Challenge'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400">No challenge generated yet. Select a topic and click "Generate AI Challenge".</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: AI Assistance & Timer */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-black/50 backdrop-blur-md rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Clock size={18} className="mr-2 text-blue-500" />
                Challenge Timer
              </h2>
              
              <div className="mt-4 text-center">
                <div className="text-4xl font-bold text-gray-300">{formatTime(timeRemaining)}</div>
                <div className="text-sm text-gray-400 mt-1">Time Remaining</div>
                
                <div className="flex justify-center space-x-3 mt-6">
                  <button 
                    onClick={toggleTimer}
                    className="py-2 px-4 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md font-medium text-sm transition flex items-center justify-center"
                    disabled={!challengeStarted}
                  >
                    {timerActive ? (
                      <>
                        <PauseCircle size={16} className="mr-2" />
                        Pause Timer
                      </>
                    ) : (
                      <>
                        <Play size={16} className="mr-2" />
                        Resume Timer
                      </>
                    )}
                  </button>
                  <button 
                    className="py-2 px-4 bg-green-100 hover:bg-green-200 text-green-700 rounded-md font-medium text-sm transition flex items-center justify-center"
                    disabled={!challengeStarted}
                  >
                    <SkipForward size={16} className="mr-2" />
                    Submit
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

export default AICodingChallengePage;

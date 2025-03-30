import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { 
  User, ChevronLeft, Settings, Video, VideoOff, Mic, MicOff, 
  PhoneOff, Play, Send, Zap, AlertCircle, HelpCircle, 
  Code, Clock, CheckCircle, XCircle, BarChart2, Gauge, 
  Rocket, Turtle, FileText, Hash, MessageSquare, Star
} from 'lucide-react';

const LiveInterviewRecruiter = () => {
  // State for interview controls
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [code, setCode] = useState(`function hasCycle(graph) {\n  // Implement cycle detection\n}`);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const editorRef = useRef(null);

  // Candidate and problem data
  const candidate = {
    name: "John Doe",
    role: "Senior Backend Developer",
    aiStats: {
      typingSpeed: 'Fast 🟢',
      logicScore: '8/10',
      hesitation: 'Paused for 20s before recursion',
      plagiarism: '100% original ✅',
      behavior: [
        'Used brute-force approach initially',
        'Optimized to DFS after suggestion',
        'Handled edge cases well'
      ]
    }
  };

  const problem = {
    title: 'Detect Cycle in Directed Graph',
    description: 'Write an algorithm to detect cycles in a directed graph.',
    example: {
      input: '[[0,1], [1,2], [2,0]]',
      output: 'True (Cycle detected)'
    },
    constraints: [
      'Must run in O(V + E) time',
      'Space complexity should be O(V)',
      'Handle disconnected graphs'
    ]
  };

  // AI suggestions for recruiter
  const initialAiSuggestions = [
    'Candidate used a brute-force approach; suggest an optimized DFS solution',
    'Candidate hesitated before recursive logic - possible knowledge gap?',
    'Typing speed slowed when handling edge cases - ask about test coverage'
  ];

  const aiQuestions = [
    'Can you optimize this to O(n) using depth-first search?',
    'What\'s the space complexity of your solution?',
    'How would you modify this for weighted graphs?'
  ];

  // Performance report
  const performanceReport = {
    scores: {
      problemSolving: 9,
      efficiency: 8,
      readability: 7,
      confidence: 85
    },
    feedback: [
      'Excellent problem decomposition skills',
      'Initial solution was suboptimal but showed ability to improve',
      'Good communication during thought process'
    ]
  };

  // Handle code execution
  const runCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      // Simulate AI suggestions after execution
      setAiSuggestions(initialAiSuggestions);
    }, 2000);
  };

  // Handle code submission
  const submitCode = () => {
    setShowReport(true);
  };

  // Request code change
  const requestChange = () => {
    const newSuggestion = "Consider using depth-first search for cycle detection";
    if (!aiSuggestions.includes(newSuggestion)) {
      setAiSuggestions([...aiSuggestions, newSuggestion]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
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

      {/* Main Interview Area */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Panel: Video & AI Monitoring */}
        <div className="w-1/4 border-r border-gray-700 bg-black/30 backdrop-blur-lg overflow-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Video size={20} className="mr-2" />
              Live Interview with {candidate.name}
            </h2>
            <p className="text-sm text-gray-400">{candidate.role}</p>

            {/* Video Feeds */}
            <div className="mt-4 space-y-4">
              <div className="relative aspect-video bg-gray-800 rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <User size={48} />
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  You (Sarah Smith)
                </div>
              </div>

              <div className="relative aspect-video bg-gray-800 rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  {videoOn ? (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <User size={48} />
                    </div>
                  ) : (
                    <VideoOff size={48} />
                  )}
                </div>
                <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {candidate.name}
                </div>
              </div>
            </div>

            {/* AI Monitoring */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                <Gauge size={16} className="mr-2" />
                AI Behavioral Insights
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Typing Speed</span>
                  <span className="text-sm font-medium text-green-400">{candidate.aiStats.typingSpeed}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Logical Thinking</span>
                  <span className="text-sm font-medium text-blue-400">{candidate.aiStats.logicScore}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Hesitation Analysis</span>
                  <span className="text-sm font-medium text-yellow-400">{candidate.aiStats.hesitation}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Plagiarism Risk</span>
                  <span className="text-sm font-medium text-green-400">{candidate.aiStats.plagiarism}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-medium text-gray-400 mb-1">Behavior Patterns</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  {candidate.aiStats.behavior.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Controls */}
            <div className="flex space-x-2 mt-6">
              <button 
                onClick={() => setMicOn(!micOn)}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  micOn ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {micOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button 
                onClick={() => setVideoOn(!videoOn)}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  videoOn ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {videoOn ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
              <button className="flex-1 py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-md flex items-center justify-center">
                <PhoneOff size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Panel: Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-700">
          <div className="border-b border-gray-700 bg-black/30 p-4">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Code size={20} className="mr-2" />
              Live Coding Session
            </h2>

            {/* Problem Statement */}
            <div className="mt-2">
              <h3 className="text-sm font-medium text-white">{problem.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{problem.description}</p>
              
              <div className="mt-2 flex items-start">
                <div className="bg-gray-800/50 p-2 rounded-md mr-4">
                  <Hash size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Example</p>
                  <p className="text-sm text-white">
                    <span className="text-gray-400">Input:</span> {problem.example.input}
                  </p>
                  <p className="text-sm text-white">
                    <span className="text-gray-400">Output:</span> {problem.example.output}
                  </p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-xs text-gray-400">Constraints</p>
                <ul className="text-xs text-gray-300 space-y-1">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-400 mr-1">•</span>
                      {constraint}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-grow relative">
            <Editor
              height="100%"
              language="javascript"
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
              onMount={(editor) => { editorRef.current = editor; }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: 'on',
                fontFamily: 'Menlo, Monaco, "Courier New", monospace'
              }}
            />

            {/* AI Hint */}
            {aiSuggestions.length > 0 && (
              <div className="absolute bottom-4 right-4 w-64 bg-blue-500/10 p-2 rounded-md shadow-lg border border-blue-500/30">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <HelpCircle size={16} className="text-blue-400" />
                  </div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-blue-300">AI Suggestion:</p>
                    <p className="text-xs text-blue-400">{aiSuggestions[0]}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Editor Controls */}
          <div className="border-t border-gray-700 bg-black/30 p-4">
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <button 
                  onClick={runCode}
                  disabled={isExecuting}
                  className={`py-2 px-4 rounded text-sm font-medium flex items-center ${
                    isExecuting ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <Play size={16} className="mr-2" />
                  Run Code
                </button>
                <button 
                  onClick={submitCode}
                  className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium flex items-center"
                >
                  <Send size={16} className="mr-2" />
                  Submit Code
                </button>
                <button 
                  onClick={requestChange}
                  className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm font-medium flex items-center"
                >
                  <MessageSquare size={16} className="mr-2" />
                  Suggest Change
                </button>
              </div>

              <div className="flex items-center text-xs text-gray-400">
                <Clock size={14} className="mr-1" />
                25:14 remaining
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Recruiter AI Insights */}
        <div className="w-1/4 bg-black/30 backdrop-blur-lg overflow-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-white flex items-center">
              <BarChart2 size={20} className="mr-2" />
              AI-Powered Recruiter Insights
            </h2>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Real-Time Feedback</h3>
                <div className="space-y-3">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
                      <p className="text-sm text-gray-300">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Follow-Up Questions</h3>
              <div className="space-y-2">
                {aiQuestions.map((question, index) => (
                  <div key={index} className="bg-blue-500/10 p-3 rounded-md border border-blue-500/30">
                    <p className="text-sm text-blue-300">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recruiter Actions */}
            <div className="mt-6 space-y-2">
              <button className="w-full py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                <Zap size={16} className="mr-2" />
                Assign New Problem
              </button>
              <button 
                onClick={() => setShowReport(true)}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center"
              >
                Generate Report
              </button>
            </div>

            {/* Performance Report (shown when submitted) */}
            {showReport && (
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h3 className="text-sm font-medium text-white mb-2">Interview Performance Summary</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <p className="text-xs text-gray-400">Problem-Solving</p>
                      <p className="text-xl font-medium text-white">{performanceReport.scores.problemSolving}/10</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <p className="text-xs text-gray-400">Efficiency</p>
                      <p className="text-xl font-medium text-white">{performanceReport.scores.efficiency}/10</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <p className="text-xs text-gray-400">Readability</p>
                      <p className="text-xl font-medium text-white">{performanceReport.scores.readability}/10</p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-md">
                      <p className="text-xs text-gray-400">Confidence</p>
                      <p className="text-xl font-medium text-white">{performanceReport.scores.confidence}%</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-400 mb-1">AI Feedback</h4>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {performanceReport.feedback.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-400 mr-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                      <CheckCircle size={16} className="mr-2" />
                      Shortlist
                    </button>
                    <button className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  </div>
                  <button className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md text-sm font-medium transition flex items-center justify-center">
                    Schedule Follow-Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveInterviewRecruiter;
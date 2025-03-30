import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useParams, Link } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {
  Video, VideoOff, Mic, MicOff, PhoneOff, Play, Send, Zap, Code, BarChart2, Home, Users, FileText
} from "lucide-react";

const RoomPage = () => {
  const { roomId } = useParams();
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [code, setCode] = useState(`function solveProblem(s) {\n  // Your solution here\n}`);
  const [isExecuting, setIsExecuting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const editorRef = useRef(null);
  const zegoContainerRef = useRef(null);

  const problem = {
    title: "Find the Longest Substring Without Repeating Characters",
    description: "Write a function to find the length of the longest substring without repeating characters.",
    example: {
      input: '"abcabcbb"',
      output: "3"
    },
    constraints: [
      "The input string consists of English letters, digits, symbols, and spaces.",
      "The length of the input string is at most 10^4."
    ]
  };

  const aiInsights = [
    "Candidate hesitated before implementing sliding window logic.",
    "Typing speed slowed during edge case handling.",
    "Consider asking about time complexity optimizations."
  ];

  // Initialize ZegoCloud when component mounts
  useEffect(() => {
    if (zegoContainerRef.current) {
      initializeZegoCloud();
    }
  }, []);

  const initializeZegoCloud = async () => {
    const appID = 1815521280;
    const serverSecret = "070aa89143d608886a875fb8b311f83b";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId || Math.floor(Math.random() * 10000).toString(),
      Date.now().toString(),
      "Interviewer"
    );
    
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: zegoContainerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      layout: "Grid", // Changed to Grid for equal space
      showUserList: false,
      showLayoutButton: false,
      showNonVideoUser: true,
      showLeavingView: true,
      turnOnCameraWhenJoining: videoOn,
      turnOnMicrophoneWhenJoining: micOn,
      maxUsers: 2,
      aspectRatio: 16/9, // Fixed aspect ratio
    });
  };

  const runCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setAiSuggestions([
        "Consider using a sliding window approach for better efficiency.",
        "Optimize space complexity by using a hash map."
      ]);
    }, 2000);
  };

  const submitCode = () => {
    alert("Code submitted successfully!");
  };

  // Handle editor initialization
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    // Improve editor appearance
    editor.updateOptions({
      fontSize: 14,
      lineHeight: 22,
      scrollBeyondLastLine: false,
      minimap: { enabled: false },
      scrollbar: { vertical: 'auto', horizontal: 'auto' },
      renderLineHighlight: 'all',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Fixed Navbar */}
      <header className="bg-black/50 backdrop-blur-md border-b border-gray-800 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-blue-500 font-bold text-xl">
              <Code className="mr-2" size={24} />
              Codac
            </Link>
            <nav className="ml-10 flex space-x-6">
              <Link to="/" className="text-gray-300 hover:text-white flex items-center text-sm">
                <Home size={16} className="mr-1" />
                Home
              </Link>
              <Link to="/candidates" className="text-gray-300 hover:text-white flex items-center text-sm">
                <Users size={16} className="mr-1" />
                Candidates
              </Link>
              <Link to="/reports" className="text-gray-300 hover:text-white flex items-center text-sm">
                <FileText size={16} className="mr-1" />
                AI Reports
              </Link>
              <Link to="/interview" className="text-white bg-blue-600 px-3 py-1 rounded-md text-sm flex items-center">
                <Video size={16} className="mr-1" />
                Conduct Interview
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              P
            </div>
            <Link to="/logout" className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded">
              Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Panel: Video Call */}
        <div className="w-1/4 border-r border-gray-700 bg-black/30 backdrop-blur-lg flex flex-col">
          <div className="p-4 h-full flex flex-col">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Video size={20} className="mr-2" />
              Live Interview
            </h2>
            <div className="mt-4 flex-grow relative bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
              <div ref={zegoContainerRef} className="w-full h-full absolute inset-0"></div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  micOn ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                }`}
              >
                {micOn ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center ${
                  videoOn ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700 text-gray-300"
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

        {/* Middle Panel: Problem Statement & Code Editor */}
        <div className="flex-1 flex flex-col border-r border-gray-700 overflow-hidden">
          <div className="border-b border-gray-700 bg-black/30 p-4 overflow-y-auto max-h-64">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Code size={20} className="mr-2" />
              Problem Statement
            </h2>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-white">{problem.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{problem.description}</p>
              <div className="mt-2 bg-gray-800/50 p-2 rounded-md">
                <p className="text-xs text-gray-400">Example</p>
                <p className="text-sm text-white">
                  <span className="text-gray-400">Input:</span> {problem.example.input}
                </p>
                <p className="text-sm text-white">
                  <span className="text-gray-400">Output:</span> {problem.example.output}
                </p>
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
          <div className="flex-grow relative">
            <Editor
              height="100%"
              language="javascript"
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: "on",
                renderLineHighlight: "all",
                minimap: { enabled: false },
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              }}
            />
          </div>
          <div className="border-t border-gray-700 bg-black/30 p-4">
            <div className="flex justify-between">
              <button
                onClick={runCode}
                disabled={isExecuting}
                className={`py-2 px-4 rounded text-sm font-medium flex items-center ${
                  isExecuting ? "bg-gray-800/50 text-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <Play size={16} className="mr-2" />
                {isExecuting ? "Running..." : "Run Code"}
              </button>
              <button
                onClick={submitCode}
                className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded text-sm font-medium flex items-center"
              >
                <Send size={16} className="mr-2" />
                Submit Code
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel: AI Insights */}
        <div className="w-1/4 bg-black/30 backdrop-blur-lg flex flex-col">
          <div className="p-4 flex flex-col h-full">
            <h2 className="text-lg font-medium text-white flex items-center">
              <BarChart2 size={20} className="mr-2" />
              AI Insights
            </h2>
            <div className="mt-4 space-y-3 flex-grow overflow-y-auto">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-gray-800/50 p-3 rounded-md border border-gray-700">
                  <p className="text-sm text-gray-300">{insight}</p>
                </div>
              ))}
              {aiSuggestions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-blue-400 mb-2">Code Suggestions</h3>
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={`sugg-${index}`} className="bg-blue-900/20 p-3 rounded-md border border-blue-800/30 mb-2">
                      <p className="text-sm text-blue-200">{suggestion}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center">
              <Zap size={16} className="mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
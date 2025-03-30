import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useLocation } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Play, PauseCircle, Send 
} from 'lucide-react';

const EnhancedCodeEditor = () => {
  const location = useLocation();
  const { challengeData } = location.state || {}; // Retrieve challenge data from state

  // Extract keyword from the problem for function name
  const keyword = challengeData?.problem?.split(' ')[1]?.toLowerCase() || 'solution';

  // Language options
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'typescript', label: 'TypeScript' },
  ];

  // Language templates
  const languageTemplates = {
    javascript: `function ${keyword}(input) {\n  // Your solution here\n}`,
    python: `def ${keyword}(input):\n  # Your solution here`,
    java: `public class Solution {\n  public static void ${keyword}(String input) {\n    // Your solution here\n  }\n}`,
    cpp: `void ${keyword}(string input) {\n  // Your solution here\n}`,
    typescript: `function ${keyword}(input: string): void {\n  // Your solution here\n}`,
  };

  // Editor state
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState(languageTemplates['javascript']);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef(null);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(1542); // 25:42 in seconds
  const [timerActive, setTimerActive] = useState(true);

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

  // Editor mount handler
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  // Handle language change
  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(languageTemplates[lang]);
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Panel: Problem Statement & Test Cases */}
        <div className="w-1/4 border-r border-gray-700 bg-black/30 backdrop-blur-lg overflow-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-white">Problem Statement</h2>
            <p className="mt-4 text-gray-300">{challengeData?.problem || 'No problem available'}</p>

            <h3 className="mt-6 text-lg font-medium text-white">Test Cases</h3>
            <ul className="mt-2 space-y-2">
              {challengeData?.test_cases?.map((test, index) => (
                <li key={index} className="text-gray-400">
                  <strong>Input:</strong> {JSON.stringify(test.input)} | <strong>Expected Output:</strong> {JSON.stringify(test.expected)}
                </li>
              )) || <li className="text-gray-400">No test cases available</li>}
            </ul>
          </div>

          {/* Timer */}
          <div className="border-t border-gray-700 p-4 bg-black/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock size={16} className="text-gray-400 mr-2" />
                <span className="font-medium text-gray-300">Time Remaining: {formatTime(timeRemaining)}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-3">
              <button 
                onClick={toggleTimer} 
                className="flex-1 py-1.5 px-3 border border-gray-600 rounded text-sm font-medium bg-gray-800/50 hover:bg-gray-800 text-gray-300 flex items-center justify-center transition"
              >
                {timerActive ? (
                  <>
                    <PauseCircle size={14} className="mr-1.5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play size={14} className="mr-1.5" />
                    Resume
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Middle Panel: Monaco Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between border-b border-gray-700 bg-black/30 py-2 px-4">
            <h2 className="text-sm font-medium text-white">Write Your Solution Below</h2>
            <div>
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-gray-800/50 text-gray-300"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={selectedLanguage}
              value={code}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: 'on',
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              }}
            />
          </div>

          {/* Bottom Panel: Run and Submit Buttons */}
          <div className="border-t border-gray-700 bg-black/30 p-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => console.log('Run Code clicked')}
                  className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium flex items-center justify-center transition"
                >
                  Run Code
                </button>
                <button
                  onClick={() => console.log('Submit Solution clicked')}
                  className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium flex items-center justify-center transition"
                >
                  Submit Solution
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCodeEditor;
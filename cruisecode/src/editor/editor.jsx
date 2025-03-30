import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Save, Share2, Settings } from 'lucide-react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('// Start coding here...');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('> Ready to execute code...');
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef(null);

  // Language templates
  const languageTemplates = {
    javascript: '// JavaScript code here\nconsole.log("Hello World");',
    python: '# Python code here\nprint("Hello World")',
    java: '// Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
    cpp: '// C++ code here\n#include <iostream>\n\nint main() {\n  std::cout << "Hello World";\n  return 0;\n}',
    c: '// C code here\n#include <stdio.h>\n\nint main() {\n  printf("Hello World");\n  return 0;\n}'
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
    setOutput(`> Switched to ${lang} mode`);
  };

  const handleRun = async () => {
    if (!isEditorReady) return;

    const currentCode = editorRef.current.getValue();
    setOutput('> Executing code...\n');

    try {
      if (language === 'javascript') {
        const originalConsoleLog = console.log;
        let logs = [];

        console.log = (...args) => {
          logs.push(args.join(' '));
          originalConsoleLog(...args);
        };

        eval(currentCode);
        console.log = originalConsoleLog;

        setOutput(prev => prev + logs.join('\n') + '\n> Execution completed');
      } else {
        const response = await axios.post('http://localhost:5050/api/compile', {
          language,
          code: currentCode,
        });

        setOutput(prev => prev + `\n> Output:\n${response.data.output}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message;
      setOutput(prev => prev + `\n> Error:\n${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <div className="flex items-center justify-between py-4 px-6 bg-gray-900">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-white"
          >
            Code Editor
          </motion.h1>
          <div className="flex space-x-3">
            <button 
              onClick={handleRun}
              disabled={!isEditorReady}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isEditorReady 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Play className="h-4 w-4" />
              <span>Run</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Language Selection */}
        <div className="px-6 py-4 bg-gray-900">
          <label htmlFor="language-select" className="text-white text-sm mr-2">
            Select Language:
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-3 py-2 rounded-md bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-lg overflow-hidden h-[calc(100vh-250px)]"
            >
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400">
                  {language.toUpperCase()}
                </span>
              </div>
              <Editor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-900 rounded-lg p-4 lg:col-span-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Output</h2>
              <button 
                onClick={() => setOutput('> Console cleared')}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Clear
              </button>
            </div>
            <div className="bg-black rounded-lg p-4 h-[calc(100vh-300px)] text-green-400 font-mono whitespace-pre-wrap overflow-auto">
              {output}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
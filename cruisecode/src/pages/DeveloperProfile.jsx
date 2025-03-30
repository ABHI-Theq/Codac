import React from 'react';
import { 
  User, Code, Award, BarChart, Calendar, 
  Edit, Shield, CheckCircle, XCircle, 
  Link, Download, Share2, Clock, Zap, Star, 
  ChevronLeft, Settings, Book, HelpCircle 
} from 'lucide-react';

const DeveloperProfile = () => {
  // Sample data
  const profileData = {
    name: "John Doe",
    level: "Intermediate",
    languages: ["Python", "JavaScript"],
    challengesSolved: 15,
    pendingInterviews: 2,
    aiScore: 92,
    blockchainVerified: true,
    nftCertificateHash: "0xa3b8c0d9...f92a3e"
  };

  const challenges = [
    { id: 1, name: "Find Missing Positive Integer", difficulty: "Medium", score: 92, verified: true },
    { id: 2, name: "Merge Two Sorted Lists", difficulty: "Easy", score: 88, verified: true },
    { id: 3, name: "LRU Cache Design", difficulty: "Hard", score: 85, verified: false }
  ];

  const badges = [
    { name: "Data Structures Master", description: "Scored 90%+ in Array problems" },
    { name: "Efficient Coder", description: "Achieved optimal solutions consistently" },
    { name: "Top 10% Performer", description: "Leaderboard ranking badge" }
  ];

  const interviews = [
    { 
      id: 1, 
      company: "TechCorp Inc.", 
      date: "April 2, 2025", 
      time: "4:00 PM IST", 
      recruiter: "Sarah Smith", 
      role: "Senior Backend Developer",
      status: "pending" 
    },
    { 
      id: 2, 
      company: "BlockChain Labs", 
      date: "April 5, 2025", 
      time: "10:30 AM EST", 
      recruiter: "Michael Chen", 
      role: "Smart Contract Engineer",
      status: "pending" 
    },
    { 
      id: 3, 
      company: "AI Solutions", 
      date: "March 30, 2025", 
      time: "2:00 PM GMT", 
      recruiter: "Emma Wilson", 
      role: "ML Engineer",
      status: "completed" 
    }
  ];

  const generateStars = (difficulty) => {
    const count = difficulty === 'Easy' ? 1 : difficulty === 'Medium' ? 3 : 5;
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
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <ChevronLeft size={20} className="mr-1" />
                  <span>Dashboard</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <Code size={20} className="mr-1" />
                  <span>Challenges</span>
                </a>
                <a href="#" className="flex items-center text-gray-300 hover:text-blue-500">
                  <BarChart size={20} className="mr-1" />
                  <span>Leaderboard</span>
                </a>
              </nav>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">👨‍💻 Developer | {profileData.name}</span>
                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel: Developer Profile Overview */}
          <div className="space-y-6">
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <User size={20} className="mr-2" />
                {profileData.name}'s Profile
              </h2>
              
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Experience Level</p>
                  <p className="text-white font-medium">{profileData.level}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Preferred Languages</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profileData.languages.map(lang => (
                      <span key={lang} className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Total Challenges Solved</p>
                  <p className="text-white font-medium">{profileData.challengesSolved}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Live Interview Invitations</p>
                  <p className="text-white font-medium">{profileData.pendingInterviews}</p>
                </div>
              </div>
              
              <button className="mt-6 w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md font-medium text-sm transition flex items-center justify-center">
                <Edit size={16} className="mr-2" />
                Edit Profile
              </button>
            </div>
            
            {/* Interview Invitations */}
            <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
              <h2 className="text-lg font-medium text-white flex items-center">
                <Calendar size={20} className="mr-2" />
                Your Upcoming Interviews
              </h2>
              
              <div className="mt-4 space-y-4">
                {interviews.filter(i => i.status === "pending").map(interview => (
                  <div key={interview.id} className="border border-gray-700 rounded-md p-4">
                    <h3 className="font-medium text-white">{interview.role}</h3>
                    <p className="text-sm text-blue-400">{interview.company}</p>
                    
                    <div className="mt-3 space-y-1 text-sm">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-400" />
                        <span className="text-gray-300">{interview.date} - {interview.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-400" />
                        <span className="text-gray-300">Recruiter: {interview.recruiter}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-3">
                      <button className="flex-1 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded text-sm font-medium transition">
                        <CheckCircle size={14} className="inline mr-1" />
                        Accept
                      </button>
                      <button className="flex-1 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-sm font-medium transition">
                        <XCircle size={14} className="inline mr-1" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
                
                {interviews.filter(i => i.status === "completed").map(interview => (
                  <div key={interview.id} className="border border-gray-700 rounded-md p-4 opacity-75">
                    <h3 className="font-medium text-gray-400">{interview.role}</h3>
                    <p className="text-sm text-blue-400/70">{interview.company}</p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <CheckCircle size={12} className="mr-1 text-green-400" />
                      Completed on {interview.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Middle Panel: Challenges & Achievements */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Award size={20} className="mr-2" />
              Your Past Submissions & AI Certificates
            </h2>
            
            <div className="mt-4 space-y-4">
              <h3 className="text-sm font-medium text-gray-400">Recent Coding Challenges</h3>
              
              {challenges.map(challenge => (
                <div key={challenge.id} className="border border-gray-700 rounded-md p-4 hover:border-blue-500/50 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-white">{challenge.name}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex mr-3">
                          {generateStars(challenge.difficulty)}
                        </div>
                        <span className="text-xs text-gray-400">{challenge.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        challenge.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        AI Score: {challenge.score}/100
                      </span>
                      {challenge.verified && (
                        <p className="text-xs text-blue-400 mt-1 flex items-center justify-end">
                          <Shield size={12} className="mr-1" />
                          Blockchain Verified
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <button className="flex-1 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded text-sm font-medium transition">
                      View Details
                    </button>
                    {challenge.verified && (
                      <button className="flex-1 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded text-sm font-medium transition">
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 mt-4 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-md font-medium text-sm transition">
                View All Past Challenges
              </button>
              
              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Skill Badges Earned</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {badges.map((badge, index) => (
                    <div key={index} className="border border-gray-700 rounded-md p-3 hover:border-yellow-500/50 transition">
                      <div className="flex items-start">
                        <div className="bg-yellow-500/10 p-2 rounded-md mr-3">
                          <Award size={18} className="text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{badge.name}</h4>
                          <p className="text-xs text-gray-400">{badge.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium text-sm transition flex items-center justify-center">
                <Zap size={16} className="mr-2" />
                Retake a Challenge
              </button>
            </div>
          </div>
          
          {/* Right Panel: Blockchain Certificates */}
          <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-6 border border-gray-700">
            <h2 className="text-lg font-medium text-white flex items-center">
              <Link size={20} className="mr-2" />
              Blockchain Certifications
            </h2>
            <p className="text-sm text-gray-400 mt-1">Secure & Tamper-Proof</p>
            
            <div className="mt-6 p-4 bg-gray-800/30 rounded-md border border-gray-700">
              <div className="flex items-start">
                <div className="bg-purple-500/10 p-3 rounded-md mr-4">
                  <Shield size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Advanced Algorithm Specialist</h3>
                  <p className="text-xs text-gray-400 mt-1">Issued on Ethereum/Polygon</p>
                  <p className="text-xs font-mono text-blue-400 mt-2">
                    Certificate Hash: {profileData.nftCertificateHash}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Why Blockchain?</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <CheckCircle size={14} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Prevents Fake Resumes → Recruiters can verify skills without trusting a PDF
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={14} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Skill Ownership → You own your certificates as NFTs, transferable across jobs
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={14} className="text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    Immutable & Secure → No one can modify your past achievements
                  </li>
                </ul>
              </div>
              
              <div className="flex space-x-2 mt-6">
                <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
                <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md text-sm font-medium transition flex items-center justify-center">
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Verification Tools</h3>
              
              <button className="w-full py-2 mb-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition flex items-center justify-center">
                <Link size={16} className="mr-2" />
                Verify on Blockchain Explorer
              </button>
              
              <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md text-sm font-medium transition flex items-center justify-center">
                <Book size={16} className="mr-2" />
                How Blockchain Verification Works
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperProfile;
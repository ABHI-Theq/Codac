import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, ChevronDown, X, Code } from 'lucide-react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [age,setAge]=useState(null)
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const {user,setUser}=useUserContext()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!role) {
      setError('Please select a role');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/sign-up`, {
        fullname: name,
        email,
        password,
        confirmpassword: confirmPassword, 
        age,
        role,
        skills,
      });

      if (response.status === 201) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token); // Store token
        setUser(response.data.user)
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && skill.trim()) {
      e.preventDefault();
      if (!skills.includes(skill.trim())) {
        setSkills([...skills, skill.trim()]);
      }
      setSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-black/30 p-8 rounded-xl backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white">Create your account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full name"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Age"
              />
            </div>
            
            {/* Role Dropdown */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <div 
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white cursor-pointer flex justify-between items-center"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              >
                <span className={role ? 'text-white' : 'text-gray-400'}>
                  {role || 'Select your role'}
                </span>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              
              {isRoleDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
                  <div 
                    className="px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
                    onClick={() => {
                      setRole('Developer');
                      setIsRoleDropdownOpen(false);
                    }}
                  >
                    Developer
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-700 text-white cursor-pointer"
                    onClick={() => {
                      setRole('Recruiter');
                      setIsRoleDropdownOpen(false);
                    }}
                  >
                    Recruiter
                  </div>
                </div>
              )}
            </div>
            
            {/* Skills Input */}
            <div className="relative">
              <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add skills (press Enter to add)"
              />
            </div>
            
            {/* Skills Tags */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((s, index) => (
                  <div 
                    key={index}
                    className="flex items-center bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full"
                  >
                    <span>{s}</span>
                    <X 
                      className="h-4 w-4 ml-2 cursor-pointer hover:text-blue-300"
                      onClick={() => removeSkill(s)}
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-blue-500 hover:text-blue-400">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:text-blue-400">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute right-3 inset-y-0 flex items-center">
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            Create account
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default SignUpPage;
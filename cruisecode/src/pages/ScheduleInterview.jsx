import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add navigation for starting the interview

const ScheduleInterview = () => {
  const [candidateName, setCandidateName] = useState('');
  const [role, setRole] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [interviewType, setInterviewType] = useState('later'); // Add state for interview type
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (interviewType === 'later') {
      // Logic to handle scheduling the interview
      console.log({ candidateName, role, date, time });
      alert('Interview Scheduled Successfully!');
    } else {
      // Logic to start the interview immediately
      const roomId = `${candidateName}-${Date.now()}`; // Generate a unique room ID
      console.log({ candidateName, role, roomId });
      alert('Starting the interview now!');
      navigate(`/room/${roomId}`); // Redirect to RoomPage with the unique room ID
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="bg-black/30 backdrop-blur-lg shadow-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <h1 className="text-xl font-bold text-blue-500">Schedule an Interview</h1>
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="bg-black/30 backdrop-blur-lg rounded-lg shadow p-8 border border-gray-700 space-y-4 w-full max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-400">Candidate Name</label>
            <input
              type="text"
              className="block w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Role</label>
            <input
              type="text"
              className="block w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Interview Type</label>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="interviewType"
                  value="later"
                  checked={interviewType === 'later'}
                  onChange={() => setInterviewType('later')}
                  className="form-radio text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2">Schedule for Later</span>
              </label>
              <label className="flex items-center text-gray-300">
                <input
                  type="radio"
                  name="interviewType"
                  value="now"
                  checked={interviewType === 'now'}
                  onChange={() => setInterviewType('now')}
                  className="form-radio text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2">Start Now</span>
              </label>
            </div>
          </div>
          {interviewType === 'later' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-400">Date</label>
                <input
                  type="date"
                  className="block w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Time</label>
                <input
                  type="time"
                  className="block w-full mt-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium text-sm transition"
          >
            {interviewType === 'later' ? 'Schedule Interview' : 'Start Interview'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ScheduleInterview;

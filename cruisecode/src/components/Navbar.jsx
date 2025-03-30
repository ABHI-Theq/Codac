import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Code2, Menu } from "lucide-react";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Redirect to role-based dashboard
  const handleHomeClick = () => {
    if (user?.role === "Developer") {
      navigate("/developer-dashboard");
    } else if (user?.role === "Recruiter") {
      navigate("/recruiter-dashboard");
    } else {
      navigate("/");
    }
  };

  // Check if the current page is the landing page
  const isLandingPage = location.pathname === "/";

  return (
    <nav className="bg-black/50 backdrop-blur-md fixed w-full z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              Codac
            </span>
          </Link>

          {/* Show nothing else if on the landing page */}
          {!isLandingPage && (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={handleHomeClick}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </button>

                  {/* Developer-Specific Links */}
                  {user?.role === "Developer" && (
                    <>
                      <Link to="/challenges-editor" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Editor
                      </Link>
                      <Link to="/challenges" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Challenges
                      </Link>
                      <Link to="/eval-report" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        AI Debugging
                      </Link>
                      <Link to="/developer-profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          const shareLink = `${window.location.origin}/workspace/${user?.id}`;
                          navigator.clipboard.writeText(shareLink);
                          alert(`Collaboration link copied: ${shareLink}`);
                        }}
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Share Link
                      </button>
                    </>
                  )}

                  {/* Recruiter-Specific Links */}
                  {user?.role === "Recruiter" && (
                    <>
                      <Link to="/candidates" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Candidates
                      </Link>
                      <Link to="/ai-reports" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        AI Reports
                      </Link>
                      <Link to="/schedule-interview" className="text-gray-300 hover:text-blue-500">
                        Conduct Interview
                      </Link>
                      <Link to="/recruiter-profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        Profile
                      </Link>
                    </>
                  )}

                  {/* Login/Logout Button */}
                  {user?.role ? (
                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Logout
                    </button>
                  ) : (
                    <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Login
                    </Link>
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {!isLandingPage && isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={handleHomeClick}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </button>

            {/* Developer-Specific Links */}
            {user?.role === "Developer" && (
              <>
                <Link to="/challenges-editor" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Editor
                </Link>
                <Link to="/challenges" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Challenges
                </Link>
                <Link to="/eval-report" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  AI Debugging
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Profile
                </Link>
              </>
            )}

            {/* Recruiter-Specific Links */}
            {user?.role === "Recruiter" && (
              <>
                <Link to="/candidates" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Candidates
                </Link>
                <Link to="/ai-reports" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  AI Reports
                </Link>
                <Link to="/schedule-interview" className="text-gray-300 hover:text-blue-500">
                  Conduct Interview
                </Link>
              </>
            )}

            {/* Login/Logout Button */}
            {user?.role ? (
              <button onClick={handleLogout} className="bg-red-500 text-white block px-3 py-2 rounded-md text-base font-medium">
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-blue-500 text-white block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

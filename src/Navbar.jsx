// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Moon, ArrowRight, Menu, X, User, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Check if token is still valid
          const tokenData = JSON.parse(atob(token.split('.')[1]));
          const currentTime = Date.now() / 1000;
          
          if (tokenData.exp > currentTime) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
          } else {
            // Token expired, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
            setUser(null);
          }
        } catch (error) {
          // Invalid token, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    return () => window.removeEventListener('storage', checkAuth);
  }, [location]);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStartedClick = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/green-funds');
    }
    setIsMobileMenuOpen(false);
  };

  const handleFeaturesClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/features');
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`flex items-center justify-between fixed top-0 border-b w-full p-4 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-gray-900/95 border-gray-700/50 shadow-2xl py-3' 
          : 'backdrop-blur-lg bg-gray-900/80 border-gray-800/50 shadow-lg py-4'
      }`}>
        <div className="flex items-center space-x-2">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 
                          bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            GreenVest
          </span>
        </div>

        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-6 mr-6 bg-white/5  backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium
                                   relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button onClick={handleFeaturesClick} className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium
                                   relative group">
              Features {!isAuthenticated && <span className="text-xs text-yellow-400 ml-1">*</span>}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <a href="#faq" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium
                                   relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#working" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium
                                   relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all 
                              duration-300 backdrop-blur-sm border border-white/10 hover:border-green-400/50">
              <Moon className="w-4 h-4 text-gray-300 hover:text-green-400 transition-colors" />
            </button>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Welcome, {user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 
                           border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 
                           px-4 py-2 rounded-full font-medium transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button 
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-green-400 px-4 py-2 rounded-full 
                           font-medium transition-all duration-300 border border-gray-600 
                           hover:border-green-400"
                >
                  Login
                </button>
                <button 
                  onClick={handleGetStartedClick}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 
                            hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-full 
                            font-semibold transition-all duration-300 transform hover:scale-105 
                            shadow-lg hover:shadow-green-500/25"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all 
                        duration-300 backdrop-blur-sm border border-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-gray-300" />
              ) : (
                <Menu className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-xl 
                       border-b border-gray-700/50 md:hidden">
          <div className="px-4 py-6 space-y-4">
            <a href="#about" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="block text-gray-300 hover:text-green-400 transition-colors font-medium">
              About
            </a>
            <button 
               onClick={handleFeaturesClick}
               className="block text-left w-full text-gray-300 hover:text-green-400 transition-colors font-medium">
              Features {!isAuthenticated && <span className="text-xs text-yellow-400 ml-1">*</span>}
            </button>
            <a href="#faq" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="block text-gray-300 hover:text-green-400 transition-colors font-medium">
              FAQ
            </a>
            <a href="#working" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="block text-gray-300 hover:text-green-400 transition-colors font-medium">
              How It Works
            </a>
            {isAuthenticated ? (
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <div className="flex items-center space-x-2 text-green-400">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-red-500/20 
                           border border-red-500/30 text-red-400 px-5 py-2.5 rounded-full 
                           font-medium transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4 border-t border-gray-700">
                <button 
                  onClick={handleLogin}
                  className="w-full text-gray-300 hover:text-green-400 px-5 py-2.5 rounded-full 
                           font-medium transition-all duration-300 border border-gray-600 
                           hover:border-green-400"
                >
                  Login
                </button>
                <button 
                  onClick={handleGetStartedClick}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r 
                            from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-full 
                            font-semibold transition-all duration-300"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
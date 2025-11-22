// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Moon, ArrowRight, Menu, X, User, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFeaturesSubmenu, setShowFeaturesSubmenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Feature navigation items
  const features = [
    { name: "ESG Investment Guide", path: "/features/esg-guide", icon: "📚" },
    { name: "Green Mutual Funds", path: "/features/green-funds", icon: "🌱" },
    { name: "Fund Comparison", path: "/features/fund-comparison", icon: "⚖️" },
    { name: "Impact Calculator", path: "/features/impact-calculator", icon: "🧮" },
    { name: "Green News", path: "/features/green-news", icon: "📰" },
    { name: "AI Assistant", path: "/features/ai-assistant", icon: "🤖" },
  ];

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
    if (!isAuthenticated) {
      navigate('/login');
      setIsMobileMenuOpen(false);
      return;
    }
    setShowFeaturesSubmenu(!showFeaturesSubmenu);
  };

  const handleFeatureNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setShowFeaturesSubmenu(false);
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
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            {/* <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GV</span>
            </div> */}
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-500 
                            bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              GreenVue
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 mr-4 xl:mr-6 bg-white/5 backdrop-blur-sm px-3 xl:px-4 py-2 rounded-full border border-white/10">
            <a href="#about" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                                   relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <button onClick={handleFeaturesClick} className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                                   relative group">
              Tools {!isAuthenticated && <span className="text-xs text-yellow-400 ml-1">*</span>}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button 
              onClick={() => {navigate('/green-funds'); setIsMobileMenuOpen(false);}} 
              className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                         relative group"
            >
              Funds
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            {/* <button 
              onClick={() => {navigate('/green-news'); setIsMobileMenuOpen(false);}} 
              className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                         relative group"
            >
              News
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </button> */}
            {isAuthenticated && (
              <button 
                onClick={() => navigate('/portfolio')} 
                className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                           relative group"
              >
                Portfolio
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            )}
            <a href="#faq" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium text-sm xl:text-base
                                   relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          {/* Search Bar - Hidden on small screens */}
          {/* <div className="hidden xl:flex items-center mr-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search funds..."
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300 w-48"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div> */}
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all 
                              duration-300 backdrop-blur-sm border border-white/10 hover:border-green-400/50">
              <Moon className="w-4 h-4 text-gray-300 hover:text-green-400 transition-colors" />
            </button> */}
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-2 lg:px-3 py-2 rounded-full border border-white/10">
                  <User className="w-4 h-4 text-green-400" />
                  <span className="text-xs lg:text-sm text-gray-300 max-w-24 lg:max-w-none truncate">Welcome, {user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 lg:space-x-2 bg-red-500/20 hover:bg-red-500/30 
                           border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 
                           px-2 lg:px-4 py-2 rounded-full font-medium transition-all duration-300 text-xs lg:text-sm"
                >
                  <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                <button 
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-green-400 px-3 lg:px-4 py-2 rounded-full 
                           font-medium transition-all duration-300 border border-gray-600 
                           hover:border-green-400 text-xs lg:text-sm"
                >
                  Login
                </button>
                <button 
                  onClick={handleGetStartedClick}
                  className="flex items-center space-x-1 lg:space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 
                            hover:from-green-600 hover:to-emerald-700 text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-full 
                            font-semibold transition-all duration-300 transform hover:scale-105 
                            shadow-lg hover:shadow-green-500/25 text-xs lg:text-sm"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all 
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-gray-900/98 backdrop-blur-xl 
                         border-l border-gray-700/50 lg:hidden z-40 overflow-y-auto transform transition-transform duration-300">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                              bg-clip-text text-transparent">
                GreenVue
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            
            <div className="px-4 py-6 space-y-3">
            {/* Search Bar for Mobile */}
            {/* <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search funds..."
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-3 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:bg-white/10 transition-all duration-300"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
             */}
            <a href="#about" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="flex items-center space-x-4 text-gray-300 hover:text-green-400 
                         hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-200 
                         font-medium p-4 rounded-xl border border-transparent hover:border-green-500/20"
               style={{ minHeight: '56px' }}>
              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-base">About</span>
            </a>
            
            <button 
               onClick={handleFeaturesClick}
               className="flex items-center justify-between w-full text-gray-300 hover:text-green-400 
                         hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-200 
                         font-medium p-4 rounded-xl border border-transparent hover:border-green-500/20"
               style={{ minHeight: '56px' }}>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-base">Tools & Features</span>
              </div>
              <div className="flex items-center space-x-2">
                {!isAuthenticated && <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">Login Required</span>}
                <svg className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showFeaturesSubmenu ? 'rotate-90' : ''}`} 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
            {/* Features Submenu */}
            {showFeaturesSubmenu && isAuthenticated && (
              <div className="ml-6 space-y-2 border-l-2 border-green-500/20 pl-4">
                {features.map((feature) => (
                  <button
                    key={feature.path}
                    onClick={() => handleFeatureNavigation(feature.path)}
                    className="flex items-center space-x-3 w-full text-gray-400 hover:text-green-300 
                              hover:bg-green-500/5 transition-all duration-200 font-medium p-3 rounded-lg
                              text-sm"
                  >
                    <span className="text-lg">{feature.icon}</span>
                    <span>{feature.name}</span>
                  </button>
                ))}
              </div>
            )}
            
            <button 
              onClick={() => {navigate('/green-funds'); setIsMobileMenuOpen(false);}} 
              className="flex items-center justify-between w-full text-gray-300 hover:text-green-400 
                        hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-200 
                        font-medium p-4 rounded-xl border border-transparent hover:border-green-500/20"
              style={{ minHeight: '56px' }}>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-base">Green Funds</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* <button 
              onClick={() => {navigate('/green-news'); setIsMobileMenuOpen(false);}} 
              className="flex items-center space-x-3 w-full text-gray-300 hover:text-green-400 hover:bg-white/5 transition-all duration-300 font-medium p-3 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <span>ESG News</span>
            </button> */}
            
            {isAuthenticated && (
              <button 
                onClick={() => {navigate('/portfolio'); setIsMobileMenuOpen(false);}}
                className="flex items-center justify-between w-full text-gray-300 hover:text-green-400 
                          hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-200 
                          font-medium p-4 rounded-xl border border-transparent hover:border-green-500/20"
                style={{ minHeight: '56px' }}>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-base">Portfolio</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </button>
            )}
            
            <a href="#faq" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="flex items-center space-x-4 text-gray-300 hover:text-green-400 
                         hover:bg-green-500/10 active:bg-green-500/20 transition-all duration-200 
                         font-medium p-4 rounded-xl border border-transparent hover:border-green-500/20"
               style={{ minHeight: '56px' }}>
              <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-base">FAQ</span>
            </a>
            {/* Authentication Section */}
            <div className="mt-6 pt-4 border-t border-gray-700/50">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 
                                 rounded-xl border border-green-500/20">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <span className="text-base text-green-400 font-semibold">Welcome back!</span>
                      <p className="text-sm text-gray-300 truncate max-w-40">{user?.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center space-x-3 bg-red-500/20 hover:bg-red-500/30
                             active:bg-red-500/40 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 
                             px-5 py-4 rounded-xl font-medium transition-all duration-200"
                    style={{ minHeight: '56px' }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-base">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button 
                    onClick={handleLogin}
                    className="w-full text-gray-300 hover:text-green-400 hover:bg-green-500/10 
                             active:bg-green-500/20 px-5 py-4 rounded-xl font-medium transition-all duration-200 
                             border border-gray-600 hover:border-green-400"
                    style={{ minHeight: '56px' }}
                  >
                    <span className="text-base">Login</span>
                  </button>
                  <button 
                    onClick={handleGetStartedClick}
                    className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r 
                              from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                              active:from-green-700 active:to-emerald-800 text-white px-5 py-4 rounded-xl 
                              font-semibold transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                    style={{ minHeight: '56px' }}
                  >
                    <span className="text-base">Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
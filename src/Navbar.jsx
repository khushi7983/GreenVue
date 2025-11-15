// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Moon, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate('/features');
    }
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
            <a href="#features" className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium
                                   relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </a>
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
            
            <button 
              onClick={handleGetStartedClick}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-full 
                        font-semibold transition-all duration-300 transform hover:scale-105 
                        shadow-lg hover:shadow-green-500/25"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </button>

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
            <a href="#features" 
               onClick={() => setIsMobileMenuOpen(false)}
               className="block text-gray-300 hover:text-green-400 transition-colors font-medium">
              Features
            </a>
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
        </div>
      )}
    </>
  );
};

export default Navbar;
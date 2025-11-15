import React, { useState, useEffect } from 'react';
import { Moon, Sun, TrendingUp, Users, BarChart3, Globe, Upload, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import FeaturesSection from './Feature';
import FAQSection from './FAQSection';
import Working from './working';
import Footer from './Footer';
import AboutUs from './About';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/features');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100 overflow-hidden">
      {/* Enhanced Navbar with Dynamic Behavior */}
      <nav className={`flex items-center justify-between fixed top-0 border-b w-full p-6 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-gray-900/95 border-gray-700/50 shadow-2xl py-4' 
          : 'backdrop-blur-lg bg-gray-900/80 border-gray-800/50 shadow-lg py-6'
      }`}>
        {/* Enhanced Logo with Animation */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
            <div className="absolute inset-0 w-6 h-6 bg-green-400/20 rounded-full animate-ping" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                          bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
            GreenVest
          </span>
        </div>

        {/* Enhanced Navigation with Glassmorphism */}
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-8 mr-8 bg-white/5  backdrop-blur-sm px-6 py-3 rounded-full border border-white/10">
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
          
          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all 
                              duration-300 backdrop-blur-sm border border-white/10 hover:border-green-400/50">
              <Moon className="w-5 h-5 text-gray-300 hover:text-green-400 transition-colors" />
            </button>
            
            <button 
              onClick={handleGetStarted}
              className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full 
                        font-semibold transition-all duration-300 transform hover:scale-105 
                        shadow-lg hover:shadow-green-500/25"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Revolutionary Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-900 to-gray-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_60%)]" />
        </div>
        
        {/* Floating Animated Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/10 rounded-full 
                         filter blur-xl animate-float" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-emerald-500/10 rounded-full 
                         filter blur-xl animate-float-delayed" />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-green-400/10 rounded-full 
                         filter blur-xl animate-float-slow" />
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-emerald-400/10 rounded-full 
                         filter blur-xl animate-bounce-slow" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-green-500/10 backdrop-blur-sm 
                         border border-green-500/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-medium text-sm">The Future of Sustainable Investing</span>
          </div>

          {/* Main Heading with Typewriter Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block bg-gradient-to-r from-white via-green-100 to-white 
                           bg-clip-text text-transparent animate-fade-in-up">
              Invest Smart,
            </span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 
                           bg-clip-text text-transparent animate-fade-in-up-delayed 
                           drop-shadow-2xl">
              Invest Green!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto 
                        font-light leading-relaxed animate-fade-in-up-slow">
            Transform your portfolio with 
            <span className="text-green-400 font-semibold"> ESG funds </span> 
            and build a sustainable financial future that benefits both you and the planet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button 
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 
                        rounded-2xl font-bold text-lg transition-all duration-300 
                        transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25
                        border border-green-400/20 backdrop-blur-sm min-w-[200px]"
            >
              <span className="flex items-center space-x-2">
                <span>Start Investing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
            
            <button className="group flex items-center space-x-2 text-gray-300 hover:text-white 
                              px-8 py-4 rounded-2xl border border-gray-600/50 hover:border-green-400/50
                              backdrop-blur-sm transition-all duration-300 hover:bg-white/5 min-w-[200px]">
              <span className="font-semibold">Learn More</span>
              <div className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse" />
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">$2.3T+</div>
                <div className="text-gray-400 text-sm">Global ESG Assets</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
                <div className="flex items-center justify-center mb-3">
                  <Shield className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">85%</div>
                <div className="text-gray-400 text-sm">Risk Reduction</div>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 
                             hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
                <div className="flex items-center justify-center mb-3">
                  <Globe className="w-8 h-8 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400 text-sm">Happy Investors</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="w-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-gray-100">
        <div id="about">
          <AboutUs />
        </div>
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <div id="working">
          <Working />
        </div>
        
        <div id="faq">
          <FAQSection />
        </div>
        
        <Footer />
      </div> 
    </div>
  );
};

export default LandingPage;



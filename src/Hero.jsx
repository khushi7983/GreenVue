// src/components/Hero.jsx
import React from 'react';
import { TrendingUp, Shield, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onStartInvesting }) => {
  const navigate = useNavigate();

  const handleStartInvesting = () => {
    navigate('/green-funds');
  };

  const handleLearnMore = () => {
    // Check if user is authenticated for ESG guide
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/features/esg-guide');
    } else {
      navigate('/login');
    }
  };
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-900 to-gray-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
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

        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto 
                      font-light leading-relaxed animate-fade-in-up-slow">
          Experience next-generation investing with 
          <span className="text-green-400 font-semibold"> AI-powered recommendations</span>, 
          real-time analytics, and personalized ESG portfolio management that aligns your values with your wealth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button 
            onClick={handleStartInvesting}
            className="group relative bg-gradient-to-r from-green-500 to-emerald-600 
                      hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 
                      rounded-xl font-bold text-base transition-all duration-300 
                      transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25
                      border border-green-400/20 backdrop-blur-sm min-w-[180px]"
          >
            <span className="flex items-center space-x-2">
              <span>Start Investing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 
                           opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
          
          <button 
            onClick={handleLearnMore}
            className="group flex items-center space-x-2 text-gray-300 hover:text-white 
                            px-6 py-3 rounded-xl border border-gray-600/50 hover:border-green-400/50
                            backdrop-blur-sm transition-all duration-300 hover:bg-white/5 min-w-[180px]">
            <span className="font-semibold">Learn More</span>
            <div className="w-2 h-2 bg-green-400 rounded-full group-hover:animate-pulse" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 
                           hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">AI-Powered</div>
              <div className="text-gray-400 text-xs">Investment Assistant</div>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 
                           hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
              <div className="flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">Real-Time</div>
              <div className="text-gray-400 text-xs">NAV & Analytics</div>
            </div>
          </div>
          
          <div className="text-center group">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 
                           hover:bg-white/10 transition-all duration-300 hover:border-green-400/30">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400 text-xs">ESG Funds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
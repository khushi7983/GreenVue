import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaLightbulb, FaHandshake } from 'react-icons/fa';

const FeaturesHome = () => {
  return (
    <div className="p-8 lg:p-12 min-h-screen bg-gray-900">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 
                         bg-clip-text text-transparent">
            Advanced ESG Features
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
          Discover our comprehensive suite of AI-powered tools designed to make sustainable investing 
          intelligent, profitable, and impactful. Navigate through our features using the sidebar.
        </p>
      </motion.div>

      {/* Feature Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 rounded-2xl border border-gray-700/50 
                     hover:border-green-500/50 transition-all duration-300 group cursor-pointer backdrop-blur-sm
                     hover:shadow-xl hover:shadow-green-500/10"
        >
          <div className="bg-green-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 
                         group-hover:bg-green-500/30 transition-colors duration-300 group-hover:scale-110">
            <FaRocket className="text-green-400 text-xl" />
          </div>
          <h3 className="text-white font-semibold mb-3 text-base">AI-Powered Tools</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Intelligent investment assistant and automated fund recommendations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 
                     hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="bg-blue-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                         group-hover:bg-blue-500/30 transition-colors duration-300">
            <FaChartLine className="text-blue-400 text-xl" />
          </div>
          <h3 className="text-white font-semibold mb-2">Real-Time Analytics</h3>
          <p className="text-gray-400 text-sm">
            Live NAV prices, fund comparisons, and portfolio impact tracking
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 
                     hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="bg-purple-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                         group-hover:bg-purple-500/30 transition-colors duration-300">
            <FaLightbulb className="text-purple-400 text-xl" />
          </div>
          <h3 className="text-white font-semibold mb-2">Educational Resources</h3>
          <p className="text-gray-400 text-sm">
            Comprehensive ESG guides and market insights to inform your decisions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 
                     hover:border-emerald-500/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="bg-emerald-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                         group-hover:bg-emerald-500/30 transition-colors duration-300">
            <FaHandshake className="text-emerald-400 text-xl" />
          </div>
          <h3 className="text-white font-semibold mb-2">Impact Measurement</h3>
          <p className="text-gray-400 text-sm">
            Track your environmental and social impact with detailed calculations
          </p>
        </motion.div>
      </div>

      {/* Quick Start Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-8 rounded-2xl 
                   border border-green-500/20 mb-8"
      >
        <h2 className="text-2xl font-bold text-green-400 mb-4">🚀 Quick Start Guide</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-white font-semibold mb-2">1. Chat with AI</h3>
            <p className="text-gray-400 text-sm">
              Start with our AI Investment Assistant for personalized recommendations
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-white font-semibold mb-2">2. Compare Funds</h3>
            <p className="text-gray-400 text-sm">
              Use our Fund Comparison Tool to analyze ESG funds side-by-side
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-white font-semibold mb-2">3. Track Impact</h3>
            <p className="text-gray-400 text-sm">
              Monitor your environmental impact with our Impact Calculator
            </p>
          </div>
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gray-800/60 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50
                   shadow-2xl shadow-gray-900/50"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Platform <span className="text-green-400">Capabilities</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-4xl font-bold text-green-400 mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
            <div className="text-gray-400 text-sm font-medium">ESG Funds Available</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
            <div className="text-gray-400 text-sm font-medium">AI Assistant Support</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300">Real-Time</div>
            <div className="text-gray-400 text-sm font-medium">NAV Price Updates</div>
          </div>
          <div className="group">
            <div className="text-4xl font-bold text-emerald-400 mb-3 group-hover:scale-110 transition-transform duration-300">Advanced</div>
            <div className="text-gray-400 text-sm font-medium">Impact Analytics</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesHome;
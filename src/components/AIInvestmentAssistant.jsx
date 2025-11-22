import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, 
  FaUser, 
  FaPaperPlane, 
  FaChartLine, 
  FaBalanceScale, 
  FaBullseye, 
  FaShieldAlt,
  FaLightbulb,
  FaSpinner,
  FaTimes,
  FaCheck,
  FaArrowRight,
  FaStar,
  FaExclamationTriangle
} from 'react-icons/fa';
import axios from 'axios';
import aiService from '../services/aiService';

// Memoized ChatInterface component to prevent re-renders
const ChatInterface = React.memo(({ 
  messages, 
  isTyping, 
  messagesEndRef, 
  inputMessage, 
  handleInputChange, 
  handleKeyPress, 
  handleSendMessage, 
  chatInputRef,
  handleRiskAssessment,
  handleFundRecommendations,
  handleGoalPlanning
}) => (
  <div className="flex flex-col h-full">
    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 p-3 sm:p-4 max-h-80 sm:max-h-96">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg ${
            message.type === 'user' 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-700 text-gray-100'
          }`}>
            <div className="flex items-start gap-2">
              {message.type === 'bot' && <FaRobot className="text-green-400 mt-1 shrink-0" />}
              <p className="text-sm">{message.content}</p>
              {message.type === 'user' && <FaUser className="text-white mt-1 shrink-0" />}
            </div>
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-slate-700 text-gray-100 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <FaRobot className="text-green-400" />
              <FaSpinner className="animate-spin" />
              <span className="text-sm">AI is thinking...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>

    {/* Chat Input */}
    <div className="border-t border-slate-600/30 p-3 sm:p-4">
      <div className="flex gap-2">
        <input
          ref={chatInputRef}
          type="text"
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Ask me about investments..."
          className="flex-1 p-2.5 sm:p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl 
                   text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 focus:outline-none
                   text-sm sm:text-base touch-manipulation"
          autoComplete="off"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim()}
          className="px-3 sm:px-4 py-2.5 sm:py-3 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 
                   disabled:cursor-not-allowed text-white rounded-xl transition-colors
                   touch-manipulation shrink-0"
        >
          <FaPaperPlane className="text-sm" />
        </button>
      </div>
      
      {/* Quick Action Buttons */}
      <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 overflow-x-auto pb-1">
        <button
          onClick={handleRiskAssessment}
          className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-xs text-gray-300 
                   rounded-md transition-colors touch-manipulation whitespace-nowrap shrink-0"
        >
          Risk Assessment
        </button>
        <button
          onClick={handleFundRecommendations}
          className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-xs text-gray-300 
                   rounded-md transition-colors touch-manipulation whitespace-nowrap shrink-0"
        >
          Fund Recommendations
        </button>
        <button
          onClick={handleGoalPlanning}
          className="px-2 sm:px-2.5 py-1 sm:py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-xs text-gray-300 
                   rounded-md transition-colors touch-manipulation whitespace-nowrap shrink-0"
        >
          Goal Planning
        </button>
      </div>
    </div>
  </div>
));

const AIInvestmentAssistant = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Investment Assistant. I can help with fund recommendations, risk assessment, and goal planning. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState({
    riskTolerance: null,
    investmentGoals: [],
    timeHorizon: null,
    monthlyInvestment: null,
    age: null,
    experience: null
  });
  const [showProfileAssessment, setShowProfileAssessment] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [portfolioAnalysis, setPortfolioAnalysis] = useState(null);
  const [isAIConfigured, setIsAIConfigured] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Check AI configuration on component mount
  useEffect(() => {
    const configured = aiService.isConfigured();
    console.log('AI Service configured:', configured);
    console.log('API Key available:', !!import.meta.env.VITE_GEMINI_API_KEY);
    setIsAIConfigured(configured);
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get AI response using Gemini API or fallback
  const getAIResponse = async (userMessage) => {
    const context = {
      userProfile,
      availableFunds: recommendations,
      conversationHistory: messages
    };
    
    return await aiService.generateResponse(userMessage, context);
  };

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      console.log('Sending message to AI:', messageToProcess);
      // Get AI response from Gemini API or fallback
      const aiResponseContent = await getAIResponse(messageToProcess);
      console.log('Received AI response:', aiResponseContent);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: aiResponseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again or use our other features like Risk Assessment and Fund Comparison.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  }, [inputMessage, userProfile, recommendations, messages]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleInputChange = useCallback((e) => {
    setInputMessage(e.target.value);
  }, []);

  const handleRiskAssessment = useCallback(() => {
    setShowProfileAssessment(true);
  }, []);

  const handleFundRecommendations = useCallback(() => {
    setInputMessage('Show me ESG fund recommendations');
  }, []);

  const handleGoalPlanning = useCallback(() => {
    setInputMessage('Help me plan my investment goals');
  }, []);

  // Risk Assessment Component
  const RiskAssessment = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    
    const questions = [
      {
        id: 'age',
        question: 'What is your age range?',
        options: [
          { value: '18-25', label: '18-25 years', score: 5 },
          { value: '26-35', label: '26-35 years', score: 4 },
          { value: '36-50', label: '36-50 years', score: 3 },
          { value: '51-65', label: '51-65 years', score: 2 },
          { value: '65+', label: '65+ years', score: 1 }
        ]
      },
      {
        id: 'experience',
        question: 'How would you describe your investment experience?',
        options: [
          { value: 'beginner', label: 'Beginner (0-2 years)', score: 1 },
          { value: 'intermediate', label: 'Intermediate (3-7 years)', score: 3 },
          { value: 'experienced', label: 'Experienced (8+ years)', score: 5 }
        ]
      },
      {
        id: 'timeHorizon',
        question: 'What is your investment time horizon?',
        options: [
          { value: 'short', label: 'Short term (< 3 years)', score: 1 },
          { value: 'medium', label: 'Medium term (3-7 years)', score: 3 },
          { value: 'long', label: 'Long term (7+ years)', score: 5 }
        ]
      },
      {
        id: 'volatility',
        question: 'How would you react to a 20% drop in your portfolio value?',
        options: [
          { value: 'panic', label: 'Panic and sell immediately', score: 1 },
          { value: 'concerned', label: 'Very concerned but hold', score: 2 },
          { value: 'neutral', label: 'Somewhat concerned', score: 3 },
          { value: 'opportunity', label: 'See it as buying opportunity', score: 5 }
        ]
      }
    ];

    const calculateRiskScore = () => {
      const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
      const maxScore = questions.length * 5;
      const percentage = (totalScore / maxScore) * 100;
      
      if (percentage <= 40) return 'Conservative';
      if (percentage <= 70) return 'Moderate';
      return 'Aggressive';
    };

    const handleAnswer = (option) => {
      setAnswers(prev => ({
        ...prev,
        [questions[currentQuestion].id]: option
      }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        const riskLevel = calculateRiskScore();
        setUserProfile(prev => ({
          ...prev,
          riskTolerance: riskLevel,
          ...Object.keys(answers).reduce((acc, key) => {
            acc[key] = answers[key].value;
            return acc;
          }, {})
        }));
        generateRecommendations(riskLevel);
        setShowProfileAssessment(false);
      }
    };

    return (
      <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/30">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-green-400">Risk Assessment</h3>
            <button
              onClick={() => setShowProfileAssessment(false)}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            {questions[currentQuestion].question}
          </h4>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left bg-slate-700/30 hover:bg-slate-600/50 
                         rounded-xl border border-slate-600/30 hover:border-green-500/50 
                         transition-all duration-300 text-white"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Generate personalized recommendations
  const generateRecommendations = (riskLevel) => {
    const fundRecommendations = {
      'Conservative': [
        {
          name: 'SBI ESG Debt Fund',
          type: 'Debt',
          expectedReturn: '6-8%',
          risk: 'Low',
          allocation: '60%',
          reason: 'Stable returns with ESG focus'
        },
        {
          name: 'HDFC ESG Hybrid Fund',
          type: 'Hybrid',
          expectedReturn: '8-10%',
          risk: 'Low-Medium',
          allocation: '40%',
          reason: 'Balanced approach with moderate growth'
        }
      ],
      'Moderate': [
        {
          name: 'Aditya Birla ESG Equity Fund',
          type: 'Equity',
          expectedReturn: '10-12%',
          risk: 'Medium',
          allocation: '50%',
          reason: 'Good balance of growth and sustainability'
        },
        {
          name: 'ICICI ESG Hybrid Fund',
          type: 'Hybrid',
          expectedReturn: '8-10%',
          risk: 'Medium',
          allocation: '30%',
          reason: 'Diversified portfolio with steady growth'
        },
        {
          name: 'UTI ESG Debt Fund',
          type: 'Debt',
          expectedReturn: '6-8%',
          risk: 'Low',
          allocation: '20%',
          reason: 'Stability and capital preservation'
        }
      ],
      'Aggressive': [
        {
          name: 'HDFC ESG Equity Fund',
          type: 'Equity',
          expectedReturn: '12-15%',
          risk: 'High',
          allocation: '70%',
          reason: 'High growth potential with ESG principles'
        },
        {
          name: 'SBI Green Energy Fund',
          type: 'Sectoral',
          expectedReturn: '15-18%',
          risk: 'High',
          allocation: '20%',
          reason: 'Thematic exposure to clean energy'
        },
        {
          name: 'Axis ESG Hybrid Fund',
          type: 'Hybrid',
          expectedReturn: '9-11%',
          risk: 'Medium',
          allocation: '10%',
          reason: 'Portfolio stability and diversification'
        }
      ]
    };

    setRecommendations(fundRecommendations[riskLevel] || []);
  };



  const RecommendationsTab = () => (
    <div className="space-y-6">
      {!userProfile.riskTolerance ? (
        <div className="text-center py-12">
          <FaLightbulb className="text-4xl text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Get Personalized Recommendations</h3>
          <p className="text-gray-400 mb-6">Complete the risk assessment to receive tailored fund suggestions</p>
          <button
            onClick={() => setShowProfileAssessment(true)}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
          >
            Start Risk Assessment
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-6 p-4 bg-slate-800/50 rounded-xl border border-slate-600/30">
            <h3 className="text-lg font-bold text-green-400 mb-2">Your Profile</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-gray-300">
                <span className="text-gray-400">Risk Tolerance:</span> {userProfile.riskTolerance}
              </div>
              <div className="text-gray-300">
                <span className="text-gray-400">Experience:</span> {userProfile.experience}
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">Recommended Portfolio</h3>
          <div className="space-y-4">
            {recommendations.map((fund, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{fund.name}</h4>
                  <span className="text-green-400 font-semibold">{fund.allocation}</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                  <div className="text-gray-300">
                    <span className="text-gray-400">Type:</span> {fund.type}
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400">Expected Return:</span> {fund.expectedReturn}
                  </div>
                  <div className="text-gray-300">
                    <span className="text-gray-400">Risk:</span> {fund.risk}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{fund.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const GoalPlanningTab = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({
      name: '',
      targetAmount: '',
      timeHorizon: '',
      priority: 'medium'
    });

    const addGoal = () => {
      if (newGoal.name && newGoal.targetAmount) {
        setGoals([...goals, { ...newGoal, id: Date.now() }]);
        setNewGoal({ name: '', targetAmount: '', timeHorizon: '', priority: 'medium' });
      }
    };

    return (
      <div className="space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600/30">
          <h3 className="text-lg font-bold text-green-400 mb-4">Add Investment Goal</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Goal name (e.g., Retirement, Home purchase)"
              value={newGoal.name}
              onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
              className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400"
            />
            <input
              type="number"
              placeholder="Target amount (₹)"
              value={newGoal.targetAmount}
              onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
              className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400"
            />
            <select
              value={newGoal.timeHorizon}
              onChange={(e) => setNewGoal({...newGoal, timeHorizon: e.target.value})}
              className="w-full p-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white"
            >
              <option value="">Select time horizon</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-7 years">3-7 years</option>
              <option value="7-15 years">7-15 years</option>
              <option value="15+ years">15+ years</option>
            </select>
            <button
              onClick={addGoal}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold"
            >
              Add Goal
            </button>
          </div>
        </div>

        {goals.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Your Investment Goals</h3>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-600/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{goal.name}</h4>
                    <FaBullseye className="text-green-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-gray-300">
                      <span className="text-gray-400">Target:</span> ₹{parseInt(goal.targetAmount).toLocaleString()}
                    </div>
                    <div className="text-gray-300">
                      <span className="text-gray-400">Timeline:</span> {goal.timeHorizon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/30 border-b border-slate-600/30 p-3 sm:p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <FaRobot className="text-lg sm:text-xl lg:text-2xl text-green-400 shrink-0" />
              <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-white leading-tight truncate">
                AI Investment Assistant
              </h1>
            </div>
            
            {/* AI Status Indicator */}
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-full text-xs shrink-0 ${
              isAIConfigured 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isAIConfigured ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <span className="hidden sm:inline">{isAIConfigured ? 'AI Powered' : 'Demo Mode'}</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Get personalized investment advice and portfolio optimization 
            {isAIConfigured ? ' powered by Google Gemini AI' : ' with smart responses'}
          </p>
          {!isAIConfigured && (
            <div className="mt-2 p-2.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-300 text-xs">
                💡 <strong>Tip:</strong> Configure Gemini API key in .env file for AI responses. 
                Get API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-200">makersuite.google.com</a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-slate-800/20 border-b border-slate-600/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto">
            {[
              { id: 'chat', label: 'AI Chat', shortLabel: 'Chat', icon: FaRobot },
              { id: 'recommendations', label: 'Recommendations', shortLabel: 'Recs', icon: FaStar },
              { id: 'goals', label: 'Goal Planning', shortLabel: 'Goals', icon: FaBullseye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 py-3 sm:py-4 px-3 sm:px-6 border-b-2 transition-colors
                  touch-manipulation whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-400'
                    : 'border-transparent text-gray-400 hover:text-white active:text-gray-200'
                }`}
              >
                <tab.icon className="text-sm sm:text-base" />
                <span className="text-xs sm:text-sm md:text-base">
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'chat' && (
              <ChatInterface 
                messages={messages}
                isTyping={isTyping}
                messagesEndRef={messagesEndRef}
                inputMessage={inputMessage}
                handleInputChange={handleInputChange}
                handleKeyPress={handleKeyPress}
                handleSendMessage={handleSendMessage}
                chatInputRef={chatInputRef}
                handleRiskAssessment={handleRiskAssessment}
                handleFundRecommendations={handleFundRecommendations}
                handleGoalPlanning={handleGoalPlanning}
              />
            )}
            {activeTab === 'recommendations' && <RecommendationsTab />}
            {activeTab === 'goals' && <GoalPlanningTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Risk Assessment Modal */}
      <AnimatePresence>
        {showProfileAssessment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-md w-full"
            >
              <RiskAssessment />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIInvestmentAssistant;
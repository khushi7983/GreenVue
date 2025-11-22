import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSpinner, FaChartLine, FaLeaf, FaPercentage, FaRupeeSign, FaInfoCircle, FaCircle } from 'react-icons/fa';

const GreenMutualFund = () => {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFund, setSelectedFund] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Funds');

  // ESG Score Categories
  const esgCategories = [
    { name: 'All Funds', range: null },
    { name: 'Excellent ESG (80+)', range: [80, 100] },
    { name: 'Good ESG (60-79)', range: [60, 79] },
    { name: 'Average ESG (40-59)', range: [40, 59] },
    { name: 'Below Average ESG (<40)', range: [0, 39] }
  ];

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/green-funds');
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  const handleFundSelect = async (fund) => {
    setSelectedFund(fund);
    try {
      const response = await axios.get(`http://localhost:5000/api/recommendations/${fund.id}`);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedFund(null);
  };

  // Filter funds based on ESG score category
  const filteredFunds = funds.filter(fund => {
    if (selectedCategory === 'All Funds') return true;
    const category = esgCategories.find(cat => cat.name === selectedCategory);
    return category && fund.esgScore >= category.range[0] && fund.esgScore <= category.range[1];
  });

  const getESGScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';    // Excellent
    if (score >= 60) return 'text-blue-400';     // Good
    if (score >= 40) return 'text-yellow-400';   // Average
    return 'text-red-400';                       // Below Average
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <FaSpinner className="animate-spin text-5xl text-green-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading green mutual funds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/3 rounded-full filter blur-2xl" />
      </div>
      
      <div className="relative bg-transparent text-white p-3 sm:p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
        {/* Header with Additional Filters */}
        <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2 sm:p-3 bg-green-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-green-500/30 shrink-0">
                <FaLeaf className="text-xl sm:text-2xl text-green-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                             bg-clip-text text-transparent leading-tight">
                  Green Mutual Funds
                </h2>
                <p className="text-gray-300 mt-0.5 sm:mt-1 text-sm sm:text-base">Sustainable investment opportunities</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search funds..."
                  className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 
                           rounded-xl focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 transition-all duration-300
                           text-sm sm:text-base touch-manipulation"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaInfoCircle className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              </div>
              <select className="w-full sm:w-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white px-3 sm:px-4 py-2.5 sm:py-3 
                               rounded-xl focus:border-green-500/50 transition-all duration-300 text-sm sm:text-base">
                <option>Sort by ESG Score</option>
                <option>Sort by Returns</option>
                <option>Sort by Risk Level</option>
              </select>
            </div>
          </div>

          {/* ESG Score Categories */}
          <div className="bg-slate-800/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-700/50">
            <h3 className="text-base sm:text-lg font-semibold text-green-400 mb-2 sm:mb-3 flex items-center gap-2">
              <FaChartLine className="text-xs sm:text-sm shrink-0" />
              <span>ESG Score Categories</span>
            </h3>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
              {esgCategories.map(category => (
                <button 
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all duration-300 whitespace-nowrap border text-xs sm:text-sm font-medium
                    touch-manipulation shrink-0 ${
                    selectedCategory === category.name 
                      ? 'bg-green-500/20 border-green-500/50 text-green-300 shadow-lg shadow-green-500/10' 
                      : 'bg-slate-700/50 border-slate-600/50 text-gray-300 hover:bg-green-500/10 hover:border-green-500/30 active:bg-green-500/15'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Fund List with selection functionality */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden 
                        shadow-xl hover:shadow-2xl transition-all duration-500">
            {filteredFunds.length > 0 ? (
              filteredFunds.map((fund) => (
                <div 
                  key={fund.id} 
                  onClick={() => handleFundSelect(fund)}
                  className={`p-6 border-b border-slate-700/50 cursor-pointer transition-all duration-300 group ${
                    selectedFund?.id === fund.id 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'hover:bg-slate-700/30 hover:border-slate-600/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold">{fund.name}</h4>
                    <div className={`text-lg font-bold ${getESGScoreColor(fund.esgScore)}`}>
                      ESG: {fund.esgScore.toFixed(1)}
                    </div>
                  </div>
                  
                  {/* Enhanced Fund Details */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-sm">
                      <div className="text-gray-400 mb-1">AUM</div>
                      <div className="font-semibold">₹{fund.aum.toLocaleString()} Cr</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400 mb-1">Returns (1Y)</div>
                      <div className="font-semibold text-green-400">+{fund.returns?.oneYear || 0}%</div>
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-400 mb-1">Risk Level</div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaCircle 
                            key={i}
                            className={`w-2 h-2 mr-1 ${i < fund.riskLevel ? 'text-yellow-500' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-700/50 backdrop-blur-sm p-4 rounded-xl 
                                border border-slate-600/30 group-hover:border-green-500/20 transition-all duration-300">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Carbon Score</div>
                      <div className="font-semibold text-gray-200">{fund.carbonScore || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Sustainability Rating</div>
                      <div className="flex">
                        {[...Array(fund.sustainabilityRating || 0)].map((_, i) => (
                          <FaLeaf key={i} className="text-green-400 mr-1 text-sm" />
                        ))}
                        {fund.sustainabilityRating === 0 && (
                          <span className="text-gray-400 text-sm">Not rated</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-400">
                No funds found in this ESG category
              </div>
            )}
          </div>

          {/* Similar Funds Panel */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden 
                        shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <FaChartLine className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-100">Similar Funds</h3>
              </div>
              {selectedFund ? (
                <div className="space-y-4">
                  {recommendations.map((fund) => (
                    <div 
                      key={fund.id} 
                      className="bg-slate-700/50 backdrop-blur-sm p-6 rounded-xl border border-slate-600/30 
                               hover:bg-slate-600/50 hover:border-green-500/30 transition-all duration-300 
                               group cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-semibold">{fund.name}</h4>
                        <div className="flex items-center">
                          <div className={`text-lg font-bold ${getESGScoreColor(fund.esgScore)}`}>
                            {fund.esgScore.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-400">
                          Similarity Score
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-24 bg-gray-600 rounded-full mr-2">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${fund.similarityScore}%` }}
                            />
                          </div>
                          <span className="text-green-400 font-semibold">
                            {fund.similarityScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <div className="p-6 bg-slate-700/30 rounded-2xl border border-slate-600/30 mb-4">
                    <FaLeaf className="text-4xl text-green-400" />
                  </div>
                  <p className="text-lg text-gray-300">Select a fund to see recommendations</p>
                  <p className="text-sm text-gray-500 mt-2">Discover similar investment opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GreenMutualFund; 
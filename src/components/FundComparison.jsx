import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/FundComparison.css';
import { 
  FaChartLine, 
  FaSearch, 
  FaBalanceScale, 
  FaLeaf, 
  FaUsers, 
  FaShieldAlt,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaSpinner,
  FaInfoCircle,
  FaRupeeSign,
  FaTrophy,
  FaExchangeAlt
} from 'react-icons/fa';
import axios from 'axios';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

// Move FundSelector component outside to prevent re-renders
const FundSelector = React.memo(({ 
  title, 
  selectedFund, 
  searchTerm, 
  setSearchTerm, 
  filteredFunds, 
  onSelectFund,
  fundNumber,
  navPrices 
}) => (
  <div className="bg-slate-800/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-slate-600/30">
    <h3 className="text-base sm:text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
      <FaSearch className="text-xs sm:text-sm shrink-0" />
      <span className="truncate">{title}</span>
    </h3>
    
    {/* Search Input */}
    <div className="relative mb-3">
      <input
        type="text"
        placeholder="Search funds..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 sm:p-2.5 text-xs sm:text-sm bg-slate-700/50 border border-slate-600/50 rounded-lg text-white 
                 placeholder-gray-400 focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25
                 touch-manipulation"
        autoComplete="off"
      />
      <FaSearch className="absolute right-2 sm:right-2.5 top-2.5 sm:top-3 text-gray-400 text-xs sm:text-sm" />
    </div>

    {/* Fund Selection */}
    {searchTerm && (
      <div className="mb-4 max-h-48 sm:max-h-60 overflow-y-auto space-y-1.5 sm:space-y-2">
        {filteredFunds.map(fund => (
          <div
            key={fund.schemeCode}
            onClick={() => onSelectFund(fund)}
            className="p-2.5 sm:p-3 bg-slate-700/30 hover:bg-slate-600/40 active:bg-slate-600/50 rounded-lg cursor-pointer 
                     border border-transparent hover:border-green-500/30 transition-all duration-200
                     touch-manipulation"
          >
            <div className="font-medium text-white text-xs sm:text-sm leading-tight line-clamp-2">
              {fund.schemeName}
            </div>
            <div className="text-xs text-gray-400 mt-1 flex flex-col sm:flex-row sm:gap-2">
              <span>ESG: {fund.esgScore}</span>
              <span className="hidden sm:inline">|</span>
              <span>AUM: ₹{fund.aum} Cr</span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Selected Fund Display */}
    {selectedFund && (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg border border-green-500/30"
      >
        <div className="font-semibold text-white mb-2 text-sm leading-tight">{selectedFund.schemeName}</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-gray-300">
            <span className="text-gray-400">NAV:</span> ₹{navPrices[selectedFund.schemeCode]?.toFixed(2) || 'Loading...'}
          </div>
          <div className="text-gray-300">
            <span className="text-gray-400">ESG:</span> {selectedFund.esgScore}/100
          </div>
          <div className="text-gray-300">
            <span className="text-gray-400">Category:</span> {selectedFund.category}
          </div>
          <div className="text-gray-300">
            <span className="text-gray-400">Risk:</span> {selectedFund.riskLevel}
          </div>
        </div>
      </motion.div>
    )}
  </div>
));

const FundComparison = () => {
  const [availableFunds, setAvailableFunds] = useState([]);
  const [selectedFund1, setSelectedFund1] = useState(null);
  const [selectedFund2, setSelectedFund2] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [loading, setLoading] = useState(true);
  const [navPrices, setNavPrices] = useState({});
  const [comparisonData, setComparisonData] = useState(null);

  // Fetch available funds
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.mfapi.in/mf');
        const fundsArray = Array.isArray(response.data) ? response.data : [];
        
        // Filter for ESG/Green funds and add some sample data
        const esgFunds = fundsArray.filter(fund => {
          const name = fund.schemeName?.toLowerCase() || '';
          return (
            name.includes('esg') ||
            name.includes('environmental') ||
            name.includes('green') ||
            name.includes('sustainable') ||
            name.includes('governance') ||
            name.includes('social') ||
            name.includes('ethical') ||
            name.includes('responsible')
          );
        }).slice(0, 100); // Limit to 100 funds for better performance

        // Enhance funds with simulated ESG data
        const enhancedFunds = esgFunds.map(fund => ({
          ...fund,
          esgScore: Math.floor(Math.random() * 30) + 70, // 70-100 ESG score
          expenseRatio: (Math.random() * 1.5 + 0.5).toFixed(2), // 0.5-2.0%
          aum: Math.floor(Math.random() * 5000) + 500, // 500-5500 Cr
          minInvestment: [100, 500, 1000, 5000][Math.floor(Math.random() * 4)],
          exitLoad: Math.random() > 0.5 ? (Math.random() * 1 + 0.5).toFixed(2) + '%' : 'Nil',
          fundManager: ['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sunita Verma'][Math.floor(Math.random() * 4)],
          category: fund.schemeName.toLowerCase().includes('debt') ? 'Debt' : 
                   fund.schemeName.toLowerCase().includes('hybrid') ? 'Hybrid' : 'Equity',
          riskLevel: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
          returns: {
            '1Y': (Math.random() * 20 - 5).toFixed(2), // -5% to 15%
            '3Y': (Math.random() * 15 + 5).toFixed(2), // 5% to 20%
            '5Y': (Math.random() * 12 + 8).toFixed(2), // 8% to 20%
          }
        }));

        setAvailableFunds(enhancedFunds);
      } catch (err) {
        console.error("Error fetching funds:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Fetch NAV prices for selected funds
  useEffect(() => {
    const fetchNavPrices = async () => {
      const fundsToFetch = [selectedFund1, selectedFund2].filter(Boolean);
      
      for (const fund of fundsToFetch) {
        if (!navPrices[fund.schemeCode]) {
          try {
            const response = await fetch(buildApiUrl(`${API_ENDPOINTS.PAYMENT.NAV}/${fund.schemeCode}`));
            const data = await response.json();
            if (data.success && data.nav) {
              setNavPrices(prev => ({
                ...prev,
                [fund.schemeCode]: data.nav
              }));
            }
          } catch (error) {
            console.error(`Error fetching NAV for ${fund.schemeCode}:`, error);
          }
        }
      }
    };

    if (selectedFund1 || selectedFund2) {
      fetchNavPrices();
    }
  }, [selectedFund1, selectedFund2]);

  // Calculate comparison metrics
  useEffect(() => {
    if (selectedFund1 && selectedFund2) {
      const comparison = {
        returns: {
          '1Y': {
            fund1: parseFloat(selectedFund1.returns['1Y']),
            fund2: parseFloat(selectedFund2.returns['1Y']),
            winner: parseFloat(selectedFund1.returns['1Y']) > parseFloat(selectedFund2.returns['1Y']) ? 1 : 2
          },
          '3Y': {
            fund1: parseFloat(selectedFund1.returns['3Y']),
            fund2: parseFloat(selectedFund2.returns['3Y']),
            winner: parseFloat(selectedFund1.returns['3Y']) > parseFloat(selectedFund2.returns['3Y']) ? 1 : 2
          },
          '5Y': {
            fund1: parseFloat(selectedFund1.returns['5Y']),
            fund2: parseFloat(selectedFund2.returns['5Y']),
            winner: parseFloat(selectedFund1.returns['5Y']) > parseFloat(selectedFund2.returns['5Y']) ? 1 : 2
          }
        },
        esgScore: {
          fund1: selectedFund1.esgScore,
          fund2: selectedFund2.esgScore,
          winner: selectedFund1.esgScore > selectedFund2.esgScore ? 1 : 2
        },
        expenseRatio: {
          fund1: parseFloat(selectedFund1.expenseRatio),
          fund2: parseFloat(selectedFund2.expenseRatio),
          winner: parseFloat(selectedFund1.expenseRatio) < parseFloat(selectedFund2.expenseRatio) ? 1 : 2
        },
        aum: {
          fund1: selectedFund1.aum,
          fund2: selectedFund2.aum,
          winner: selectedFund1.aum > selectedFund2.aum ? 1 : 2
        },
        minInvestment: {
          fund1: selectedFund1.minInvestment,
          fund2: selectedFund2.minInvestment,
          winner: selectedFund1.minInvestment < selectedFund2.minInvestment ? 1 : 2
        }
      };
      
      setComparisonData(comparison);
    }
  }, [selectedFund1, selectedFund2]);

  const filteredFunds1 = availableFunds.filter(fund =>
    fund.schemeName.toLowerCase().includes(searchTerm1.toLowerCase())
  ).slice(0, 10);

  const filteredFunds2 = availableFunds.filter(fund =>
    fund.schemeName.toLowerCase().includes(searchTerm2.toLowerCase()) &&
    fund.schemeCode !== selectedFund1?.schemeCode
  ).slice(0, 10);

  const ComparisonMetric = ({ label, icon, fund1Value, fund2Value, winner, format = 'text', suffix = '' }) => {
    const getWinnerIcon = () => {
      if (winner === 1) return <FaArrowUp className="text-green-500" />;
      if (winner === 2) return <FaArrowDown className="text-red-500" />;
      return <FaEquals className="text-yellow-500" />;
    };

    const formatValue = (value) => {
      if (format === 'percentage') return `${value}%`;
      if (format === 'currency') return `₹${value.toLocaleString()}${suffix}`;
      if (format === 'number') return value.toLocaleString();
      return value + suffix;
    };

    return (
      <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-xl border border-slate-600/30">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-gray-300 font-medium">{label}</span>
        </div>
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className={`text-center p-2 rounded-lg ${winner === 1 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-700/30'}`}>
            <div className="text-sm text-gray-400 mb-1">Fund 1</div>
            <div className="font-bold text-white">{formatValue(fund1Value)}</div>
          </div>
          <div className="flex justify-center">
            {getWinnerIcon()}
          </div>
          <div className={`text-center p-2 rounded-lg ${winner === 2 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-700/30'}`}>
            <div className="text-sm text-gray-400 mb-1">Fund 2</div>
            <div className="font-bold text-white">{formatValue(fund2Value)}</div>
          </div>
        </div>
      </div>
    );
  };

  // Create stable callback handlers to prevent re-renders
  const handleSetSearchTerm1 = useCallback((value) => {
    setSearchTerm1(value);
  }, []);
  
  const handleSetSearchTerm2 = useCallback((value) => {
    setSearchTerm2(value);
  }, []);
  
  const handleSelectFund1 = useCallback((fund) => {
    setSelectedFund1(fund);
  }, []);
  
  const handleSelectFund2 = useCallback((fund) => {
    setSelectedFund2(fund);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/3 rounded-full filter blur-3xl" />
      </div>

      <div className="relative text-white p-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                         bg-clip-text text-transparent mb-4">
            Fund Comparison Tool
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Compare two ESG funds side-by-side to make informed investment decisions
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="text-4xl text-green-500 animate-spin" />
            <span className="ml-4 text-xl">Loading fund data...</span>
          </div>
        ) : (
          <>
            {/* Fund Selection Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FundSelector
                title="Select First Fund"
                selectedFund={selectedFund1}
                searchTerm={searchTerm1}
                setSearchTerm={handleSetSearchTerm1}
                filteredFunds={filteredFunds1}
                onSelectFund={handleSelectFund1}
                fundNumber={1}
                navPrices={navPrices}
              />
              
              <FundSelector
                title="Select Second Fund"
                selectedFund={selectedFund2}
                searchTerm={searchTerm2}
                setSearchTerm={handleSetSearchTerm2}
                filteredFunds={filteredFunds2}
                onSelectFund={handleSelectFund2}
                fundNumber={2}
                navPrices={navPrices}
              />
            </div>

            {/* Swap Button */}
            {selectedFund1 && selectedFund2 && (
              <div className="flex justify-center mb-8">
                <button
                  onClick={() => {
                    const temp = selectedFund1;
                    setSelectedFund1(selectedFund2);
                    setSelectedFund2(temp);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                           px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg
                           flex items-center gap-2"
                >
                  <FaExchangeAlt />
                  Swap Funds
                </button>
              </div>
            )}

            {/* Comparison Results */}
            <AnimatePresence>
              {selectedFund1 && selectedFund2 && comparisonData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Overall Winner */}
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl 
                               border border-green-500/30 text-center">
                    <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-400 mb-2">Comparison Summary</h3>
                    <p className="text-gray-300">
                      Based on key metrics, here's how the funds compare across different parameters
                    </p>
                  </div>

                  {/* Detailed Comparison Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ComparisonMetric
                      label="ESG Score"
                      icon={<FaLeaf className="text-green-500" />}
                      fund1Value={comparisonData.esgScore.fund1}
                      fund2Value={comparisonData.esgScore.fund2}
                      winner={comparisonData.esgScore.winner}
                      suffix="/100"
                    />
                    
                    <ComparisonMetric
                      label="1 Year Returns"
                      icon={<FaChartLine className="text-blue-500" />}
                      fund1Value={comparisonData.returns['1Y'].fund1}
                      fund2Value={comparisonData.returns['1Y'].fund2}
                      winner={comparisonData.returns['1Y'].winner}
                      format="percentage"
                    />
                    
                    <ComparisonMetric
                      label="3 Year Returns"
                      icon={<FaChartLine className="text-purple-500" />}
                      fund1Value={comparisonData.returns['3Y'].fund1}
                      fund2Value={comparisonData.returns['3Y'].fund2}
                      winner={comparisonData.returns['3Y'].winner}
                      format="percentage"
                    />
                    
                    <ComparisonMetric
                      label="5 Year Returns"
                      icon={<FaChartLine className="text-orange-500" />}
                      fund1Value={comparisonData.returns['5Y'].fund1}
                      fund2Value={comparisonData.returns['5Y'].fund2}
                      winner={comparisonData.returns['5Y'].winner}
                      format="percentage"
                    />
                    
                    <ComparisonMetric
                      label="Expense Ratio"
                      icon={<FaRupeeSign className="text-red-500" />}
                      fund1Value={comparisonData.expenseRatio.fund1}
                      fund2Value={comparisonData.expenseRatio.fund2}
                      winner={comparisonData.expenseRatio.winner}
                      format="percentage"
                    />
                    
                    <ComparisonMetric
                      label="AUM"
                      icon={<FaUsers className="text-indigo-500" />}
                      fund1Value={comparisonData.aum.fund1}
                      fund2Value={comparisonData.aum.fund2}
                      winner={comparisonData.aum.winner}
                      format="currency"
                      suffix=" Cr"
                    />
                    
                    <ComparisonMetric
                      label="Min Investment"
                      icon={<FaRupeeSign className="text-cyan-500" />}
                      fund1Value={comparisonData.minInvestment.fund1}
                      fund2Value={comparisonData.minInvestment.fund2}
                      winner={comparisonData.minInvestment.winner}
                      format="currency"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 
                                     hover:to-emerald-700 px-8 py-3 rounded-xl font-semibold transition-all 
                                     duration-300 shadow-lg">
                      Invest in {selectedFund1.schemeName.split(' ').slice(0, 3).join(' ')}
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 
                                     hover:to-emerald-700 px-8 py-3 rounded-xl font-semibold transition-all 
                                     duration-300 shadow-lg">
                      Invest in {selectedFund2.schemeName.split(' ').slice(0, 3).join(' ')}
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedFund1(null);
                        setSelectedFund2(null);
                        setSearchTerm1('');
                        setSearchTerm2('');
                      }}
                      className="border border-slate-600/50 hover:border-green-500/50 px-8 py-3 rounded-xl 
                               font-semibold transition-all duration-300"
                    >
                      Compare Different Funds
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Help Section */}
            {!selectedFund1 || !selectedFund2 ? (
              <div className="text-center py-12">
                <FaInfoCircle className="text-4xl text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-300 mb-2">Get Started</h3>
                <p className="text-gray-400 max-w-md mx-auto">
                  Select two funds above to see a detailed side-by-side comparison including returns, 
                  ESG scores, expense ratios, and more.
                </p>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default FundComparison;
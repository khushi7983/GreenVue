import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaLeaf, FaChartLine, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';
import '../styles/GreenFundSearch.css';
import { useNavigate } from 'react-router-dom';

const GreenFundSearch = () => {
  const [mutualFunds, setMutualFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    // Fund Categories
    environmental: true,
    social: true,
    governance: true,
    
    // Fund Types (based on name analysis)
    equity: true,
    debt: true,
    hybrid: true,
    index: true,
    
    // Specific Categories
    infrastructure: true,
    technology: true,
    ethical: true,
    
    // Distribution Type
    growth: true,
    dividend: true
  });

  // New states to improve interactivity
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMutualFunds = async () => {
      try {
        const response = await axios.get('https://api.mfapi.in/mf');
        const fundsArray = Array.isArray(response.data) ? response.data : 
                         Array.isArray(response.data.data) ? response.data.data : [];
        
        // Let's log a sample fund to see available fields
        console.log("Sample Fund Data:", fundsArray[0]);
        
        const greenFunds = fundsArray.filter(fund => {
          const name = fund.schemeName?.toLowerCase() || '';
          return (
            // Environmental funds
            name.includes('environmental') ||
            name.includes('green energy') || 
            name.includes('clean energy') ||
            name.includes('eco') ||
            
            // Social funds
            name.includes('social') || 
            name.includes('community') ||
            name.includes('diversity') ||
            name.includes('inclusion') ||
            
            // Governance funds
            name.includes('governance') ||
            name.includes('ethical') ||
            name.includes('responsible investing') ||
            
            // Combined ESG
            name.includes('esg')
          );
        });

        // Log filtered funds to see what we're working with
        console.log("Filtered Funds:", greenFunds.length);
        if (greenFunds.length > 0) {
          console.log("Sample Green Fund:", greenFunds[0]);
        }
        
        setMutualFunds(greenFunds);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError('Failed to fetch mutual funds data');
        setLoading(false);
      }
    };

    fetchMutualFunds();
  }, []);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const handleFundClick = (fund) => {
    navigate('/transaction', { state: { fund } });
  };

  const filteredFunds = mutualFunds.filter(fund => {
    const name = fund.schemeName.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase());
    
    // Category matching
    const isESG = name.includes('esg');
    const isEnvironmental = filters.environmental && (name.includes('environmental') || name.includes('green') || isESG);
    const isSocial = filters.social && (name.includes('social') || name.includes('community') || isESG);
    const isGovernance = filters.governance && (name.includes('governance') || name.includes('ethical') || isESG);
    
    // Fund type matching
    const isEquity = filters.equity && (name.includes('equity') || name.includes('stock'));
    const isDebt = filters.debt && (name.includes('debt') || name.includes('bond') || name.includes('gilt'));
    const isHybrid = filters.hybrid && name.includes('hybrid');
    const isIndex = filters.index && name.includes('index');
    
    // Specific category matching
    const isInfrastructure = filters.infrastructure && name.includes('infrastructure');
    const isTechnology = filters.technology && (name.includes('tech') || name.includes('digital'));
    const isEthical = filters.ethical && name.includes('ethical');
    
    // Distribution type matching
    const isGrowth = filters.growth && name.includes('growth');
    const isDividend = filters.dividend && (name.includes('dividend') || name.includes('idcw'));

    return matchesSearch && (
      isEnvironmental || isSocial || isGovernance ||
      isEquity || isDebt || isHybrid || isIndex ||
      isInfrastructure || isTechnology || isEthical ||
      isGrowth || isDividend
    );
  });



  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/3 rounded-full filter blur-2xl" />
      </div>
      
      <div className="relative bg-transparent text-white p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-2xl backdrop-blur-sm border border-green-500/30">
              <FaLeaf className="text-2xl text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                           bg-clip-text text-transparent">
                Green Investment Funds
              </h1>
              <p className="text-gray-300 text-lg mt-1">
                Discover sustainable and environmentally conscious mutual funds
              </p>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 z-10" />
          <input
            type="text"
            placeholder="Search funds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full pl-12 pr-4 py-4 text-lg bg-slate-800/50 backdrop-blur-sm border 
                       rounded-2xl text-white transition-all duration-300 placeholder-gray-400 ${
                       isSearchFocused 
                         ? 'border-green-500/50 ring-1 ring-green-500/25 shadow-lg shadow-green-500/10' 
                         : 'border-slate-700/50 hover:border-slate-600/50'
                     }`}
          />
        </div>

        <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 mb-8 
                      shadow-lg hover:shadow-xl transition-all duration-500">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <FaLeaf className="text-sm" />
              Fund Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.environmental}
                  onChange={() => handleCategoryChange('environmental')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Environmental</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.social}
                  onChange={() => handleCategoryChange('social')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Social</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.governance}
                  onChange={() => handleCategoryChange('governance')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Governance</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <FaChartLine className="text-sm" />
              Fund Type
            </h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.equity}
                  onChange={() => handleCategoryChange('equity')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Equity</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.debt}
                  onChange={() => handleCategoryChange('debt')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Debt</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.hybrid}
                  onChange={() => handleCategoryChange('hybrid')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Hybrid</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.index}
                  onChange={() => handleCategoryChange('index')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Index</span>
              </label>
            </div>
          </div>

          <div className="mb-0">
            <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <FaInfoCircle className="text-sm" />
              Distribution Type
            </h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.growth}
                  onChange={() => handleCategoryChange('growth')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Growth</span>
              </label>
              <label className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 backdrop-blur-sm border 
                              border-slate-600/50 rounded-xl cursor-pointer hover:bg-slate-600/50 
                              hover:border-green-500/30 transition-all duration-300">
                <input
                  type="checkbox"
                  checked={filters.dividend}
                  onChange={() => handleCategoryChange('dividend')}
                  className="accent-green-500 cursor-pointer"
                />
                <span className="text-gray-200">Dividend</span>
              </label>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-4 p-12 text-green-400">
            <div className="animate-spin text-3xl">
              <FaChartLine />
            </div>
            <span className="text-xl font-medium">Loading funds...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center gap-4 p-8 bg-red-500/10 border border-red-500/30 
                        rounded-2xl text-red-400 backdrop-blur-sm">
            <FaExclamationCircle className="text-2xl" />
            <span className="text-lg">{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFunds.length > 0 ? (
              filteredFunds.map((fund) => (
                <div 
                  key={fund.schemeCode} 
                  className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border cursor-pointer 
                           transition-all duration-300 group hover:shadow-xl ${
                           hoveredCard === fund.schemeCode 
                             ? 'border-green-500/50 shadow-lg shadow-green-500/10 transform -translate-y-1' 
                             : 'border-slate-700/50 hover:border-slate-600/50'
                         }`}
                  onMouseEnter={() => setHoveredCard(fund.schemeCode)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleFundClick(fund)}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300">
                      <FaLeaf className="text-green-400 text-sm" />
                    </div>
                    <h3 className="text-green-400 font-medium text-sm leading-relaxed group-hover:text-green-300 
                                 transition-colors duration-300 line-clamp-3">
                      {fund.schemeName}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Scheme Code:</span>
                      <span className="text-gray-200 font-mono text-xs">{fund.schemeCode}</span>
                    </div>
                    {fund.isinGrowth && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">ISIN:</span>
                        <span className="text-gray-200 font-mono text-xs">{fund.isinGrowth}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center gap-4 p-8 bg-slate-800/30 
                           border border-slate-700/50 rounded-2xl text-gray-400 backdrop-blur-sm">
                <FaInfoCircle className="text-2xl" />
                <span className="text-lg">No green mutual funds found</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default GreenFundSearch;





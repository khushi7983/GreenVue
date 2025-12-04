import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaRupeeSign, FaCalendarAlt, FaSpinner, FaLeaf, FaArrowUp, FaSync } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, API_ENDPOINTS } from '../config/api';

const PortfolioPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPortfolioData();
    
    // Auto-refresh portfolio every 30 seconds for real-time P&L updates
    const interval = setInterval(fetchPortfolioData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch transactions and portfolio summary in parallel
      const [transactionsRes, portfolioRes] = await Promise.all([
        fetch(buildApiUrl(API_ENDPOINTS.PAYMENT.TRANSACTIONS), {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(buildApiUrl(API_ENDPOINTS.PAYMENT.PORTFOLIO), {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const transactionsData = await transactionsRes.json();
      const portfolioData = await portfolioRes.json();

      if (transactionsData.success) {
        setTransactions(transactionsData.data);
      }

      if (portfolioData.success) {
        setPortfolio(portfolioData.data);
      }

    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setError('Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 bg-green-500/10';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/10';
      case 'FAILED': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button 
            onClick={fetchPortfolioData}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              My Portfolio
            </h1>
            <button
              onClick={fetchPortfolioData}
              className="p-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all duration-300 hover:scale-110"
              title="Refresh Portfolio"
            >
              <FaSync className="text-green-400 text-lg" />
            </button>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-2">
            Track your green investments and transaction history
          </p>
          {portfolio?.summary?.lastUpdated && (
            <p className="text-gray-400 text-sm">
              Last updated: {new Date(portfolio.summary.lastUpdated).toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {/* Portfolio Summary */}
        {portfolio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaRupeeSign className="text-blue-400 text-2xl" />
                <span className="text-2xl font-bold text-white">
                  ₹{portfolio.summary.totalInvested?.toLocaleString() || '0'}
                </span>
              </div>
              <h3 className="text-gray-300 text-sm font-medium">Total Invested</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaChartLine className="text-purple-400 text-2xl" />
                <span className="text-2xl font-bold text-white">
                  ₹{portfolio.summary.totalCurrentValue?.toLocaleString() || '0'}
                </span>
              </div>
              <h3 className="text-gray-300 text-sm font-medium">Current Value</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaArrowUp className={`text-2xl ${portfolio.summary.isOverallProfit ? 'text-green-400' : 'text-red-400'}`} />
                <div className="text-right">
                  <span className={`text-2xl font-bold ${portfolio.summary.isOverallProfit ? 'text-green-400' : 'text-red-400'}`}>
                    ₹{Math.abs(portfolio.summary.totalGainLoss || 0).toLocaleString()}
                  </span>
                  <div className={`text-sm ${portfolio.summary.isOverallProfit ? 'text-green-400' : 'text-red-400'}`}>
                    {portfolio.summary.isOverallProfit ? '+' : '-'}{Math.abs(portfolio.summary.totalGainLossPercentage || 0).toFixed(2)}%
                  </div>
                </div>
              </div>
              <h3 className="text-gray-300 text-sm font-medium">Total {portfolio.summary.isOverallProfit ? 'Profit' : 'Loss'}</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FaLeaf className="text-emerald-400 text-2xl" />
                <span className="text-2xl font-bold text-white">
                  {portfolio.summary.totalHoldings || 0}
                </span>
              </div>
              <h3 className="text-gray-300 text-sm font-medium">Total Holdings</h3>
            </div>
          </motion.div>
        )}

        {/* Holdings */}
        {portfolio?.holdings && portfolio.holdings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">My Holdings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {portfolio.holdings.map((holding, index) => (
                <div
                  key={holding._id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {holding.fundName}
                      </h3>
                      <p className="text-gray-400 text-sm">{holding._id}</p>
                    </div>
                    <FaLeaf className="text-green-400 text-xl" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-300 text-sm">Units</p>
                      <p className="text-white font-semibold">{holding.totalUnits?.toFixed(4) || '0'}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Invested</p>
                      <p className="text-white font-semibold">₹{holding.totalInvested?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Current Value</p>
                      <p className="text-white font-semibold">₹{holding.currentValue?.toLocaleString() || '0'}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Current NAV</p>
                      <p className="text-white font-semibold">₹{holding.currentNavPrice?.toFixed(2) || '0'}</p>
                    </div>
                  </div>
                  
                  {/* P&L Section */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                      <p className="text-gray-300 text-sm">Total {holding.isProfit ? 'Profit' : 'Loss'}</p>
                      <p className={`font-bold ${holding.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.isProfit ? '+' : '-'}₹{Math.abs(holding.totalGainLoss || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300 text-sm">Percentage</p>
                      <p className={`font-bold ${holding.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.isProfit ? '+' : '-'}{Math.abs(holding.totalGainLossPercentage || 0).toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300 text-sm">Day Change</p>
                      <p className={`font-bold ${(holding.dayChange || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(holding.dayChange || 0) >= 0 ? '+' : ''}{holding.dayChange?.toFixed(2) || '0'}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          
          {transactions.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
              <FaChartLine className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-300 text-lg">No transactions yet</p>
              <p className="text-gray-400 mb-6">Start investing in green funds to see your transactions here</p>
              <button
                onClick={() => navigate('/features')}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              >
                Start Investing
              </button>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4 text-gray-300 font-medium">Fund</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Amount</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Units</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Date</th>
                      <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={transaction._id} className="border-b border-white/5">
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{transaction.fundName}</p>
                            <p className="text-gray-400 text-sm">{transaction.fundSymbol}</p>
                          </div>
                        </td>
                        <td className="p-4 text-white">₹{transaction.amount.toLocaleString()}</td>
                        <td className="p-4 text-white">{transaction.units.toFixed(4)}</td>
                        <td className="p-4 text-gray-300">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            {new Date(transaction.transactionDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioPage;
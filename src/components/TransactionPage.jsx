import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaLeaf, FaCheckCircle, FaChartLine, FaInfoCircle, FaRupeeSign, FaCreditCard, FaSpinner } from 'react-icons/fa';
import { razorpayConfig, createRazorpayOrder, verifyRazorpayPayment, initializeRazorpay } from '../utils/razorpay';

const TransactionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fund } = location.state || {};
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [navPrice, setNavPrice] = useState(null);
  const [navLoading, setNavLoading] = useState(true);

  // Initialize Razorpay
  useEffect(() => {
    const loadRazorpay = async () => {
      const loaded = await initializeRazorpay();
      setRazorpayLoaded(loaded);
      if (!loaded) {
        console.error('Razorpay SDK failed to load');
      }
    };
    loadRazorpay();
  }, []);

  // Fetch NAV price when component loads
  useEffect(() => {
    const fetchNavPrice = async () => {
      if (!fund?.schemeCode) {
        setNavLoading(false);
        return;
      }

      try {
        setNavLoading(true);
        const response = await fetch(`http://localhost:5000/api/payment/nav/${fund.schemeCode}`);
        const data = await response.json();
        
        if (data.success && data.nav) {
          setNavPrice(data.nav);
        } else {
          // Fallback to a default NAV if API fails
          setNavPrice(10);
          console.warn('NAV API failed, using fallback price');
        }
      } catch (error) {
        console.error('Error fetching NAV:', error);
        setNavPrice(10); // Fallback price
      } finally {
        setNavLoading(false);
      }
    };

    fetchNavPrice();
  }, [fund?.schemeCode]);

  if (!fund) {
    return (
      <div className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl" />
        </div>
        <div className="relative bg-transparent text-white flex items-center justify-center min-h-screen p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center max-w-sm"
          >
            <div className="p-3 bg-red-500/20 rounded-xl mb-4 inline-block">
              <FaInfoCircle className="text-2xl text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-200 mb-3">No Fund Selected</h2>
            <p className="text-gray-400 mb-4 text-sm">Please go back and select a fund to proceed with your investment.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/green-funds')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                       text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 
                       shadow-lg hover:shadow-green-500/25 flex items-center gap-2 mx-auto text-sm"
            >
              <FaLeaf />
              Back to Funds
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!razorpayLoaded) {
      alert('Payment gateway is not loaded. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      // Get user details from localStorage
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;

      if (!user) {
        alert('Please login to continue with payment');
        navigate('/login');
        return;
      }

      // Create Razorpay order with fund details
      if (!navPrice) {
        alert('NAV price is still loading. Please wait a moment and try again.');
        setLoading(false);
        return;
      }
      
      const order = await createRazorpayOrder(
        parseFloat(amount), 
        fund.schemeName, 
        fund.schemeCode,
        navPrice,
        user
      );

      const options = {
        ...razorpayConfig,
        key: order.key, // Use key from backend response
        amount: order.amount,
        order_id: order.id,
        prefill: {
          name: user.name || 'Investor',
          email: user.email || '',
          contact: user.phone || ''
        },
        notes: {
          fund_name: fund.schemeName,
          scheme_code: fund.schemeCode,
          investment_type: 'mutual_fund'
        },
        handler: async function (response) {
          try {
            // Verify payment on backend
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const verificationResult = await verifyRazorpayPayment(verificationData);
            
            if (verificationResult.success) {
              // Payment verified successfully
              const newTransaction = {
                fund: fund.schemeName,
                amount: parseFloat(amount),
                units: verificationResult.transaction.units,
                date: new Date().toLocaleString(),
                schemeCode: fund.schemeCode,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                status: 'success',
                transactionId: verificationResult.transaction.id
              };
              setTransaction(newTransaction);
              setShowConfirmation(true);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment successful but verification failed. Please contact support.');
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        },
        theme: {
          color: razorpayConfig.theme.color
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
      setLoading(false);
    }
  };



  if (showConfirmation) {
    return (
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/3 rounded-full filter blur-2xl" />
        </div>
        
        <div className="relative bg-transparent text-white min-h-screen flex items-center justify-center p-4">
          <div className="max-w-xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 
                       shadow-xl p-6 md:p-8 text-center"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6"
              >
                <div className="p-4 bg-green-500/20 rounded-full inline-block mb-4">
                  <FaCheckCircle className="text-4xl text-green-400" />
                </div>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 
                         bg-clip-text text-transparent mb-4"
              >
                Investment Successful!
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-slate-700/50 backdrop-blur-sm p-4 rounded-lg border border-slate-600/50 mb-4"
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  <FaRupeeSign className="text-green-400 text-xs" />
                  <p className="text-sm text-gray-200">
                    You have invested <span className="font-bold text-green-400">₹{transaction.amount.toLocaleString()}</span> in
                  </p>
                </div>
                <p className="text-sm font-semibold text-green-300 mb-3 leading-tight">
                  {transaction.fund}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-600/30 p-3 rounded-lg border border-slate-500/30">
                    <div className="flex items-center gap-1 text-green-400 mb-1">
                      <FaChartLine className="text-xs" />
                      <span className="font-medium text-xs">Units Allocated</span>
                    </div>
                    <p className="text-lg font-bold text-white">{transaction.units}</p>
                  </div>
                  <div className="bg-slate-600/30 p-3 rounded-lg border border-slate-500/30">
                    <div className="flex items-center gap-1 text-blue-400 mb-1">
                      <FaInfoCircle className="text-xs" />
                      <span className="font-medium text-xs">Transaction Date</span>
                    </div>
                    <p className="text-xs font-medium text-gray-300">{transaction.date}</p>
                  </div>
                  {transaction.paymentId && (
                    <div className="bg-slate-600/30 p-3 rounded-lg border border-slate-500/30 md:col-span-2">
                      <div className="flex items-center gap-1 text-purple-400 mb-1">
                        <FaCreditCard className="text-xs" />
                        <span className="font-medium text-xs">Payment Details</span>
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <p className="text-gray-300">
                          <span className="text-gray-400">Payment ID:</span> {transaction.paymentId}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Order ID:</span> {transaction.orderId}
                        </p>
                        <p className="text-green-400 font-medium">
                          <span className="text-gray-400">Status:</span> Payment Successful ✓
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/green-funds')}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 
                           hover:to-emerald-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm
                           transition-all duration-300 shadow-md hover:shadow-green-500/25 
                           flex items-center justify-center gap-2"
                >
                  <FaLeaf className="text-xs" />
                  View All Funds
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/')}
                  className="border border-slate-600/50 hover:border-green-500/50 text-gray-300 
                           hover:text-green-300 px-4 py-2.5 rounded-lg font-medium text-sm
                           transition-all duration-300 hover:bg-green-500/10"
                >
                  Back to Home
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
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
      
      <div className="relative bg-transparent text-white p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/green-funds')}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 
                       bg-green-500/10 hover:bg-green-500/20 px-3 py-1.5 rounded-lg 
                       border border-green-500/30 hover:border-green-500/50 
                       transition-all duration-300 font-medium text-sm"
            >
              <FaArrowLeft />
              Back to Funds
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 
                     shadow-xl overflow-hidden"
          >
            {/* Fund Header */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-4 md:p-6 border-b border-slate-700/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500/20 rounded-xl">
                  <FaLeaf className="text-lg text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-bold text-green-400 leading-tight">
                    {fund.schemeName}
                  </h2>
                  <p className="text-gray-300 text-sm">Complete your investment</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Fund Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-slate-700/30 backdrop-blur-sm p-3 md:p-4 rounded-lg border border-slate-600/50 mb-4"
              >
                <h3 className="text-sm font-semibold text-gray-200 mb-2 flex items-center gap-2">
                  <FaInfoCircle className="text-green-400 text-xs" />
                  Fund Details
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/30">
                    <span className="text-gray-400 text-sm">Scheme Code:</span>
                    <span className="font-mono text-gray-200 text-sm">{fund.schemeCode}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-600/30">
                    <span className="text-gray-400 text-sm">Current NAV:</span>
                    <span className="font-semibold text-green-400 flex items-center gap-2">
                      {navLoading ? (
                        <>
                          <FaSpinner className="animate-spin text-sm" />
                          Loading...
                        </>
                      ) : (
                        `₹${navPrice?.toFixed(2) || 'N/A'}`
                      )}
                    </span>
                  </div>
                  {fund.isinGrowth && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-600/30">
                      <span className="text-gray-400">ISIN (Growth):</span>
                      <span className="font-mono text-gray-200 text-sm">{fund.isinGrowth}</span>
                    </div>
                  )}
                  {amount && navPrice && (
                    <div className="flex justify-between items-center py-3 border-b border-slate-600/30">
                      <span className="text-gray-400">Units to be allotted:</span>
                      <span className="font-semibold text-blue-400">
                        {(parseFloat(amount) / navPrice).toFixed(4)} units
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Investment Form */}
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onSubmit={handleTransaction} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-200 flex items-center gap-2">
                    <FaRupeeSign className="text-green-400 text-xs" />
                    Investment Amount
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="100"
                      step="100"
                      required
                      placeholder="Enter amount (minimum ₹100)"
                      className="w-full p-2.5 pl-8 text-sm bg-slate-700/50 backdrop-blur-sm border 
                               border-slate-600/50 rounded-lg text-white placeholder-gray-400 
                               focus:border-green-500/50 focus:ring-1 focus:ring-green-500/25 
                               transition-all duration-300"
                    />
                    <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs" />
                  </div>
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <FaInfoCircle className="text-xs" />
                    Minimum investment: ₹100
                  </p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  type="submit"
                  disabled={!amount || amount < 100 || loading || !razorpayLoaded || navLoading || !navPrice}
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-300 
                           shadow-md flex items-center justify-center gap-2 ${
                           !amount || amount < 100 || loading || !razorpayLoaded || navLoading || !navPrice
                             ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                             : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/25 hover:shadow-xl'
                         }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Processing Payment...
                    </>
                  ) : navLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Loading NAV Price...
                    </>
                  ) : !razorpayLoaded ? (
                    <>
                      <FaInfoCircle />
                      Loading Payment Gateway...
                    </>
                  ) : !navPrice ? (
                    <>
                      <FaInfoCircle />
                      NAV Price Unavailable
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      Pay with Razorpay
                    </>
                  )}
                </motion.button>
                
                {razorpayLoaded && (
                  <div className="text-center text-xs text-gray-400 mt-3">
                    <p className="flex items-center justify-center gap-1">
                      <FaCreditCard className="text-green-400 text-xs" />
                      Secure payment powered by Razorpay
                    </p>
                    <p className="mt-0.5">Supports UPI, Cards, Net Banking, and Wallets</p>
                  </div>
                )}
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage; 
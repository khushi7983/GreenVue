import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaGraduationCap, FaCalculator, FaChartLine } from 'react-icons/fa';
import { HiMail, HiSparkles } from 'react-icons/hi';
import { ArrowRight, TrendingUp } from 'lucide-react';

const Working = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/green-funds');
  };

  const handleGoPro = () => {
    navigate('/features');
  };

  const handleContactSales = () => {
    // Scroll to contact section or navigate to contact page
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

      <section className="relative bg-transparent text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 
                         bg-gradient-to-r from-green-400 to-green-600 
                         bg-clip-text text-transparent"
            >
              How It Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Start your sustainable investing journey in three simple steps
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="relative p-8 text-center border border-slate-700/50 rounded-2xl 
                         hover:border-green-500/50 transition-all duration-500 
                         bg-slate-800/50 backdrop-blur-sm group cursor-pointer
                         hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl 
                                flex items-center justify-center mx-auto shadow-lg shadow-green-500/30
                                group-hover:scale-110 transition-transform duration-500">
                    <FaGraduationCap className="text-2xl text-white" />
                  </div>
                  
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-400 group-hover:text-green-300 
                               transition-colors duration-300">
                  Learn About ESG Funds
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  Discover the power of sustainable investing and how ESG funds create positive environmental and social impact.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -8 }}
              className="relative p-8 text-center border border-slate-700/50 rounded-2xl 
                         hover:border-green-500/50 transition-all duration-500 
                         bg-slate-800/50 backdrop-blur-sm group cursor-pointer
                         hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl 
                                flex items-center justify-center mx-auto shadow-lg shadow-green-500/30
                                group-hover:scale-110 transition-transform duration-500">
                    <FaCalculator className="text-2xl text-white" />
                  </div>
                
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-400 group-hover:text-green-300 
                               transition-colors duration-300">
                  Calculate Your Investment
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  Use our smart calculator to determine the optimal allocation of your income toward sustainable investments.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -8 }}
              className="relative p-8 text-center border border-slate-700/50 rounded-2xl 
                         hover:border-green-500/50 transition-all duration-500 
                         bg-slate-800/50 backdrop-blur-sm group cursor-pointer
                         hover:shadow-xl hover:shadow-green-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-2xl 
                                flex items-center justify-center mx-auto shadow-lg shadow-green-500/30
                                group-hover:scale-110 transition-transform duration-500">
                    <FaChartLine className="text-2xl text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-green-400 group-hover:text-green-300 
                               transition-colors duration-300">
                  Simulate & Track Impact
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  Make virtual investments, monitor your portfolio performance, and visualize your positive impact.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
</section>

      {/* Pricing Plans Section */}
      <section className="relative bg-transparent py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold mb-4 
                         bg-gradient-to-r from-green-400 to-green-600 
                         bg-clip-text text-transparent"
            >
              Choose Your Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              Select the perfect plan to start your sustainable investing journey
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-slate-700/50 
                         hover:border-green-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-green-500/10
                         group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-4 text-white">Basic</h3>
              <p className="text-3xl font-bold mb-6 text-white">Free</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">Basic Portfolio Analysis</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">Market Updates</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">Community Access</span>
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-lg transition-all duration-300
                                font-medium hover:shadow-lg cursor-pointer"
              >
                Get Started
              </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -12, scale: 1.08 }}
              className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-center 
                         shadow-2xl shadow-green-500/30 border border-green-500/50 relative overflow-hidden
                         group cursor-pointer"
            >
              <div className="absolute top-0 right-0 bg-yellow-400 text-green-900 px-3 py-1 
                            rounded-bl-xl text-sm font-bold flex items-center gap-1">
                <HiSparkles className="w-4 h-4" />
                Popular
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <p className="text-3xl font-bold mb-6">₹499/mo</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-white w-5 h-5" />
                  <span>Advanced Analytics</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-white w-5 h-5" />
                  <span>Priority Support</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-white w-5 h-5" />
                  <span>Expert Consultation</span>
                </li>
              </ul>
              <button 
                onClick={handleGoPro}
                className="w-full bg-white text-green-600 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300
                                font-medium hover:shadow-lg cursor-pointer"
              >
                Go Pro
                <ArrowRight className="inline-block w-4 h-4 ml-2" />
              </button>
              </div>
            </motion.div>
            <div className="bg-slate-800 rounded-xl p-8 text-center border border-slate-700 
                           hover:border-green-500/50 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4 text-white">Enterprise</h3>
              <p className="text-3xl font-bold mb-6 text-white">Custom</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">Custom Solutions</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">Dedicated Manager</span>
                </li>
                <li className="flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 w-5 h-5" />
                  <span className="text-white">API Access</span>
                </li>
              </ul>
              <button 
                onClick={handleContactSales}
                className="w-full bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-lg transition-all duration-300
                                font-medium hover:shadow-lg cursor-pointer"
              >
                Contact Sales
                <TrendingUp className="inline-block w-4 h-4 ml-2" />
              </button>
              </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative bg-transparent py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50 
                       hover:border-green-500/50 transition-all duration-500 relative overflow-hidden
                       group hover:shadow-2xl hover:shadow-green-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 
                            bg-gradient-to-r from-green-400 to-green-600 
                            bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-gray-300">Get the latest insights on sustainable investing directly in your inbox.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 
                           focus:outline-none focus:border-green-500 transition-all duration-300 text-white"
              />
              <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg 
                                font-semibold transition-all duration-300 flex items-center 
                                justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20">
                Subscribe
                <HiMail className="w-5 h-5" />
              </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Working;

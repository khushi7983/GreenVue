import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaChartLine, FaNewspaper, FaLeaf, FaChartPie, FaGraduationCap, FaRocket, FaUsers, FaHeart, FaCalculator } from 'react-icons/fa';
import { Leaf, TrendingUp, Globe, Users, Lightbulb, Target, Sparkles, ArrowRight, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ESGEducation = () => {
  const navigate = useNavigate();

  const handleStartInvesting = () => {
    navigate('/green-funds');
  };

  const handleCalculateImpact = () => {
    // Check if user is authenticated for impact calculator
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/features/impact-calculator');
    } else {
      navigate('/login');
    }
  };
  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/3 rounded-full filter blur-2xl" />
      </div>

      <div className="relative bg-transparent text-white">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent leading-tight">
                  ESG Investment Guide
                </h1>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2">
                  Learn about Environmental, Social, and Governance investing principles and strategies.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-5 lg:p-6 rounded-xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-300 group cursor-pointer
                           hover:shadow-lg hover:shadow-green-500/10 relative overflow-hidden
                           touch-manipulation"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-2 sm:p-2.5 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300 shrink-0">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300 leading-tight">
                        Environmental
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-2 sm:mb-3 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                      Companies fighting climate change
                    </p>
                    <ul className="text-gray-300 space-y-2 sm:space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Climate action & clean energy
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Carbon neutral operations
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Sustainable resource use
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Zero-waste initiatives
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -8 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer
                           hover:shadow-xl hover:shadow-green-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                        <Users className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                        Social
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      Companies treating people right
                    </p>
                    <ul className="text-gray-300 space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Fair wages & work-life balance
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Diversity & inclusion
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Community development
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Data privacy protection
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer
                           hover:shadow-xl hover:shadow-green-500/10 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                        <Target className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                        Governance
                      </h3>
                    </div>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
                      Companies doing business ethically
                    </p>
                    <ul className="text-gray-300 space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Transparent leadership
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Ethical business practices
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Fair executive compensation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Anti-corruption policies
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Youth-focused Why ESG Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 
                           bg-clip-text text-transparent">Why ESG Matters to You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50
                              hover:border-green-500/50 transition-all duration-500 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <FaHeart className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Align with Your Values</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Your money supports companies that match your beliefs - from climate action to social justice. 
                    Every rupee becomes a vote for the world you want to see.
                  </p>
                </div>
                
                <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50
                              hover:border-green-500/50 transition-all duration-500 group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Future-Proof Returns</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    ESG companies are often more resilient and innovative. Studies show they can outperform 
                    traditional investments, especially during market uncertainty.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Gen Z Investment Reality Check */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl p-8
                         border border-blue-500/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 text-blue-400">Reality Check: Starting Young</h2>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Your biggest advantage? Time. Starting ESG investing in your 20s gives you 30+ years 
                    to compound both your wealth and your impact.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-400 mb-2">₹1,000/month</div>
                    <div className="text-gray-300 mb-2">Starting at 25</div>
                    <div className="text-2xl font-bold text-green-400">₹1.2 Crores</div>
                    <div className="text-gray-400 text-sm">by retirement (12% returns)</div>
                  </div>
                  
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-400 mb-2">₹5,000/month</div>
                    <div className="text-gray-300 mb-2">After first job</div>
                    <div className="text-2xl font-bold text-green-400">₹6+ Crores</div>
                    <div className="text-gray-400 text-sm">massive compound growth</div>
                  </div>
                  
                  <div className="text-center p-6 bg-slate-800/50 rounded-xl">
                    <div className="text-4xl font-bold text-blue-400 mb-2">100+</div>
                    <div className="text-gray-300 mb-2">Companies impacted</div>
                    <div className="text-2xl font-bold text-green-400">Massive</div>
                    <div className="text-gray-400 text-sm">environmental impact</div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent">ESG Fund Categories</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Explore different types of sustainable investment options available to you
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                      Top Global ESG Funds
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Internationally diversified funds focusing on companies with strong ESG practices
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                      Sustainable ETFs
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Exchange-traded funds with low fees and broad exposure to sustainable companies
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                      Green Energy Funds
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Focused investments in renewable energy, clean technology, and climate solutions
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FaHeart className="w-6 h-6 text-green-400" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                      Socially Responsible Funds
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Investments that prioritize social impact, human rights, and community development
                  </p>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent">Platform Features</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Everything you need to start and manage your sustainable investment journey
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: FaSearch, title: "Smart Fund Search", desc: "Advanced filtering to find ESG funds matching your values and criteria" },
                  { icon: FaChartLine, title: "Performance Analytics", desc: "Detailed metrics, ESG scores, and historical data for informed decisions" },
                  { icon: FaNewspaper, title: "Green News Feed", desc: "Latest sustainable investing news and ESG market developments" },
                  { icon: FaLeaf, title: "ESG Impact Tracking", desc: "Monitor environmental and social impact of your investments" },
                  { icon: FaChartPie, title: "Portfolio Management", desc: "Tools to build and manage diversified sustainable portfolios" },
                  { icon: FaGraduationCap, title: "Educational Resources", desc: "Comprehensive guides and tutorials for ESG investing" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                             hover:border-green-500/50 transition-all duration-500 group cursor-pointer
                             hover:shadow-xl hover:shadow-green-500/10 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors duration-300">
                          <feature.icon className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent">Benefits of ESG Investing</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Why sustainable investing is both profitable and impactful
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Financial Benefits</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Competitive long-term returns potential
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Reduced environmental and governance risks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Portfolio diversification opportunities
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Protection against regulatory changes
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                           hover:border-green-500/50 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-xl">
                      <Globe className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Impact Benefits</h3>
                  </div>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Support sustainable business practices
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Contribute to environmental conservation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Promote social responsibility
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Drive positive corporate behavior
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent">Small Investments, Big Impact</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  You don't need large amounts of capital to make a difference. Start small and create lasting change.
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30"
                  >
                    <h4 className="text-green-400 font-semibold mb-3 text-lg">Example Impact</h4>
                    <p className="text-gray-300 mb-4">
                      If 1,000 people invest just ₹1,000 monthly:
                    </p>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        ₹12 million yearly for sustainable projects
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        100+ tons of CO2 offset annually
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Multiple renewable energy initiatives
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-slate-700/50 p-6 rounded-2xl border border-slate-600/30"
                  >
                    <h4 className="text-green-400 font-semibold mb-3 text-lg">Benefits of Starting Small</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Lower financial risk while learning
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Develop sustainable investing habits
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Flexibility to increase over time
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        Part of larger collective impact
                      </li>
                    </ul>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-green-500/10 p-6 rounded-2xl border border-green-500/20 mb-8"
                >
                  <h4 className="text-green-400 font-semibold mb-3 text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Did You Know?
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    If every working Indian invested just 2% of their income in green funds, it could generate over 
                    ₹500 billion annually for sustainable development – enough to fund multiple large-scale renewable energy projects!
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { value: "2%", label: "Monthly Income" },
                    { value: "12x", label: "Growth Potential" },
                    { value: "∞", label: "Lasting Impact" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="bg-slate-700/50 p-6 rounded-2xl text-center border border-slate-600/30"
                    >
                      <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
                      <p className="text-gray-300 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 
                               bg-clip-text text-transparent">Getting Started is Easy</h2>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Three simple steps to begin your sustainable investing journey
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Start Small", desc: "Begin with 2% of monthly income for sustainable habit building" },
                  { step: "2", title: "Stay Consistent", desc: "Set up automatic monthly investments for regular growth" },
                  { step: "3", title: "Grow Gradually", desc: "Increase investment percentage as you become comfortable" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ y: -8 }}
                    className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 
                             hover:border-green-500/50 transition-all duration-500 group text-center"
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4
                                    group-hover:bg-green-500/30 transition-colors duration-300 border border-green-500/30">
                        <span className="text-2xl font-bold text-green-400">{item.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-green-400 group-hover:text-green-300 
                                   transition-colors duration-300 mb-3">
                        Step {item.step}: {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Call to Action */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center bg-gradient-to-r from-green-500/10 to-emerald-500/10 
                         rounded-3xl p-12 border border-green-500/20"
            >
              <div className="mb-8">
                <Sparkles className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4 text-green-400">Ready to Start Your ESG Journey?</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                  Join thousands of young investors who are building wealth while making a positive impact. 
                  Your future self (and the planet) will thank you.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStartInvesting}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 
                           hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold 
                           transition-all duration-300 shadow-lg hover:shadow-green-500/25
                           flex items-center justify-center gap-2"
                >
                  <FaRocket className="w-5 h-5" />
                  Start Investing Now
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculateImpact}
                  className="border border-green-500/30 hover:border-green-500/60 px-8 py-4 
                           rounded-xl font-semibold transition-all duration-300 hover:bg-green-500/10
                           flex items-center justify-center gap-2"
                >
                  <FaCalculator className="w-5 h-5" />
                  Calculate Impact
                </motion.button>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGEducation; 
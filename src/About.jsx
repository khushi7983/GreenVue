
import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaChartLine, FaGlobe, FaMoneyBillWave, FaUsers, FaTrophy } from "react-icons/fa";
import { Leaf, TrendingUp, Globe, DollarSign, Users, Award, Sparkles } from "lucide-react";
import FeaturesSection from "./Feature";
import InvestImage from './assets/InvestImage.png';
const AboutUs = () => {
  const stats = [
    { icon: Users, label: "Active Investors", value: "10K+", color: "text-blue-400" },
    { icon: TrendingUp, label: "Average Returns", value: "12.5%", color: "text-green-400" },
    { icon: Globe, label: "Countries Served", value: "25+", color: "text-purple-400" },
    { icon: Award, label: "ESG Funds", value: "500+", color: "text-yellow-400" }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-blue-500/3 rounded-full filter blur-2xl" />
      </div>

      <section className="relative bg-transparent text-white py-20 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-7xl mx-auto">
            {/* Left Side - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 text-center md:text-left"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-6 relative"
              >
                <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 
                               bg-clip-text text-transparent">
                  About Us
                </span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-gray-300 mb-6 leading-relaxed"
              >
                At <span className="text-green-400 font-semibold bg-green-400/10 px-2 py-1 rounded-lg">GreenVue</span>, 
                we believe that investing should not only generate financial returns but also contribute to a sustainable future. 
                Our platform empowers individuals to invest at least 1% of their income in green mutual funds and ESG investments.
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-300 mb-6 leading-relaxed"
              >
                Green investing allows you to grow your wealth while promoting clean energy, ethical labor practices, 
                and responsible governance. Unlike traditional investments, ESG funds focus on companies that are making 
                a positive environmental and social impact.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 rounded-2xl 
                           border border-green-500/20 mb-8 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="p-2 bg-green-500/20 rounded-lg mt-1">
                    <Globe className="w-5 h-5 text-green-400" />
                  </div>
                  <p className="text-lg text-green-300 font-semibold leading-relaxed">
                    We aim to create a movement where every small contribution leads to a big impact. 
                    By investing in ESG funds, you are not just securing your financial future but also 
                    contributing to a healthier planet. Join GreenVue today and be a part of the change!
                  </p>
                </div>
                  </motion.div>
                </motion.div>
                
            {/* Right Side - Image */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 flex justify-center relative"
            >
              <div className="relative group">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 
                              rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-2xl shadow-2xl"
                >
                  <img 
                    src={InvestImage}
                    alt="Sustainable Investment" 
                    className="w-full max-w-md h-80 object-cover rounded-2xl
                             border border-green-500/20 group-hover:border-green-500/40 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                
                {/* Floating stats badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="absolute -bottom-6 -right-6 bg-slate-800/90 backdrop-blur-sm 
                           border border-green-500/30 rounded-2xl p-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-semibold text-sm">Growing Impact</p>
                      <p className="text-white text-xs">Join thousands</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
  
        </div>
      </section>
    </div>
  );
};

export default AboutUs;


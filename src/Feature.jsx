import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  TrendingUp,
  Scale,
  Leaf,
  Heart,
  PiggyBank,
  Target,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const FeatureCard = ({ title, description, icon: Icon, delay = 0, offset = 0 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: delay,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ 
        duration: 0.7, 
        delay: offset,
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, type: "spring", bounce: 0.4 }
      }}
      className="p-6 border border-gray-700/40 rounded-2xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 
                shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-700 
                hover:border-green-500/50 group backdrop-blur-lg
                relative overflow-hidden cursor-pointer"
    >
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="relative">
            <div className="p-4 bg-gradient-to-br from-green-900/40 to-emerald-900/30 rounded-2xl 
                            group-hover:from-green-800/60 group-hover:to-emerald-800/50
                            transition-all duration-700 ring-1 ring-green-500/30
                            group-hover:ring-green-400/60 group-hover:ring-2
                            shadow-lg group-hover:shadow-green-500/20">
              <Icon className="h-6 w-6 text-green-400 group-hover:text-green-300 
                              transform group-hover:rotate-12 group-hover:scale-110
                              transition-all duration-700" />
            </div>
            {/* Icon Glow Effect */}
            <div className="absolute inset-0 bg-green-400/20 rounded-2xl blur-md opacity-0 
                          group-hover:opacity-100 transition-all duration-700"/>
          </div>
          
        </div>
        <h3 className="text-lg font-bold mb-4 text-white group-hover:text-green-300 
                       transition-all duration-700 leading-tight
                       group-hover:transform group-hover:translate-x-1">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-100 transition-all duration-700 
                      leading-relaxed text-sm group-hover:transform group-hover:translate-x-1
                      delay-100">
          {description}
        </p>
        
        {/* Progress Bar Effect */}
        <div className="mt-6 h-1 bg-gray-700/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full 
                        transform -translate-x-full group-hover:translate-x-0 
                        transition-transform duration-1000 ease-out delay-300"/>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Investment Assistant",
      description: "Get personalized ESG fund recommendations with our intelligent chatbot. Receive tailored advice based on your risk profile, investment goals, and sustainability preferences."
    },
    {
      icon: TrendingUp,
      title: "Real-Time Fund Analytics",
      description: "Access live NAV prices, performance metrics, and comprehensive fund analysis. Make informed decisions with up-to-date market data and dynamic investment insights."
    },
    {
      icon: Scale,
      title: "Advanced Fund Comparison",
      description: "Compare ESG funds side-by-side with detailed analytics including expense ratios, returns, risk metrics, and sustainability scores to find the perfect match."
    },
    {
      icon: Target,
      title: "Portfolio Impact Calculator",
      description: "Track your environmental impact in real-time. See how your investments contribute to carbon reduction, water conservation, and other sustainability metrics."
    },
    {
      icon: Heart,
      title: "Goal-Based Investment Planning",
      description: "Set and track your financial goals with AI-powered recommendations. Create customized portfolios aligned with your values and investment timeline."
    },
    {
      icon: Leaf,
      title: "ESG Education & Insights",
      description: "Stay informed with curated ESG news, market trends, and educational content. Build your knowledge while growing your sustainable investment portfolio."
    }
  ];

  return (
    <section className="relative w-full  
                      overflow-hidden mt-20 md:mt-28">
      {/* Enhanced Background */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#1e293b_0%,transparent_50%),radial-gradient(circle_at_70%_80%,#334155_0%,transparent_50%)]"/>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/15 rounded-full blur-3xl animate-pulse"/>
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-indigo-500/12 rounded-full blur-3xl animate-pulse delay-1000"/>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-2000"/>
      </div> */}

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 
                       bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 
                       bg-clip-text text-transparent
                       drop-shadow-2xl leading-tight"
          >
            Advanced Features & Capabilities
          </motion.h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 
                        sm:gap-8 md:gap-8 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
              offset={index * 0.15} // Staggered animation offset
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;
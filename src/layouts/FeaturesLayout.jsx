import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaMoneyBillWave, FaNewspaper, FaRobot, FaCalculator, FaGavel, FaBalanceScale, FaHome } from "react-icons/fa";

const features = [
  { 
    name: "ESG Investment Guide", 
    icon: <FaLeaf />, 
    path: "/features/esg-guide",
    description: "Learn about ESG investing principles and strategies"
  },
  { 
    name: "Green Mutual Funds", 
    icon: <FaGavel />, 
    path: "/features/green-funds",
    description: "Discover and invest in sustainable mutual funds"
  },
  { 
    name: "Fund Comparison Tool", 
    icon: <FaBalanceScale />, 
    path: "/features/fund-comparison",
    description: "Compare ESG funds side-by-side with detailed analytics"
  },
  { 
    name: "Impact Calculator", 
    icon: <FaCalculator />, 
    path: "/features/impact-calculator",
    description: "Calculate your investment's environmental impact"
  },
  { 
    name: "Green Investment News", 
    icon: <FaNewspaper />, 
    path: "/features/green-news",
    description: "Stay updated with latest ESG market trends"
  },
  { 
    name: "AI Investment Assistant", 
    icon: <FaRobot />, 
    path: "/features/ai-assistant",
    description: "Get personalized investment recommendations"
  },
];

const FeaturesLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleBackToHome = () => {
    navigate('/');
  };

  const getCurrentPageTitle = () => {
    const currentFeature = features.find(feature => feature.path === location.pathname);
    return currentFeature ? currentFeature.name : 'Features';
  };

  const getCurrentPageIndex = () => {
    const currentIndex = features.findIndex(feature => feature.path === location.pathname);
    return currentIndex >= 0 ? currentIndex + 1 : 1;
  };

  // Swipe navigation for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    const currentIndex = features.findIndex(feature => feature.path === location.pathname);
    
    if (isLeftSwipe && currentIndex < features.length - 1) {
      // Swipe left - next feature
      navigate(features[currentIndex + 1].path);
    }
    
    if (isRightSwipe && currentIndex > 0) {
      // Swipe right - previous feature
      navigate(features[currentIndex - 1].path);
    }
  };

  const getNavigationHint = () => {
    const currentIndex = getCurrentPageIndex() - 1;
    const prevFeature = currentIndex > 0 ? features[currentIndex - 1] : null;
    const nextFeature = currentIndex < features.length - 1 ? features[currentIndex + 1] : null;
    
    return { prevFeature, nextFeature };
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Fixed Sidebar - Hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block fixed left-0 top-0 w-80 h-full bg-gray-800 border-r border-gray-700 z-40 overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Features
            </h1>
            <button
              onClick={handleBackToHome}
              className="px-3 py-2 bg-gray-700/80 hover:bg-green-600 text-white rounded-lg 
                       transition-all duration-300 flex items-center gap-2 text-sm font-medium
                       hover:shadow-lg hover:shadow-green-500/20 backdrop-blur-sm"
            >
              <FaHome className="w-4 h-4" />
              Home
            </button>
          </div>
          {/* <p className="text-gray-400 text-sm">
            Explore our ESG investment tools and resources
          </p> */}
        </div>

        {/* Navigation Menu */}
        <nav className="p-6 space-y-3 pb-24">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`block p-4 rounded-xl transition-all duration-300 group hover:bg-gray-700/70
                         ${isActiveRoute(feature.path) 
                           ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 shadow-lg shadow-green-500/10' 
                           : 'hover:bg-gray-700/50 border border-transparent hover:border-gray-600/50'
                         }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-lg mt-0.5 transition-all duration-300 group-hover:scale-110
                               ${isActiveRoute(feature.path) ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'}`}>
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm leading-tight transition-colors duration-300
                                 ${isActiveRoute(feature.path) ? 'text-green-300' : 'text-white group-hover:text-green-300'}`}>
                    {feature.name}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed transition-colors duration-300
                               ${isActiveRoute(feature.path) ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                    {feature.description}
                  </p>
                </div>
                {isActiveRoute(feature.path) && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mt-1.5 shrink-0" />
                )}
              </div>
            </Link>
          ))}
        </nav>

      
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-80 bg-gray-900 min-h-screen">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg:hidden bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleBackToHome}
                className="p-2 bg-gray-700/50 hover:bg-green-600 text-white rounded-lg 
                         transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {getCurrentPageTitle()}
                </h1>
                <p className="text-xs text-gray-400">GreenVue Tools</p>
              </div>
            </div>
            
            {/* Mobile Feature Navigation */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">{getCurrentPageIndex()}/{features.length}</span>
            </div>
          </div>
        </div>
        
        <div 
          className="min-h-full overflow-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
            
            {/* Mobile Navigation Controls - Only show on mobile */}
            <div className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              {(() => {
                const { prevFeature, nextFeature } = getNavigationHint();
                return (
                  <div className="flex items-center space-x-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 rounded-full px-3 py-2 shadow-lg">
                    {prevFeature ? (
                      <button 
                        onClick={() => navigate(prevFeature.path)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-green-400 active:text-green-500 
                                 transition-colors duration-200 p-2 rounded-full hover:bg-green-500/10"
                        title={`Previous: ${prevFeature.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="text-xs hidden sm:inline">{prevFeature.name}</span>
                      </button>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                    
                    <div className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-700/50 rounded-full">
                      {getCurrentPageIndex()}/{features.length}
                    </div>
                    
                    {nextFeature ? (
                      <button 
                        onClick={() => navigate(nextFeature.path)}
                        className="flex items-center space-x-2 text-gray-300 hover:text-green-400 active:text-green-500 
                                 transition-colors duration-200 p-2 rounded-full hover:bg-green-500/10"
                        title={`Next: ${nextFeature.name}`}
                      >
                        <span className="text-xs hidden sm:inline">{nextFeature.name}</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesLayout;
import React from 'react';
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

  const handleBackToHome = () => {
    navigate('/');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700">
        {/* Header */}
        <div className="p-3.5 border-b border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Features
            </h2>
            <button
              onClick={handleBackToHome}
              className="px-3 py-2 bg-gray-700 hover:bg-green-600 text-white rounded-lg 
                       transition-all duration-300 flex items-center gap-2 text-sm
                       hover:shadow-lg hover:shadow-green-500/20"
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
        <nav className="p-4 space-y-2">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`block p-4 rounded-xl transition-all duration-300 group hover:bg-gray-700
                         ${isActiveRoute(feature.path) 
                           ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30' 
                           : 'hover:bg-gray-700/50'
                         }`}
            >
              <div className="flex items-start gap-3">
                <div className={`text-xl mt-1 transition-all duration-300 group-hover:scale-110
                               ${isActiveRoute(feature.path) ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-sm transition-colors duration-300
                                 ${isActiveRoute(feature.path) ? 'text-green-300' : 'text-white group-hover:text-green-300'}`}>
                    {feature.name}
                  </h3>
                  <p className={`text-xs mt-1 transition-colors duration-300
                               ${isActiveRoute(feature.path) ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400'}`}>
                    {feature.description}
                  </p>
                </div>
                {isActiveRoute(feature.path) && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mt-2" />
                )}
              </div>
            </Link>
          ))}
        </nav>

      
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-900 overflow-auto">
        <div className="min-h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FeaturesLayout;
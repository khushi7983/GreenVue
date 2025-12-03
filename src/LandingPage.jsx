import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeaturesSection from './Feature'; // Adjust path as needed
import FAQSection from './FAQSection'; // Adjust path as needed
import Working from './Working'; // Adjust path as needed
import Footer from './Footer'; // Adjust path as needed
import AboutUs from './About'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/green-funds');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-gray-100 overflow-hidden">
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onStartInvesting={handleGetStarted} />

      <div className="w-full bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900 text-gray-100">
        <div id="about">
          <AboutUs />
        </div>
        
        <div id="features">
          <FeaturesSection />
        </div>
        
        <div id="working">
          <Working />
        </div>
        
        <div id="faq">
          <FAQSection />
        </div>
        
      </div> 
    </div>
  );
};

export default LandingPage;

import React from "react";
import { FaLeaf, FaChartLine, FaGlobe, FaMoneyBillWave } from "react-icons/fa";
import FeaturesSection from "./Feature";
import InvestImage from './assets/InvestImage.png'; 
// Ensure you have an appropriate image in this path
const AboutUs = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-slate-900 to-gray-900" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl" />
      </div>

    <section className="relative bg-transparent text-gray-200 py-24 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 max-w-7xl">
        {/* Left Side - Text Content */}

  <div className="md:w-1/2 text-center md:text-left">
  <h2 className="text-4xl font-bold text-green-400 mb-6">About Us 🌱💡</h2>
  <p className="text-lg text-gray-400 mb-6">
    At <span className="text-green-400 font-semibold">GreenVest</span>, we believe that investing should not only generate financial returns but also contribute to a sustainable future. Our platform encourages individuals to invest at least 1% of their income in green mutual funds and ESG 
  </p>
  <p className="text-lg text-gray-400 mb-6">
    Green investing allows you to grow your wealth while promoting clean energy, ethical labor practices, and responsible governance. Unlike traditional investments, ESG funds focus on companies that are making a positive environmental and social impact.
  </p>
   <p className="text-lg text-green-400 font-semibold">
    We aim to create a movement where every small contribution leads to a big impact. By investing in ESG funds, you are not just securing your financial future but also contributing to a healthier planet. Join GreenVest today and be a part of the change! 🌍
   </p>
  </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-7 h-80">
          <img 
            src={InvestImage}
            alt="Sustainable Investment" 
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>

      </div>
    
    </section> 
    </div>
  );
};

export default AboutUs;


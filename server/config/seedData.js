import { ESGFund, News } from '../models/index.js';

// Initialize sample data in the database
export const initializeData = async () => {
  try {
    // Check if data already exists
    const fundCount = await ESGFund.countDocuments();
    const newsCount = await News.countDocuments();
    
    if (fundCount === 0) {
      console.log('🌱 Initializing sample ESG funds...');
      await ESGFund.insertMany([
        {
          name: "Green Energy Fund",
          type: "ESG Equity",
          returns: "12.5%",
          rating: "5/5",
          description: "Focuses on renewable energy companies",
          minInvestment: 1000,
          expenseRatio: "0.65%"
        },
        {
          name: "Sustainable Growth Fund",
          type: "ESG Mixed",
          returns: "10.2%",
          rating: "4/5",
          description: "Balanced portfolio of sustainable companies",
          minInvestment: 500,
          expenseRatio: "0.75%"
        },
        {
          name: "Social Impact Fund",
          type: "ESG Social",
          returns: "9.8%",
          rating: "4/5",
          description: "Companies with strong social responsibility",
          minInvestment: 2000,
          expenseRatio: "0.85%"
        },
        {
          name: "Clean Technology ETF",
          type: "ESG ETF",
          returns: "15.3%",
          rating: "5/5",
          description: "Exchange-traded fund focusing on clean technology innovations",
          minInvestment: 100,
          expenseRatio: "0.45%"
        },
        {
          name: "Sustainable Water Fund",
          type: "ESG Thematic",
          returns: "11.7%",
          rating: "4/5",
          description: "Investing in water conservation and management companies",
          minInvestment: 1500,
          expenseRatio: "0.95%"
        }
      ]);
      console.log('✅ Sample ESG funds created');
    }
    
    if (newsCount === 0) {
      console.log('📰 Initializing sample news...');
      await News.insertMany([
        {
          title: "ESG Investment Reaches New Heights in 2025",
          summary: "Sustainable investing hits record levels as young investors drive demand",
          content: "The ESG investment sector has seen unprecedented growth in 2025, with total assets under management reaching $45 trillion globally. Young investors, particularly Gen Z and millennials, are driving this trend as they seek investments that align with their values.",
          category: "Market Trends"
        },
        {
          title: "Clean Energy Stocks Outperform Market",
          summary: "Renewable energy companies show strong Q3 performance",
          content: "Clean energy stocks have significantly outperformed the broader market in Q3 2025, with solar and wind companies leading the charge. The sector benefited from increased government support and declining technology costs.",
          category: "Performance"
        },
        {
          title: "New ESG Rating System Launched",
          summary: "Enhanced transparency in sustainable investment evaluation",
          content: "A new comprehensive ESG rating system has been launched to provide investors with better insights into companies' environmental, social, and governance practices. The system uses AI-powered analysis for more accurate assessments.",
          category: "Innovation"
        }
      ]);
      console.log('✅ Sample news articles created');
    }
    
    console.log('🎉 Database initialization completed');
  } catch (error) {
    console.error('❌ Error initializing data:', error);
  }
};
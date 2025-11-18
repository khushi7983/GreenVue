import ESGFund from '../models/ESGFund.js';

// Sample ESG funds data
const sampleFunds = [
  {
    _id: '1',
    schemeName: 'Aditya Birla Sun Life ESG Fund',
    schemeCode: 'ABSL_ESG_001',
    nav: 45.67,
    returns: {
      '1Y': 12.5,
      '3Y': 8.9,
      '5Y': 10.2
    },
    rating: 4,
    riskLevel: 'Moderate',
    category: 'ESG Equity',
    aum: '₹1,250 Cr',
    expenseRatio: 0.75,
    minInvestment: 1000,
    description: 'An ESG-focused equity fund investing in sustainable companies'
  },
  {
    _id: '2', 
    schemeName: 'HDFC ESG Equity Fund',
    schemeCode: 'HDFC_ESG_002',
    nav: 52.34,
    returns: {
      '1Y': 15.2,
      '3Y': 9.8,
      '5Y': 11.5
    },
    rating: 5,
    riskLevel: 'Moderate to High',
    category: 'ESG Equity',
    aum: '₹2,180 Cr',
    expenseRatio: 0.85,
    minInvestment: 5000,
    description: 'High-quality ESG equity fund with focus on governance'
  },
  {
    _id: '3',
    schemeName: 'SBI Green Fund',
    schemeCode: 'SBI_GREEN_003',
    nav: 38.91,
    returns: {
      '1Y': 10.8,
      '3Y': 7.5,
      '5Y': 9.2
    },
    rating: 3,
    riskLevel: 'Moderate',
    category: 'Green Energy',
    aum: '₹890 Cr',
    expenseRatio: 0.65,
    minInvestment: 1000,
    description: 'Focuses on renewable energy and clean technology companies'
  }
];

// Get all ESG funds with filtering
export const getAllFunds = async (req, res) => {
  try {
    const { type, minRating, page = 1, limit = 10 } = req.query;
    
    // For now, return sample data instead of database query
    let filteredFunds = [...sampleFunds];
    
    if (type) {
      filteredFunds = filteredFunds.filter(fund => 
        fund.category.toLowerCase().includes(type.toLowerCase())
      );
    }
    
    if (minRating) {
      const ratingNum = parseInt(minRating);
      filteredFunds = filteredFunds.filter(fund => fund.rating >= ratingNum);
    }
    
    const total = filteredFunds.length;
    const skip = (page - 1) * limit;
    const paginatedFunds = filteredFunds.slice(skip, skip + parseInt(limit));
    
    res.json({ 
      success: true, 
      data: paginatedFunds, 
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching ESG funds:', error);
    res.status(500).json({ success: false, message: 'Error fetching funds' });
  }
};

// Get single ESG fund by ID
export const getFundById = async (req, res) => {
  try {
    const fund = await ESGFund.findById(req.params.id);
    if (!fund) {
      return res.status(404).json({ success: false, message: 'Fund not found' });
    }
    res.json({ success: true, data: fund });
  } catch (error) {
    console.error('❌ Error fetching fund:', error);
    res.status(500).json({ success: false, message: 'Error fetching fund' });
  }
};

// Create new ESG fund
export const createFund = async (req, res) => {
  try {
    const newFund = new ESGFund(req.body);
    const savedFund = await newFund.save();
    res.status(201).json({ success: true, data: savedFund });
  } catch (error) {
    console.error('❌ Error creating fund:', error);
    res.status(400).json({ success: false, message: 'Error creating fund', error: error.message });
  }
};

// Update ESG fund
export const updateFund = async (req, res) => {
  try {
    const updatedFund = await ESGFund.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedFund) {
      return res.status(404).json({ success: false, message: 'Fund not found' });
    }
    
    res.json({ success: true, data: updatedFund });
  } catch (error) {
    console.error('❌ Error updating fund:', error);
    res.status(400).json({ success: false, message: 'Error updating fund', error: error.message });
  }
};

// Delete ESG fund
export const deleteFund = async (req, res) => {
  try {
    const deletedFund = await ESGFund.findByIdAndDelete(req.params.id);
    
    if (!deletedFund) {
      return res.status(404).json({ success: false, message: 'Fund not found' });
    }
    
    res.json({ success: true, message: 'Fund deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting fund:', error);
    res.status(500).json({ success: false, message: 'Error deleting fund' });
  }
};
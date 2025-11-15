import ESGFund from '../models/ESGFund.js';

// Get all ESG funds with filtering
export const getAllFunds = async (req, res) => {
  try {
    const { type, minRating, page = 1, limit = 10 } = req.query;
    let query = {};
    
    if (type) query.type = type;
    if (minRating) {
      // Convert rating like "4/5" to number for comparison
      const ratingNum = parseInt(minRating);
      query.rating = { $regex: `^${ratingNum}` };
    }
    
    const skip = (page - 1) * limit;
    const funds = await ESGFund.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await ESGFund.countDocuments(query);
    
    res.json({ 
      success: true, 
      data: funds, 
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
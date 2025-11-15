import News from '../models/News.js';

// Get all news articles with filtering
export const getAllNews = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    let query = {};
    
    if (category) query.category = category;
    
    const skip = (page - 1) * limit;
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await News.countDocuments(query);
    
    res.json({ 
      success: true, 
      data: news, 
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    res.status(500).json({ success: false, message: 'Error fetching news' });
  }
};

// Get single news article by ID
export const getNewsById = async (req, res) => {
  try {
    const article = await News.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    console.error('❌ Error fetching article:', error);
    res.status(500).json({ success: false, message: 'Error fetching article' });
  }
};

// Create new news article
export const createNews = async (req, res) => {
  try {
    const newArticle = new News(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json({ success: true, data: savedArticle });
  } catch (error) {
    console.error('❌ Error creating news article:', error);
    res.status(400).json({ success: false, message: 'Error creating article', error: error.message });
  }
};

// Update news article
export const updateNews = async (req, res) => {
  try {
    const updatedArticle = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedArticle) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    res.json({ success: true, data: updatedArticle });
  } catch (error) {
    console.error('❌ Error updating article:', error);
    res.status(400).json({ success: false, message: 'Error updating article', error: error.message });
  }
};

// Delete news article
export const deleteNews = async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);
    
    if (!deletedArticle) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    
    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting article:', error);
    res.status(500).json({ success: false, message: 'Error deleting article' });
  }
};
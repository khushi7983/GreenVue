import News from '../models/News.js';

// Get live ESG/Green investment news from NewsAPI
export const getAllNews = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    
    // Construct search query for ESG/Green investment news
    let searchQuery = 'ESG OR "sustainable investing" OR "green finance" OR "renewable energy" OR "climate change" OR "carbon neutral"';
    
    if (category) {
      searchQuery += ` AND ${category}`;
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchQuery)}&language=en&sortBy=publishedAt&pageSize=${limit}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`;

    console.log('🔍 Fetching ESG news from NewsAPI...');
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    // Transform NewsAPI data to our format
    const transformedArticles = data.articles.map((article, index) => ({
      _id: `news_${Date.now()}_${index}`,
      title: article.title,
      description: article.description || article.content?.substring(0, 200) + '...',
      category: 'ESG News',
      source: article.source.name,
      publishedAt: new Date(article.publishedAt),
      url: article.url,
      imageUrl: article.urlToImage || 'https://via.placeholder.com/400x200?text=ESG+News',
      author: article.author
    }));

    console.log(`✅ Fetched ${transformedArticles.length} ESG news articles`);

    res.json({ 
      success: true, 
      data: transformedArticles, 
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(data.totalResults / limit),
        totalItems: data.totalResults,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching news from NewsAPI:', error);
    
    // Fallback to sample data if API fails
    const fallbackNews = [
      {
        _id: 'fallback_1',
        title: 'ESG Investment Trends Continue to Rise',
        description: 'Environmental, Social, and Governance investing gains momentum among institutional investors.',
        category: 'ESG News',
        source: 'Green Finance Today',
        publishedAt: new Date(),
        url: '#',
        imageUrl: 'https://via.placeholder.com/400x200?text=ESG+News'
      },
      {
        _id: 'fallback_2',
        title: 'Renewable Energy Reaches New Milestones',
        description: 'Solar and wind power installations break records worldwide as costs continue to decline.',
        category: 'Clean Energy',
        source: 'Renewable Report',
        publishedAt: new Date(),
        url: '#',
        imageUrl: 'https://via.placeholder.com/400x200?text=Clean+Energy'
      }
    ];

    res.json({ 
      success: true, 
      data: fallbackNews, 
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: fallbackNews.length,
        itemsPerPage: fallbackNews.length
      }
    });
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
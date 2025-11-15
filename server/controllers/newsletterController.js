import Newsletter from '../models/Newsletter.js';

// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return res.json({ 
          success: true, 
          message: 'You are already subscribed to our newsletter!' 
        });
      } else {
        // Resubscribe
        existing.subscribed = true;
        await existing.save();
        return res.json({ 
          success: true, 
          message: 'Welcome back! You have been resubscribed.' 
        });
      }
    }
    
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    
    console.log('📬 Newsletter subscription saved:', email);
    
    res.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter!' 
    });
  } catch (error) {
    console.error('❌ Error saving newsletter subscription:', error);
    res.status(500).json({ success: false, message: 'Error subscribing to newsletter' });
  }
};

// Get all newsletter subscribers
export const getAllSubscribers = async (req, res) => {
  try {
    const { subscribed = true, page = 1, limit = 50 } = req.query;
    const query = { subscribed: subscribed === 'true' };
    
    const skip = (page - 1) * limit;
    const subscribers = await Newsletter.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await Newsletter.countDocuments(query);
    
    res.json({ 
      success: true, 
      data: subscribers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('❌ Error fetching subscribers:', error);
    res.status(500).json({ success: false, message: 'Error fetching subscribers' });
  }
};

// Unsubscribe from newsletter
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    const subscriber = await Newsletter.findOneAndUpdate(
      { email },
      { subscribed: false },
      { new: true }
    );
    
    if (!subscriber) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in our subscription list' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Successfully unsubscribed from newsletter' 
    });
  } catch (error) {
    console.error('❌ Error unsubscribing:', error);
    res.status(500).json({ success: false, message: 'Error unsubscribing from newsletter' });
  }
};

// Get newsletter statistics
export const getNewsletterStats = async (req, res) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ subscribed: true });
    const totalUnsubscribed = await Newsletter.countDocuments({ subscribed: false });
    const recentSubscribers = await Newsletter.countDocuments({
      subscribed: true,
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    });
    
    res.json({
      success: true,
      data: {
        totalSubscribers,
        totalUnsubscribed,
        recentSubscribers,
        total: totalSubscribers + totalUnsubscribed
      }
    });
  } catch (error) {
    console.error('❌ Error fetching newsletter stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching newsletter statistics' });
  }
};
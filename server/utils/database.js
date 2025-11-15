import mongoose from 'mongoose';

// Database utility functions
export const dbUtils = {
  // Check if ID is valid MongoDB ObjectId
  isValidObjectId: (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  },

  // Format MongoDB errors for API responses
  formatError: (error) => {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return { message: 'Validation Error', errors };
    }
    
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return { message: `${field} already exists` };
    }
    
    return { message: error.message || 'Database error occurred' };
  },

  // Pagination helper
  getPaginationOptions: (page = 1, limit = 10) => {
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;
    
    return { skip, limit: limitNum, page: pageNum };
  },

  // Search helper for text fields
  buildSearchQuery: (searchTerm, fields = []) => {
    if (!searchTerm || fields.length === 0) return {};
    
    const searchRegex = new RegExp(searchTerm, 'i');
    return {
      $or: fields.map(field => ({
        [field]: { $regex: searchRegex }
      }))
    };
  }
};

// Database health check
export const checkDatabaseHealth = async () => {
  try {
    const state = mongoose.connection.readyState;
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    
    return {
      status: states[state] || 'unknown',
      isHealthy: state === 1,
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    };
  } catch (error) {
    return {
      status: 'error',
      isHealthy: false,
      error: error.message
    };
  }
};

export default dbUtils;
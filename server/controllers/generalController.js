import { checkDatabaseHealth } from '../utils/database.js';

// Health check endpoint
export const healthCheck = async (req, res) => {
  const dbHealth = await checkDatabaseHealth();
  
  res.json({ 
    status: dbHealth.isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    message: 'GreenVue API is running!',
    database: dbHealth,
    version: '2.0.0'
  });
};

// API information endpoint
export const apiInfo = (req, res) => {
  res.json({ 
    message: 'Welcome to GreenVue API',
    version: '2.0.0',
    description: 'Sustainable investment platform API',
    endpoints: {
      health: '/api/health',
      esgFunds: '/api/esg-funds',
      news: '/api/news',
      contact: '/api/contact',
      newsletter: '/api/newsletter'
    },
    documentation: {
      swagger: '/api/docs',
      postman: '/api/postman-collection'
    }
  });
};
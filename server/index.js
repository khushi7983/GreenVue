import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Sample ESG data for the frontend
const esgFunds = [
  {
    id: 1,
    name: "Green Energy Fund",
    type: "ESG Equity",
    returns: "12.5%",
    rating: "5/5",
    description: "Focuses on renewable energy companies"
  },
  {
    id: 2,
    name: "Sustainable Growth Fund",
    type: "ESG Mixed",
    returns: "10.2%",
    rating: "4/5",
    description: "Balanced portfolio of sustainable companies"
  },
  {
    id: 3,
    name: "Social Impact Fund",
    type: "ESG Social",
    returns: "9.8%",
    rating: "4/5",
    description: "Companies with strong social responsibility"
  }
];

const newsData = [
  {
    id: 1,
    title: "ESG Investment Reaches New Heights in 2025",
    summary: "Sustainable investing hits record levels as young investors drive demand",
    date: "2025-11-15"
  },
  {
    id: 2,
    title: "Clean Energy Stocks Outperform Market",
    summary: "Renewable energy companies show strong Q3 performance",
    date: "2025-11-14"
  }
];

// API Routes
app.get('/api/esg-funds', (req, res) => {
  res.json({ success: true, data: esgFunds });
});

app.get('/api/esg-funds/:id', (req, res) => {
  const fund = esgFunds.find(f => f.id === parseInt(req.params.id));
  if (!fund) {
    return res.status(404).json({ success: false, message: 'Fund not found' });
  }
  res.json({ success: true, data: fund });
});

app.get('/api/news', (req, res) => {
  res.json({ success: true, data: newsData });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('📧 Contact form submission:', { name, email });
  
  // In a real app, you'd save this to a database or send an email
  res.json({ 
    success: true, 
    message: 'Thank you for your message! We\'ll get back to you soon.' 
  });
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  console.log('📬 Newsletter subscription:', email);
  
  res.json({ 
    success: true, 
    message: 'Successfully subscribed to newsletter!' 
  });
});


// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to GreenVue API',
    version: '1.0.0',
    endpoints: {
      esgFunds: '/api/esg-funds',
      news: '/api/news',
      contact: '/api/contact',
      newsletter: '/api/newsletter'
    }
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'GreenVue API is running!' 
  });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`🚀 GreenVue API Server running on port ${PORT}`);
  console.log(`🌱 Serving ESG data and content APIs`);
  console.log(`🔗 Visit http://localhost:${PORT} for API documentation`);
}); 
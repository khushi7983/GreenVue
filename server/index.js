import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDB, setupConnectionHandlers } from './config/database.js';
import { contactRoutes, newsletterRoutes } from './routes/index.js';
import { healthCheck, apiInfo } from './controllers/generalController.js';
import { Contact, Newsletter } from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup database connection and event handlers
setupConnectionHandlers();

// Connect to MongoDB
connectDB();

// Use MVC routes
app.use('/api/contact', contactRoutes);
app.use('/api/contacts', contactRoutes); // Alternative endpoint
app.use('/api/newsletter', newsletterRoutes);


// General routes
app.get('/', apiInfo);
app.get('/api/health', healthCheck);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 GreenVue API Server running on port ${PORT}`);
  console.log(`🌱 Serving ESG data and content APIs`);
  console.log(`🔗 Visit http://localhost:${PORT} for API documentation`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 
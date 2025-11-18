import express from 'express';
import { 
  createOrder, 
  verifyPayment, 
  getUserTransactions, 
  getTransactionById,
  getPortfolioSummary 
} from '../controllers/transactionController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Create Razorpay order and save transaction
router.post('/create-order', authenticate, createOrder);

// Verify payment and update transaction
router.post('/verify-payment', authenticate, verifyPayment);

// Get user transactions
router.get('/transactions', authenticate, getUserTransactions);

// Get specific transaction
router.get('/transactions/:id', authenticate, getTransactionById);

// Get user's portfolio summary
router.get('/portfolio', authenticate, getPortfolioSummary);

export default router;
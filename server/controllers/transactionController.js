import Transaction from '../models/Transaction.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';

// Initialize Razorpay function - called when needed
const initializeRazorpay = () => {
  try {
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
    }
    return null;
  } catch (error) {
    console.warn('⚠️ Razorpay initialization failed:', error.message);
    return null;
  }
};

// Create Razorpay order and save transaction
export const createOrder = async (req, res) => {
  try {
    const { amount, fundName, fundSymbol, navPrice, units } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const razorpay = initializeRazorpay();
    if (!razorpay) {
      return res.status(500).json({ 
        success: false, 
        message: 'Payment gateway not configured' 
      });
    }

    // Validate required fields
    if (!amount || !fundName || !fundSymbol || !navPrice || !units) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required transaction details' 
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save transaction to database
    const transaction = new Transaction({
      userId: new mongoose.Types.ObjectId(userId),
      fundName,
      fundSymbol,
      amount,
      units,
      navPrice,
      razorpayOrderId: razorpayOrder.id,
      status: 'PENDING'
    });

    await transaction.save();

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      receipt: razorpayOrder.receipt
    });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating payment order',
      error: error.message 
    });
  }
};

// Verify payment and update transaction
export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing payment verification data' 
      });
    }

    // Find transaction
    const transaction = await Transaction.findOne({ 
      razorpayOrderId: razorpay_order_id 
    });

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      // Update transaction as failed
      transaction.status = 'FAILED';
      transaction.failureReason = 'Invalid payment signature';
      await transaction.save();

      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
    }

    // Update transaction as completed
    transaction.status = 'COMPLETED';
    transaction.razorpayPaymentId = razorpay_payment_id;
    transaction.razorpaySignature = razorpay_signature;
    transaction.completedAt = new Date();
    await transaction.save();

    res.json({
      success: true,
      message: 'Payment verified successfully',
      transaction: {
        id: transaction._id,
        status: transaction.status,
        amount: transaction.amount,
        fundName: transaction.fundName,
        units: transaction.units,
        completedAt: transaction.completedAt
      }
    });

  } catch (error) {
    console.error('❌ Error verifying payment:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error verifying payment',
      error: error.message 
    });
  }
};

// Get user transactions
export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const { page = 1, limit = 10, status } = req.query;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    let query = { userId: new mongoose.Types.ObjectId(userId) };
    if (status) {
      query.status = status.toUpperCase();
    }

    const skip = (page - 1) * limit;
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('userId', 'name email');

    const total = await Transaction.countDocuments(query);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });

  } catch (error) {
    console.error('❌ Error fetching transactions:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching transactions' 
    });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    const transaction = await Transaction.findOne({ 
      _id: id, 
      userId: new mongoose.Types.ObjectId(userId) 
    }).populate('userId', 'name email');

    if (!transaction) {
      return res.status(404).json({ 
        success: false, 
        message: 'Transaction not found' 
      });
    }

    res.json({
      success: true,
      data: transaction
    });

  } catch (error) {
    console.error('❌ Error fetching transaction:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching transaction' 
    });
  }
};

// Get user's portfolio summary
export const getPortfolioSummary = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Aggregate user's completed transactions
    const portfolio = await Transaction.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId), status: 'COMPLETED' } },
      {
        $group: {
          _id: '$fundSymbol',
          fundName: { $first: '$fundName' },
          totalUnits: { $sum: '$units' },
          totalInvested: { $sum: '$amount' },
          avgNavPrice: { $avg: '$navPrice' },
          transactionCount: { $sum: 1 },
          lastTransaction: { $max: '$completedAt' }
        }
      },
      { $sort: { totalInvested: -1 } }
    ]);

    // Calculate total portfolio value
    const totalInvested = portfolio.reduce((sum, holding) => sum + holding.totalInvested, 0);
    const totalTransactions = await Transaction.countDocuments({ 
      userId: new mongoose.Types.ObjectId(userId), 
      status: 'COMPLETED' 
    });

    res.json({
      success: true,
      data: {
        holdings: portfolio,
        summary: {
          totalHoldings: portfolio.length,
          totalInvested,
          totalTransactions,
          currency: 'INR'
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching portfolio:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching portfolio summary' 
    });
  }
};
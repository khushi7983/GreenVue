import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fundName: {
    type: String,
    required: true
  },
  fundSymbol: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  navPrice: {
    type: Number,
    required: true
  },
  transactionType: {
    type: String,
    enum: ['BUY', 'SELL'],
    default: 'BUY'
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true
  },
  razorpayPaymentId: {
    type: String,
    default: null
  },
  razorpaySignature: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
    default: 'PENDING'
  },
  paymentMethod: {
    type: String,
    default: 'RAZORPAY'
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  failureReason: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for better query performance
transactionSchema.index({ userId: 1, transactionDate: -1 });
transactionSchema.index({ status: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
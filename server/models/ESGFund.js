import mongoose from 'mongoose';

const ESGFundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  returns: { type: String, required: true },
  rating: { type: String, required: true },
  description: { type: String, required: true },
  minInvestment: { type: Number, default: 1000 },
  expenseRatio: { type: String, default: '0.75%' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ESGFund', ESGFundSchema);
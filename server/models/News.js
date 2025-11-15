import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String },
  author: { type: String, default: 'GreenVue Team' },
  category: { type: String, default: 'ESG' },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('News', NewsSchema);
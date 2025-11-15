import express from 'express';
import {
  subscribeNewsletter,
  getAllSubscribers,
  unsubscribeNewsletter,
  getNewsletterStats
} from '../controllers/newsletterController.js';

const router = express.Router();

// POST /api/newsletter - Subscribe to newsletter
router.post('/', subscribeNewsletter);

// POST /api/newsletter/unsubscribe - Unsubscribe from newsletter
router.post('/unsubscribe', unsubscribeNewsletter);

// GET /api/newsletter/subscribers - Get all subscribers
router.get('/subscribers', getAllSubscribers);

// GET /api/newsletter/stats - Get newsletter statistics
router.get('/stats', getNewsletterStats);

export default router;
import express from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
} from '../controllers/newsController.js';

const router = express.Router();

// GET /api/news - Get all news with filtering and pagination
router.get('/', getAllNews);

// GET /api/news/:id - Get single news article by ID
router.get('/:id', getNewsById);

// POST /api/news - Create new news article
router.post('/', createNews);

// PUT /api/news/:id - Update news article
router.put('/:id', updateNews);

// DELETE /api/news/:id - Delete news article
router.delete('/:id', deleteNews);

export default router;
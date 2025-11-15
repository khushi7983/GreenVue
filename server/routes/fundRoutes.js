import express from 'express';
import {
  getAllFunds,
  getFundById,
  createFund,
  updateFund,
  deleteFund
} from '../controllers/fundController.js';

const router = express.Router();

// GET /api/esg-funds - Get all funds with filtering and pagination
router.get('/', getAllFunds);

// GET /api/esg-funds/:id - Get single fund by ID
router.get('/:id', getFundById);

// POST /api/esg-funds - Create new fund
router.post('/', createFund);

// PUT /api/esg-funds/:id - Update fund
router.put('/:id', updateFund);

// DELETE /api/esg-funds/:id - Delete fund
router.delete('/:id', deleteFund);

export default router;
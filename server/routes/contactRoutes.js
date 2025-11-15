import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact - Create new contact submission
router.post('/', createContact);

// GET /api/contact - Get all contact submissions
router.get('/', getAllContacts);

// GET /api/contact/:id - Get single contact by ID
router.get('/:id', getContactById);

// PATCH /api/contact/:id/status - Update contact status
router.patch('/:id/status', updateContactStatus);

// DELETE /api/contact/:id - Delete contact
router.delete('/:id', deleteContact);

export default router;
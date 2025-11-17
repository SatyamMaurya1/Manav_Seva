// Tender Routes
const express = require('express');
const router = express.Router();
const {
  getAllTenders,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
} = require('../controllers/tenderController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllTenders);
router.get('/:id', getTenderById);
router.post('/', authMiddleware, createTender);
router.put('/:id', authMiddleware, updateTender);
router.delete('/:id', authMiddleware, deleteTender);

module.exports = router;

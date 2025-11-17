// Report Routes
const express = require('express');
const router = express.Router();
const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllReports);
router.get('/:id', getReportById);
router.post('/', authMiddleware, createReport);
router.put('/:id', authMiddleware, updateReport);
router.delete('/:id', authMiddleware, deleteReport);

module.exports = router;

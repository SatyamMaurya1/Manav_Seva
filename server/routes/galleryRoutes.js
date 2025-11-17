// Gallery Routes
const express = require('express');
const router = express.Router();
const {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require('../controllers/galleryController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllGalleryItems);
router.get('/:id', getGalleryItemById);
router.post('/', authMiddleware, createGalleryItem);
router.put('/:id', authMiddleware, updateGalleryItem);
router.delete('/:id', authMiddleware, deleteGalleryItem);

module.exports = router;

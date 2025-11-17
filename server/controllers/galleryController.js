// Gallery Controller
const Gallery = require('../models/Gallery');

const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    res.json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGalleryItemById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  const galleryItem = new Gallery(req.body);
  try {
    const newGalleryItem = await galleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGalleryItem = async (req, res) => {
  try {
    const updatedGalleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGalleryItem) return res.status(404).json({ message: 'Gallery item not found' });
    res.json(updatedGalleryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const deletedGalleryItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedGalleryItem) return res.status(404).json({ message: 'Gallery item not found' });
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
};

// Tender Controller
const Tender = require('../models/Tender');

const getAllTenders = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.json(tenders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTenderById = async (req, res) => {
  try {
    const tender = await Tender.findById(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTender = async (req, res) => {
  const tender = new Tender(req.body);
  try {
    const newTender = await tender.save();
    res.status(201).json(newTender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTender = async (req, res) => {
  try {
    const updatedTender = await Tender.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTender) return res.status(404).json({ message: 'Tender not found' });
    res.json(updatedTender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTender = async (req, res) => {
  try {
    const deletedTender = await Tender.findByIdAndDelete(req.params.id);
    if (!deletedTender) return res.status(404).json({ message: 'Tender not found' });
    res.json({ message: 'Tender deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTenders,
  getTenderById,
  createTender,
  updateTender,
  deleteTender,
};

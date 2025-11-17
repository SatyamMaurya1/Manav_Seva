// Tender Model
const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  documents: [{ type: String }],
});

module.exports = mongoose.model('Tender', tenderSchema);

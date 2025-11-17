// Report Model
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  year: { type: Number, required: true },
  file: { type: String },
});

module.exports = mongoose.model('Report', reportSchema);

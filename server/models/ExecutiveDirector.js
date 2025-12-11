// ExecutiveDirector Model
const mongoose = require('mongoose');

const executiveDirectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('ExecutiveDirector', executiveDirectorSchema);

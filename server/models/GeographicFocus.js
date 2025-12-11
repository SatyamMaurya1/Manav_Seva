// GeographicFocus Model
const mongoose = require('mongoose');

const geographicFocusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  showMap: { type: Boolean, default: false },
  mapImage: { type: String },
});

module.exports = mongoose.model('GeographicFocus', geographicFocusSchema);

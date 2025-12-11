const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  displayOrder: { type: Number, required: true },
  message: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model('Message', messageSchema);
